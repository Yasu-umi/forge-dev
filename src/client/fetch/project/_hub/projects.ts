import * as api from "api";
import { urls } from "lib";

export const get = async ({ hubID }: { hubID: string }): Promise<api.project.hub.projects.get.Response> => {
  const res = await fetch(urls.api.project.hub.projects.get({ hubID }));
  return (await res.json()).data;
};
