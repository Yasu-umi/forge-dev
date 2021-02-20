import { useEffect, useState } from "react";
import * as api from "api";
import * as fetch from "client/fetch";

export const useBuckets = () => {
  const [buckets, setBuckets] = useState<api.oss.buckets.get.Response | undefined>(undefined);
  useEffect(() => {
    (async () => {
      setBuckets(await fetch.oss.buckets.get());
    })();
  }, []);
  return [buckets, setBuckets] as const;
};
