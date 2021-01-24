import { assertType } from "typescript-is";
import * as apis from "../apis";
import * as env from "./env";

(async () => {
  (() => {
    console.log("passpasspasspasspasspasspasspasspasspasspasspasspasspasspasspass");
    assertType<apis.dataManagement.types.ContentData>(
      apis.dataManagement.utils.parseContent({
        type: "folders",
        id: "urn:adsk.wipprod:fs.folder:co.A7UcaTO9SuiXYmmHEl_eBA",
        attributes: {
          name: "testFolder1",
          displayName: "testFolder1",
          createTime: "2021-01-14T17:21:52.0000000Z",
          createUserId: "VX2UREZ95ERL",
          createUserName: "Shohei Ishikawa",
          lastModifiedTime: "2021-01-14T17:23:10.0000000Z",
          lastModifiedUserId: "VX2UREZ95ERL",
          lastModifiedUserName: "Shohei Ishikawa",
          lastModifiedTimeRollup: "2021-01-14T17:29:40.0000000Z",
          objectCount: 3,
          hidden: false,
          extension: {
            type: "folders:autodesk.bim360:Folder",
            version: "1.0",
            schema: {
              href: "https://developer.api.autodesk.com/schema/v1/versions/folders:autodesk.bim360:Folder-1.0",
            },
            data: {
              visibleTypes: ["items:autodesk.bim360:File"],
              actions: ["CONVERT"],
              allowedTypes: ["items:autodesk.bim360:File", "folders:autodesk.bim360:Folder"],
            },
          },
        },
        links: {
          self: {
            href:
              "https://developer.api.autodesk.com/data/v1/projects/b.06e348e3-f61a-44a7-ae82-4598235c1fd9/folders/urn:adsk.wipprod:fs.folder:co.A7UcaTO9SuiXYmmHEl_eBA",
          },
        },
        relationships: {
          contents: {
            links: {
              related: {
                href:
                  "https://developer.api.autodesk.com/data/v1/projects/b.06e348e3-f61a-44a7-ae82-4598235c1fd9/folders/urn:adsk.wipprod:fs.folder:co.A7UcaTO9SuiXYmmHEl_eBA/contents",
              },
            },
          },
          parent: {
            data: {
              type: "folders",
              id: "urn:adsk.wipprod:fs.folder:co.IMDzss1hT5mbBJA-OVm2ZQ",
            },
            links: {
              related: {
                href:
                  "https://developer.api.autodesk.com/data/v1/projects/b.06e348e3-f61a-44a7-ae82-4598235c1fd9/folders/urn:adsk.wipprod:fs.folder:co.A7UcaTO9SuiXYmmHEl_eBA/parent",
              },
            },
          },
          refs: {
            links: {
              self: {
                href:
                  "https://developer.api.autodesk.com/data/v1/projects/b.06e348e3-f61a-44a7-ae82-4598235c1fd9/folders/urn:adsk.wipprod:fs.folder:co.A7UcaTO9SuiXYmmHEl_eBA/relationships/refs",
              },
              related: {
                href:
                  "https://developer.api.autodesk.com/data/v1/projects/b.06e348e3-f61a-44a7-ae82-4598235c1fd9/folders/urn:adsk.wipprod:fs.folder:co.A7UcaTO9SuiXYmmHEl_eBA/refs",
              },
            },
          },
          links: {
            links: {
              self: {
                href:
                  "https://developer.api.autodesk.com/data/v1/projects/b.06e348e3-f61a-44a7-ae82-4598235c1fd9/folders/urn:adsk.wipprod:fs.folder:co.A7UcaTO9SuiXYmmHEl_eBA/relationships/links",
              },
            },
          },
        },
      } as any),
    );
    console.log("passpasspasspasspasspasspasspasspasspasspasspasspasspasspasspass");
  })();
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
