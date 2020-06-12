import colors from 'vuetify/es5/util/colors'

// Why some long path? We need this path to be pretty unique because
// we would replace this string with anything we configure when serving
// the produced files.
const routeBasePath = '/kadisoka-iam-webui-base-path'

export default {
  build: {
    optimizeCSS: true
  },
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/vuetify'],
  css: ['~/assets/app.scss'],
  head: {
    titleTemplate: '%s – {:[ .AppName ]:}',
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: routeBasePath + '/favicon.ico'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: routeBasePath + '/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: routeBasePath + '/favicon-16x16.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: routeBasePath + '/apple-touch-icon.png'
      },
      {
        rel: 'mask-icon',
        href: routeBasePath + '/safari-pinned-tab.svg',
        color: '#5bbad5'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,700;1,400;1,700&display=swap'
      }
    ]
  },
  mode: 'spa',
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', '@nuxtjs/dotenv'],
  plugins: [
    { src: '~/plugins/vuex-persist', ssr: false },
    { src: '~/plugins/app-core', ssr: false },
    { src: '~/plugins/iam-client', ssr: false }
  ],
  router: {
    base: routeBasePath
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    options: {
      customProperties: true
    },
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  }
}
