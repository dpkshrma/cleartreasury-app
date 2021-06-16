import { config } from "../../../configureAmplify";
import { NextApiRequest, NextApiResponse } from "next";
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const params = {
    UserPoolId: config.Auth.userPoolId,
    ClientId: config.Auth.userPoolWebClientId,
    Username: req.body.email,
    ForceAliasCreation: false,
    DesiredDeliveryMediums: ["EMAIL"],
    // SecretHash: hashSecret(clientSecret, email, clientId),
    UserAttributes: [
      {
        Name: "email",
        Value: req.body.email,
      },
    ],
  };

  const provider = new CognitoIdentityProvider({ region: config.Auth.region });

  try {
    const user = await provider.adminCreateUser(params);
    // eslint-disable-next-line no-console
    console.log("Signup success. Result: ", res);
    res.status(200).json(user);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("Signup fail. Error: ", e);
    res.status(500).json({ error: e.message });
  }
};

export default handler;
