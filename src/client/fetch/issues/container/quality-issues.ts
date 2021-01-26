import { Issue } from "../../../../apis/types";
import { urls } from "../../../../lib";

export const get = async ({ issueContainerID }: { issueContainerID: string }): Promise<Issue[]> => {
  const res = await fetch(urls.api.issues.container.qualityIssues.get({ issueContainerID }));
  return (await res.json()).data;
};
