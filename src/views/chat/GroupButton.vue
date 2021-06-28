<template>
  <div>
    <div class="chat-popup" id="myForm" ref = 'chatbox'>
      <div class="form-container">
        <!-- <h1>Chat</h1> -->

        <label for="msg"><b style='color: white'>{{editGroup ? 'Group Name:' : 'New Group'}}</b></label>
        <textarea v-model = 'groupName' placeholder="Enter Group Name..." name="msg" required></textarea>
        <span>Select participants:</span>
        <div v-if = 'inited' style = 'height: 330px; overflow-y: auto; overflow-x: auto; margin-bottom: 40px'>
          <ul style='width: 90%'>
            <li v-for='(u, i) in userList' :key = '"u" + i' :title = 'u.appointment' style = 'cursor: pointer; margin-top: 20px; margin-bottom: 20px; white-space: nowrap; '>
              <div class='row'>
                <div class='col-sm-3 col-md-3 col-lg-3'>
                  <label :for = '"u" + i'>
                    <img :src = 'profilePic(u)' style = 'height: 50px; width: 50px; border-radius: 50%; margin-right: 10px'/>
                  </label>
                </div>
                <div class='col-sm-7 col-md-7 col-lg-7'>
                  <label :for ='"u" + i' style='color: white; font-weight: bold'>{{clipAppointment(u.appointment)}}</label>
                </div>
                <div class='col-sm-2 col-md-2 col-lg-2'>
                  <input type="checkbox" :id='"u" + i' :value = 'u' v-model = 'participants'>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <button type="button" class="close-button round-button" @click="closeForm()">X</button>
        <button @click = 'createGroup' class="ok-button round-button">Ok</button>
      </div>
    </div>
    <button class="open-button round-button" @click="openForm()">+</button>
  </div>
</template>

<script>
  import config from '@/config'
  import commonMixin from '@/mixins/common'

  export default {
      data () {
          return {
              editGroup: false,
              isMe: false,
              groupName: '',
              participants: [],
              userList: [],
              users: '',
              inited: false
          }
      },
      methods: {
        openForm () {
            this.$refs.chatbox.style.display = "block";
        },
        closeForm() {
          this.$refs.chatbox.style.display = "none";
          this.resetState()
        },
        resetState() {
          this.participants = []
          this.groupName = ''
          this.editGroup = false
        },
        createGroup () {
          if (!this.groupName || !this.participants.length) return
          if (!this.editGroup) {
            let group = {
                avatar: `${config.rootDir}/static/img/menuIcons/teamwork.png`,
                name: this.groupName,
                members: this.participants,
                date: new Date().toTimeString(),
              }
            this.$emit('new-group', group)
          } else {
            let groupData = {
              name: this.groupName,
              members: this.participants
            }
            this.$emit('group-edited', groupData)
          }
          this.closeForm()
        },

        // setCurrentChat (chat) {
        //     this.currentChat = chat
        // },

        init () {
          this.userList = this.$store.getters.userList
          if (this.userList.length) {
            this.$root.$on('edit-group',(group) => {
              this.groupName = group.userData.name
              this.participants = group.members
              this.editGroup = true
              this.openForm()
            })
            this.inited = true
          }
        }
      },
      computed: {
        clipAppointment () {
          return function (appointment) {
            if (appointment.length <= 20) return appointment
            else return `${appointment.substr(0, 15)}...`
          }
        }
      },
      mounted() {
        this.$root.$on('app_header_init', () => {
          this.init()
        })
        this.init()
      },

      components: {
      },
      mixins: [
        commonMixin
      ]
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
    height: 400px;
    overflow: auto
}

/* Button used to open the chat form - fixed at the bottom of the page */
.round-button {
  /* background-color: rgb(18, 21, 228); */
  color: white;
  padding: 10px 10px;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  /* position: absolute; */
  position: fixed;
  border-radius: 50px;
  font-weight: bold;

  width: 60px;
}

.open-button {
  bottom: 8px;
  right: 23px;
  height: 60px;
  background-color: rgb(0, 0, 0, 1);
}

.ok-button {
  /* position: absolute; */
  position: fixed;
  bottom: 8px;
  right: 200px;
  height: 60px;
  background-color: rgb(0, 0, 0, 1);
}

.close-button {
  position: fixed;
  /* position: absolute; */
  bottom: 8px;
  right: 110px;
  height: 60px;
  background-color:rgb(0, 0, 0, 1);;
}



/* The popup chat - hidden by default */
.chat-popup {
  display: none;
  position: fixed;
  bottom: 0;
  right: -85px;
  /* border: 3px solid #f1f1f1; */
  z-index: 30;
  width: 400px;
}

/* Add styles to the form container */
.form-container {
  max-width: 300px;
  padding: 10px;
  /* background-color: white; */
  background-color: rgba(0, 0, 0, 0.9);
  /* border-style: solid; */
  border-radius: 10px;
  border-color: rgba(253, 248, 248, 0.3);
}

/* Full-width textarea */
.form-container textarea {
  width: 100%;
  padding: 15px;
  margin: 5px 0 10px 0;
  border: none;
  /* background: #f1f1f1; */
  background-color: rgba(0, 0, 253, 0);
  color: white;
  font-weight: bold;
  resize: none;
  min-height: 50px;
  overflow: hidden;
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

div::-webkit-scrollbar {
  background-color: rgba(0, 0, 253, 0);
  width: 5px;
}

div::-webkit-scrollbar-thumb {
  background-color: rgba(220,220,220, 0.3);
  border-radius: 20px;
}

</style>