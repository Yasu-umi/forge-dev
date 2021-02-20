import { useEffect, useState } from "react";
import * as api from "api";
import * as fetch from "client/fetch";

export const useHQProjects = ({ accountID }: { accountID: string | undefined }) => {
  const [hubs, setProjects] = useState<api.hq.account.projects.get.Response | undefined>(undefined);
  useEffect(() => {
    (async () => {
      if (!accountID) return;
      const projects = await fetch.hq.account.projects.get({ accountID });
      setProjects(projects);
    })();
  }, [accountID]);
  return [hubs, setProjects] as const;
};
