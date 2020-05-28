<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="~assets/buefy.png" alt="Buefy" height="28" />
        </a>

        <div class="navbar-burger">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <b-navbar-item
            v-if="$store.state.iam.accessToken"
            to="/signout"
            tag="router-link"
            >Sign out</b-navbar-item
          >
          <b-navbar-item v-else to="/signin" tag="router-link"
            >Sign in</b-navbar-item
          >
        </div>
      </div>
    </nav>

    <section class="main-content">
      <nuxt />
    </section>
  </div>
</template>
