import * as cdk from "@aws-cdk/core";
import { NextJSLambdaEdge } from "@sls-next/cdk-construct";
import * as ssm from "@aws-cdk/aws-ssm";
import * as route53 from "@aws-cdk/aws-route53";
import * as alias from "@aws-cdk/aws-route53-targets";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as certificatemanager from "@aws-cdk/aws-certificatemanager";
import { SSMParameterReader } from "./ssm-parameter-reader";

export class PaymentsPlatformWebAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const branch = this.node.tryGetContext("branch");
    const clearTreasuryCoUkDomainName = getDomainNameFromBranch(branch);

    const certificate = certificatemanager.Certificate.fromCertificateArn(
      this,
      "Certificate",
      cdk.Fn.importValue(`${branch}:certificate:ClearTreasuryCoUk:Arn`)
    );

    const serverlessNext = new NextJSLambdaEdge(this, "NextJsApp", {
      serverlessBuildOutDir: "../.serverless_nextjs",
      withLogging: true,
      domain: {
        certificate: certificate,
        domainNames: [clearTreasuryCoUkDomainName],
      },
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

export class PaymentsPlatformWebAppLinkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const branch = this.node.tryGetContext("branch");

    const domainName = getParameterValue(
      new SSMParameterReader(this, "DomainNameSsmReader", {
        parameterName: "/payments-platform-web-app/domainName",
        region: "us-east-1",
      })
    );

    const distributionId = getParameterValue(
      new SSMParameterReader(this, "DistributionIdSsmReader", {
        parameterName: "/payments-platform-web-app/distributionId",
        region: "us-east-1",
      })
    );

    const dns = `${branch}:dns:ClearTreasuryCoUk`;
    const zone = route53.HostedZone.fromHostedZoneAttributes(this, "Zone", {
      hostedZoneId: cdk.Fn.importValue(`${dns}:hostedZoneId`),
      zoneName: cdk.Fn.importValue(`${dns}:zoneName`),
    });

    const cloudFront = cloudfront.Distribution.fromDistributionAttributes(
      this,
      "cloudFront",
      { distributionId, domainName }
    );

    const aliasRecord = new route53.ARecord(this, "AliasRecord", {
      zone,
      target: route53.RecordTarget.fromAlias(
        new alias.CloudFrontTarget(cloudFront)
      ),
    });

    new cdk.CfnOutput(this, "DomainName", {
      value: aliasRecord.domainName,
    });
  }
}

function getDomainNameFromBranch(branch: string): string {
  const env = branch === "main" ? "" : "nonprod";
  const domain = "cleartreasury.co.uk";

  return [branch, env, domain].filter(Boolean).join(".");
}

function getParameterValue(fn: SSMParameterReader) {
  return fn.getResponseField("Parameter.Value");
}
