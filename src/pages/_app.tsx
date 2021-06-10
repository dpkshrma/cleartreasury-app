import "../../configureAmplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

import "../styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AmplifySignOut />
      <Component {...pageProps} />
    </>
  );
}

export default withAuthenticator(MyApp, { usernameAlias: "email" });
