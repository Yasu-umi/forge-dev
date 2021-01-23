import { HubData } from "../../../apis/data-management/types";
import { urls } from "../../../lib";

export const get = async (): Promise<HubData[]> => {
  const res = await fetch(urls.api.dataManagement.hubs.get);
  return (await res.json()).data;
};
