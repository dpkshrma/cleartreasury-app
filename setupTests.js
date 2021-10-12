// optional: configure or set up a testing framework before each test
// if you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// used for __tests__/testing-library.js
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

// Configure Amplify to use API key for tests
// All requests in test should be mocked but doing this avoids needing
// to fake a cognito user. Otherwise Amplify throws errors.
import Amplify from "aws-amplify";
import { config } from "./configureAmplify";

Amplify.configure({
  API: {
    ...config.API,
    aws_appsync_authenticationType: "API_KEY",
    aws_appsync_apiKey: "fake api key because requests are mocked with msw",
  },
});
