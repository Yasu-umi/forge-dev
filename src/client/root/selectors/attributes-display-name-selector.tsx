import React, { useCallback } from "react";
import { Selector } from "./selector";

type AttributesDisplayName = { id: string; attributes: { displayName: string } };

export const AttributesDisplayNameSelector = ({
  objects,
  objectID,
  onChangeObjectID,
}: {
  objects: AttributesDisplayName[] | undefined;
  objectID: string | undefined;
  onChangeObjectID: (id: string) => void;
}) => {
  const getID = useCallback((object: AttributesDisplayName) => object.id, []);
  const getName = useCallback((object: AttributesDisplayName) => object.attributes.displayName, []);
  return <Selector objects={objects || []} objectID={objectID} onChangeObjectID={onChangeObjectID} getID={getID} getName={getName} />;
};
