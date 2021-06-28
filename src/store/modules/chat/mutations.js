import Vue from 'vue'

export const addGroup = function (state, group) {
  // console.log('new group:', group)
  Vue.set(state.recentChats, group.userData.id, group)
}

export const editGroup = function (state, data) {
  let oldGroup = state.recentChats[data.id]
  oldGroup.userData.name = data.name
  oldGroup.members = data.members
  Vue.set(state.recentChats, data.id, oldGroup)
}

export const currentChat = function (state, email) {
  // Vue.set(state, 'currentChat', chat)
  state.currentChat = state.recentChats[email]
}

export const addChat = function(state, data) {
  console.log("From AddChat:", data)
  state.recentChats[data.email] = data.chats
  // {
  //   messages: data.chats
  // }
}

export const recentChats = function (state, chats) {
  console.log('RECENTS:', chats)
  Vue.set(state, 'recentChats', chats)
}

export const newMessage = function(state, msg) {
  for(let email in state.recentChats) {
    if(msg.sender.email === email) {
      state.recentChats[email].messages.push(msg)
    }
  }
}
