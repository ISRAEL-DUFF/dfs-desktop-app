import axios from 'axios'
import config from '../../../config'

export const getUserProfile = async function (context, profile) {
  const { data } = await axios.get(`${config.apiBaseUrl}/users/${profile.id}`)
  context.commit('setProfile', data.data)
}
export const getServerConfig = async function (context) {
  const { data } = await axios.get(`${config.apiBaseUrl}/config`)
  context.commit('setServerConfig', data.data)
}
