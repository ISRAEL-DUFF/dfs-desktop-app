<template>
  <div ref='box' id = 'box' >
    <span id = 'boxheader' style='width: 100%;'>handle</span>

    <div class='row' style='background-color: rgba(0, 0, 0, 0.5); border-radius: 30px;'>
      <!-- <div class='col-md-1 col-1 col-sm-1 col-lg-1' style='margin:0; padding: 0'>
        <img :src = 'attachmentBtnIcon' @click="sendMessage" style='height: 20px; width: 20px; margin-top: 20px; margin-bottom: auto;' />
      </div> -->
      <div class='col-md-10 col-sm-10 col-md-10 col-lg-10 col-10' style=' margin:0; padding: 0'>
        <form @submit = 'sendMessage' class="form-container2">
          <textarea class = "form-control" v-model = 'messageText' placeholder="Type message..." name="msg" @keyup = 'send' @keypress='modifierKeyPress' required></textarea>
        </form>
      </div>
      <div class='col-lg-2 col-md-2 col-sm-2 col-2'>
        <img :src = 'chatBtnIcon' @click="sendMessage" style='height: 20px; width: 20px; margin-bottom: auto;' />
        <img :src = 'attachmentBtnIcon' @click="sendMessage" style='height: 20px; width: 20px; margin-bottom: auto;' />

      </div>
    </div>
    
  </div>
</template>

<script>
  import axios from 'axios'
  import config from '@/config'
  import * as draggable from './draggable'
import { mapState } from 'vuex'


  export default {
    props: ['currentChat'],
    data () {
      return {
        messageText: '',
        chatBtnIcon: `/static/assets/images/p2p/send2.png`,
        attachmentBtnIcon: `/static/assets/images/p2p/paperclip.png`,
        modifierKey: false
        // profile: localStorage.getItem('userProfile')
      }
    },
    computed: {
      ...mapState({
        'profile': (state) => state.user.profile
      })
    },
    methods: {
        openForm () {
            this.$refs.chatbox.style.display = "block";
        },
        closeForm() {
            this.$refs.chatbox.style.display = "none";
        },
        modifierKeyPress (event) {
          // let evt = event || window.event;
          // console.log(event, event.altKey, event.ctrlKey, event.shiftKey)
          if (event.altKey || event.ctrlKey || event.shiftKey) this.modifierKey = true
        },
        send (e) {
          if (e) e.preventDefault()
          if(e.key === 'Enter' && !this.modifierKey) {
            this.sendMessage()
          } else if (this.modifierKey) this.modifierKey = false
        },
        sendMessage (e) {
          if (e) e.preventDefault()
          axios.post(`${config.apiBaseUrl}/user/chat`, {
            message: this.messageText,
            sender: this.profile,
            receiver: this.currentChat.receiver
          }).then((response) => {
            if (response.data.success) {
              this.$emit('message', response.data.chat)
              this.messageText = ''
            } else {
              console.log('MessageError:', response.message)
            }
          })
        }
    },
    mounted() {
      // top: '-820%',
      // left: '65%',
      if (this.$refs.box) {
        let height = screen.height
        let bottom = '8px'
        if (height <= 768) {
          bottom = '5px'
        }
        draggable.makeDragable({
          element: this.$refs.box,
          bottom,
          left: '5%',
          zIndex: '10'
        })
      }
    },

    components: {
    }
  }
</script>


<style scoped>
/* chat box */
/* {box-sizing: border-box;} */
.chat-window {
    /* height: 600px; */
    overflow: auto;
    background-color: white;
    padding: 30px;
    height: 500px;
    overflow: auto
}

/* Button used to open the chat form - fixed at the bottom of the page */
.open-button {
  background-color: rgb(0, 0, 0, 0.5);
  color: white;
  padding: 10px 10px;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  position: fixed;
  border-radius: 50px;
  font-weight: bold;

  bottom: 23px;
  right: 300px;
  height: 60px;
  width: 60px;
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

/* Add styles to the form container */
.form-container {
  max-width: 300px;
  padding: 10px;
  /* background-color: white; */
  background-color: rgba(0, 0, 0, 0.8);
  /* border-style: solid; */
  border-radius: 10px;
  border-color: rgba(253, 248, 248, 0.3);
    z-index: 11
}

/* Full-width textarea */
.form-container textarea {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  /* background: #f1f1f1; */
  background-color: rgba(0, 0, 253, 0);
  color: white;
  font-weight: bold;
  resize: none;
  min-height: 200px;
}

.form-container2 textarea {
  padding: 10px;
  /* margin: 5px 0 22px 0; */
  /* border: none; */
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.5);
  border-left: 0;
  border-top: 0;
  border-right: 10;
  border-bottom: 0;
  /* background: #f1f1f1; */
  background-color: rgba(0, 0, 253, 0);
  color: white;
  font-weight: bold;
  height: 50px;
}

/* When the textarea gets focus, do something */
.form-container textarea:focus {
  /* background-color: #ddd; */
    background-color: rgba(12, 12, 78, 0);
  outline: none;
}

/* Set a style for the submit/login button */
.form-container .btn {
  background-color: #4CAF50;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom:10px;
  opacity: 0.8;
}

/* Add a red background color to the cancel button */
.form-container .cancel {
  background-color: red;
}

/* Add some hover effects to buttons */
.form-container .btn:hover, .open-button:hover {
  opacity: 1;
}

/*  TEXTAREA SCROLL BAR STYLE */
textarea::-webkit-scrollbar {
  background-color: rgba(0, 0, 0);
  width: 1px;
  border-radius: 20px;
  border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
}
textarea::-webkit-scrollbar-button { 
  background-color: rgba(1, 1, 15, 0.4);
    border-radius: 20px;
}
textarea::-webkit-scrollbar-track        { 
  background-color: rgba(1, 3, 0, 0.13);
}
textarea::-webkit-scrollbar-track-piece  { 
  background-color: rgba(0, 0, 0, 0.4);
}

textarea::-webkit-scrollbar-thumb        { 
  background-color: rgba(12, 225, 233, 0.2);
  border-radius: 20px;
}
textarea::-webkit-scrollbar-corner       { 
  background-color: rgba(10, 0, 0, 0.4);
  }
textarea::-webkit-resizer { 
  background-color: rgba(0, 0, 0);
  border-radius: 20px;
  border-top-right-radius: 0px;
  border-top-left-radius: 0px;
  cursor: pointer;
 }

 #boxheader {
   color: transparent;
 }

 #boxheader:hover {
   color: rgb(0, 129, 146);
 }
</style>