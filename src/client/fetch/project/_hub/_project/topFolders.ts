import { Folder } from "../../../../../apis/types";
import { urls } from "../../../../../lib";

export const get = async ({ hubID, projectID }: { hubID: string; projectID: string }): Promise<Folder[]> => {
  const res = await fetch(urls.api.project.hub.project.topFolders.get({ hubID, projectID }));
  return (await res.json()).data;
};
