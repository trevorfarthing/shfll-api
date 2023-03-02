export const userPool = {
  Type: 'AWS::Cognito::UserPool',
  Properties: {
    UserPoolName: 'shfll-users',
    UsernameAttributes: ['phone_number', 'email'],
  },
};

export const userPoolClient = {
  Type: 'AWS::Cognito::UserPoolClient',
  Properties: {
    UserPoolId: 'shfll-users',
    ClientName: 'shfll-user-pool-client',
  },
};
