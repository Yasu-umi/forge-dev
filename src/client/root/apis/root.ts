import { urls } from "../.././../lib";
import * as bim360 from "./bim360";
import * as dataManagement from "./dataMamagement";
import * as oss from "./oss";
import { Node } from "./types";

export const tree: Node = {
  dataManagement: {
    children: {
      hubs: dataManagement.hubs.nodeElement,
      hub: {
        apiURL: urls.api.dataManagement.hub.get({ hubID: ":hubID" }),
        docURL: "https://forge.autodesk.com/en/docs/data/v2/reference/http/hubs-hub_id-GET/",
        children: {
          projects: dataManagement.hub.projects.nodeElement,
          project: {
            children: {
              topFolders: dataManagement.hub.project.topFolders.nodeElement,
            },
          },
        },
      },
      project: {
        children: {
          folder: {
            apiURL: urls.api.dataManagement.project.folder.get({ projectID: ":projectID", folderID: ":folderID" }),
            docURL: "https://forge.autodesk.com/en/docs/data/v2/reference/http/projects-project_id-folders-folder_id-GET/",
            children: {
              contents: dataManagement.project.folder.contents.nodeElement,
            },
          },
        },
      },
    },
  },
  bim360: {
    children: {
      issues: bim360.issues.nodeElement,
      account: {
        children: {
          projects: bim360.account.projects.nodeElement,
          project: bim360.account.project.nodeElement,
        },
      },
    },
  },
  oss: {
    children: {
      buckets: oss.buckets.nodeElement,
    },
  },
};
