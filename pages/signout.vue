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
    //TODO: revoke authorization ID
    this.$store.commit('iam/terminateSession')
    this.$router.replace('/')
  }
}
</script>
