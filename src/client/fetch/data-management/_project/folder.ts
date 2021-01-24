import { FolderData } from "../../../../apis/data-management/types";
import { urls } from "../../../../lib";
export * from "./_folder";

export const get = async ({ projectID, folderID }: { projectID: string; folderID: string }): Promise<FolderData> => {
  const res = await fetch(urls.api.dataManagement.project.folder.get({ projectID, folderID }));
  return (await res.json()).data;
};
