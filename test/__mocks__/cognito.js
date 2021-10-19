module.exports = {
  cognitoAuthFlow: {
    ChallengeName: "PASSWORD_VERIFIER",
    ChallengeParameters: {
      SALT: "KtUod66Bf",
      SECRET_BLOCK: "71uCgBfwD",
      SRP_B: "ujD_NNRbW",
      USERNAME: "158jNELVw",
      USER_ID_FOR_SRP: "8F8bT1xX6",
    },
  },
  cognitoPasswordVerifier: {
    ChallengeName: "SMS_MFA",
    ChallengeParameters: {
      CODE_DELIVERY_DELIVERY_MEDIUM: "SMS",
      CODE_DELIVERY_DESTINATION: "+********0123",
    },
    Session: "",
  },
  cognitoUserInfo: {
    MFAOptions: [
      {
        AttributeName: "phone_number",
        DeliveryMedium: "SMS",
      },
    ],
    UserAttributes: [
      {
        Name: "sub",
        Value: "uuid",
      },
      {
        Name: "email_verified",
        Value: "True",
      },
      {
        Name: "phone_number_verified",
        Value: "true",
      },
      {
        Name: "phone_number",
        Value: "+4400000001234",
      },
      {
        Name: "email",
        Value: "test1@test.com",
      },
    ],
    Username: "uuid",
  },
  cognitoUser: {
    sub: "LA-EVW81B",
    email_verified: true,
    phone_number_verified: true,
    phone_number: "+4400000001234",
    email: "test1@test.com",
  },
  cognitoUserPassword: "4WC_y2lRQ",
  cognitoMfaPasscode: "123456",
  cognitoIdentity: {
    IdentityId: "eu-west-2:uuid",
  },
  cognitoIntiatePwdResetSuccess: {
    CodeDeliveryDetails: {
      AttributeName: "email",
      DeliveryMedium: "EMAIL",
      Destination: "t***@e***.com",
    },
  },
  cognitoIntiatePwdResetFailure: {
    __type: "UserNotFoundException",
    message: "Username/client id combination not found.",
  },
  cognitoSubmitPwdFailure: {
    __type: "ExpiredCodeException",
    message: "Invalid code provided, please request a code again.",
  },
};
