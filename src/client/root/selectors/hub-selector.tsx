import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React from "react";
import { Hub } from "../../../apis/types";
import { useStyles } from "./style";

export const HubSelector = ({
  hubs,
  hubID,
  onChangeHubID,
}: {
  hubs: Hub[];
  hubID: string | undefined;
  onChangeHubID: (ev: React.ChangeEvent<{ value: unknown }>) => void;
}) => {
  const styles = useStyles();
  if (hubs.length === 0 || !hubID) return null;
  return (
    <FormControl classes={{ root: styles.selectorWrapperRoot }}>
      <Select value={hubID} onChange={onChangeHubID} classes={{ root: styles.selectorRoot, icon: styles.selectorIcon }}>
        {hubs.map((hub) => (
          <MenuItem key={hub.id} value={hub.id}>
            {hub.attributes.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
