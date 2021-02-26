import * as types from "./types";

export const parseContentIncluded = (contentIncluded: types.ContentIncluded): types.ContentIncluded => ({
  ...contentIncluded,
  attributes: {
    ...contentIncluded.attributes,
    createTime: new Date(contentIncluded.attributes.createTime),
    lastModifiedTime: new Date(contentIncluded.attributes.lastModifiedTime),
  },
});

export const parseFolder = (folder: types.Folder): types.Folder => ({
  ...folder,
  attributes: {
    ...folder.attributes,
    createTime: new Date(folder.attributes.createTime),
    lastModifiedTime: new Date(folder.attributes.lastModifiedTime),
    lastModifiedTimeRollup: folder.attributes.lastModifiedTimeRollup ? new Date(folder.attributes.lastModifiedTimeRollup) : undefined,
  },
});

export const parseVersion = (version: types.Version): types.Version => ({
  ...version,
  attributes: {
    ...version.attributes,
    createTime: new Date(version.attributes.createTime),
    lastModifiedTime: new Date(version.attributes.lastModifiedTime),
  },
});

export const parseContent = (content: types.ContentType): types.ContentType => {
  if (content.type === "folders") {
    return parseFolder(content);
  }
  if (content.type === "items") {
    return {
      ...content,
      attributes: {
        ...content.attributes,
        createTime: new Date(content.attributes.createTime),
        lastModifiedTime: new Date(content.attributes.lastModifiedTime),
      },
    };
  }
  if (content.type === "versions") {
    return parseVersion(content);
  }
  return content;
};

export const parseIssue = (issue: types.Issue): types.Issue => ({
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

export const getIssueContainerID = (project: types.Project) => project?.relationships.issues.data.id;

export const getURN = (item: types.Item) => item.relationships.tip.data.id;

export const base64Encode = (val: string) =>
  (globalThis.btoa ? globalThis.btoa(val) : Buffer.from(val, "utf8").toString("base64")).replace("+", "-").replace("/", "_").replace("=", "");

export const base64Decode = (val: string) =>
  globalThis.atob
    ? globalThis.atob(val.replace("-", "+").replace("_", "/"))
    : Buffer.from(val.replace("-", "+").replace("_", "/"), "base64").toString("ascii");
