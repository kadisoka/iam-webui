export default ({ $config }, inject) => {
  const appCore = {
    appName: $config.app.appName
  }

  inject('appCore', appCore)
}
