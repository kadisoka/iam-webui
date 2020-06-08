<template>
  <v-card outlined>
    <v-card-text>Redirecting... </v-card-text>
  </v-card>
</template>

<script>
import qs from 'querystring'

export default {
  layout: 'mono',
  mounted() {
    const router = this.$router
    const route = this.$route
    if (this.$iamClient.isLoggedIn()) {
      const redirectUri = route.query.redirect_uri
      if (redirectUri) {
        // TODO: redirect
      } else {
        const continueUrl = route.query.continue
        if (continueUrl) {
          if (continueUrl.startsWith('/')) {
            router.redirect(continueUrl)
          } else {
            // TODO: FIXME this should be replace, but there's an privacy / security issue
            location.href = continueUrl
          }
        } else {
          // TODO: configurable: certain URL or default to IAM dashboard
          // location.href = '/'
          router.replace('/settings')
        }
      }
    } else {
      router.replace('/signin?' + qs.stringify(route.query))
    }
  },
  head() {
    return {
      title: 'Home'
    }
  }
}
</script>
