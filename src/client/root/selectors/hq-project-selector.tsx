import Typography from "@material-ui/core/Typography";
import React from "react";
import { NameSelector } from "./name-selector";
import { Project } from "api/hq/types";

export const HQProjectSelector = ({
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
      <NameSelector objects={projects} objectID={projectID} onChangeObjectID={onChangeProjectID} />
    </div>
  );
};
