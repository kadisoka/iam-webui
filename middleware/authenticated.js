import qs from 'querystring'

export default function({ store, route, redirect }) {
  console.log(store.state.iam)
  if (!store.state.iam.accessToken) {
    var queryStr = ''
    if (route.query.client_id) {
      //TODO: redirect to oauth page and let it decide how to continue.
      queryStr = qs.stringify(route.query)
    } else {
      queryStr = qs.stringify({
        continue: route.path
      })
    }
    redirect('/signin?' + queryStr)
  }
}
