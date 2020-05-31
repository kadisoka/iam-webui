<template>
  <div>
    <h1>Account Settings</h1>
    <section>
      <form id="settings-account-email-address-form" @submit="onSubmit">
        <b-field label="Primary email address">
          <b-input
            id="settings-account-email-address-form-input-email-address"
            v-model="userInfo.email"
            placeholder="user@example.com"
          ></b-input>
        </b-field>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  head() {
    return {
      title: 'Account Settings - ' + this.$appCore.appName
    }
  },
  data: () => {
    return {
      userInfo: $nuxt.$store.state.iam.userInfo
    }
  },
  mounted() {}
}
</script>
