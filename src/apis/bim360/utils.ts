import { IssueData, ProjectData } from "./types";

export const getAccountID = (hubID: string) => hubID.replace(/^b./, "");

export const parseProjectData = (project: ProjectData): ProjectData => ({
  ...project,
  start_date: project.start_date ? new Date(project.start_date) : null,
  end_date: project.end_date ? new Date(project.end_date) : null,
  last_sign_in: project.last_sign_in ? new Date(project.last_sign_in) : null,
  created_at: new Date(project.created_at),
  updated_at: new Date(project.updated_at),
});

export const parseIssueData = (issue: IssueData): IssueData => ({
  ...issue,
  attributes: {
    ...issue.attributes,
    created_at: new Date(issue.attributes.created_at),
    synced_at: new Date(issue.attributes.synced_at),
    updated_at: new Date(issue.attributes.updated_at),
    closed_at: issue.attributes.closed_at ? new Date(issue.attributes.closed_at) : null,
    due_date: new Date(issue.attributes.due_date),
    answered_at: issue.attributes.answered_at ? new Date(issue.attributes.answered_at) : null,
    pushpin_attributes: issue.attributes.pushpin_attributes
      ? {
          ...issue.attributes.pushpin_attributes,
          created_at: new Date(issue.attributes.pushpin_attributes.created_at),
        }
      : null,
  },
});
