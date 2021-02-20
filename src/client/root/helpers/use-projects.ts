import { useEffect, useState } from "react";
import * as api from "api";
import * as fetch from "client/fetch";

export const useProjects = ({ hubID }: { hubID: string | undefined }) => {
  const [hubs, setProjects] = useState<api.project.hub.projects.get.Response | undefined>(undefined);
  useEffect(() => {
    (async () => {
      if (!hubID) return;
      const projects = await fetch.project.hub.projects.get({ hubID });
      setProjects(projects);
    })();
  }, [hubID]);
  return [hubs, setProjects] as const;
};
