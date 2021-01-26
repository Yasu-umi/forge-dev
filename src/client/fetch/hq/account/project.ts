import { ProjectData } from "../../../../apis/hq/types";
import { urls } from "../../../../lib";

export const get = async ({ accountID, projectID }: { accountID: string; projectID: string }): Promise<ProjectData> => {
  const res = await fetch(urls.api.hq.account.project.get({ accountID, projectID }));
  return (await res.json()).data;
};
