export default ({ app }, inject) => {
  const iamClient = {
    serverBaseUrl: 'http://localhost:11121/iam/restv1',
    clientId: 'cl-0x27223700',
    clientSecret: 'RArhJhZIfBWHlfjcA2_FSw',

    async fetchUserInfo() {
      app.$axios.setToken(app.store.state.iam.accessToken, 'Bearer')
      return app.$axios.$get(
        this.serverBaseUrl + '/users/me/openidconnect-userinfo'
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
