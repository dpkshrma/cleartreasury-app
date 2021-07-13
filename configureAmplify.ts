import Amplify from "aws-amplify";

export const config = {
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: "eu-west-2:b0a14ae1-2acb-44ac-aff3-58c5d39a754b",

    // REQUIRED - Amazon Cognito Region
    region: "eu-west-2",

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "eu-west-2_rHk5NAsLV",

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "bj5s84nf5pj6478l95mftea4t",

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true,
  },
  API: {
    graphql_endpoint: "https://backend.dev.com/",
  },
};

// TODO: Generate the config from CDK stack output
// const CDKConfig = {
//   aws_appsync_authenticationType: CdkBackendStack.awsappsyncauthenticationType,
//   aws_appsync_apiKey: CdkBackendStack.awsappsyncapiKey,
// };

Amplify.configure({ ...config, ssr: true });
