import { ProjectData } from "../../../../apis/data-management/types";
import { urls } from "../../../../lib";

export const get = async ({ hubID }: { hubID: string }): Promise<ProjectData[]> => {
  const res = await fetch(urls.api.dataManagement.hub.projects.get({ hubID }));
  return (await res.json()).data;
};
