<template>
  <div class="card">
    <div class="card-content">
      <p>Redirecting...</p>
    </div>
  </div>
</template>

<script>
import qs from 'querystring'

export default {
  layout: 'mono',
  head() {
    return {
      title: this.$appCore.appName + ' Home'
    }
  },
  mounted: function() {
    const router = this.$router
    const route = this.$route
    if (this.$iamClient.isLoggedIn()) {
      const redirectUri = route.query['redirect_uri']
      if (redirectUri) {
        //TODO: redirect
      } else {
        const continueUrl = route.query['continue']
        if (continueUrl) {
          if (continueUrl.startsWith('/')) {
            router.redirect(continueUrl)
          } else {
            //TODO: FIXME this should be replace, but there's an privacy / security issue
            location.href = continueUrl
          }
        } else {
          //TODO: configurable: certain URL or default to IAM dashboard
          //location.href = '/'
          router.replace('/settings/account')
        }
      }
    } else {
      router.replace('/signin?' + qs.stringify(route.query))
    }
  }
}
</script>
