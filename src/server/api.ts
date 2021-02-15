import express, { Request, Response, NextFunction } from "express";
import * as apis from "../apis";
import { urls } from "../lib";
import { AccessToken, AccessTokenPool } from "./access_token_pool";

const tryWrapper = (handler: (req: Request, res: Response, next: NextFunction, params: unknown) => Promise<void>) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await handler(req, res, next, {});
  } catch (err) {
    next(err);
  }
};

const fetch2LegAccessTokenBuilder = (env: { clientID: string; clientSecret: string }) => <T>(
  handler: (
    req: Request,
    res: Response,
    next: NextFunction,
    params: T & { accessToken: apis.authentication.authenticate.post.Response },
  ) => Promise<void>,
) => {
  let accessToken: apis.authentication.authenticate.post.Response | null = null;
  const fetchAccessToken = async () => {
    if (!accessToken) {
      accessToken = await apis.authentication.authenticate.post.fetch(env, [apis.scopes.bucket.read, apis.scopes.account.read], "client_credentials");
    }
    return accessToken;
  };
  return async (req: Request, res: Response, next: NextFunction, params: T) => {
    const accessToken = await fetchAccessToken();
    return await handler(req, res, next, { ...params, accessToken });
  };
};

const fetch3LegAccessTokenBuilder = (accessTokenPool: AccessTokenPool) => <T>(
  handler: (req: Request, res: Response, next: NextFunction, params: T & { accessToken: AccessToken }) => Promise<void>,
) => async (req: Request, res: Response, next: NextFunction, params: T) => {
  const accessToken = await accessTokenPool.get(req.sessionID);
  if (!accessToken) throw new Error("NotFoundAccessToken");
  return await handler(req, res, next, { ...params, accessToken });
};

const hubIDParser = <T>(handler: (req: Request, res: Response, next: NextFunction, params: T & { hubID: string }) => Promise<void>) => async (
  req: Request,
  res: Response,
  next: NextFunction,
  params: T,
) => {
  const hubID = req.params["hubID"];
  if (!hubID) throw new Error("NotFoundHubID");
  return await handler(req, res, next, { ...params, hubID });
};

const projectIDParser = <T>(handler: (req: Request, res: Response, next: NextFunction, params: T & { projectID: string }) => Promise<void>) => async (
  req: Request,
  res: Response,
  next: NextFunction,
  params: T,
) => {
  const projectID = req.params["projectID"];
  if (!projectID) throw new Error("NotFoundProjectID");
  return await handler(req, res, next, { ...params, projectID });
};

const folderIDParser = <T>(handler: (req: Request, res: Response, next: NextFunction, params: T & { folderID: string }) => Promise<void>) => async (
  req: Request,
  res: Response,
  next: NextFunction,
  params: T,
) => {
  const folderID = req.params["folderID"];
  if (!folderID) throw new Error("NotFoundFolderID");
  return await handler(req, res, next, { ...params, folderID });
};

const issueContainerIDParser = <T>(
  handler: (req: Request, res: Response, next: NextFunction, params: T & { issueContainerID: string }) => Promise<void>,
) => async (req: Request, res: Response, next: NextFunction, params: T) => {
  const issueContainerID = req.params["issueContainerID"];
  if (!issueContainerID) throw new Error("NotFoundIssueContainerID");
  return await handler(req, res, next, { ...params, issueContainerID });
};

const itemIDParser = <T>(handler: (req: Request, res: Response, next: NextFunction, params: T & { itemID: string }) => Promise<void>) => async (
  req: Request,
  res: Response,
  next: NextFunction,
  params: T,
) => {
  const itemID = req.params["itemID"];
  if (!itemID) throw new Error("NotFoundItemID");
  return await handler(req, res, next, { ...params, itemID });
};

const accountIDParser = <T>(handler: (req: Request, res: Response, next: NextFunction, params: T & { accountID: string }) => Promise<void>) => async (
  req: Request,
  res: Response,
  next: NextFunction,
  params: T,
) => {
  const accountID = req.params["accountID"];
  if (!accountID) throw new Error("NotFoundAccountID");
  return await handler(req, res, next, { ...params, accountID });
};

const urnParser = <T>(handler: (req: Request, res: Response, next: NextFunction, params: T & { urn: string }) => Promise<void>) => async (
  req: Request,
  res: Response,
  next: NextFunction,
  params: T,
) => {
  const _urn = req.params["urn"];
  if (!_urn) throw new Error("NotFoundURN");
  const urn = apis.utils.base64Decode(_urn);
  return await handler(req, res, next, { ...params, urn });
};

