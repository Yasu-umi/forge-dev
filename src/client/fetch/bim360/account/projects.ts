import { ProjectData } from "../../../../apis/bim360/types";
import { urls } from "../../../../lib";

export const get = async ({ accountID }: { accountID: string }): Promise<ProjectData[]> => {
  const res = await fetch(urls.api.bim360.account.projects.get({ accountID }));
  return (await res.json()).data;
};
