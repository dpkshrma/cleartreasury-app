import * as cdk from "@aws-cdk/core";
import { NextJSLambdaEdge } from "@sls-next/cdk-construct";
import * as ssm from "@aws-cdk/aws-ssm";
import * as route53 from "@aws-cdk/aws-route53";
import * as alias from "@aws-cdk/aws-route53-targets";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as certificatemanager from '@aws-cdk/aws-certificatemanager';
import { SSMParameterReader } from './ssm-parameter-reader';
import { RecordTarget } from "@aws-cdk/aws-route53";

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

export class PaymentsPlatformWebAppLinkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const branch = this.node.tryGetContext("branch");

    const clearTreasuryCoUkDomainName = `${branch === "main" ? "" : branch + ".nonprod"}.cleartreasury.co.uk`;

    const domainNameSsmReader = new SSMParameterReader(this, 'DomainNameSsmReader', {
      parameterName: '/payments-platform-web-app/domainName',
      region: 'us-east-1'
    });
    const domainName: string = domainNameSsmReader.getResponseField('Parameter.Value');

    const distributionIdSsmReader = new SSMParameterReader(this, 'DistributionIdSsmReader', {
      parameterName: '/payments-platform-web-app/domainName',
      region: 'us-east-1'
    });
    const distributionId: string = distributionIdSsmReader.getResponseField('Parameter.Value');

    const zone = route53.HostedZone.fromHostedZoneAttributes(this, "Zone", {
      hostedZoneId: cdk.Fn.importValue(`${branch}:dns:ClearTreasuryCoUk:hostedZoneId`),
      zoneName: cdk.Fn.importValue(`${branch}:dns:ClearTreasuryCoUk:zoneName`),
    })

    const cloudFront = cloudfront.Distribution.fromDistributionAttributes(this, "cloudFront", {
      distributionId: distributionId,
      domainName: domainName,
    });

    const dnsRecord = new route53.CnameRecord(this, "fxopsDns", {
      zone: zone,
      recordName: clearTreasuryCoUkDomainName,
      domainName: domainName,
    })
  }
}