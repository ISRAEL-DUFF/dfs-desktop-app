import config from '@/config'

// import { recentChats } from "./mutations"

export default {
  recentChats: {
    'CSO': {
      userData: {
        avatar: `${config.rootDir}/static/img/user2.jpeg`,
        text: "Some messages sent before now ...",
        time: "11:00",
        appointment: 'CSO'
      },
      messages: [
        {
          avatar: `${config.rootDir}/static/img/user2.jpeg`,
          text: "Hello. How are you today?",
          time: "11:00",
          isMe: false
        },
        {
          avatar: `${config.rootDir}/static/img/user2.jpeg`,
          text: "Hey! I'm fine. Thanks for asking!",
          time: "11:01",
          isMe: true
        },
        {
          avatar: `${config.rootDir}/static/img/user2.jpeg`,
          text: "Sweet! So, what do you wanna do today?",
          time: "11:02",
          isMe: false
        }
      ]
    },
    'CCITO': {
      userData: {
        avatar: `${config.rootDir}/static/img/user2.jpeg`,
        text: "Other messages here to send ...",
        time: "14:09",
        appointment: 'CCITO'
      },
      messages: [
      ]
    },
    'CLEGAL': {
      userData: {
        avatar: `${config.rootDir}/static/img/user2.jpeg`,
        text: "Yet stuff other things ...",
        time: "09:40",
        appointment: 'CLEGAL'
      },
      messages: []
    },
    'NETWORK-ADMIN': {
      userData: {
        avatar: `${config.rootDir}/static/img/user2.jpeg`,
        text: "Tomorow is now ...",
        time: "10:50",
        appointment: 'NETWORK-ADMIN'
      },
      messages: []
    },
    'CC': {
      userData: {
        avatar: `${config.rootDir}/static/img/user2.jpeg`,
        text: "document ready for signing ...",
        time: "09:40",
        appointment: 'CC'
      },
      messages: []
    }
    },
  currentChat: {
    userData: {
      avatar: `img/p2p/user2.jpg`,
      text: "Some messages sent before now ...",
      time: "11:00",
      appointment: 'John Bull'
    },
    messages: [
      // {
      //   avatar: `img/p2p/user2.jpg`,
      //   text: "Hello. How are you today?",
      //   time: "11:00",
      //   isMe: false
      // },
      // {
      //   avatar: `img/p2p/user1.jpg`,
      //   text: "Hey! I'm fine. Thanks for asking!",
      //   time: "11:01",
      //   isMe: true
      // },
      // {
      //   avatar: `img/p2p/user3.jpg`,
      //   text: "Sweet! So, what do you wanna do today?",
      //   time: "11:02",
      //   isMe: false
      // },

      // {
      //   avatar: `img/p2p/user1.jpg`,
      //   text: "Write so poems and relax!",
      //   time: "11:02",
      //   isMe: true
      // },

      // {
      //   avatar: `img/p2p/user3.jpg`,
      //   text: "That's great!",
      //   time: "11:02",
      //   isMe: false
      // }
    ]
  }
}

