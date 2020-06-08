import qs from 'querystring'

export default function({ app, route, redirect }) {
  if (!app.$iamClient.isLoggedIn()) {
    let queryStr = ''
    if (route.query.client_id) {
      // TODO: redirect to IAM root and let it decide how to continue.
      queryStr = qs.stringify(route.query)
    } else {
      queryStr = qs.stringify({
        continue: route.path
      })
    }
    redirect('/signin?' + queryStr)
  }
}
