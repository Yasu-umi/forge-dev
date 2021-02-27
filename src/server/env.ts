import { SSM } from "aws-sdk";

const ssm = new SSM();

const getSSSMParameter = async (name: string) => {
  const { Parameter } = await ssm
    .getParameter({
      Name: name,
      WithDecryption: true,
    })
    .promise();
  return Parameter?.Value;
};

const getClientID = async () => {
  if (process.env.NODE_ENV === "production") {
    if (!process.env["CLIENT_ID_SSM_NAME"]) throw new Error("NotFoundClientIDSSMName");
    const value = await getSSSMParameter(process.env["CLIENT_ID_SSM_NAME"]);
    if (!value) throw new Error("NotFoundClientID");
    return value;
  }
  if (!process.env["CLIENT_ID"]) throw new Error("NotFoundClientID");
  return process.env["CLIENT_ID"];
};

const getClientSecret = async () => {
  if (process.env.NODE_ENV === "production") {
    if (!process.env["CLIENT_SECRET_SSM_NAME"]) throw new Error("NotFoundClientSecretSSMName");
    const value = await getSSSMParameter(process.env["CLIENT_SECRET_SSM_NAME"]);
    if (!value) throw new Error("NotFoundClientSecret");
    return value;
  }
  if (!process.env["CLIENT_SECRET"]) throw new Error("NotFoundClientSecret");
  return process.env["CLIENT_SECRET"];
};

const getDynamoTableName = async () => {
  return typeof process.env["DYNAMO_TABLE_NAME"] === "string" ? process.env["DYNAMO_TABLE_NAME"] : undefined;
};

const getSessionDynamoTableName = async () => {
  return typeof process.env["SESSION_DYNAMO_TABLE_NAME"] === "string" ? process.env["SESSION_DYNAMO_TABLE_NAME"] : undefined;
};

const getHost = async () => {
  if (!process.env["HOST"]) throw new Error("NotFoundHost");
  return process.env["HOST"].replace(/\/$/, "");
};

export type env = Readonly<{
  clientID: string;
  clientSecret: string;
  dynamoTableName: string | undefined;
  sessionDynamoTableName: string | undefined;
  host: string;
}>;

export const getEnv = async () => {
  let env: env | undefined;
  return await (async () => {
    if (!env) {
      const [clientID, clientSecret, dynamoTableName, sessionDynamoTableName, host] = await Promise.all([
        getClientID(),
        getClientSecret(),
        getDynamoTableName(),
        getSessionDynamoTableName(),
        getHost(),
      ]);
      env = { clientID, clientSecret, dynamoTableName, sessionDynamoTableName, host };
    }
    return env;
  })();
};
