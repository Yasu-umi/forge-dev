import { ProjectData } from "../../../../apis/bim360/types";
import { urls } from "../../../../lib";

export const get = async ({ accountID, projectID }: { accountID: string; projectID: string }): Promise<ProjectData> => {
  const res = await fetch(urls.api.bim360.account.project.get({ accountID, projectID }));
  return (await res.json()).data;
};
