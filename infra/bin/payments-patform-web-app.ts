#!/usr/bin/env node
import "source-map-support/register";
import * as path from "path";
import * as cdk from "@aws-cdk/core";
import { PaymentsPatformWebAppStack } from "../lib/payments-patform-web-app-stack";
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
    new PaymentsPatformWebAppStack(app, "PaymentsPatformWebAppStack", {
      env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: "us-east-1",
      },
      stackName: app.node.tryGetContext("stack_name"),
      description: app.node.tryGetContext("stack_description"),
    });
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
