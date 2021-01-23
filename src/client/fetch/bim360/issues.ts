import { IssueData } from "../../../apis/bim360/types";
import { urls } from "../../../lib";

export const get = async ({ issueContainerID }: { issueContainerID: string }): Promise<IssueData[]> => {
  const res = await fetch(urls.api.bim360.issues.get({ issueContainerID }));
  return (await res.json()).data;
};
