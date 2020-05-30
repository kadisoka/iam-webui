<template>
  <div>
    <h1>{{ $appCore.appName }}</h1>
  </div>
</template>

<script>
export default {
  head() {
    console.log(process.env)
    return {
      title: this.$appCore.appName + ' Home'
    }
  }
}
</script>
