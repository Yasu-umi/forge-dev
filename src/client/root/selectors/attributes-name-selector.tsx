import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React from "react";
import { useStyles } from "./style";

export const AttributesNameSelector = ({
  objects,
  objectID,
  onChangeObjectID,
}: {
  objects: { id: string; attributes: { name: string } }[];
  objectID: string | undefined;
  onChangeObjectID: (ev: React.ChangeEvent<{ value: unknown }>) => void;
}) => {
  const styles = useStyles();
  if (objects.length === 0 || !objectID) return null;
  return (
    <FormControl classes={{ root: styles.selectorWrapperRoot }}>
      <Select value={objectID} onChange={onChangeObjectID} classes={{ root: styles.selectorRoot, icon: styles.selectorIcon }}>
        {objects.map((object) => (
          <MenuItem key={object.id} value={object.id}>
            {object.attributes.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
