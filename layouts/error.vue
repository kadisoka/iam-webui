<template>
  <v-card outlined>
    <v-card-title class="headline">
      <span v-if="error.statusCode === 404">{{ pageNotFound }}</span>
      <span v-else>{{ otherError }}</span>
    </v-card-title>
    <v-card-text>
      <a href="/">Home page</a>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  layout: 'mono',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>
