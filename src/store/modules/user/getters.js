// import axios from 'axios'
// import config from '../../../config'

export const messagesCount = function(state) {
  return state.messages.length
}

export const getMessage = function(state) {
  return function(id) {
    for(let message of state.messages) {
      if(Number(message.id) === Number(id)) return message
    }
    return null
  }
}

export const userProfile = function (state) {
  return state.profile
}
export const getWallet = function (state) {
  return state.wallet
}

export const getServerConfig = function (state) {
  return state['serverConfig']
}

export const getStats = function (state) {
  return state['stats']
}

export const getUserCharts = function (state) {
  return state['userCharts']
}

export const getAdminCharts = function (state) {
  return state['adminCharts']
}
