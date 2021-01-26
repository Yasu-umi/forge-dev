import { FolderData } from "../../../../apis/types";
import { urls } from "../../../../lib";
export * from "./_folder";

export const get = async ({ projectID, folderID }: { projectID: string; folderID: string }): Promise<FolderData> => {
  const res = await fetch(urls.api.data.project.folder.get({ projectID, folderID }));
  return (await res.json()).data;
};