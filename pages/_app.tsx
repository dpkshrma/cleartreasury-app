import "../configureAmplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AmplifySignOut />
      <Component {...pageProps} />
    </>
  );
}

export default withAuthenticator(MyApp, { usernameAlias: "email" });
