<template>
  <v-card outlined>
    <v-card-text>Redirecting... </v-card-text>
  </v-card>
</template>

<script>
import qs from 'querystring'

export default {
  layout: 'mono',
  middleware: 'nonAuthenticated',
  mounted() {
    this.$router.replace(
      '/signin/identifier?' + qs.stringify(this.$route.query)
    )
  },
  head() {
    return {
      title: 'Sign In'
    }
  }
}
</script>
