<template>
  <div class="layout-mono has-background-light">
    <div class="content">
      <div>
        <nuxt />
        <div class="simple-footer">Home</div>
      </div>
    </div>
  </div>
</template>

<style>
.layout-mono > div.content {
  text-align: center;
  display: flex;
  min-height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
}
.layout-mono .simple-footer {
  text-align: initial;
  padding: 1rem 0.75rem;
}
</style>
