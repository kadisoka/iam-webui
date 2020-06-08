<template>
  <div>
    <v-card outlined>
      <v-snackbar v-model="snackbar.isShowing" top :color="snackbar.color">
        {{ snackbar.text }}
        <v-btn icon @click="snackbar.isShowing = false">
          <v-icon>$vuetify.icons.close</v-icon>
        </v-btn>
      </v-snackbar>
      <v-overlay
        absolute
        :value="loading.isShowing"
        color="white"
        opacity="0.8"
      >
        <v-progress-circular
          indeterminate
          size="64"
          color="primary"
        ></v-progress-circular>
      </v-overlay>
      <v-card-title class="headline justify-center"
        ><h1>
          Confirm verification
        </h1>
      </v-card-title>
      <v-card-text>
        <v-form id="signin-otp-form" @submit="handleSubmit">
          <v-alert dense text type="info">
            We have sent the verification code to
            <strong> {{ $iamClient.getAccountIdentifier() }}</strong
            >.<br />To use different email / phone
            <nuxt-link to="/signin">click here</nuxt-link>.
          </v-alert>
          <v-text-field
            v-model="formData.verificationCode"
            outlined
            autofocus
            label="Verification code"
            name="verificationCode"
            type="text"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions
        ><v-spacer /><v-btn outlined color="primary" disabled>Resend code</v-btn
        ><v-btn
          color="primary"
          type="submit"
          form="signin-otp-form"
          onclick="!this.form && document.getElementById('signin-otp-form').submit()"
          >Confirm</v-btn
        ></v-card-actions
      >
    </v-card>
  </div>
</template>

<script>
export default {
  layout: 'mono',
  middleware: 'nonAuthenticated',
  data() {
    return {
      snackbar: {
        text: '',
        color: null,
        isShowing: false
      },
      loading: { isShowing: false },
      formData: {
        verificationCode: ''
      }
    }
  },
  methods: {
    handleSubmit(evt) {
      evt.preventDefault()

      if (this.loading.isShowing === true) {
        return
      }
      this.loading.isShowing = true

      this.$iamClient
        .confirmTerminalAuthorization(this.formData.verificationCode)
        .then(() => {
          this.loading.isShowing = false

          const route = this.$route
          const router = this.$router
          const redirectUri = route.query.redirect_uri
          if (redirectUri) {
            // TODO: redirect
          } else {
            const continueUrl = route.query.continue
            if (continueUrl) {
              if (continueUrl.startsWith('/')) {
                router.push(continueUrl)
              } else {
                // TODO: FIXME this should be replace, but there's an issue
                location.href = continueUrl
              }
            } else {
              location.href = '/'
            }
          }
        })
        .catch((err) => {
          this.loading.isShowing = false
          if (err.message === 'arg_expired') {
            this.snackbar.text = 'Expired'
            this.snackbar.color = 'error'
            // TODO: redirect to identifier page
          } else if (err.message === 'arg_error') {
            this.snackbar.text = 'Input error'
            this.snackbar.color = 'error'
          } else {
            this.snackbar.text = 'Server error'
            this.snackbar.color = 'warning'
          }
          this.snackbar.isShowing = true
        })
    }
  },
  head() {
    return {
      title: 'Sign In'
    }
  }
}
</script>
