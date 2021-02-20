import { useEffect, useState } from "react";
import * as api from "api";
import * as fetch from "client/fetch";

export const useIssues = ({ issueContainerID }: { issueContainerID: string | undefined }) => {
  const [issues, setIssues] = useState<api.issues.container.qualityIssues.get.Response | undefined>(undefined);

  useEffect(() => {
    (async () => {
      if (!issueContainerID) return;
      const issues = await fetch.issues.container.qualityIssues.get({ issueContainerID });
      setIssues(issues);
    })();
  }, [issueContainerID]);
  return [issues, setIssues] as const;
};
