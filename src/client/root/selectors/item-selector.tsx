import React, { useCallback } from "react";
import { Item } from "../../../apis/types";
import { Selector } from "./selector";

export const ItemSelector = ({
  items,
  itemID,
  onChangeItemID,
}: {
  items: Item[];
  itemID: string | undefined;
  onChangeItemID: (id: string) => void;
}) => {
  const getID = useCallback((item: Item) => item.id, []);
  const getName = useCallback((item: Item) => item.attributes.displayName, []);
  return <Selector objects={items} objectID={itemID} onChangeObjectID={onChangeItemID} getID={getID} getName={getName} />;
};
