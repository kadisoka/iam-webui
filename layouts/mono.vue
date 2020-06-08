<template>
  <v-app class="mono-layout">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col style="max-width: 480px">
            <header>
              <span class="app-logo"
                ><a href="/">{{ $appCore.appName }}</a></span
              >
            </header>
            <nuxt />
            <v-footer class="caption" color="transparent" padless>
              <v-col class="text-center"> &copy; {{ $appCore.appName }} </v-col>
            </v-footer>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<style lang="scss">
$mono-layout__card__padding: 24px;

.mono-layout {
  .v-card__title {
    padding: $mono-layout__card__padding $mono-layout__card__padding 0;

    > h1 {
      font-size: 1.8rem;
      line-height: 2.4rem;
    }
  }
  .v-card__text {
    padding: $mono-layout__card__padding;
  }
  .v-card__actions {
    padding: 0 $mono-layout__card__padding $mono-layout__card__padding;
  }
  header {
    text-align: center;
    padding: 16px 12px;

    a {
      text-decoration: none;
    }
  }
}
</style>
