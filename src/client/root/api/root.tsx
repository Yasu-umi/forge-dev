import React, { useMemo } from "react";
import { Route, Switch } from "react-router-dom";
import * as data from "./data";
import * as hq from "./hq";
import * as issues from "./issues";
import * as modelderivative from "./modelderivative";
import * as oss from "./oss";
import * as project from "./project";
import { Node } from "./types";

export const tree: Node = {
  project: {
    children: {
      hubs: project.hubs.nodeElement,
      hub: {
        // apiURL: urls.api.project.hub.get({ hubID: ":hubID" }),
        // docURL: "https://forge.autodesk.com/en/docs/data/v2/reference/http/hubs-hub_id-GET/",
        children: {
          projects: project.hub.projects.nodeElement,
          project: {
            children: {
              topFolders: project.hub.project.topFolders.nodeElement,
            },
          },
        },
      },
    },
  },
  data: {
    children: {
      project: {
        children: {
          folder: {
            // apiURL: urls.api.data.project.folder.get({ projectID: ":projectID", folderID: ":folderID" }),
            // docURL: "https://forge.autodesk.com/en/docs/data/v2/reference/http/projects-project_id-folders-folder_id-GET/",
            children: {
              contents: data.project.folder.contents.nodeElement,
            },
          },
          item: {
            children: {
              versions: data.project.item.versions.nodeElement,
            },
          },
        },
      },
    },
  },
  hq: {
    children: {
      account: {
        children: {
          projects: hq.account.projects.nodeElement,
          project: hq.account.project.nodeElement,
        },
      },
    },
  },
  issues: {
    children: {
      container: {
        children: {
          qualityIssues: issues.container.qualityIssues.nodeElement,
        },
      },
    },
  },
  oss: {
    children: {
      buckets: oss.buckets.nodeElement,
    },
  },
  modelderivative: {
    children: {
      designdata: {
        children: {
          metadata: modelderivative.designdata.metadata.nodeElement,
        },
      },
    },
  },
};

const renderTree = (node: Node): JSX.Element[] =>
  Object.values(node)
    .map((value) => [
      "path" in value ? (
        <Route path={value.path} key={value.path}>
          <value.Viewer />
        </Route>
      ) : null,
      ...("children" in value && value.children ? renderTree(value.children) : []),
    ])
    .reduce((prev, cur) => [...prev, ...cur], [])
    .filter((el): el is JSX.Element => !!el);

export const Root = () => <Switch>{...useMemo(() => renderTree(tree), [])}</Switch>;
