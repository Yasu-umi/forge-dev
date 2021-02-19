import * as api from "api";
import { urls } from "lib";

export const get = async ({
  projectID,
  folderID,
}: {
  projectID: string;
  folderID: string;
}): Promise<api.data.project.folder.contents.get.Response> => {
  const res = await fetch(urls.api.data.project.folder.contents.get({ projectID, folderID }));
  return (await res.json()).data;
};
