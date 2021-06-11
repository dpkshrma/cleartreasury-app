import * as cdk from "@aws-cdk/core";
import { NextJSLambdaEdge } from "@sls-next/cdk-construct";

export class PaymentsPatformWebAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const branch = this.node.tryGetContext("branch");

    const serverlessNext = new NextJSLambdaEdge(this, "NextJsApp", {
      serverlessBuildOutDir: "../.serverless_nextjs",
      withLogging: true,
    });

    new cdk.CfnOutput(this, "DistributionId", {
      value: serverlessNext.distribution.distributionId,
    });

    new cdk.CfnOutput(this, "DomainName", {
      value: serverlessNext.distribution.domainName,
    });
  }
}
