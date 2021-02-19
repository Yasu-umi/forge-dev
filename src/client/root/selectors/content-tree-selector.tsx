import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { Selector } from "./selector";
import { ContentType, Item } from "api/types";

export type ContentTree = { content?: ContentType; children: ContentTree[]; selectedID?: string };

export const findSelected = (tree: ContentTree, id?: string): ContentTree | undefined => {
  if (id) {
    if (tree.content && tree.content.id === id) return tree;
    return tree.children.find((child) => findSelected(child, id));
  }
  if (tree.selectedID) {
    const child = tree.children.find((child) => child.content?.id === tree.selectedID);
    if (child) return findSelected(child);
    throw new Error("NotFoundChild");
  }
  return tree;
};

export const findParent = (tree: ContentTree, id: string): ContentTree | undefined => {
  if (tree?.content?.id === id) return undefined;
  if (tree.children.find((child) => child?.content?.id === id)) return tree;
  return tree.children.find((child) => findParent(child, id));
};

export const findItems = (tree: ContentTree): Item[] => {
  const urns: Item[] = [];
  if (tree?.content?.type === "items") {
    urns.push(tree?.content);
  }
  return urns.concat(tree.children.map((child) => findItems(child)).reduce((prev, cur) => [...prev, ...cur], []));
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
        objects={contentTree.children.filter((child) => child.content?.type === "folders")}
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
