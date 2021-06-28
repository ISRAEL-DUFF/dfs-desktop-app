import axios from 'axios'
import config from '../../../config'

export const getRecentChatMessages = async function (context, profile) {
  axios.get(`${config.socketUrl}/chat/recent/${profile.id}`)
    .then((resp) => {
      // console.log('FETCH ALL CHATS', resp.data.data)
      let officers = context.rootState.mail.userList
      // console.log('FETCH ALL CHATS', context.rootState.mail.userList)
      const chatContacts = officers.concat(resp.data.data)
      context.commit('recentChats', chatContacts)
    })
}
