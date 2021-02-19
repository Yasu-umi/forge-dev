import * as api from "api";
import { urls } from "lib";

export const get = async (): Promise<api.project.hubs.get.Response> => {
  const res = await fetch(urls.api.project.hubs.get);
  return (await res.json()).data;
};
