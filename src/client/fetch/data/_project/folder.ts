import * as api from "api";
import { urls } from "lib";
export * from "./_folder";

export const get = async ({ projectID, folderID }: { projectID: string; folderID: string }): Promise<api.data.project.folder.get.Response> => {
  const res = await fetch(urls.api.data.project.folder.get({ projectID, folderID }));
  return (await res.json()).data;
};
