import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import morgan from "morgan";
import * as apis from "../apis";
import { urls } from "../lib";
import * as env from "./env";

// TODO: DBにユーザ情報とセットで保存する。一旦ここにsessionとセットでcodeを保存する。
class AccessTokenPool {
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

const accessTokenPool = new AccessTokenPool();

const accessTokenFetcherBuilder = () => {
  let accessToken: apis.authentication.authenticate.post.Response | null = null;
  return async () => {
    if (!accessToken) {
      accessToken = await apis.authentication.authenticate.post.fetch(env, [apis.scopes.bucket.read, apis.scopes.account.read], "client_credentials");
    }
    return accessToken;
  };
};
const accessTokenFetcher = accessTokenFetcherBuilder();

const tryWrapper = (handler: express.Handler) => async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    await handler(req, res, next);
  } catch (err) {
    next(err);
  }
};

const app = express();
app.use(morgan("short"));
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

app.get("/", async (req, res, next) => {
  // check logined
  if (await accessTokenPool.get(req.sessionID)) {
    return next();
  } else {
    return res.redirect("/login.html");
  }
});
app.use("/", express.static("public"));

app.get(urls.login.get, (_req, res) => {
  const scope = [apis.scopes.data.read, apis.scopes.account.read, apis.scopes.bucket.read].join(" ");
  const redirectURI = `${env.HOST}${urls.api.oauth.callback.get}`;
  return res.redirect(
    `https://developer.api.autodesk.com/authentication/v1/authorize?response_type=code&client_id=${env.CLIENT_ID}&redirect_uri=${redirectURI}&scope=${scope}`,
  );
});
app.get(urls.logout.get, async (req, res) => {
  await accessTokenPool.destroy(req.sessionID);
  return res.redirect("/");
});

app.get(
  urls.api.oauth.callback.get,
  tryWrapper(async (req, res) => {
    const code = req.query.code;
    if (typeof code !== "string") throw new Error("NotFoundCode");
    const accessToken = await apis.authentication.gettoken.post.fetch({
      ...env,
      code,
      redirectURI: `${env.HOST}${urls.api.oauth.callback.get}`,
    });
    await accessTokenPool.set(req.sessionID, accessToken);
    return res.redirect("/");
  }),
);

app.get(
  urls.api.project.hubs.get,
  tryWrapper(async (req, res) => {
    const accessToken = await accessTokenPool.get(req.sessionID);
    if (!accessToken) throw new Error("NotFoundAccessToken");
    const hubs = await apis.project.hubs.get.fetch(accessToken.access_token);
    return res.send({ data: hubs });
  }),
);

app.get(
  urls.api.project.hub.get({ hubID: ":hubID" }),
  tryWrapper(async (req, res) => {
    const hubID = req.params["hubID"];
    if (!hubID) throw new Error("NotFoundHubID");
    const accessToken = await accessTokenPool.get(req.sessionID);
    if (!accessToken) throw new Error("NotFoundAccessToken");
    const hub = await apis.project.hub.get.fetch(accessToken.access_token, { hubID });
    return res.send({ data: hub });
  }),
);

app.get(
  urls.api.project.hub.project.get({ hubID: ":hubID", projectID: ":projectID" }),
  tryWrapper(async (req, res) => {
    const hubID = req.params["hubID"];
    if (!hubID) throw new Error("NotFoundHubID");
    const projectID = req.params["hubID"];
    if (!projectID) throw new Error("NotFoundHubID");
    const accessToken = await accessTokenPool.get(req.sessionID);
    if (!accessToken) throw new Error("NotFoundAccessToken");
    const projects = await apis.project.hub.projects.get.fetch(accessToken.access_token, { hubID });
    return res.send({ data: projects });
  }),
);

app.get(
  urls.api.project.hub.projects.get({ hubID: ":hubID" }),
  tryWrapper(async (req, res) => {
    const hubID = req.params["hubID"];
    if (!hubID) throw new Error("NotFoundHubID");
    const accessToken = await accessTokenPool.get(req.sessionID);
    if (!accessToken) throw new Error("NotFoundAccessToken");
    const projects = await apis.project.hub.projects.get.fetch(accessToken.access_token, { hubID });
    return res.send({ data: projects });
  }),
);

