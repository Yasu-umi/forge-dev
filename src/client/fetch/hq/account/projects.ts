import { Project } from "../../../../apis/hq/types";
import { urls } from "../../../../lib";

export const get = async ({ accountID }: { accountID: string }): Promise<Project[]> => {
  const res = await fetch(urls.api.hq.account.projects.get({ accountID }));
  return (await res.json()).data;
};
