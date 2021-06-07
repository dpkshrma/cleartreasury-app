import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle,
} from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import * as PaymentsPatformWebApp from "../lib/payments-patform-web-app-stack";

test("Empty Stack", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new PaymentsPatformWebApp.PaymentsPatformWebAppStack(
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
