import Amplify from "aws-amplify";

export const config = {
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: "eu-west-2:35055f54-cc32-4f20-9c61-7df201ae0f58",

    // REQUIRED - Amazon Cognito Region
    region: "eu-west-2",

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "eu-west-2_QUpunH3eQ",

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "3628dkijg32ktv9qj9qp9gfkqp",

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true,
  },
};

const CDKConfig = {
  // aws_appsync_authenticationType: CdkBackendStack.awsappsyncauthenticationType,
  // aws_appsync_apiKey: CdkBackendStack.awsappsyncapiKey,
};

Amplify.configure({ ...config, ...CDKConfig, ssr: true });
