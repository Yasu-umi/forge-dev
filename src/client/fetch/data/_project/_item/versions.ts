import { Version } from "../../../../../apis/types";
import { urls } from "../../../../../lib";

export const get = async ({ projectID, itemID }: { projectID: string; itemID: string }): Promise<Version[]> => {
  const res = await fetch(urls.api.data.project.item.versions.get({ projectID, itemID }));
  return (await res.json()).data;
};
