<template>
  <div id="mydiv" ref='myWidget' v-show='$route.path !== "/dashboard/chat"'>
    <!-- Include a header DIV with the same name as the draggable DIV, followed by "header" -->
    <!-- <button id="mydivheader" class='round-widget'>Chats</button> -->
    <img :src = 'widgetIcon' style = 'height: 40px; width: 40px; border-radius: 50%;' @click = 'showRecentMsg'/>
    <span class='mybag'>89 </span>

    <recent-chats :chats = 'recentChats' v-on:switch-chat = 'setCurrentChat' v-if='widgetInited && showRecent'/>
  </div>
</template>

<script>
  import * as draggable from './draggable'
  import recentChats from './RecentChats'
  import config from '@/config'

  export default {
    data () {
      return {
        widgetIcon: `${config.rootDir}/static/img/menuIcons/chat.png`,
        recentChats: [],
        widgetInited: false,
        showRecent: false,
        hide: false
      }
    },

    methods: {
    initChat () {
      if (this.$refs.myWidget) {
        draggable.makeDragable({
          element: this.$refs.myWidget,
          top: '60px',
          left: '80%'
        })
      }
      this.recentChats = this.$store.getters.getRecentChats
      if (this.recentChats.length) {
          console.log('widget inited')
          this.widgetInited = true
      }
    },
    setCurrentChat (chat) {
      // emit some root events here
      console.log('ChatWidget:', chat)
      this.$store.commit('setCurrentChat', chat)
      this.$router.push('/dashboard/chat')
    },
    showRecentMsg () {
      this.showRecent = !this.showRecent
    }
  },
    mounted () {
      this.$root.$on('app_header_init', ()=> {
        this.initChat()
      })
      this.initChat()
    },
    components: {
      recentChats
    }
  }
</script>

<style scoped>
/* #mydiv {
  position: absolute;
  z-index: 100000000000000000000;
  top: 60px;
  left: 80%;
}

#mydivheader {
  z-index: 100000000000000000001;
} */

.round-widget {
  background-color: rgb(18, 21, 228);
  color: white;
  padding: 20px 20px;
  border: none;
  cursor: move;
  width: 60px;
  opacity: 0.8;
  /* position: fixed; */
  border-radius: 50px;
  font-weight: bold;
}
.mybag {
  padding: 5px 5px;
  background-color: red;
  border: none;
  color: white;
  border-radius: 50px;
  text-align: center;
  font-size: 10px;
  position: absolute;
  top: 10;
  left: 4;
}
</style>