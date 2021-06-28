<template>
  <!-- <div class='content-body'>
    <div class='container-fluid'>
      <div class='card'>
        <div class='card-body'>
          <div class='row'>
            <div class='col-lg-12'>
              <ul class='recent'>
                <li v-for = '(chat, i) in chats' :key = 'i' @click='switchChat(chat)'>
                  <div class='row'>
                    <div class='col-lg-3'>
                      <img :src = 'chat.userData.avatar' /> 
                    </div>
                    <div class='col-lg-9'>
                      <p>{{chat.userData.appointment}}</p>
                      <p style='font-size: 12px;'>{{chat.userData.time}}</p>
                    </div>
                  </div>
                
                  <p>{{chat.userData.text}} </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->

  <div>
    <div class="" id="myForm" ref = 'chatbox'>
      <div :style = 'containerStyle'>
        <div style = 'height: 400px; overflow-y: auto; overflow-x: auto; margin-bottom: 40px;'>
          <ul style='width: 90%'>
            <li v-for = '(chat, i) in chats' :key = 'i' @click='switchChat(chat)' :title = 'chat.appointment' style = 'cursor: pointer; margin-top: 20px; margin-bottom: 20px; white-space: nowrap; '>
              <div class='row'>
                <div class='col-sm-3 col-md-3 col-lg-3'>
                  <label :for = 'i'>
                    <img :src = 'profilePic(chat)' style = 'height: 50px; width: 50px; border-radius: 50%; margin-right: 10px'/>
                  </label>
                </div>
                <div class='col-sm-7 col-md-7 col-lg-7'>
                  <span style='font-weight: bold; display: block'>{{chat.userData.type !== 'group' ? chat.appointment : chat.name}}</span>
                  <!-- <br /> -->
                  <!-- <span style='font-size: 12px;'>{{chat.userData.time}}</span> -->
                  <span style='font-size: 9px; color: #91EAE4aa'>{{formatChatDate(new Date())}}</span>
                </div>
                <div class='col-sm-2 col-md-2 col-lg-2'>
                  <span class='mybag'>89 </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import commonMixin from '@/mixins/common'

    export default {
        data () {
            return {
            }
        },
        props: [
          'chats'
        ],
        methods: {
            switchChat(chat) {
              this.$emit('switch-chat', chat)
            }
        },
        computed: {
          containerStyle () {
            // rgba(200, 200, 200, 0.5);
            if (this.$route.path !== "/dashboard/chat") {
              return `max-width: 300px; padding: 10px; color: white; background-color: rgba(0, 0, 0, 0.8); border-radius: 10px;
                      border-color: rgba(253, 248, 248, 0.3);`
            } else {
              return `max-width: 300px; padding: 10px; color: black; background-color: rgba(0,0,0,0.4); border-radius: 10px;
                      border-color: rgba(253, 248, 248, 0.3);`
            }
          }
        },
        mounted() {
          console.log('Chats: ', this.chats)
        },
        mixins: [commonMixin]
    }
</script>

<style scoped>
  .recent {
    height: 400px;
    overflow: auto;
    padding: 0;
    margin: 0;
  }

  .recent li {
    cursor: pointer;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .recent li img{
    width: 50px;
    height: 50px;
  }

  .recent li p {
    margin: 1px
  }

  .mybag {
  padding: 5px 5px;
  background-color:  #91EAE4;
  border: none;
  color: rgba(0, 0, 0,1);
  border-radius: 50px;
  text-align: center;
  font-size: 10px;
  position: absolute;
  top: 10;
  left: 4;
}


/* Add styles to the form container */
.form-container {
  max-width: 300px;
  padding: 10px;
  /* background-color: white; */
  background-color: rgba(255, 255, 255, 1);
  /* border-style: solid; */
  border-radius: 10px;
  border-color: rgba(253, 248, 248, 0.3);
}


div::-webkit-scrollbar {
  background-color: rgba(0, 0, 253, 0);
  width: 5px;
}

div::-webkit-scrollbar-thumb {
  background-color: rgba(0,0,0, 0.5);
  border-radius: 20px;
}
</style>