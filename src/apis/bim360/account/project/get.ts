import fetchPonyfill from "fetch-ponyfill";
import { assertType } from "typescript-is";
import * as types from "../../types";
import * as utils from "../../utils";

export type Response = types.ProjectData;

export const url = ({ accountID, projectID }: { accountID: string; projectID: string }) =>
  `https://developer.api.autodesk.com/hq/v1/accounts/${accountID}/projects/${projectID}`;

export const fetch = async (accessToken: string, { accountID, projectID }: { accountID: string; projectID: string }): Promise<types.ProjectData> => {
  const { fetch } = fetchPonyfill();
  const res = await fetch(url({ accountID, projectID }), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/vnd.api+json",
    },
  });
  const body: Response = await res.json();
  const data = utils.parseProjectData(body);
  assertType<types.ProjectData>(data);
  return data;
};
