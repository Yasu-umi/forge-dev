import * as api from "api";
import { urls } from "lib";

export const get = async (): Promise<api.oss.buckets.get.Response> => {
  const res = await fetch(urls.api.oss.buckets.get);
  return (await res.json()).data;
};
