import { ProjectData } from "../../../../apis/data-management/types";
import { urls } from "../../../../lib";
export * from "./_project";

export const get = async ({ hubID, projectID }: { hubID: string; projectID: string }): Promise<ProjectData> => {
  const res = await fetch(urls.api.dataManagement.hub.project.get({ hubID, projectID }));
  return (await res.json()).data;
};
