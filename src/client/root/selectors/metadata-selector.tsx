import Typography from "@material-ui/core/Typography";
import React, { useCallback } from "react";
import { Selector } from "./selector";
import { Metadata } from "api/modelderivative/types";

export const MetadataSelector = ({
  metadatum,
  guid,
  onChangeGUID,
}: {
  metadatum: Metadata[] | undefined;
  guid: string | undefined;
  onChangeGUID: (guid: string) => void;
}) => {
  const getID = useCallback((object: Metadata) => object.guid, []);
  const getName = useCallback((object: Metadata) => object.name, []);
  if (!metadatum || metadatum.length === 0) return null;
  return (
    <div>
      <Typography>Netadata</Typography>
      <Selector objects={metadatum} objectID={guid} onChangeObjectID={onChangeGUID} getID={getID} getName={getName} />;
    </div>
  );
};
