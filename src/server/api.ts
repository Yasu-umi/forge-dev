import express, { Request, Response, NextFunction } from "express";
import { AccessTokenPool } from "./access_token_pool";
import * as api from "api";
import { urls } from "lib";

const empty = {};
const tryWrapper = (handler: (req: Request, res: Response, next: NextFunction, params: typeof empty) => Promise<void>) => async (
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

type hasAccessToken = { accessToken: { expires_in: number; access_token: string } };

const fetch2LegAccessTokenBuilder = (env: { clientID: string; clientSecret: string }) => <T>(
  handler: (req: Request, res: Response, next: NextFunction, params: T & hasAccessToken) => Promise<void>,
) => {
  let accessToken: api.authentication.authenticate.post.Response | null = null;
  const fetchAccessToken = async () => {
    if (!accessToken) {
      accessToken = await api.authentication.authenticate.post.fetch(env, [api.scopes.bucket.read, api.scopes.account.read], "client_credentials");
    }
    return accessToken;
  };
  return async (req: Request, res: Response, next: NextFunction, params: T) => {
    const accessToken = await fetchAccessToken();
    return await handler(req, res, next, { ...params, accessToken });
  };
};

const fetch3LegAccessTokenBuilder = (accessTokenPool: AccessTokenPool) => <T>(
  handler: (req: Request, res: Response, next: NextFunction, params: T & hasAccessToken) => Promise<void>,
) => async (req: Request, res: Response, next: NextFunction, params: T) => {
  const accessToken = await accessTokenPool.get(req.sessionID);
  if (!accessToken) throw new Error("NotFoundAccessToken");
  return await handler(req, res, next, { ...params, accessToken });
};

type hasHabID = { hubID: string };
const hubIDParser = <T>(handler: (req: Request, res: Response, next: NextFunction, params: T & hasHabID) => Promise<void>) => async (
  req: Request,
  res: Response,
  next: NextFunction,
  params: T,
) => {
  const hubID = req.params["hubID"];
  if (!hubID) throw new Error("NotFoundHubID");
  return await handler(req, res, next, { ...params, hubID });
};

type hasProjectID = { projectID: string };
const projectIDParser = <T>(handler: (req: Request, res: Response, next: NextFunction, params: T & hasProjectID) => Promise<void>) => async (
  req: Request,
  res: Response,
  next: NextFunction,
  params: T,
) => {
  const projectID = req.params["projectID"];
  if (!projectID) throw new Error("NotFoundProjectID");
  return await handler(req, res, next, { ...params, projectID });
};

type hasFolderID = { folderID: string };
const folderIDParser = <T>(handler: (req: Request, res: Response, next: NextFunction, params: T & hasFolderID) => Promise<void>) => async (
  req: Request,
  res: Response,
  next: NextFunction,
  params: T,
) => {
  const folderID = req.params["folderID"];
  if (!folderID) throw new Error("NotFoundFolderID");
  return await handler(req, res, next, { ...params, folderID });
};

type hasIssueContainerID = { issueContainerID: string };
const issueContainerIDParser = <T>(
  handler: (req: Request, res: Response, next: NextFunction, params: T & hasIssueContainerID) => Promise<void>,
) => async (req: Request, res: Response, next: NextFunction, params: T) => {
  const issueContainerID = req.params["issueContainerID"];
  if (!issueContainerID) throw new Error("NotFoundIssueContainerID");
  return await handler(req, res, next, { ...params, issueContainerID });
};

type hasItemID = { itemID: string };
const itemIDParser = <T>(handler: (req: Request, res: Response, next: NextFunction, params: T & hasItemID) => Promise<void>) => async (
  req: Request,
  res: Response,
  next: NextFunction,
  params: T,
) => {
  const itemID = req.params["itemID"];
  if (!itemID) throw new Error("NotFoundItemID");
  return await handler(req, res, next, { ...params, itemID });
};

type hasAccountID = { accountID: string };
const accountIDParser = <T>(handler: (req: Request, res: Response, next: NextFunction, params: T & hasAccountID) => Promise<void>) => async (
  req: Request,
  res: Response,
  next: NextFunction,
  params: T,
) => {
  const accountID = req.params["accountID"];
  if (!accountID) throw new Error("NotFoundAccountID");
  return await handler(req, res, next, { ...params, accountID });
};

type hasURN = { urn: string };
const urnParser = <T>(handler: (req: Request, res: Response, next: NextFunction, params: T & hasURN) => Promise<void>) => async (
  req: Request,
  res: Response,
  next: NextFunction,
  params: T,
) => {
  const _urn = req.params["urn"];
  if (!_urn) throw new Error("NotFoundURN");
  const urn = api.utils.base64Decode(_urn);
  return await handler(req, res, next, { ...params, urn });
};

const APIHandlerBuilder = <T extends { accessToken: { access_token: string } }, S>(
  fetcher: (access_token: string, params: T) => Promise<S>,
) => async (_req: Request, res: Response, _next: NextFunction, params: T) => {
  res.send({ data: await fetcher(params.accessToken.access_token, params) });
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
      const accessToken = await api.authentication.gettoken.post.fetch({
        ...env,
        code,
        redirectURI: `${env.host}${urls.api.oauth.callback.get}`,
      });
      await accessTokenPool.set(req.sessionID, accessToken);
      return res.redirect(urls.views.api.get);
    }),
  );

  router.get(
    urls.api.project.hubs.get,
    tryWrapper(fetch3LegAccessToken(APIHandlerBuilder<hasAccessToken, api.project.hubs.get.Response>(api.project.hubs.get.fetch))),
  );

  router.get(
    urls.api.project.hubs.get,
    tryWrapper(
      hubIDParser(fetch3LegAccessToken(APIHandlerBuilder<hasAccessToken & hasHabID, api.project.hub.get.Response>(api.project.hub.get.fetch))),
    ),
  );
  router.get(
    urls.api.project.hub.get({ hubID: ":hubID" }),
    tryWrapper(
      hubIDParser(fetch3LegAccessToken(APIHandlerBuilder<hasAccessToken & hasHabID, api.project.hub.get.Response>(api.project.hub.get.fetch))),
    ),
  );

  router.get(
    urls.api.project.hub.project.get({ hubID: ":hubID", projectID: ":projectID" }),
    tryWrapper(
      hubIDParser(
        projectIDParser(
          fetch3LegAccessToken(
            APIHandlerBuilder<hasAccessToken & hasHabID & hasProjectID, api.project.hub.project.get.Response>(api.project.hub.project.get.fetch),
          ),
        ),
      ),
    ),
  );

  router.get(
    urls.api.project.hub.projects.get({ hubID: ":hubID" }),
    tryWrapper(
      hubIDParser(
        fetch3LegAccessToken(APIHandlerBuilder<hasAccessToken & hasHabID, api.project.hub.projects.get.Response>(api.project.hub.projects.get.fetch)),
      ),
    ),
  );

  router.get(
    urls.api.project.hub.project.get({ hubID: ":hubID", projectID: ":projectID" }),
    tryWrapper(
      hubIDParser(
        projectIDParser(
          fetch3LegAccessToken(
            APIHandlerBuilder<hasAccessToken & hasHabID & hasProjectID, api.project.hub.project.get.Response>(api.project.hub.project.get.fetch),
          ),
        ),
      ),
    ),
  );

  router.get(
    urls.api.project.hub.project.topFolders.get({ hubID: ":hubID", projectID: ":projectID" }),
    tryWrapper(
      hubIDParser(
        projectIDParser(
          fetch3LegAccessToken(
            APIHandlerBuilder<hasAccessToken & hasHabID & hasProjectID, api.project.hub.project.topFolders.get.Response>(
              api.project.hub.project.topFolders.get.fetch,
            ),
          ),
        ),
      ),
    ),
  );

  router.get(
    urls.api.data.project.folder.get({ projectID: ":projectID", folderID: ":folderID" }),
    tryWrapper(
      projectIDParser(
        folderIDParser(
          fetch3LegAccessToken(
            APIHandlerBuilder<hasAccessToken & hasProjectID & hasFolderID, api.data.project.folder.get.Response>(api.data.project.folder.get.fetch),
          ),
        ),
      ),
    ),
  );

  router.get(
    urls.api.data.project.folder.contents.get({ projectID: ":projectID", folderID: ":folderID" }),
    tryWrapper(
      projectIDParser(
        folderIDParser(
          fetch3LegAccessToken(
            APIHandlerBuilder<hasAccessToken & hasProjectID & hasFolderID, api.data.project.folder.contents.get.Response>(
              api.data.project.folder.contents.get.fetch,
            ),
          ),
        ),
      ),
    ),
  );

  router.get(
    urls.api.data.project.item.versions.get({ projectID: ":projectID", itemID: ":itemID" }),
    tryWrapper(
      projectIDParser(
        itemIDParser(
          fetch3LegAccessToken(
            APIHandlerBuilder<hasAccessToken & hasProjectID & hasItemID, api.data.project.item.versions.get.Response>(
              api.data.project.item.versions.get.fetch,
            ),
          ),
        ),
      ),
    ),
  );

  router.get(
    urls.api.issues.container.qualityIssues.get({ issueContainerID: ":issueContainerID" }),
    tryWrapper(
      issueContainerIDParser(
        fetch3LegAccessToken(
          APIHandlerBuilder<hasAccessToken & hasIssueContainerID, api.issues.container.qualityIssues.get.Response>(
            api.issues.container.qualityIssues.get.fetch,
          ),
        ),
      ),
    ),
  );

  router.get(
    urls.api.hq.account.projects.get({ accountID: ":accountID" }),
    tryWrapper(
      accountIDParser(
        fetch3LegAccessToken(
          APIHandlerBuilder<hasAccessToken & hasAccountID, api.hq.account.projects.get.Response>(api.hq.account.projects.get.fetch),
        ),
      ),
    ),
  );

  router.get(
    urls.api.hq.account.project.get({ accountID: ":accountID", projectID: ":projectID" }),
    tryWrapper(
      accountIDParser(
        projectIDParser(
          fetch3LegAccessToken(
            APIHandlerBuilder<hasAccessToken & hasAccountID & hasProjectID, api.hq.account.project.get.Response>(api.hq.account.project.get.fetch),
          ),
        ),
      ),
    ),
  );

  router.get(
    urls.api.oss.buckets.get,
    tryWrapper(fetch2LegAccessToken(APIHandlerBuilder<hasAccessToken, api.oss.buckets.get.Response>(api.oss.buckets.get.fetch))),
  );

  router.get(
    urls.api.modelderivative.designdata.metadata.get({ urn: ":urn" }),
    tryWrapper(
      urnParser(
        fetch3LegAccessToken(
          APIHandlerBuilder<hasAccessToken & hasURN, api.modelderivative.designdata.metadata.get.Response>(
            api.modelderivative.designdata.metadata.get.fetch,
          ),
        ),
      ),
    ),
  );

  return router;
};
