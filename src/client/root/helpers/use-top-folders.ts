import { useEffect, useState } from "react";
import * as api from "api";
import * as fetch from "client/fetch";

export const useTopFolders = ({ hubID, projectID }: { hubID: string | undefined; projectID: string | undefined }) => {
  const [topFolders, setTopFolders] = useState<api.project.hub.project.topFolders.get.Response | undefined>(undefined);
  useEffect(() => {
    (async () => {
      if (!hubID || !projectID) return;
      const topFolders = await fetch.project.hub.project.topFolders.get({ hubID, projectID });
      setTopFolders(topFolders);
    })();
  }, [hubID, projectID]);
  return [topFolders, setTopFolders] as const;
};
