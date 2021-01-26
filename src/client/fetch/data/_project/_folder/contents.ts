import { ContentData } from "../../../../../apis/types";
import { urls } from "../../../../../lib";

export const get = async ({ projectID, folderID }: { projectID: string; folderID: string }): Promise<ContentData[]> => {
  const res = await fetch(urls.api.data.project.folder.contents.get({ projectID, folderID }));
  return (await res.json()).data;
};
