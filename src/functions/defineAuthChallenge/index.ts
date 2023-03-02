import { handlerPath } from '@libs/handler-resolver';
import { userPool } from 'src/resources/cognito';

// Hack to get Typescript to stop complaining in serverless.ts. Generalize this interface later.
interface CognitoFunction {
  handler: string;
  events: [
    { cognitoUserPool: { pool: string; trigger: 'DefineAuthChallenge'; existing: boolean } }
  ];
}
const lambdaDefinition: CognitoFunction = {
  handler: `${handlerPath(__dirname)}/handler.handler`,
  events: [
    {
      cognitoUserPool: {
        pool: userPool.Properties.UserPoolName,
        trigger: 'DefineAuthChallenge',
        existing: true,
      },
    },
  ],
};

export default lambdaDefinition;
