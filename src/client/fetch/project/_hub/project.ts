import { Project } from "../../../../apis/types";
import { urls } from "../../../../lib";
export * from "./_project";

export const get = async ({ hubID, projectID }: { hubID: string; projectID: string }): Promise<Project> => {
  const res = await fetch(urls.api.project.hub.project.get({ hubID, projectID }));
  return (await res.json()).data;
};