app.get(
  urls.api.project.hub.project.get({ hubID: ":hubID", projectID: ":projectID" }),
  tryWrapper(async (req, res) => {
    const hubID = req.params["hubID"];
    if (!hubID) throw new Error("NotFoundHubID");
    const projectID = req.params["projectID"];
    if (!projectID) throw new Error("NotFoundProjectID");
    const accessToken = await accessTokenPool.get(req.sessionID);
    if (!accessToken) throw new Error("NotFoundAccessToken");
    const project = await apis.project.hub.project.get.fetch(accessToken.access_token, { hubID, projectID });
    return res.send({ data: project });
  }),
);

app.get(
  urls.api.project.hub.project.topFolders.get({ hubID: ":hubID", projectID: ":projectID" }),
  tryWrapper(async (req, res) => {
    const hubID = req.params["hubID"];
    if (!hubID) throw new Error("NotFoundHubID");
    const projectID = req.params["projectID"];
    if (!projectID) throw new Error("NotFoundProjectID");
    const accessToken = await accessTokenPool.get(req.sessionID);
    if (!accessToken) throw new Error("NotFoundAccessToken");
    const topFolders = await apis.project.hub.project.topFolders.get.fetch(accessToken.access_token, { hubID, projectID });
    return res.send({ data: topFolders });
  }),
);

app.get(
  urls.api.data.project.folder.get({ projectID: ":projectID", folderID: ":folderID" }),
  tryWrapper(async (req, res) => {
    const projectID = req.params["projectID"];
    if (!projectID) throw new Error("NotFoundProjectID");
    const folderID = req.params["folderID"];
    if (!folderID) throw new Error("NotFoundFolderID");
    const accessToken = await accessTokenPool.get(req.sessionID);
    if (!accessToken) throw new Error("NotFoundAccessToken");
    const folder = await apis.data.project.folder.get.fetch(accessToken.access_token, { projectID, folderID });
    return res.send({ data: folder });
  }),
);

app.get(
  urls.api.data.project.folder.contents.get({ projectID: ":projectID", folderID: ":folderID" }),
  tryWrapper(async (req, res) => {
    const projectID = req.params["projectID"];
    if (!projectID) throw new Error("NotFoundProjectID");
    const folderID = req.params["folderID"];
    if (!folderID) throw new Error("NotFoundFolderID");
    const accessToken = await accessTokenPool.get(req.sessionID);
    if (!accessToken) throw new Error("NotFoundAccessToken");
    const contents = await apis.data.project.folder.contents.get.fetch(accessToken.access_token, { projectID, folderID });
    return res.send({ data: contents });
  }),
);

app.get(
  urls.api.issues.container.qualityIssues.get({ issueContainerID: ":issueContainerID" }),
  tryWrapper(async (req, res) => {
    const issueContainerID = req.params["issueContainerID"];
    if (!issueContainerID) throw new Error("NotFoundIssueContainerID");
    const accessToken = await accessTokenPool.get(req.sessionID);
    if (!accessToken) throw new Error("NotFoundAccessToken");
    const issues = await apis.issues.container.qualityIssues.get.fetch(accessToken.access_token, { issueContainerID });
    return res.send({ data: issues });
  }),
);

app.get(
  urls.api.hq.account.projects.get({ accountID: ":accountID" }),
  tryWrapper(async (req, res) => {
    const accountID = req.params["accountID"];
    if (!accountID) throw new Error("NotFoundAccountID");
    const accessToken = await accessTokenFetcher();
    if (!accessToken) throw new Error("NotFoundAccessToken");
    const projects = await apis.hq.account.projects.get.fetch(accessToken.access_token, { accountID });
    return res.send({ data: projects });
  }),
);

app.get(
  urls.api.hq.account.project.get({ accountID: ":accountID", projectID: ":projectID" }),
  tryWrapper(async (req, res) => {
    const accountID = req.params["accountID"];
    if (!accountID) throw new Error("NotFoundAccountID");
    const projectID = req.params["projectID"];
    if (!projectID) throw new Error("NotFoundProjectID");
    const accessToken = await accessTokenFetcher();
    if (!accessToken) throw new Error("NotFoundAccessToken");
    const project = await apis.hq.account.project.get.fetch(accessToken.access_token, { accountID, projectID });
    return res.send({ data: project });
  }),
);

app.get(
  urls.api.oss.buckets.get,
  tryWrapper(async (_req, res) => {
    const accessToken = await accessTokenFetcher();
    if (!accessToken) throw new Error("NotFoundAccessToken");
    const buckets = await apis.oss.buckets.get.fetch(accessToken.access_token);
    return res.send({ data: buckets });
  }),
);

app.listen(env.PORT, () => console.log(`Server listening on port ${env.PORT}`));
