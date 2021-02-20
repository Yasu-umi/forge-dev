import Typography from "@material-ui/core/Typography";
import React, { useCallback } from "react";
import { findSelected, findParent, ContentTreeSelector, ContentTree } from "./content-tree-selector";
import * as fetch from "client/fetch";

export const FolderSelector = ({
  projectID,
  contentTree,
  onChangeFolderID,
  setContentTree,
}: {
  projectID: string | undefined;
  contentTree: ContentTree;
  onChangeFolderID: (id: string) => void;
  setContentTree: (contentTree: ContentTree) => void;
}) => {
  const onSelect = useCallback(
    (projectID: string, contentTree: ContentTree, id: string) => {
      (async () => {
        const parent = findParent(contentTree, id);
        if (parent?.selectedID === id) return;
        const idx = parent ? parent.children.findIndex((child) => child?.content?.id === id) : undefined;
        if (!parent || typeof idx !== "number") return;
        const selected = parent.children[idx];
        if (!projectID || !selected) return;
        parent.selectedID = id;
        const contents = await fetch.data.project.folder.contents.get({ projectID, folderID: id });
        selected.children = contents.data.map((content) => ({ content, children: [] }));
        parent.children[idx] = { ...selected };
        parent.children = [...parent.children];
        setContentTree({ ...contentTree });
        onChangeFolderID(id);
      })();
    },
    [setContentTree, onChangeFolderID],
  );
  const onSelectID = useCallback(
    (id: string) => {
      projectID ? onSelect(projectID, contentTree, id) : null;
    },
    [projectID, contentTree, onSelect],
  );
  const onDeleteID = React.useCallback(
    (id: string) => {
      const selected = findSelected(contentTree, id);
      if (!selected) return;
      delete selected?.selectedID;
      const parent = findParent(selected, id);
      const idx = parent ? parent.children.findIndex((child) => child?.content?.id === id) : undefined;
      if (parent && idx) {
        parent.children[idx] = { ...parent.children[idx] };
        parent.children = [...parent.children];
      }
      setContentTree({ ...contentTree });
      onChangeFolderID(id);
    },
    [contentTree, onChangeFolderID, setContentTree],
  );
  return (
    <div>
      <Typography>Folder</Typography>
      <ContentTreeSelector contentTree={contentTree} onSelectID={onSelectID} onDeleteID={onDeleteID} />
    </div>
  );
};
