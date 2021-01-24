import { assertType } from "typescript-is";
import * as apis from "../apis";
import * as env from "./env";

(async () => {
  let access_token = await (async () => {
    const { access_token } = await apis.authentication.authenticate.post.fetch(
      env,
      [apis.scopes.data.read, apis.scopes.data.write, apis.scopes.account.read],
      "client_credentials",
    );
    console.log(access_token);
    return access_token;
  })();

  const { hubID, issueContainerID } = await (async () => {
    const hubs = await apis.dataManagement.hubs.get.fetch(access_token);
    if (!hubs) throw new Error("NotFoundHubs");

    assertType<apis.dataManagement.types.HubData[]>(hubs);
    console.log(JSON.stringify(hubs));

    const hubID = hubs[0].id;

    const projects = await apis.dataManagement.hub.projects.get.fetch(access_token, {
      hubID,
    });
    assertType<apis.dataManagement.types.ProjectData[]>(projects);
    console.log(JSON.stringify(projects));

    const projectID = projects[0].id;

    const project = await apis.dataManagement.hub.project.get.fetch(access_token, {
      hubID,
      projectID,
    });
    assertType<apis.dataManagement.types.ProjectData>(project);
    console.log(JSON.stringify(project));
    const issueContainerID = project.relationships.issues.data.id;

    return { hubID, issueContainerID };
  })();
  await (async () => {
    const accountID = apis.bim360.utils.getAccountID(hubID);
    const projects = await apis.bim360.account.projects.get.fetch(access_token, {
      accountID,
    });
    assertType<apis.bim360.account.projects.get.Response>(projects);
  })();

  access_token = await (async () => {
    const { access_token } = await apis.authentication.authenticate.post.fetch(
      env,
      [apis.scopes.data.read, apis.scopes.data.write, apis.scopes.account.read],
      "code",
    );
    console.log(access_token);
    return access_token;
  })();

  await (async () => {
    const issues = await apis.bim360.issues.get.fetch(access_token, {
      issueContainerID,
    });
    assertType<apis.bim360.issues.get.Response>(issues);
  })();

  process.exit();
})();
