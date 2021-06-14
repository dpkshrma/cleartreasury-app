import * as cdk from "@aws-cdk/core";
import { NextJSLambdaEdge } from "@sls-next/cdk-construct";
import * as ssm from "@aws-cdk/aws-ssm";
import * as certificatemanager from '@aws-cdk/aws-certificatemanager';

export class PaymentsPlatformWebAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const branch = this.node.tryGetContext("branch");

    const clearTreasuryCoUkDomainName = `${branch === "main" ? "" : branch + ".nonprod"}.cleartreasury.co.uk`;
    const certificate  = certificatemanager.Certificate.fromCertificateArn(this, "Certificate", cdk.Fn.importValue(`${branch}:certificate:ClearTreasuryCoUk:Arn`));

    const serverlessNext = new NextJSLambdaEdge(this, "NextJsApp", {
      serverlessBuildOutDir: "../.serverless_nextjs",
      withLogging: true,
      domain: {
        certificate: certificate,
        domainNames: [clearTreasuryCoUkDomainName],
      }
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
      value: `https://${serverlessNext.distribution.domainName}`,
    });
  }
}
