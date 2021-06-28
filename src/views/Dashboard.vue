<template>
    <div class="vertical dark ">
    <div class="wrapper">
      <Nav />
      <SideBar />
      <DashboardContent />

      <!-- <Modal /> -->
      <Modal name = 'notification' openCmd='openNotif' closeEvt='closeNotif' type = 'slide'>
          <template v-slot:title>
            <h5 class="modal-title" id="defaultModalLabel">Your Notifications</h5>
          </template>
          <template v-slot:body>
              <Notification />
          </template>
          <template v-slot:footer>
            <button type="button" class="btn btn-secondary btn-block" data-dismiss="modal">Clear All</button>
          </template>
      </Modal>

      <BottomNav />
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import SideBar from '@/components/SideBar'
import BottomNav from '@/components/p2p/Drawer'
// import Modal2 from "@/components/Modal";
import Modal from '@/components/p2p/Modal'
import Notification from '@/components/p2p/Notification'

import DashboardContent from "./DashboardContent"

import axios from 'axios'
import config from '@/config'
import socketMixin from "@/mixins/socket";
import eventHub from '@/eventHub'
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    Nav,
    BottomNav,
    SideBar,
    Modal,
    Notification,
    DashboardContent
  },

  methods: {
    async initApp () {
      let profile = JSON.parse(sessionStorage.getItem('p2p_user_profile'))
      const { data } = await axios.get(`${config.apiBaseUrl}/users/${profile.id}`)
      const marketResp = await axios.get(`${config.apiBaseUrl}/markets`)
      const notifResp = await axios.get(`${config.apiBaseUrl}/user/${profile.id}/notification`)
      const resp = await axios.get(`${config.apiBaseUrl}/config`)
      this.$store.commit('setServerConfig', resp.data.data)
      this.profile = data.data
      this.$store.commit('setProfile', data.data)
      this.$store.commit('setMarkets', marketResp.data)
      this.$store.commit('setNotif', notifResp.data)

      // check user type
      if (this.$store.getters.userProfile.type === 3) {
        const cinvestors = await axios.get(`${config.apiBaseUrl}/admin/count/users?type=1`)
        const cstudents = await axios.get(`${config.apiBaseUrl}/admin/count/users?type=2`)
        const cadmins = await axios.get(`${config.apiBaseUrl}/admin/count/users?type=3`)
        const cTransactions = await axios.get(`${config.apiBaseUrl}/admin/count/transactions`)
        this.$store.commit('adminStats', {
          investors: cinvestors.data.data,
          students: cstudents.data.data,
          admins: cadmins.data.data,
          cTransactions: cTransactions.data.data
        })

        // const charts = await axios.get(`${config.apiBaseUrl}/admin/chart`)
        // this.$store.commit('adminCharts', charts.data.data)
      }

      // app initialized
      // this.$root.$emit('app_init')
      eventHub.$emit('app_init')
    }
  },

  computed: {
    ...mapState({
      'markets': (state) => state.user.market
    })
  },

  async mounted() {
    if (!sessionStorage.getItem('p2p_user_profile')) {
      // check for token
      if(this.$route.params.token) {
        const { data } = await axios.post(`${config.apiBaseUrl}/login`, { token: this.$route.params.token })
        if (data.success) {
          sessionStorage.setItem('p2p_user_profile', JSON.stringify(data.data))
        } else {
          this.$router.push('/login')
          return
        }
      } else {
        this.$router.push('/login')
        return
      }
    }

    // let that = this;
    let socket = this.socketConnect();
    socket.on("message", msg => {
      try {
        let message = msg;
        switch (message.type) {
          case "refresh":
            // this.$root.$emit('app_refresh')
            eventHub.$emit('app_refresh')
            break;

          case "add-market-data":
            this.$store.commit('addToMarket', message.data)
            break;

          case "tx":
            console.log("TX Message received: ", message)
            // put it in live transactions
            eventHub.$emit('ping', message.data)
            break;

          case "tx-confirmed":
            eventHub.$emit('tx-appeal', message.data)
            console.log("TX confirmation recieved: ", message)
            break;

          case 'tx-completed':
            eventHub.$emit('tx-completed', message.data)
            this.$store.commit('txCompleted', message.data)
            console.log("TX completed recieved: ", message)
            break

          case "notification":
            this.$store.commit('addToNotif', message.data)
            break;
          
          case "chat":
            this.$store.commit("newMessage", message.data)
            break;
        }
      } catch (err) {
        console.log(err.message);
      }
    });

    socket.on("connect_error", (e) => {
      console.log("UNABLE TO CONNECT TO SERVER!!!", e.message);
      // that.$root.$emit("server_disconnected");
      eventHub.$emit("server_disconnected");
    });

    socket.on("disconnect", () => {
      console.log("SERVER DISCONNECTED!!!");
      eventHub.$emit("server_disconnected");
    });

    socket.on("reconnect", async () => {
      console.log("SOCKET RECONNECTED!!!");
      // that.$root.$emit("server_reconnected");
      eventHub.$emit("server_reconnected");
      await this.initApp()
    });

    if(!this.$store.getters.userProfile.id) {
      await this.initApp()
    }

    // this.$root.$on('app_refresh', async () => {
    //   await this.initApp()
    // })

    eventHub.$on('app_refresh', async () => {
      await this.initApp()
    })
  },
  mixins: [socketMixin]
}
</script>