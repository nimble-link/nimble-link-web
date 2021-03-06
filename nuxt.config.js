export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: ['~assets/css/font.css'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [{ src: '@/plugins/vClickOutside', ssr: false }],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/composition-api',
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    'nuxt-clipboard2',
    '@nuxtjs/svg',
  ],

  auth: {
    strategies: {
      google: {
        scheme: 'oauth2',
        clientId: process.env.GOOGLE_CLIENT_ID,
        endpoints: {
          authorization: 'https://accounts.google.com/o/oauth2/auth',
          token: `${process.env.AUTHENTICATION_BASE_URL}/storeauthcode`,
          userInfo: `${process.env.AUTHENTICATION_BASE_URL}/userinfo`,
          customLogout: {
            url: `${process.env.AUTHENTICATION_BASE_URL}/logout`,
            method: 'post',
          },
        },
        scope: ['openid', 'profile', 'email'],
        responseType: 'code',
        codeChallengeMethod: 'S256',
      },
    },
  },

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: `${process.env.API_BASE_URL}/api/v1`,
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    postcss: {
      // Add plugin names as key and arguments as value
      // Install them before as dependencies with npm or yarn
      plugins: {
        'postcss-import': {},
        'postcss-url': {},
        'postcss-nested': {},
        'postcss-preset-env': this.preset,
        cssnano: { preset: 'default' }, // disabled in dev mode
      },
      order: 'presetEnvAndCssnanoLast',
      preset: {
        // Change the postcss-preset-env settings
        autoprefixer: {
          autoplace: true,
        },
        stage: 2,
      },
    },
  },
  publicRuntimeConfig: {
    shortLinkDomain: process.env.BASE_SHORTEN_URL || 'https://namtx.dev',
  },
}
