import React from "react";
import { urls } from "../../../../lib";
import { NodeElement } from "../types";
import { Viewer } from "../viewer";
import { useHubs } from "client/root/helpers";

export const apiURL = urls.api.project.hubs.get;
export const docURL = "https://forge.autodesk.com/en/docs/data/v2/reference/http/hubs-GET/";
export const path = urls.views.api.project.hubs.get;

export const ViwerComponent: React.FC = () => {
  const [hubs] = useHubs();
  return <Viewer data={hubs} apiURL={apiURL} docURL={docURL} />;
};

export const nodeElement: NodeElement = {
  apiURL,
  docURL,
  path,
  Viewer: ViwerComponent,
};
