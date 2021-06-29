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

// import axios from 'axios'
// import config from '@/config'
import socketMixin from "@/mixins/socket";
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
      // let profile = JSON.parse(sessionStorage.getItem('p2p_user_profile'))
      // const { data } = await axios.get(`${config.apiBaseUrl}/users/${profile.id}`)
      // const notifResp = await axios.get(`${config.apiBaseUrl}/user/${profile.id}/notification`)
      // const resp = await axios.get(`${config.apiBaseUrl}/config`)
      // this.$store.commit('setServerConfig', resp.data.data)
      // this.profile = data.data
      // this.$store.commit('setProfile', data.data)
      // this.$store.commit('setNotif', notifResp.data)

      // app initialized
      // this.$root.$emit('app_init')
      this.$eventHub.$emit('app_init')
    }
  },

  computed: {
    ...mapState({
      'markets': (state) => state.user.market
    })
  },

  async mounted() {
    // if (!sessionStorage.getItem('p2p_user_profile')) {
    //   // check for token
    //   if(this.$route.params.token) {
    //     const { data } = await axios.post(`${config.apiBaseUrl}/login`, { token: this.$route.params.token })
    //     if (data.success) {
    //       sessionStorage.setItem('p2p_user_profile', JSON.stringify(data.data))
    //     } else {
    //       this.$router.push('/login')
    //       return
    //     }
    //   } else {
    //     this.$router.push('/login')
    //     return
    //   }
    // }

    // let that = this;
    // let socket = this.socketConnect();
    // socket.on("message", msg => {
    //   try {
    //     let message = msg;
    //     switch (message.type) {
    //       case "refresh":
    //         // this.$root.$emit('app_refresh')
    //         this.$eventHub.$emit('app_refresh')
    //         break;

    //       case "add-market-data":
    //         this.$store.commit('addToMarket', message.data)
    //         break;

    //       case "notification":
    //         this.$store.commit('addToNotif', message.data)
    //         break;
          
    //       case "chat":
    //         this.$store.commit("newMessage", message.data)
    //         break;
    //     }
    //   } catch (err) {
    //     console.log(err.message);
    //   }
    // });

    // socket.on("connect_error", (e) => {
    //   console.log("UNABLE TO CONNECT TO SERVER!!!", e.message);
    //   // that.$root.$emit("server_disconnected");
    //   this.$eventHub.$emit("server_disconnected");
    // });

    // socket.on("disconnect", () => {
    //   console.log("SERVER DISCONNECTED!!!");
    //   this.$eventHub.$emit("server_disconnected");
    // });

    // socket.on("reconnect", async () => {
    //   console.log("SOCKET RECONNECTED!!!");
    //   // that.$root.$emit("server_reconnected");
    //   this.$eventHub.$emit("server_reconnected");
    //   await this.initApp()
    // });

    if(!this.$store.getters.userProfile.id) {
      await this.initApp()
    }

    // this.$root.$on('app_refresh', async () => {
    //   await this.initApp()
    // })

    this.$eventHub.$on('app_refresh', async () => {
      await this.initApp()
    })

    this.$loadScripts('commonJs')
  },
  mixins: [socketMixin]
}
</script>