import { Project } from "./types";

export const getAccountID = (hubID: string) => hubID.replace(/^b./, "");
export const getHubID = (accountID: string) => `b.${accountID}`;

export const parseProject = (project: Project): Project => ({
  ...project,
  start_date: project.start_date ? new Date(project.start_date) : null,
  end_date: project.end_date ? new Date(project.end_date) : null,
  last_sign_in: project.last_sign_in ? new Date(project.last_sign_in) : null,
  created_at: new Date(project.created_at),
  updated_at: new Date(project.updated_at),
});
