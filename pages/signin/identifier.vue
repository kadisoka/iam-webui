<template>
  <div class="card" ref="cardRef">
    <div class="card-content">
      <h2>
        Sign in
      </h2>
      <form id="signin-identifier-form" @submit="onSubmit">
        <b-field label="Email or phone">
          <b-input
            id="signin-identifier-form-input-identifier"
            v-model="formData.emailAddress"
            placeholder="Email or phone"
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
        emailAddress: this.$iamClient.getAccountIdentifier()
      }
    }
  },
  mounted: function() {},
  methods: {
    async onSubmit(evt) {
      evt.preventDefault()

      const loadingOverlay = this.$buefy.loading.open({
        container: this.$refs.cardRef
      })

      await this.$iamClient
        .startTerminalAuthorization(this.formData.emailAddress, null)
        .then(() => {
          loadingOverlay.close()
          this.$router.push('/signin/otp?' + qs.stringify(this.$route.query))
        })
        .catch((err) => {
          loadingOverlay.close()
          if (err.code === 'arg_error') {
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
