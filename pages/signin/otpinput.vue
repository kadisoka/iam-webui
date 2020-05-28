<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">{{ $appCore.appName }}</p>
    </div>
    <div class="card-content">
      <h2>
        Confirm verification
      </h2>
      <form id="signin-otpinput-form" @submit="onSubmit">
        <b-field label="Verification code">
          <b-input
            id="signin-otpinput-form-input-otpinput"
            v-model="formData.otpCode"
            placeholder="######"
          ></b-input>
        </b-field>
        <div class="buttons is-right">
          <button class="button is-primary" type="submit">Next</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '@nuxtjs/axios'
import qs from 'querystring'

export default {
  layout: 'mono',
  middleware: 'nonAuthenticated',
  head() {
    return {
      title: 'Sign In - ' + this.$appCore.appName
    }
  },
  data() {
    return {
      formData: {
        otpCode: ''
      },
      show: true
    }
  },
  mounted: function() {
    if (
      !this.$store.state.iam.terminalId ||
      this.$store.state.iam.terminalId.length === 0
    ) {
      this.$router.replace(
        '/signin/identifier?' + qs.stringify(this.$route.query)
      )
    }
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault()

      this.$axios
        .$post(
          this.$appCore.iamClient.serverBaseUrl + '/oauth/token',
          qs.stringify({
            grant_type: 'authorization_code',
            code:
              'otp:' +
              this.$store.state.iam.terminalId +
              ':' +
              this.formData.otpCode
          }),
          {
            auth: {
              username: this.$appCore.iamClient.clientId,
              password: this.$appCore.iamClient.clientSecret
            }
          }
        )
        .then(
          (resp) => {
            this.$store.commit('iam/storeAccessToken', resp.access_token)

            this.$appCore.iamClient.fetchUserInfo().then(
              (resp) => {
                this.$store.commit('iam/updateUserInfo', resp)
                console.log(resp)

                const route = this.$route
                const router = this.$router
                const redirectUri = route.query['redirect_uri']
                if (redirectUri) {
                  //TODO: redirect
                } else {
                  const continueUrl = route.query['continue']
                  if (continueUrl) {
                    if (continueUrl.startsWith('/')) {
                      router.push(continueUrl)
                    } else {
                      //TODO: FIXME this should be replace, but there's an issue
                      location.href = continueUrl
                    }
                  } else {
                    location.href = '/'
                  }
                }
              },
              (err) => {
                console.log(err)
              }
            )
          },
          (err) => {
            console.log(err)
          }
        )
    }
  }
}
</script>
