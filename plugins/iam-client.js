import qs from 'querystring'

export default ({ app }, inject) => {
  const iamClient = {
    restBaseUrl: 'http://localhost:11121/rest/v1',
    clientId: 'CUA0T11xq3e',
    clientSecret: 'RArhJhZIfBWHlfjcA2_FSw',

    getAccountIdentifier() {
      return app.store.state.iam.accountIdentifier
    },

    isWaitingTerminalAuthorizationConfirmation() {
      return (
        !!app.store.state.iam.terminalId && !app.store.state.iam.accessToken
      )
    },

    async startTerminalAuthorization(accountIdentifier, verificationMethods) {
      return new Promise((resolve, reject) => {
        app.$axios
          .$post(
            this.restBaseUrl + '/terminals/register',
            {
              verification_methods: verificationMethods ?? ['none'],
              verification_resource_name: accountIdentifier
            },
            {
              auth: {
                username: this.clientId,
                password: this.clientSecret
              }
            }
          )
          .then((resp) => {
            app.store.commit('iam/startTerminalRegistration', {
              terminalId: resp.terminal_id,
              accountIdentifier: accountIdentifier
            })
            resolve()
          })
          .catch((err) => {
            //TODO: translate it (map the fields)
            if (
              err.response &&
              err.response.status >= 400 &&
              err.response.status <= 499
            ) {
              reject({ code: 'arg_error' })
            } else {
              reject({ code: 'server_error' })
            }
          })
      })
    },

    async confirmTerminalAuthorization(otp) {
      return new Promise((resolve, reject) => {
        app.$axios
          .$post(
            this.restBaseUrl + '/oauth/token',
            qs.stringify({
              grant_type: 'authorization_code',
              code: 'otp:' + app.store.state.iam.terminalId + ':' + otp
            }),
            {
              auth: {
                username: this.clientId,
                password: this.clientSecret
              }
            }
          )
          .then(
            (tokenResp) => {
              app.store.commit('iam/storeAccessToken', tokenResp.access_token)

              this.fetchUserInfo().then(
                (userInfoResp) => {
                  app.store.commit('iam/updateUserInfo', userInfoResp)
                  resolve()
                },
                (err) => {
                  reject(err)
                }
              )
            },
            (err) => {
              if (err.response) {
                if (err.response.status == 400) {
                  if (
                    err.response.data.error === 'invalid_grant' &&
                    err.response.data.error_description === 'expired'
                  ) {
                    reject({ code: 'arg_expired' })
                    return
                  }
                  reject({ code: 'arg_error' })
                  return
                }
              }
              reject({ code: 'server_error' })
            }
          )
      })
    },
    async fetchUserInfo() {
      //TODO: ensure we have valid access token
      app.$axios.setToken(app.store.state.iam.accessToken, 'Bearer')
      return app.$axios.$get(
        this.restBaseUrl + '/users/me/openidconnect-userinfo'
      )
    },

    isLoggedIn() {
      return !!app.store.state.iam.accessToken
    }
  }

  inject('iamClient', iamClient)
}