export const buildAPIRouter = (accessTokenPool: AccessTokenPool, env: { clientID: string; clientSecret: string; host: string }): express.Router => {
  const router = express.Router();

  const fetch3LegAccessToken = fetch3LegAccessTokenBuilder(accessTokenPool);
  const fetch2LegAccessToken = fetch2LegAccessTokenBuilder(env);

  router.get(
    urls.api.oauth.callback.get,
    tryWrapper(async (req, res) => {
      const code = req.query.code;
      if (typeof code !== "string") throw new Error("NotFoundCode");
      const accessToken = await apis.authentication.gettoken.post.fetch({
        ...env,
        code,
        redirectURI: `${env.host}${urls.api.oauth.callback.get}`,
      });
      await accessTokenPool.set(req.sessionID, accessToken);
      return res.redirect(urls.views.apis.get);
    }),
  );

  router.get(
    urls.api.project.hubs.get,
    tryWrapper(
      fetch3LegAccessToken(async (_req, res, _next, { accessToken }) => {
        const hubs = await apis.project.hubs.get.fetch(accessToken.access_token);
        res.send({ data: hubs });
      }),
    ),
  );

  router.get(
    urls.api.project.hub.get({ hubID: ":hubID" }),
    tryWrapper(
      hubIDParser(
        fetch3LegAccessToken(async (_req, res, _next, { accessToken, hubID }) => {
          const hub = await apis.project.hub.get.fetch(accessToken.access_token, { hubID });
          res.send({ data: hub });
        }),
      ),
    ),
  );

  router.get(
    urls.api.project.hub.project.get({ hubID: ":hubID", projectID: ":projectID" }),
    tryWrapper(
      hubIDParser(
        projectIDParser(
          fetch3LegAccessToken(async (_req, res, _next, { accessToken, hubID, projectID }) => {
            const project = await apis.project.hub.project.get.fetch(accessToken.access_token, { hubID, projectID });
            res.send({ data: project });
          }),
        ),
      ),
    ),
  );

  router.get(
    urls.api.project.hub.projects.get({ hubID: ":hubID" }),
    tryWrapper(
      hubIDParser(
        fetch3LegAccessToken(async (_req, res, _next, { hubID, accessToken }) => {
          const projects = await apis.project.hub.projects.get.fetch(accessToken.access_token, { hubID });
          res.send({ data: projects });
        }),
      ),
    ),
  );

  router.get(
    urls.api.project.hub.project.get({ hubID: ":hubID", projectID: ":projectID" }),
    tryWrapper(
      hubIDParser(
        projectIDParser(
          fetch3LegAccessToken(async (_req, res, _next, { accessToken, hubID, projectID }) => {
            const project = await apis.project.hub.project.get.fetch(accessToken.access_token, { hubID, projectID });
            res.send({ data: project });
          }),
        ),
      ),
    ),
  );

  router.get(
    urls.api.project.hub.project.topFolders.get({ hubID: ":hubID", projectID: ":projectID" }),
    tryWrapper(
      hubIDParser(
        projectIDParser(
          fetch3LegAccessToken(async (_req, res, _next, { accessToken, hubID, projectID }) => {
            const topFolders = await apis.project.hub.project.topFolders.get.fetch(accessToken.access_token, { hubID, projectID });
            res.send({ data: topFolders });
          }),
        ),
      ),
    ),
  );

  router.get(
    urls.api.data.project.folder.get({ projectID: ":projectID", folderID: ":folderID" }),
    tryWrapper(
      projectIDParser(
        folderIDParser(
          fetch3LegAccessToken(async (_req, res, _next, { accessToken, projectID, folderID }) => {
            const folder = await apis.data.project.folder.get.fetch(accessToken.access_token, { projectID, folderID });
            res.send({ data: folder });
          }),
        ),
      ),
    ),
  );

  router.get(
    urls.api.data.project.folder.contents.get({ projectID: ":projectID", folderID: ":folderID" }),
    tryWrapper(
      projectIDParser(
        folderIDParser(
          fetch3LegAccessToken(async (_req, res, _next, { accessToken, projectID, folderID }) => {
            const contents = await apis.data.project.folder.contents.get.fetch(accessToken.access_token, { projectID, folderID });
            res.send({ data: contents });
          }),
        ),
      ),
    ),
  );

  router.get(
    urls.api.data.project.item.versions.get({ projectID: ":projectID", itemID: ":itemID" }),
    tryWrapper(
      projectIDParser(
        itemIDParser(
          fetch3LegAccessToken(async (req, res, _next, { accessToken, projectID, itemID }) => {
            const versions = await apis.data.project.item.versions.get.fetch(accessToken.access_token, { projectID, itemID });
            res.send({ data: versions });
          }),
        ),
      ),
    ),
  );

  router.get(
    urls.api.issues.container.qualityIssues.get({ issueContainerID: ":issueContainerID" }),
    tryWrapper(
      issueContainerIDParser(
        fetch3LegAccessToken(async (_req, res, _next, { accessToken, issueContainerID }) => {
          const issues = await apis.issues.container.qualityIssues.get.fetch(accessToken.access_token, { issueContainerID });
          res.send({ data: issues });
        }),
      ),
    ),
  );

  router.get(
    urls.api.hq.account.projects.get({ accountID: ":accountID" }),
    tryWrapper(
      accountIDParser(
        fetch3LegAccessToken(async (_req, res, _next, { accessToken, accountID }) => {
          const projects = await apis.hq.account.projects.get.fetch(accessToken.access_token, { accountID });
          res.send({ data: projects });
        }),
      ),
    ),
  );

  router.get(
    urls.api.hq.account.project.get({ accountID: ":accountID", projectID: ":projectID" }),
    tryWrapper(
      accountIDParser(
        projectIDParser(
          fetch3LegAccessToken(async (_req, res, _next, { accessToken, accountID, projectID }) => {
            const project = await apis.hq.account.project.get.fetch(accessToken.access_token, { accountID, projectID });
            res.send({ data: project });
          }),
        ),
      ),
    ),
  );

  router.get(
    urls.api.oss.buckets.get,
    tryWrapper(
      fetch2LegAccessToken(async (_req, res, _next, { accessToken }) => {
        const buckets = await apis.oss.buckets.get.fetch(accessToken.access_token);
        res.send({ data: buckets });
      }),
    ),
  );

  router.get(
    urls.api.modelderivative.designdata.metadata.get({ urn: ":urn" }),
    tryWrapper(
      urnParser(
        fetch3LegAccessToken(async (_req, res, _next, { accessToken, urn }) => {
          const metadata = await apis.modelderivative.dssigndata.metadata.get.fetch(accessToken.access_token, { urn });
          res.send({ data: metadata });
        }),
      ),
    ),
  );

  return router;
};
