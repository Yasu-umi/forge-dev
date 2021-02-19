import React, { useCallback } from "react";
import { Selector } from "./selector";

type AttributesName = { id: string; name: string };

export const NameSelector = ({
  objects,
  objectID,
  onChangeObjectID,
}: {
  objects: AttributesName[] | undefined;
  objectID: string | undefined;
  onChangeObjectID: (id: string) => void;
}) => {
  const getID = useCallback((object: AttributesName) => object.id, []);
  const getName = useCallback((object: AttributesName) => object.name, []);
  if (!objects) return null;
  return <Selector objects={objects} objectID={objectID} onChangeObjectID={onChangeObjectID} getID={getID} getName={getName} />;
};
