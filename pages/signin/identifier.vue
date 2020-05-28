<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">TODO: LOGO</p>
    </div>
    <div class="card-content">
      <h2>
        Sign in
      </h2>
      <div>
        <b-field label="Email or phone">
          <b-input value="user@example.com"></b-input>
        </b-field>
        <div class="buttons is-right">
          <button class="button is-primary">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'mono'
}
</script>

<style>
.card {
  min-width: 360px;
}
</style>
