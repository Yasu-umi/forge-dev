import * as types from "./types";

export const parseTopFolder = (topFolder: types.TopFolderData): types.TopFolderData => ({
  ...topFolder,
  attributes: {
    ...topFolder.attributes,
    createTime: new Date(topFolder.attributes.createTime),
    lastModifiedTime: new Date(topFolder.attributes.lastModifiedTime),
  },
});
