<template>
  <div class="container">
    <p>Logging out...</p>
  </div>
</template>

<script>
export default {
  layout: 'nodeco',
  head() {
    return {
      title: 'Sign Out - ' + this.$appCore.appName
    }
  },
  mounted: function() {
    this.$store.commit('iam/terminateSession')
    this.$router.replace('/')
  }
}
</script>
