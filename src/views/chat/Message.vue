<template>
  <div class='row'>
    <div v-if = '!message.isMe' class="col-md-12 col-sm-12 col-md-12 col-lg-12">
      <div class='container-txt me'>
        <!-- <img :src='message.avatar' alt="Avatar"> -->
        <!-- <span>Username here</span> -->
        <p>{{message.message}}</p>
        <span class="time-right">{{new Date(message.created_at).toDateString()}}</span>
      </div>
    </div>

    <div v-if = 'message.isMe' class="col-md-12 col-sm-12 col-md-12 col-lg-12">
      <div class='container-txt other'>
        <!-- <img :src='message.avatar' alt="Avatar" class="right"> -->
        <p>{{message.message}}</p>
        <span class="time-left">{{new Date(message.created_at).toDateString()}}</span>
      </div>
    </div>
  </div>
</template>

<script>

    export default {
        data () {
            return {
            }
        },
        props: [
          'message'
        ],
        methods: {
            
        },
        mounted() {

        }
    }
</script>

<style scoped>
  /* Chat containers */
.container-txt {
  /* border: 2px solid #dedede; */
  /* background-color: #f1f1f1; */
  width: 100%;
    background-color: transparent;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
}

.container-txt p {
  border: none;
  border-radius: 50px;
  color: black;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 20px;
  padding-left: 20px;
  font-size: 15px;
  margin: 5px;
}

.me p {
  background-color: #82ccdd;;
  margin-right: 50px;
}

.other p {
  background-color: #78e08f;;
  margin-left: 50px;
}

@media only screen and (min-width: 320px) {
    /* .bg {
        height: 580px;
        top: 82px;
        margin-left: auto;
        margin-right: auto;
    } */

    .me p {
      background-color: #1F2630;
      margin-right: 5px;
      color: white;
    }

    .other p {
      background-color: #4CBF88;;
      margin-left: 5px;
      /* color: white; */
    }
}

/* Darker chat container */
.darker {
  border-color: #ccc;
  /* background-color: #ddd; */
    background-color: transparent;
}

/* Clear floats */
.container-txt::after {
  content: "";
  clear: both;
  display: table;
}

/* Style images */
.container-txt img {
  float: left;
  max-width: 40px;
  /* width: 100%; */
  margin-right: 20px;
  border-radius: 50%;
}

/* Style the right image */
.container-txt img.right {
  float: right;
  margin-left: 20px;
  margin-right:0;
}

/* Style time text */
.time-right {
  float: right;
  color: rgba(255,255,255, 0.6);
  font-size: 10px;
}

/* Style time text */
.time-left {
  float: left;
  color: rgba(255,255,255, 0.6);
  font-size: 10px;
}
</style>