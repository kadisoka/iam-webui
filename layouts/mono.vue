<template>
  <div class="layout-mono has-background-light">
    <div class="content">
      <div>
        <nuxt />
        <div>Home</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: { name: 'inspire' }
        }
      ]
    }
  }
}
</script>

<style>
.layout-mono > div.content {
  text-align: center;
  display: flex;
  min-height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
}
</style>
