export default ({ app }, inject) => {
  const iamClient = {
    restBaseUrl: 'http://localhost:11121/rest/v1',
    clientId: 'CUA0T11xq3e',
    clientSecret: 'RArhJhZIfBWHlfjcA2_FSw',

    async fetchUserInfo() {
      app.$axios.setToken(app.store.state.iam.accessToken, 'Bearer')
      return app.$axios.$get(
        this.restBaseUrl + '/users/me/openidconnect-userinfo'
      )
    }
  }
  const appCore = {
    // The delimiters might look unusual. We need the delimiters to be
    // unique so the template processor won't get misidentify.
    appName: '{:[ .AppName ]:}',
    iamClient: iamClient
  }

  inject('appCore', appCore)
}
