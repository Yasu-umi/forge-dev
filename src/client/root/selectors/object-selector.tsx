import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ReplayIcon from "@material-ui/icons/Replay";
import React, { useCallback } from "react";
import { Selector } from "./selector";
import { Metadata } from "api/modelderivative/types";

export const ObjectSelector = ({
  metadatum,
  guid,
  onChangeGUID,
  onClickReload,
}: {
  metadatum: Metadata[] | undefined;
  guid: string | undefined;
  onChangeGUID: (guid: string) => void;
  onClickReload?: () => void;
}) => {
  const getID = useCallback((object: Metadata) => object.guid, []);
  const getName = useCallback((object: Metadata) => object.name, []);
  return (
    <div style={{ display: "flex" }}>
      <div>
        <Typography>Object</Typography>
        <Selector objects={metadatum || []} objectID={guid} onChangeObjectID={onChangeGUID} getID={getID} getName={getName} />;
      </div>
      {onClickReload ? (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Button variant="contained" color="primary" disabled={!guid} startIcon={<ReplayIcon />} onClick={onClickReload}>
            Reload
          </Button>
        </div>
      ) : null}
    </div>
  );
};
