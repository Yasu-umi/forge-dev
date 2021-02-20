import { useEffect, useState } from "react";
import * as api from "api";
import * as fetch from "client/fetch";

export const useVersions = ({ projectID, itemID }: { projectID: string | undefined; itemID: string | undefined }) => {
  const [versions, setVersions] = useState<api.data.project.item.versions.get.Response | undefined>(undefined);
  useEffect(() => {
    (async () => {
      if (!projectID || !itemID) return;
      const versions = await fetch.data.project.item.versions.get({ projectID, itemID });
      setVersions(versions);
    })();
  }, [projectID, itemID]);
  return [versions, setVersions];
};
