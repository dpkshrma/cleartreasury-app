import * as cdk from "@aws-cdk/core";
import { NextJSLambdaEdge } from "@sls-next/cdk-construct";
import * as ssm from "@aws-cdk/aws-ssm";

export class PaymentsPlatformWebAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const branch = this.node.tryGetContext("branch");

    const serverlessNext = new NextJSLambdaEdge(this, "NextJsApp", {
      serverlessBuildOutDir: "../.serverless_nextjs",
      withLogging: true,
    });

    new ssm.StringParameter(this, "DistributionIdSsm", {
      allowedPattern: ".*",
      parameterName: "/payments-platform-web-app/distributionId",
      stringValue: serverlessNext.distribution.distributionId,
      tier: ssm.ParameterTier.STANDARD,
    });

    new ssm.StringParameter(this, "DomainNameSsm", {
      allowedPattern: ".*",
      parameterName: "/payments-platform-web-app/domainName",
      stringValue: serverlessNext.distribution.domainName,
      tier: ssm.ParameterTier.STANDARD,
    });

    new cdk.CfnOutput(this, "DistributionId", {
      value: serverlessNext.distribution.distributionId,
    });

    new cdk.CfnOutput(this, "DomainName", {
      value: serverlessNext.distribution.domainName,
    });
  }
}
