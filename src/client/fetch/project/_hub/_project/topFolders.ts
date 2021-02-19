import * as api from "api";
import { urls } from "lib";

export const get = async ({ hubID, projectID }: { hubID: string; projectID: string }): Promise<api.project.hub.project.topFolders.get.Response> => {
  const res = await fetch(urls.api.project.hub.project.topFolders.get({ hubID, projectID }));
  return (await res.json()).data;
};
