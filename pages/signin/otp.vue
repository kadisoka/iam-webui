<template>
  <div class="card" ref="cardRef">
    <div class="card-content">
      <h2>
        Confirm verification
      </h2>
      <p>{{ $iamClient.getAccountIdentifier() }}</p>
      <form id="signin-otp-form" @submit="onSubmit">
        <b-field label="Verification code">
          <b-input
            id="signin-otp-form-input-otp"
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
      }
    }
  },
  mounted: function() {
    if (!this.$iamClient.isWaitingTerminalAuthorizationConfirmation()) {
      this.$router.replace(
        '/signin/identifier?' + qs.stringify(this.$route.query)
      )
    }
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault()

      const loadingOverlay = this.$buefy.loading.open({
        container: this.$refs.cardRef
      })

      this.$iamClient
        .confirmTerminalAuthorization(this.formData.otpCode)
        .then(() => {
          loadingOverlay.close()

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
        })
        .catch((err) => {
          loadingOverlay.close()
          if (err.code === 'arg_expired') {
            this.$buefy.snackbar.open({
              message: 'Expired',
              type: 'is-danger',
              position: 'is-top'
            })
            //TODO: redirect to identifier page
          } else if (err.code === 'arg_error') {
            this.$buefy.snackbar.open({
              message: 'Input error',
              type: 'is-danger',
              position: 'is-top'
            })
          } else {
            this.$buefy.snackbar.open({
              message: 'Server error',
              type: 'is-warning',
              position: 'is-top'
            })
          }
        })
    }
  }
}
</script>
