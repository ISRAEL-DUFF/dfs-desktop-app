import io from 'socket.io-client'
import config from '../config'
let socket

export default {
  methods: {
    socketConnect: function () {
      let email = JSON.parse(sessionStorage.getItem('p2p_user_profile')).email
      socket = io(config.socketUrl, { query: `email=${email}` })
      return socket
    },
    getSocket: function () {
      return socket
    },

    socketSend: function (msg) {
      socket.emit('message', JSON.stringify(msg))
    },

    fetchData () {
      const profile = JSON.parse(sessionStorage.getItem('p2p_user_profile'))
      // get server config
      this.$store.dispatch('getUserProfile', profile)
      // this.$root.$emit('app_init')
    }
  }
}
