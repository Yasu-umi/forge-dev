import * as types from "./types";

export const parseFolder = (folder: types.FolderData): types.FolderData => ({
  ...folder,
  attributes: {
    ...folder.attributes,
    createTime: new Date(folder.attributes.createTime),
    lastModifiedTime: new Date(folder.attributes.lastModifiedTime),
    lastModifiedTimeRollup: folder.attributes.lastModifiedTimeRollup ? new Date(folder.attributes.lastModifiedTimeRollup) : undefined,
  },
});

export const parseContent = (content: types.ContentData): types.ContentData => {
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
    return {
      ...content,
      attributes: {
        ...content.attributes,
        createTime: new Date(content.attributes.createTime),
        lastModifiedTime: new Date(content.attributes.lastModifiedTime),
      },
    };
  }
  return content;
};
