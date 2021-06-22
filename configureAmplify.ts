import Amplify from "aws-amplify";

export const config = {
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    // identityPoolId: "eu-west-2:63f56377-1b3d-4778-ab9c-4f6eb655b8f3",

    // REQUIRED - Amazon Cognito Region
    region: "eu-west-2",

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "eu-west-2_3z2bX5wbu",

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "3tj693du068qaucri8quhlq7hp",

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true,
  },
};

const CDKConfig = {
  // aws_appsync_authenticationType: CdkBackendStack.awsappsyncauthenticationType,
  // aws_appsync_apiKey: CdkBackendStack.awsappsyncapiKey,
};

Amplify.configure({ ...config, ...CDKConfig, ssr: true });
