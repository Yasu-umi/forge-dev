import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React, { useCallback } from "react";
import { useStyles } from "./style";

export const Selector = <T,>({
  objects,
  objectID,
  getID,
  getName,
  onChangeObjectID,
}: {
  objects: T[];
  objectID: string | undefined;
  getID: (object: T) => string;
  getName: (object: T) => string;
  onChangeObjectID: (id: string) => void;
}) => {
  const styles = useStyles();
  const onChange = useCallback(
    (ev: React.ChangeEvent<{ value: unknown }>) => {
      const id = ev.target.value;
      console.log("ev.target.value", ev.target.value);
      if (typeof id === "string") onChangeObjectID(id);
    },
    [onChangeObjectID],
  );
  return (
    <FormControl classes={{ root: styles.selectorWrapperRoot }}>
      <Select
        disabled={objects.length === 0}
        value={objectID || ""}
        onChange={onChange}
        classes={{ root: styles.selectorRoot, icon: styles.selectorIcon }}
      >
        {objects.map((object) => (
          <MenuItem key={getID(object)} value={getID(object)} data-value={getID(object)}>
            {getName(object)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
