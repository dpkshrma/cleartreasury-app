import * as cdk from "@aws-cdk/core";
import * as ssm from "@aws-cdk/aws-ssm";
import * as route53 from "@aws-cdk/aws-route53";
import * as alias from "@aws-cdk/aws-route53-targets";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import { SSMParameterReader } from "./ssm-parameter-reader";

interface PaymentsPlatformWebAppLinkStackProps extends cdk.StackProps {
  ssmDistributionId: ssm.IParameter;
  ssmDomainName: ssm.IParameter;
}

export class PaymentsPlatformWebAppLinkStack extends cdk.Stack {
  constructor(
    scope: cdk.Construct,
    id: string,
    props: PaymentsPlatformWebAppLinkStackProps
  ) {
    super(scope, id, props);

    const branch = this.node.tryGetContext("branch");

    const domainName = getParameterValue(
      new SSMParameterReader(this, "DomainNameSsmReader", {
        parameterName: props.ssmDomainName.parameterName,
        region: "us-east-1",
      })
    );

    const distributionId = getParameterValue(
      new SSMParameterReader(this, "DistributionIdSsmReader", {
        parameterName: props.ssmDistributionId.parameterName,
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

function getParameterValue(fn: SSMParameterReader) {
  return fn.getResponseField("Parameter.Value");
}