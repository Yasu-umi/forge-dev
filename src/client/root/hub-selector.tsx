import { makeStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React from "react";
import { HubData } from "../../apis/data-management/types";

const useStyles = makeStyles((theme) => ({
  hubSelectorRoot: {
    minWidth: theme.spacing(15),
    color: theme.palette.primary.contrastText,
  },
  hubSelectorIcon: {
    color: theme.palette.primary.contrastText,
  },
  hubSelectorWrapperRoot: {
    "& .MuiInput-underline:before": {
      borderBottomColor: theme.palette.primary.contrastText,
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: theme.palette.primary.contrastText,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: theme.palette.primary.contrastText,
    },
  },
}));

export const HubSelector = ({
  hubs,
  hubID,
  onChangeHubID,
}: {
  hubs: HubData[];
  hubID: string | undefined;
  onChangeHubID: (ev: React.ChangeEvent<{ value: unknown }>) => void;
}) => {
  const styles = useStyles();
  if (hubs.length === 0 || !hubID) return null;
  return (
    <FormControl classes={{ root: styles.hubSelectorWrapperRoot }}>
      <Select value={hubID} onChange={onChangeHubID} classes={{ root: styles.hubSelectorRoot, icon: styles.hubSelectorIcon }}>
        {hubs.map((hub) => (
          <MenuItem key={hub.id} value={hub.id}>
            {hub.attributes.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
