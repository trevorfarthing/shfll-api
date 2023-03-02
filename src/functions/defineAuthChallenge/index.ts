import { handlerPath } from '@libs/handler-resolver';
import { userPool } from 'src/resources/cognito';

export default {
  handler: `${handlerPath(__dirname)}/handler.handler`,
  events: [
    {
      cognitoUserPool: {
        pool: userPool.Properties.UserPoolName,
        trigger: 'DefineAuthChallenge_Authentication',
        existing: true,
      },
    },
  ],
};
