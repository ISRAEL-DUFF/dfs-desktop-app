<template>
    <div class='container-fluid'>
        <div class='row' v-if ='chatInited'>
            <div class='col-lg-3'>
                <!-- <recent-chats :chats = 'recentChats' v-on:switch-chat = 'setCurrentChat'/> -->
            </div>
            <div class='col-sm-12 col-md-6 col-lg-6'>
                <div class="bg2">
                    <chat-feed :currentChat = 'currentChat' v-on:edit-group='editGroup($event)'/>
                </div>
                <div class='row'>
                    <div class='col-12 col-sm-12 col-md-12 col-lg-12'>
                        <chat-button v-on:message='sendMessage($event)' v-if='currentChat' :currentChat ='currentChat'/>
                    </div>
                </div>
            </div>
            <div class='col-lg-3'>
            </div>  
        </div>

        <div class='row' v-if ='!currentChat'>
            <div class='col-lg-12'>
            <h4>No Chat Selected</h4>
            </div>
        </div>
        </div>
</template>

<script>
    // import Message from '@/components/chat/Message'
    // import RecentChats from './RecentChats'
    import ChatButton from './ChatButton'
    // import GroupButton from './GroupButton'
    import ChatFeed from './ChatFeed'
    // import ChatWidget from './ChatWidget'
    // import config from '@/config'
    // import commonMixin from '@/mixins/common'

    export default {
        data () {
            return {
                isMe: false,
                messageText: '',
                currentChat: '',
                recentChats: '',
                chatInited: false
            }
        },
        methods: {
            initChat () {
                this.recentChats = this.$store.getters.getRecentChats
                this.currentChat = this.$store.getters.currentChat //this.recentChats['CC']
                console.log('currentChats:', this.recentChats, this.currentChat)
                if (this.recentChats) {
                    console.log('chat inited')
                    this.chatInited = true
                }
            },
            sendMessage (message) {
                this.recentChats[
                this.currentChat.receiver.email].messages.push(message)
                // this.isMe = !this.isMe
                this.messageText = ''
            },

            setCurrentChat (chat) {
                console.log('new current chat:', chat)
                this.currentChat = chat
            },
            createGroup (group) {
                let g = {
                    userData: {
                    type: 'group',
                    avatar: group.avatar,
                    // appointment: group.name,
                    id: `group-${new Date().getMilliseconds()}`,
                    name: group.name,
                    time: group.date
                    },
                    members: group.members,
                    messages: []
                }
                this.$store.commit('addGroup', g)
                this.setCurrentChat(g)
                // this.currentChat = g
            }
        },
        mounted() {
            // this.$root.$on('app_header_init', ()=> {
            //     this.initChat()
            // })
            this.initChat()
        },

        components: {
            // RecentChats,
            ChatButton,
            // GroupButton,
            ChatFeed
        },
        mixins: []
    }
</script>

<style scoped>
.bg {

  background: #1F2630;
  background: -webkit-linear-gradient(to right, #1F2630, #86A8E7, #1F2630);
  background: linear-gradient(to right, #16302e, #1F2630, #1F2630);
  /* position: absolute; */
  /* top: 82px; */
  /* left: 18%; */
  /* left: 25%;
  right: 25%; */
  width: 100%;
  padding: 10px;
    border-radius: 15px;

  /* padding-right: 20px; */
}

.bg2 {
  background-color: rgba(0,0,0,0.5);
  border-radius: 15px;
  padding: 0;
  /* width: 100%;
  margin: auto; */
}
/* chat box */
/* {box-sizing: border-box;} */

/* Button used to open the chat form - fixed at the bottom of the page */
.open-button {
  background-color: rgb(18, 21, 228);
  color: white;
  padding: 10px 10px;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  position: fixed;
  border-radius: 50px;
  font-weight: bold;
}


/* The popup chat - hidden by default */
.chat-popup {
  display: none;
  position: fixed;
  bottom: 0;
  right: 15px;
  /* border: 3px solid #f1f1f1; */
  z-index: 9;
}

div::-webkit-scrollbar {
  background-color: rgba(0, 0, 253, 0);
}

div::-webkit-scrollbar-thumb {
  background-color: blue;
  border-radius: 20px;
}

@media only screen and (max-height: 768px) {
    .bg {
        height: 600px;
        /* background: rgba(3, 3, 240, 0.973); */
        top: 82px;
        /* left: 18%; */
        margin-left: auto;
        margin-right: auto;
    }
}
</style>