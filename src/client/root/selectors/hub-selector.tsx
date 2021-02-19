import Typography from "@material-ui/core/Typography";
import React from "react";
import { AttributesNameSelector } from "./attributes-name-selector";
import { Hub } from "api/types";

export const HubSelector = ({
  hubs,
  hubID,
  onChangeHubID,
}: {
  hubs: Hub[] | undefined;
  hubID: string | undefined;
  onChangeHubID: (id: string) => void;
}) => {
  if (!hubs || hubs.length === 0 || !hubID) return null;
  return (
    <div>
      <Typography>Hub</Typography>
      <AttributesNameSelector objectID={hubID} onChangeObjectID={onChangeHubID} objects={hubs} />
    </div>
  );
};
