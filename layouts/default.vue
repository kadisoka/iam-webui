<template>
  <div>
    <b-navbar
      class=" header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <template slot="brand">
        <b-navbar-item href="/">
          <img src="~assets/buefy.png" alt="Buefy" height="28" />
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-item to="/accounts/settings" tag="router-link"
          >Account</b-navbar-item
        >
        <b-navbar-item
          v-if="$store.state.iam.accessToken"
          to="/signout"
          tag="router-link"
          >Sign out</b-navbar-item
        >
        <b-navbar-item v-else to="/signin" tag="router-link"
          >Sign in</b-navbar-item
        >
      </template>
    </b-navbar>

    <section class="main-content">
      <nuxt />
    </section>
  </div>
</template>
