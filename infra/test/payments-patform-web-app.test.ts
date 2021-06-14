import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle,
} from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import * as PaymentsPlatformWebApp from "../lib/payments-platform-web-app-stack";

test("Empty Stack", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new PaymentsPlatformWebApp.PaymentsPlatformWebAppStack(
    app,
    "MyTestStack"
  );
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {},
      },
      MatchStyle.EXACT
    )
  );
});
