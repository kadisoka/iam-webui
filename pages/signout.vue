<template>
  <v-card outlined>
    <v-card-text>Signing out... </v-card-text>
  </v-card>
</template>

<script>
export default {
  layout: 'mono',
  mounted() {
    // TODO: revoke authorization / access token
    // note that we must not only revoke an instance of authorization,
    // we must revoke the terminal
    this.$store.commit('iam/terminateSession')
    location.href = '/'
  },
  head() {
    return {
      title: 'Sign Out'
    }
  }
}
</script>
