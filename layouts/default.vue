<template>
  <v-app class="default-layout">
    <v-app-bar :clipped-left="clipped" fixed flat app>
      <a href="/" class="app-logo"><v-toolbar-title v-text="title" /></a>
      <v-spacer />
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item to="/settings">
            <v-list-item-title>Account Settings</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="$iamClient.isLoggedIn()" to="/signout">
            <v-list-item-title>Sign out</v-list-item-title>
          </v-list-item>
          <v-list-item v-else to="/signin">
            <v-list-item-title>Sign in</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content fluid>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app absolute class="caption">
      <span>&copy; {{ $appCore.appName }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: this.$appCore.appName
    }
  },
  head() {
    return {
      title: 'Home'
    }
  }
}
</script>

<style lang="scss">
.default-layout .v-app-bar a {
  text-decoration: none;
}
</style>
