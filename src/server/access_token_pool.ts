import { DynamoDB } from "aws-sdk";
import * as apis from "../apis";

export interface AccessTokenPool {
  get(sessionID: string): Promise<apis.authentication.gettoken.post.Response | undefined>;
  set(sessionID: string, accessToken: apis.authentication.gettoken.post.Response): Promise<void>;
  destroy(sessionID: string): Promise<void>;
}

class LocalAccessTokenPool implements AccessTokenPool {
  private pool: {
    [sessionID: string]: apis.authentication.gettoken.post.Response | undefined;
  } = {};

  public async get(sessionID: string) {
    return this.pool[sessionID];
  }
  public async set(sessionID: string, accessToken: apis.authentication.gettoken.post.Response) {
    this.pool[sessionID] = accessToken;
  }
  public async destroy(sessionID: string) {
    delete this.pool[sessionID];
  }
}

class DynamoAccessTokenPool implements AccessTokenPool {
  private tableName: string;
  private client: DynamoDB.DocumentClient;
  constructor(tableName: string) {
    this.tableName = tableName;
    this.client = new DynamoDB.DocumentClient({ region: "ap-northeast-1" });
  }
  public get(sessionID: string) {
    return new Promise<apis.authentication.gettoken.post.Response | undefined>((resolve, reject) => {
      this.client.get(
        {
          TableName: this.tableName,
          Key: { sessionID },
        },
        (err, data) => {
          if (err) return reject(err);
          if (!data.Item) return resolve(undefined);
          return resolve(JSON.parse(data.Item.accessToken));
        },
      );
    });
  }
  public set(sessionID: string, accessToken: apis.authentication.gettoken.post.Response) {
    return new Promise<void>((resolve, reject) => {
      this.client.put(
        {
          TableName: this.tableName,
          Item: {
            sessionID,
            accessToken: JSON.stringify(accessToken),
            ttl: Math.floor(new Date().getTime() / 1000),
          },
        },
        (err) => {
          if (err) return reject(err);
          return resolve(undefined);
        },
      );
    });
  }
  public destroy(sessionID: string) {
    return new Promise<void>((resolve, reject) => {
      this.client.delete(
        {
          TableName: this.tableName,
          Key: { sessionID },
        },
        (err) => {
          if (err) return reject(err);
          return resolve(undefined);
        },
      );
    });
  }
}

export const buildAccessTokenPool = (env: { dynamoTableName: string | undefined }) => {
  if (process.env.NODE_ENV === "production") {
    if (!env.dynamoTableName) throw new Error("NotFoundDynamoTableName");
    return new DynamoAccessTokenPool(env.dynamoTableName);
  }
  return new LocalAccessTokenPool();
};
