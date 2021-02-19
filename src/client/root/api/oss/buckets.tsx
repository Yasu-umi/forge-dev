import React, { useEffect, useState } from "react";
import { NodeElement } from "../types";
import { Viewer } from "../viewer";
import * as api from "api";
import * as fetch from "client/fetch";
import { urls } from "lib";

export const apiURL = urls.api.oss.buckets.get;
export const docURL = "https://forge.autodesk.com/en/docs/bim360/v1/reference/http/projects-:project_id-GET/";
export const path = urls.views.api.oss.buckets.get;

export const ViwerComponent: React.FC = () => {
  const [buckets, setBuckets] = useState<api.oss.buckets.get.Response | undefined>(undefined);
  useEffect(() => {
    (async () => {
      setBuckets(await fetch.oss.buckets.get());
    })();
  }, []);
  return <Viewer data={buckets} apiURL={apiURL} docURL={docURL} />;
};

export const nodeElement: NodeElement = {
  apiURL,
  docURL,
  path,
  Viewer: ViwerComponent,
};
