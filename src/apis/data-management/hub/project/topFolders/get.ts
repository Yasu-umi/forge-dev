import fetchPonyfill from "fetch-ponyfill";
import { assertType } from "typescript-is";
import * as types from "../../../types";
import * as utils from "../../../utils";

export type Response = {
  jsonapi: {
    version: "1.0";
  };
  links: {
    self: {
      href: "/project/v1/hubs/a.hub.id.123/projects/a.project.id.xyz/topFolders";
    };
  };
  data: types.TopFolderData[];
};

export const url = ({ hubID, projectID }: { hubID: string; projectID: string }) =>
  `https://developer.api.autodesk.com/project/v1/hubs/${hubID}/projects/${projectID}/topFolders`;

export const fetch = async (accessToken: string, { hubID, projectID }: { hubID: string; projectID: string }): Promise<types.TopFolderData[]> => {
  const { fetch } = fetchPonyfill();
  const res = await fetch(url({ hubID, projectID }), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/vnd.api+json",
    },
  });
  const body: Response = await res.json();
  const data = body.data.map((d) => utils.parseFolder(d));
  assertType<types.TopFolderData[]>(data);
  return data;
};
