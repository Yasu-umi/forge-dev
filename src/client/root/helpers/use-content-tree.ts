import { useEffect, useState } from "react";
import * as fetch from "client/fetch";
import { ContentTree } from "client/root/selectors";

export const useContentTree = ({ hubID, projectID }: { hubID: string | undefined; projectID: string | undefined }) => {
  const [contentTree, setContentTree] = useState<ContentTree>({ children: [] });
  useEffect(() => {
    (async () => {
      if (!hubID || !projectID) return;
      const topFolders = await fetch.project.hub.project.topFolders.get({ hubID, projectID });
      const contentTree: ContentTree = { children: topFolders.data.map((content) => ({ content, children: [] })) };
      setContentTree(contentTree);
    })();
  }, [hubID, projectID]);
  return [contentTree, setContentTree] as const;
};
