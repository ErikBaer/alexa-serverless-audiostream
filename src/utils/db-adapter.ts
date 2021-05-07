import * as AWS from 'aws-sdk';
import { DynamoDbPersistenceAdapter } from 'ask-sdk-dynamodb-persistence-adapter';
import { PersistenceAdapter } from 'ask-sdk-core';

const pickDBParams = () => (process.env.NODE_ENV === 'test'
  ? { region: 'localhost', endpoint: 'http://localhost:8000' }
  : {});

export const getDynamoDbPersistenceAdapter = (): PersistenceAdapter => new DynamoDbPersistenceAdapter({
  tableName: 'usersTable',
  dynamoDBClient: new AWS.DynamoDB(pickDBParams()),
});
