import qs from "querystring";

export default function({ store, route, redirect }) {
  if (store.state.iam.accessToken) {
    const router = $nuxt._router;
    const redirectUri = route.query["redirect_uri"];
    if (redirectUri) {
      //TODO: redirect
    } else {
      const continueUrl = route.query["continue"];
      if (continueUrl) {
        if (continueUrl.startsWith("/")) {
          redirect(continueUrl);
        } else {
          //TODO: FIXME this should be replace, but there's an privacy / security issue
          location.href = continueUrl;
        }
      } else {
        location.href = "/";
      }
    }
  }
}
