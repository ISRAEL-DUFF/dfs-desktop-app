<template>
  <div class=''>
     <div class='row' v-if ='feedInited' style='margin:0;'>
        <div class='col-12 col-sm-12 col-md-12 col-lg-12 bg'>
          <p>
            <!-- <img :src = 'currentChat.userData.avatar' style='border-radius: 50%; width: 50px; height: 50px'/>  -->
            <!-- {{currentChat.userData.type !== 'group' ? currentChat.userData.appointment : currentChat.userData.name}} -->
          </p>
          <span>
            <!-- <button @click = 'showScrollHeight'>Max scroll Height:</button>  -->
            <!-- {{scrollStr2}} -->
            <img v-show = 'fetchMessages' :src = 'loadingIcon' alt='loading messages' style='width: 20px; height: 20px; margin-right: auto; margin-left: auto; display:block'>
          </span>
          <div class = 'chat-window' ref = 'chatWindow'>
            <Message v-for='(message, i) of currentChat.messages' :key = 'i' :message = 'message'/>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
    import Message from './Message'    
    // import config from '@/config'
    import commonMixin from '@/mixins/common'

    export default {
      props: ['currentChat'],
        data () {
            return {
                // isMe: false,
                // messageText: '',
                // currentChat: '',
                // recentChats: '',
                feedInited: false,
                userScroll: false,
                fetchMessages: false,
                scrollTop: 0,
                scrollStr2: '',
                loadingIcon: `/static/assets/images/p2p/loading.gif`,
            }
        },
        methods: {
            initFeed () {
              console.log("Current Feed:", this.currentChat)
              if(this.currentChat) {
                this.feedInited = true
                setTimeout(() => {
                  this.scrollDistance(this.$refs.chatWindow, (dist, start, end) => {
                    this.userScroll = true
                    this.saveState()
                    this.scrollStr2 = `distance: ${dist}, start: ${start}, end: ${end}, scrollTop: ${this.$refs.chatWindow.scrollTop}`
                  })
                }, 10)
              }
            },
            showScrollHeight () {
              let el = this.$refs.chatWindow
              if (el) {
                let maxScrollTop = el.scrollHeight - el.offsetHeight
                el.scrollTop = maxScrollTop
                this.scrollTop = maxScrollTop
              }
            },
            editGroup () {
              this.$emit('edit-group')
            },

            saveState () {
              if (this.$refs.chatWindow.scrollTop === this.scrollTop) {
                this.showScrollHeight()
              }
              else if (this.$refs.chatWindow.scrollTop === 0) {
                // fetch more data from the server
                this.fetchMessages = true
                console.log('fetching more data')
              } else {
                this.fetchMessages = false
              }
            }
        },
        computed: {
          groupMembers() {
            return this.currentChat.members.map(m => m.appointment).reduce((prev, a) => `${a}, ${prev}`)
          }
        },
        watch: {
          currentChat () {
            this.initFeed()
          },
          'currentChat.messages': function () {
              let el = this.$refs.chatWindow
              if(el) {
                let maxScrollTop = el.scrollHeight - el.offsetHeight
                this.scrollTop = maxScrollTop 
              }
          } 
        },
        mounted() {
          // this.$root.$on('app_header_init', ()=> {
          //     this.initFeed()
          // })
          this.initFeed()
        },

        updated () {
          this.saveState()
        },

        components: {
            Message
        },
        mixins: [commonMixin]
    }
</script>

<style scoped>
.bg {

  /* background: #7F7FD5;
  background: -webkit-linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
  background: linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5); */
  /* background-color: rgba(0,0,0,0.5); */
  border-radius: 15px;
  padding: 0;
}
.bg p {
  background-color: rgba(32, 42, 102, 0.05);
  color: white;
  margin: 0;
  padding: 10px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
.chat-window {
    /* height: 600px; */
    overflow: auto;
    border-radius: 20px;
    padding: 30px;
    height: 570px;
}

div::-webkit-scrollbar {
  background-color: rgba(0, 0, 253, 0);
  width: 5px;
}

div::-webkit-scrollbar-thumb {
  background-color: rgba(0,0,0, 0.5);
  border-radius: 20px;
}

@media only screen and (max-height: 768px) {
  .chat-window {
    height: 440px;
  }
}
</style>