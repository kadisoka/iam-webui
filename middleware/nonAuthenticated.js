import qs from 'querystring'

export default function({ store, route, redirect }) {
  if (store.state.iam.accessToken) {
    const qstr = qs.stringify(route.query)
    if (qstr === '') {
      redirect('/')
    } else {
      redirect('/?' + qstr)
    }
  }
}
