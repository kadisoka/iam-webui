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
        ><h1>Sign in</h1></v-card-title
      >
      <v-card-text>
        <v-form id="signin-identifier-form" @submit="handleSubmit">
          <v-text-field
            v-model="formData.accountIdentifier"
            outlined
            autofocus
            label="Email or phone"
            name="identifier"
            type="text"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions
        ><v-spacer /><v-btn
          color="primary"
          type="submit"
          form="signin-identifier-form"
          onclick="!this.form && document.getElementById('signin-identifier-form').submit()"
          >Next</v-btn
        ></v-card-actions
      >
    </v-card>
  </div>
</template>

<script>
import qs from 'querystring'

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
        accountIdentifier: this.$iamClient.getAccountIdentifier()
      }
    }
  },
  mounted() {
    if (!this.$iamClient.isWaitingTerminalAuthorizationConfirmation()) {
      this.$router.replace(
        '/signin/identifier?' + qs.stringify(this.$route.query)
      )
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
        .startTerminalAuthorization(this.formData.accountIdentifier, null)
        .then(() => {
          this.loading.isShowing = false
          this.$router.push('/signin/otp?' + qs.stringify(this.$route.query))
        })
        .catch((err) => {
          this.loading.isShowing = false
          if (err.message === 'arg_error') {
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
