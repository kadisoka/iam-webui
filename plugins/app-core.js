export default ({ app }, inject) => {
  const appCore = {
    // The delimiters might look unusual. We need the delimiters to be
    // unique so the template processor won't get misidentify.
    appName: '{:[ .AppName ]:}'
  }

  inject('appCore', appCore)
}
