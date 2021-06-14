#!/usr/bin/env node
import "source-map-support/register";
import * as path from "path";
import * as cdk from "@aws-cdk/core";
import { PaymentsPlatformWebAppStack } from "../lib/payments-platform-web-app-stack";
import { PaymentsPlatformWebAppLinkStack } from "../lib/payments-platform-web-app-stack";
import { Builder } from "@sls-next/lambda-at-edge";

const nextConfigPath = path.resolve("..");
const outputDir = path.join(nextConfigPath, ".serverless_nextjs");

const builder = new Builder(nextConfigPath, outputDir, {
  args: ["build"],
  cwd: nextConfigPath,
});

builder
  .build()
  .then(() => {
    const app = new cdk.App();
    const cfStack = new PaymentsPlatformWebAppStack(app, "PaymentsPlatformWebAppStack", {
      env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: "us-east-1",
      },
      stackName: app.node.tryGetContext("stack_name"),
      description: app.node.tryGetContext("stack_description"),
    });
    new PaymentsPlatformWebAppLinkStack(app, 'PaymentsPlatformWebAppLinkStack', {
      env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
      },
      stackName: app.node.tryGetContext('stack_name'),
      description: app.node.tryGetContext('stack_description'),
    });
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
