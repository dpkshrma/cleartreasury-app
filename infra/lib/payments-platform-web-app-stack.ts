import * as cdk from "@aws-cdk/core";
import * as iam from "@aws-cdk/aws-iam";
import * as ssm from "@aws-cdk/aws-ssm";
import * as certificatemanager from "@aws-cdk/aws-certificatemanager";
import * as route53 from "@aws-cdk/aws-route53";
import { NextJSLambdaEdge } from "@sls-next/cdk-construct";

export class PaymentsPlatformWebAppStack extends cdk.Stack {
  public readonly ssmDistributionId: ssm.IParameter;
  public readonly ssmDomainName: ssm.IParameter;
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const appName = "PaymentsPlatformWebApp";
    const branch = this.node.tryGetContext("branch");
    const clearTreasuryCoUkDomainName = getDomainNameFromBranch(branch);
    const appDomainName = `new-payments.${clearTreasuryCoUkDomainName}`;

    const certificate = certificatemanager.Certificate.fromCertificateArn(
      this,
      "Certificate",
      cdk.Fn.importValue(`${branch}:certificate:ClearTreasuryCoUk:WildCard:Arn`)
    );

    // serverless nextjs won't set up a domain name on cloudfront without *also* setting
    // up a dns record, but we want to decouple this dns record from this app, hence this
    // dummy zone.
    const dummyZone = new route53.HostedZone(
      this,
      "dummyServerlessNextJsZone",
      {
        zoneName: appDomainName,
        comment:
          "this is a dummy zone for https://github.com/clear-treasury/payments-platform-web-app",
      }
    );

    const serverlessNext = new NextJSLambdaEdge(this, appName, {
      serverlessBuildOutDir: "../.serverless_nextjs",
      withLogging: true,
      domain: {
        certificate: certificate,
        domainNames: [appDomainName],
        hostedZone: dummyZone,
      },
    });

    serverlessNext.edgeLambdaRole.addManagedPolicy(
      // TODO: Reduce this to least privilege for going to prod
      iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonCognitoPowerUser")
    );

    this.ssmDistributionId = new ssm.StringParameter(
      this,
      "DistributionIdSsm",
      {
        allowedPattern: ".*",
        parameterName: "/payments-platform-web-app/distributionId",
        stringValue: serverlessNext.distribution.distributionId,
        tier: ssm.ParameterTier.STANDARD,
      }
    );

    this.ssmDomainName = new ssm.StringParameter(this, "DomainNameSsm", {
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

    new cdk.CfnOutput(this, "CloudfrontHostname", {
      value: `https://${serverlessNext.distribution.distributionDomainName}`,
      exportName: `${branch}:paymentsPlatformWebApp:CloudfrontHostname`,
    });
  }
}

function getDomainNameFromBranch(branch: string): string {
  const env = branch === "main" ? "" : "nonprod";
  const domain = "cleartreasury.co.uk";

  return [branch, env, domain].filter(Boolean).join(".");
}
