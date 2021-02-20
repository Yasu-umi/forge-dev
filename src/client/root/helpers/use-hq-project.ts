import { useEffect, useState } from "react";
import * as api from "api";
import * as fetch from "client/fetch";

export const useHQProject = ({ accountID, projectID }: { accountID: string | undefined; projectID: string | undefined }) => {
  const [project, setProject] = useState<api.hq.account.project.get.Response | undefined>(undefined);
  useEffect(() => {
    (async () => {
      if (!accountID || !projectID) return;
      const project = await fetch.hq.account.project.get({ accountID, projectID });
      setProject(project);
    })();
  }, [accountID, projectID]);
  return [project, setProject] as const;
};
