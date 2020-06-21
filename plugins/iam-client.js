import qs from 'querystring'

export default ({ $config, $axios, store }, inject) => {
  const iamClient = {
    restBaseUrl: $config.iamClient.restBaseUrl,
    clientId: $config.iamClient.clientId,
    clientSecret: $config.iamClient.clientSecret,

    clientAuth() {
      return { username: this.clientId, password: this.clientSecret }
    },

    getAccountIdentifier() {
      return store.state.iam.accountIdentifier
    },

    isWaitingTerminalAuthorizationConfirmation() {
      return !!store.state.iam.terminalId && !store.state.iam.accessToken
    },

    startTerminalAuthorization(accountIdentifier, verificationMethods) {
      return new Promise((resolve, reject) => {
        $axios
          .$post(
            this.restBaseUrl + '/terminals/register',
            {
              verification_methods: verificationMethods ?? ['none'],
              verification_resource_name: accountIdentifier
            },
            { auth: this.clientAuth() }
          )
          .then((resp) => {
            store.commit('iam/startTerminalRegistration', {
              terminalId: resp.terminal_id,
              accountIdentifier
            })
            resolve()
          })
          .catch((err) => {
            // TODO: translate it (map the fields)
            if (
              err.response &&
              err.response.status >= 400 &&
              err.response.status <= 499
            ) {
              reject(new Error('arg_error'))
            } else {
              reject(new Error('server_error'))
            }
          })
      })
    },

    confirmTerminalAuthorization(otp) {
      return new Promise((resolve, reject) => {
        $axios
          .$post(
            this.restBaseUrl + '/oauth2/token',
            qs.stringify({
              grant_type: 'authorization_code',
              code: 'otp:' + store.state.iam.terminalId + ':' + otp
            }),
            { auth: this.clientAuth() }
          )
          .then(
            (tokenResp) => {
              store.commit('iam/storeAccessToken', tokenResp.access_token)

              this.fetchUserInfo().then(
                (userInfoResp) => {
                  store.commit('iam/updateUserInfo', userInfoResp)
                  resolve()
                },
                (err) => {
                  reject(err)
                }
              )
            },
            (err) => {
              if (err.response) {
                if (err.response.status === 400) {
                  if (
                    err.response.data.error === 'invalid_grant' &&
                    err.response.data.error_description === 'expired'
                  ) {
                    reject(new Error('arg_expired'))
                    return
                  }
                  reject(new Error('arg_error'))
                  return
                }
              }
              reject(new Error('server_error'))
            }
          )
      })
    },
    fetchUserInfo() {
      // TODO: ensure we have valid access token
      $axios.setToken(store.state.iam.accessToken, 'Bearer')
      return $axios.$get(this.restBaseUrl + '/users/me/openidconnect-userinfo')
    },

    isLoggedIn() {
      return !!store.state.iam.accessToken
    }
  }

  inject('iamClient', iamClient)
}
