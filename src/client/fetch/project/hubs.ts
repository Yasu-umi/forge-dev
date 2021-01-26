import { HubData } from "../../../apis/types";
import { urls } from "../../../lib";

export const get = async (): Promise<HubData[]> => {
  const res = await fetch(urls.api.project.hubs.get);
  return (await res.json()).data;
};
