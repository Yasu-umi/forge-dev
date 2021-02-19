import * as api from "api";
import { urls } from "lib";
export * from "./_project";

export const get = async ({ hubID, projectID }: { hubID: string; projectID: string }): Promise<api.project.hub.project.get.Response> => {
  const res = await fetch(urls.api.project.hub.project.get({ hubID, projectID }));
  return (await res.json()).data;
};
