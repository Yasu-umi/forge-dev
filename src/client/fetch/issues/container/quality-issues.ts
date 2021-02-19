import * as api from "api";
import { urls } from "lib";

export const get = async ({ issueContainerID }: { issueContainerID: string }): Promise<api.issues.container.qualityIssues.get.Response> => {
  const res = await fetch(urls.api.issues.container.qualityIssues.get({ issueContainerID }));
  return (await res.json()).data;
};
