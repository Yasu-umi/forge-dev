import { useEffect, useState } from "react";
import * as api from "api";
import * as fetch from "client/fetch";

export const useHubs = () => {
  const [hubs, setHubs] = useState<api.project.hubs.get.Response | undefined>(undefined);
  useEffect(() => {
    (async () => {
      const hubs = await fetch.project.hubs.get();
      setHubs(hubs);
    })();
  }, []);
  return [hubs, setHubs] as const;
};
