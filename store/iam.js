export const state = () => ({
  accessToken: '',
  terminalId: '',
  userInfo: null
})

export const mutations = {
  startTerminalRegistration(state, terminalId) {
    state.terminalId = terminalId
  },
  storeAccessToken(state, accessToken) {
    state.accessToken = accessToken
  },
  terminateSession(state) {
    state.accessToken = ''
    state.terminalId = ''
    state.userInfo = null
  },
  updateUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}
