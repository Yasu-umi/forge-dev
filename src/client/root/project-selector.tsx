import { makeStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React from "react";
import { ProjectData } from "../../apis/data-management/types";

const useStyles = makeStyles((theme) => ({
  projectSelectorRoot: {
    minWidth: theme.spacing(15),
    color: theme.palette.primary.contrastText,
  },
  projectSelectorIcon: {
    color: theme.palette.primary.contrastText,
  },
  projectSelectorWrapperRoot: {
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

export const ProjectSelector = ({
  projects,
  projectID,
  onChangeprojectID,
}: {
  projects: ProjectData[];
  projectID: string | undefined;
  onChangeprojectID: (ev: React.ChangeEvent<{ value: unknown }>) => void;
}) => {
  const styles = useStyles();
  if (projects.length === 0 || !projectID) return null;
  return (
    <FormControl classes={{ root: styles.projectSelectorWrapperRoot }}>
      <Select value={projectID} onChange={onChangeprojectID} classes={{ root: styles.projectSelectorRoot, icon: styles.projectSelectorIcon }}>
        {projects.map((project) => (
          <MenuItem key={project.id} value={project.id}>
            {project.attributes.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
