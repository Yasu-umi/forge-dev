import fetchPonyfill from "fetch-ponyfill";
import { assertType } from "typescript-is";
import * as types from "../../../types";
import * as utils from "../../../utils";

export const url = ({ projectID, folderID }: { projectID: string; folderID: string }) =>
  `https://developer.api.autodesk.com/data/v1/projects/${projectID}/folders/${folderID}`;

export type Response = {
  jsonapi: {
    version: "1.0";
  };
  links: {
    self: {
      href: string;
    };
  };
  data: types.Folder;
};

export const fetch = async (accessToken: string, { projectID, folderID }: { projectID: string; folderID: string }): Promise<Response> => {
  const { fetch } = fetchPonyfill();
  const res = await fetch(url({ projectID, folderID }), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const body: Response = await res.json();
  body.data = utils.parseFolder(body.data);
  try {
    assertType<Response>(body);
  } catch (e) {
    console.log(JSON.stringify(body, null, 2));
    console.error(e);
  }
  return body;
};
