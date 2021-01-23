import { BucketData } from "../../../apis/oss/types";
import { urls } from "../../../lib";

export const get = async (): Promise<BucketData[]> => {
  const res = await fetch(urls.api.oss.buckets.get);
  return (await res.json()).data;
};
