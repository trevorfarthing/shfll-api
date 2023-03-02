import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import defineAuthChallenge from '@functions/defineAuthChallenge';
import { userPool, userPoolClient } from 'src/resources/cognito';

const serverlessConfiguration: AWS = {
  service: 'shfll-api',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-west-2',
    deploymentMethod: 'direct',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      USER_POOL_ID: { Ref: 'UserPool' },
      CLIENT_ID: { Ref: 'UserPoolClient' },
    },
    // Move these to per-function basis
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'cognito-idp:AdminInitiateAuth',
          'cognito-idp:AdminCreateUser',
          'cognito-idp:AdminSetUserPassword',
        ],
        Resource: '*',
      },
    ],
  },
  functions: { hello, defineAuthChallenge },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      UserPool: userPool,
      UserPoolClient: userPoolClient,
    },
  },
};

module.exports = serverlessConfiguration;
