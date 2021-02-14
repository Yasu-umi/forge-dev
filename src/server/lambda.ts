import serverlessExpress from "@vendia/serverless-express";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import express from "express";
import { buildApp } from "./app";
import { getEnv } from "./env";

let server: ReturnType<typeof serverlessExpress> | undefined;
const handler: APIGatewayProxyHandlerV2 = (event, context, callback) => {
  return (async () => {
    if (!server) {
      server = serverlessExpress({ app: buildApp(express(), await getEnv()) });
    }
    return server.handler(event, context, callback);
  })();
};
exports.handler = handler;
