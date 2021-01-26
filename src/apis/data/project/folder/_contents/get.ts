import fetchPonyfill from "fetch-ponyfill";
import { assertType } from "typescript-is";
import * as types from "../../../../types";
import * as utils from "../../../../utils";

export const url = ({ projectID, folderID }: { projectID: string; folderID: string }) =>
  `https://developer.api.autodesk.com/data/v1/projects/${projectID}/folders/${folderID}/contents`;

export type Response = {
  jsonapi: {
    version: "1.0";
  };
  links: {
    self: {
      href: string;
    };
    first?: {
      href: string;
    };
    prev?: {
      href: string;
    };
    next?: {
      href: string;
    };
  };
  data: types.ContentData[];
  included?: types.ContentIncludedData[];
};

export const fetch = async (accessToken: string, { projectID, folderID }: { projectID: string; folderID: string }): Promise<types.ContentData[]> => {
  const { fetch } = fetchPonyfill();
  const res = await fetch(url({ projectID, folderID }), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/vnd.api+json",
    },
  });
  const body: Response = await res.json();
  const data = body.data.map((d) => utils.parseContent(d));
  for (const d of data) {
    try {
      assertType<types.ContentData>(d);
    } catch (e) {
      console.log(JSON.stringify(d, null, 2));
      console.error(e);
    }
  }
  return data;
};