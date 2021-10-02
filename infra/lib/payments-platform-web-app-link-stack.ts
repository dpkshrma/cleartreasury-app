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
      new SSMParameterReader(this, "NewDomainNameSsmReader", {
        parameterName: props.ssmDomainName.parameterName,
        region: "us-east-1",
      })
    );

    const distributionId = getParameterValue(
      new SSMParameterReader(this, "NewDistributionIdSsmReader", {
        parameterName: props.ssmDistributionId.parameterName,
        region: "us-east-1",
      })
    );

    new cdk.CfnOutput(this, "DomainName", {
      value: domainName,
      exportName: `${branch}:PaymentsPlatformWebApp:CF:DomainName`,
    });

    new cdk.CfnOutput(this, "DistributionId", {
      value: distributionId,
      exportName: `${branch}:PaymentsPlatformWebApp:CF:DistributionId`,
    });
  }
}

function getParameterValue(fn: SSMParameterReader) {
  return fn.getResponseField("Parameter.Value");
}
