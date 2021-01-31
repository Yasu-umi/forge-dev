import React, { useEffect, useState } from "react";
import { Bucket } from "../../../../apis/oss/types";
import { urls } from "../../../../lib";
import * as fetch from "../../../fetch";
import { NodeElement } from "../types";
import { Viewer } from "../viewer";

export const apiURL = urls.api.oss.buckets.get;
export const docURL = "https://forge.autodesk.com/en/docs/bim360/v1/reference/http/projects-:project_id-GET/";
export const path = urls.views.apis.oss.buckets.get;

export const ViwerComponent: React.FC = () => {
  const [buckets, setBuckets] = useState<Bucket[]>([]);
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
