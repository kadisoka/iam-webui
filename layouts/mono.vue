<template>
  <div class="layout-mono has-background-light">
    <div class="content">
      <div>
        <p class="brand-logo">{{ $appCore.appName }}</p>
        <nuxt />
        <div class="simple-footer"><a href="/">Home</a></div>
      </div>
    </div>
  </div>
</template>

<style>
.layout-mono .brand-logo {
  font-weight: bolder;
  margin: 0;
  padding: 1rem 0.75rem;
  color: hsl(0, 0%, 48%);
}
.layout-mono .card {
  min-width: 440px;
}
.layout-mono .card > .card-content {
  padding: 2rem;
}
.layout-mono > div.content {
  text-align: center;
  display: flex;
  min-height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
}
.layout-mono .simple-footer {
  font-size: smaller;
  text-align: initial;
  padding: 1rem 0.75rem;
  color: hsl(0, 0%, 48%);
}
</style>
