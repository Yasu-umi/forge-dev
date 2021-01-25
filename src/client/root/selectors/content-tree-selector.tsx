import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { ContentData } from "../../../apis/data-management/types";
import { Selector } from "./selector";

export type ContentTree = { content?: ContentData; children: ContentTree[]; selectedID?: string };

export const findSelected = (tree: ContentTree, id?: string): ContentTree | undefined => {
  if (id) {
    if (tree.content && tree.content.id === id) return tree;
    return tree.children.find((child) => findSelected(child, id));
  } else {
    if (tree.selectedID) {
      const selectedChild = tree.children.find((child) => findSelected(child, tree.selectedID));
      return selectedChild;
    } else {
      return tree;
    }
  }
};
export const findParent = (tree: ContentTree, id: string): ContentTree | undefined => {
  if (tree?.content?.id === id) return undefined;
  if (tree.children.find((child) => child?.content?.id === id)) return tree;
  return tree.children.find((child) => findParent(child, id));
};

export const ContentTreeSelector = ({
  contentTree,
  onSelectID,
  onDeleteID,
}: {
  contentTree: ContentTree;
  onSelectID: (id: string) => void;
  onDeleteID: (id: string) => void;
}) => {
  const selected = contentTree.selectedID ? findSelected(contentTree, contentTree.selectedID) : undefined;
  return (
    <>
      <Selector<ContentTree>
        key={contentTree?.content?.id || ""}
        objectID={contentTree?.selectedID}
        getID={(tree) => tree?.content?.id || ""}
        getName={(tree) => tree?.content?.attributes.displayName || ""}
        onChangeObjectID={onSelectID}
        objects={contentTree.children}
      />
      {contentTree.content && contentTree?.selectedID ? (
        <IconButton onClick={() => (contentTree.selectedID ? onDeleteID(contentTree.selectedID) : null)}>
          <CloseIcon />
        </IconButton>
      ) : null}
      {selected ? <ContentTreeSelector contentTree={selected} onSelectID={onSelectID} onDeleteID={onDeleteID} /> : null}
    </>
  );
};
