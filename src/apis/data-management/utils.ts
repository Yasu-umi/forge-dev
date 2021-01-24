import * as types from "./types";

export const parseTopFolder = (topFolder: types.TopFolderData): types.TopFolderData => ({
  ...topFolder,
  attributes: {
    ...topFolder.attributes,
    createTime: new Date(topFolder.attributes.createTime),
    lastModifiedTime: new Date(topFolder.attributes.lastModifiedTime),
  },
});

export const parseFolder = (folder: types.FolderData): types.FolderData => ({
  ...folder,
  attributes: {
    ...folder.attributes,
    createTime: new Date(folder.attributes.createTime),
    lastModifiedTime: new Date(folder.attributes.lastModifiedTime),
  },
});

export const parseContent = (content: types.ContentData): types.ContentData => {
  if (content.type === "folders") {
    return {
      ...content,
      attributes: {
        ...content.attributes,
        createTime: new Date(content.attributes.createTime),
        lastModifiedTime: new Date(content.attributes.lastModifiedTime),
        lastModifiedTimeRollup: new Date(content.attributes.lastModifiedTimeRollup),
      },
    };
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
