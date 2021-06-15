import { Construct } from "@aws-cdk/core";
import { AwsCustomResource, AwsSdkCall } from "@aws-cdk/custom-resources";
import * as iam from "@aws-cdk/aws-iam";

interface SSMParameterReaderProps {
  parameterName: string;
  region: string;
}

export class SSMParameterReader extends AwsCustomResource {
  constructor(scope: Construct, name: string, props: SSMParameterReaderProps) {
    const { parameterName, region } = props;

    const ssmAwsSdkCall: AwsSdkCall = {
      service: "SSM",
      action: "getParameter",
      parameters: {
        Name: parameterName,
      },
      region,
      physicalResourceId: { id: Date.now().toString() }, // Update physical id to always fetch the latest version
    };

    super(scope, name, {
      onUpdate: ssmAwsSdkCall,
      policy: {
        statements: [
          new iam.PolicyStatement({
            resources: ["*"],
            actions: ["ssm:GetParameter"],
            effect: iam.Effect.ALLOW,
          }),
        ],
      },
    });
  }
}
