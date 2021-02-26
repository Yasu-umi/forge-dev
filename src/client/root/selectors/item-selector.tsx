import Typography from "@material-ui/core/Typography";
import React from "react";
import { AttributesDisplayNameSelector } from "./attributes-display-name-selector";
import { Item } from "api/types";

export const ItemSelector = ({
  items,
  itemID,
  onChangeItemID,
}: {
  items: Item[] | undefined;
  itemID: string | undefined;
  onChangeItemID: (id: string) => void;
}) => {
  return (
    <div>
      <Typography>Item</Typography>
      <AttributesDisplayNameSelector objects={items} objectID={itemID} onChangeObjectID={onChangeItemID} />
    </div>
  );
};
