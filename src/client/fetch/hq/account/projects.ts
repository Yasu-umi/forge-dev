import * as api from "api";
import { urls } from "lib";

export const get = async ({ accountID }: { accountID: string }): Promise<api.hq.account.projects.get.Response> => {
  const res = await fetch(urls.api.hq.account.projects.get({ accountID }));
  return (await res.json()).data;
};
