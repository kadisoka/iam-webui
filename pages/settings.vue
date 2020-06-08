<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="10" md="8">
      <v-card outlined>
        <v-card-title class="headline">
          Account Settings
        </v-card-title>
        <v-card-text>
          <v-list two-line subheader>
            <v-subheader>General</v-subheader>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Primary email address</v-list-item-title>
                <v-list-item-subtitle
                  ><span v-if="userInfo.email"
                    >{{ userInfo.email }} <v-icon>mdi-verified</v-icon></span
                  ><span v-else><em>Unset</em> </span></v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Primary phone number</v-list-item-title>
                <v-list-item-subtitle
                  ><span v-if="userInfo.phone_number"
                    >{{ userInfo.phone_number }}
                    <v-icon>mdi-verified</v-icon></span
                  ><span v-else><em>Unset</em> </span></v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: 'authenticated',
  data() {
    return {
      userInfo: this.$store.state.iam.userInfo
    }
  },
  head() {
    return {
      title: 'Account Settings'
    }
  }
}
</script>
