#!/usr/bin/env node
import "source-map-support/register";
import * as path from "path";
import * as cdk from "@aws-cdk/core";
import { Builder } from "@sls-next/lambda-at-edge";
import {
  PaymentsPlatformWebAppStack,
  PaymentsPlatformWebAppLinkStack,
} from "../lib/payments-platform-web-app-stack";

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

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

    const paymentsPlatformWebAppStack = new PaymentsPlatformWebAppStack(
      app,
      "PaymentsPlatformWebAppStack",
      {
        env: { ...env, region: "us-east-1" },
        stackName: app.node.tryGetContext("stack_name"),
        description: app.node.tryGetContext("stack_description"),
      }
    );

    new PaymentsPlatformWebAppLinkStack(
      app,
      "PaymentsPlatformWebAppLinkStack",
      {
        env,
        stackName: app.node.tryGetContext("stack_name"),
        description: app.node.tryGetContext("stack_description"),
        ssmDistributionId: paymentsPlatformWebAppStack.ssmDistributionId,
        ssmDomainName: paymentsPlatformWebAppStack.ssmDomainName,
      }
    );
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
