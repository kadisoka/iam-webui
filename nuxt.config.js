export default {
  build: {
    optimizeCSS: true
  },
  buildModules: [],
  css: ['@/assets/main.scss'],
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
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
        href: '/citadel-iam-webui-base-path/favicon.ico'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/citadel-iam-webui-base-path/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/citadel-iam-webui-base-path/favicon-16x16.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/citadel-iam-webui-base-path/apple-touch-icon.png'
      },
      {
        rel: 'mask-icon',
        href: '/citadel-iam-webui-base-path/safari-pinned-tab.svg',
        color: '#5bbad5'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Manrope:wght@500;700&display=swap'
      }
    ]
  },
  mode: 'spa',
  modules: [
    ['nuxt-buefy', { css: false }],
    ['@nuxtjs/axios', {}],
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv'
  ],
  plugins: [
    { src: '~/plugins/vuex-persist', ssr: false },
    { src: '~/plugins/app-core', ssr: false },
    { src: '~/plugins/iam-client', ssr: false }
  ],
  router: {
    // Why some long path? We need this path to be pretty unique because
    // we would replace this string with anything we configure when serving
    // the produced files.
    base: '/citadel-iam-webui-base-path'
  },
  server: {
    port: 13000
  }
}
