import { ProjectData } from "../../../../apis/types";
import { urls } from "../../../../lib";

export const get = async ({ hubID }: { hubID: string }): Promise<ProjectData[]> => {
  const res = await fetch(urls.api.project.hub.projects.get({ hubID }));
  return (await res.json()).data;
};
