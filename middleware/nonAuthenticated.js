import qs from 'querystring'

export default function ({ app, route, redirect }) {
  if (app.$iamClient.isLoggedIn()) {
    const qstr = qs.stringify(route.query)
    if (qstr === '') {
      redirect('/')
    } else {
      redirect('/?' + qstr)
    }
  }
}
