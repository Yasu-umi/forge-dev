import Typography from "@material-ui/core/Typography";
import React from "react";
import { AttributesNameSelector } from "./attributes-name-selector";
import { Project } from "api/types";

export const ProjectSelector = ({
  projects,
  projectID,
  onChangeProjectID,
}: {
  projects: Project[] | undefined;
  projectID: string | undefined;
  onChangeProjectID: (id: string) => void;
}) => {
  if (!projects || projects.length === 0) return null;
  return (
    <div>
      <Typography>Hub</Typography>
      <AttributesNameSelector objects={projects} objectID={projectID} onChangeObjectID={onChangeProjectID} />
    </div>
  );
};
