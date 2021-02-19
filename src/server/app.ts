import { IncomingMessage } from "http";
import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import morgan from "morgan";
import { buildAccessTokenPool } from "./access_token_pool";
import { buildAPIRouter } from "./api";
import { env } from "./env";
import * as api from "api";
import { urls } from "lib";

export const buildApp = (app: express.Express, env: env) => {
  const accessTokenPool = buildAccessTokenPool(env);

  app.use(
    morgan("short", {
      skip: (req: IncomingMessage) => (req.url ? req.url === "/" : false),
    }),
  );
  app.use(cookieParser());

  app.use(
    session({
      secret: "forge-dev",
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60, // 1 hour to expire the session
      },
      resave: false,
      saveUninitialized: true,
    }),
  );

  app.use("/healthcheck", (_req, res) => res.sendStatus(200));

  app.use("/js", express.static("public/js"));

  app.use(urls.views.login.get, express.static("public/login.html"));
  app.get("/", (_, res) => res.redirect(urls.views.login.get));
  app.get("/views/*", async (req, res, next) => {
    // check logined
    if (await accessTokenPool.get(req.sessionID)) {
      return next();
    } else {
      return res.redirect(urls.views.login.get);
    }
  });
  app.use("/views/*", express.static("public/index.html"));

  app.get(urls.login.get, (_req, res) => {
    const scope = [api.scopes.data.read, api.scopes.account.read, api.scopes.bucket.read].join(" ");
    const redirectURI = `${env.host}${urls.api.oauth.callback.get}`;
    return res.redirect(
      `https://developer.api.autodesk.com/authentication/v1/authorize?response_type=code&client_id=${env.clientID}&redirect_uri=${redirectURI}&scope=${scope}`,
    );
  });
  app.get(urls.logout.get, async (req, res) => {
    await accessTokenPool.destroy(req.sessionID);
    return res.redirect("/");
  });

  app.use(buildAPIRouter(accessTokenPool, env));

  return app;
};
