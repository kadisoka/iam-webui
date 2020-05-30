<template>
  <div>
    <div class="card">
      <div class="card-content">
        <h2>
          Sign in
        </h2>
        <form id="signin-identifier-form" @submit="onSubmit">
          <b-field label="Email or phone">
            <b-input
              id="signin-identifier-form-input-identifier"
              v-model="formData.emailAddress"
              placeholder="user@example.com"
            ></b-input>
          </b-field>
          <div class="buttons is-right">
            <button class="button is-primary" type="submit">Next</button>
          </div>
        </form>
      </div>
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
        emailAddress: ''
      },
      show: true
    }
  },
  mounted: function() {},
  methods: {
    async onSubmit(evt) {
      evt.preventDefault()
      await this.$axios
        .$post(
          this.$appCore.iamClient.restBaseUrl + '/terminals/register',
          {
            verification_methods: ['none'],
            verification_resource_type: 'email-address',
            verification_resource_name: this.formData.emailAddress
          },
          {
            auth: {
              username: this.$appCore.iamClient.clientId,
              password: this.$appCore.iamClient.clientSecret
            }
          }
        )
        .then(
          (resp) => {
            this.$store.commit(
              'iam/startTerminalRegistration',
              resp.terminal_id
            )
            this.$router.push(
              '/signin/otpinput?' + qs.stringify(this.$route.query)
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
