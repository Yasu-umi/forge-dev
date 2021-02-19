import * as api from "api";
import { urls } from "lib";

export const get = async ({ accountID, projectID }: { accountID: string; projectID: string }): Promise<api.hq.account.project.get.Response> => {
  const res = await fetch(urls.api.hq.account.project.get({ accountID, projectID }));
  return (await res.json()).data;
};
