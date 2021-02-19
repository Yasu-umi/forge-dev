import * as api from "api";
import { urls } from "lib";

export const get = async ({ projectID, itemID }: { projectID: string; itemID: string }): Promise<api.data.project.item.versions.get.Response> => {
  const res = await fetch(urls.api.data.project.item.versions.get({ projectID, itemID }));
  return (await res.json()).data;
};
