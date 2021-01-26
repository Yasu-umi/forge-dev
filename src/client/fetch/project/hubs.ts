import { Hub } from "../../../apis/types";
import { urls } from "../../../lib";

export const get = async (): Promise<Hub[]> => {
  const res = await fetch(urls.api.project.hubs.get);
  return (await res.json()).data;
};
