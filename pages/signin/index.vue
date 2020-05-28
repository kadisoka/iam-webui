<template>
  <div class="container">
    <p>Redirecting...</p>
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
  mounted: function() {
    this.$router.replace(
      '/signin/identifier?' + qs.stringify(this.$route.query)
    )
  }
}
</script>
