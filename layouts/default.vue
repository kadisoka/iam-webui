<template>
  <div>
    <b-navbar
      class="header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <template slot="brand">
        <b-navbar-item href="/">{{ $appCore.appName }}</b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-item to="/settings/account" tag="router-link"
          >Account</b-navbar-item
        >
        <b-navbar-item
          v-if="$iamClient.isLoggedIn()"
          to="/signout"
          tag="router-link"
          >Sign out</b-navbar-item
        >
        <b-navbar-item v-else to="/signin" tag="router-link"
          >Sign in</b-navbar-item
        >
      </template>
    </b-navbar>

    <main class="content columns" role="main">
      <div class="container column is-10">
        <nuxt />
      </div>
    </main>
  </div>
</template>

<style>
main.content {
  padding: 3rem 1.5rem;
}
.navbar-brand {
  font-weight: bolder;
}
</style>
