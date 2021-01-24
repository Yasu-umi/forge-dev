import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React from "react";
import { FolderData } from "../../../apis/data-management/types";
import { useStyles } from "./style";

export const FolderSelector = ({
  folders,
  folderID,
  onChangeFolderID,
}: {
  folders: FolderData[];
  folderID: string | undefined;
  onChangeFolderID: (ev: React.ChangeEvent<{ value: unknown }>) => void;
}) => {
  const styles = useStyles();
  if (folders.length === 0 || !folderID) return null;
  return (
    <FormControl classes={{ root: styles.selectorWrapperRoot }}>
      <Select value={folderID} onChange={onChangeFolderID} classes={{ root: styles.selectorRoot, icon: styles.selectorIcon }}>
        {folders.map((folder) => (
          <MenuItem key={folder.id} value={folder.id}>
            {folder.attributes.displayName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
