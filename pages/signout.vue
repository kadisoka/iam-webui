<template>
  <div class="card">
    <div class="card-content">
      <p>Signing out...</p>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'mono',
  head() {
    return {
      title: 'Sign Out - ' + this.$appCore.appName
    }
  },
  mounted: function() {
    //TODO: revoke authorization / access token
    // note that we must not only revoke an instance of authorization,
    // we must revoke the terminal
    this.$store.commit('iam/terminateSession')
    location.href = '/'
  }
}
</script>
