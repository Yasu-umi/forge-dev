import React from "react";
import { NodeElement } from "../types";
import { Viewer } from "../viewer";
import * as helpers from "client/root/helpers";
import { urls } from "lib";

export const apiURL = urls.api.oss.buckets.get;
export const docURL = "https://forge.autodesk.com/en/docs/bim360/v1/reference/http/projects-:project_id-GET/";
export const path = urls.views.api.oss.buckets.get;

export const ViwerComponent: React.FC = () => {
  const [buckets] = helpers.useBuckets();
  return <Viewer data={buckets} apiURL={apiURL} docURL={docURL} />;
};

export const nodeElement: NodeElement = {
  apiURL,
  docURL,
  path,
  Viewer: ViwerComponent,
};
