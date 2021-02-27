import fetchPonyfill from "fetch-ponyfill";
import { assertType } from "typescript-is";
import * as types from "../../types";
import * as utils from "../../utils";

export type Response = types.Project;

export const url = ({ accountID, projectID }: { accountID: string; projectID: string }) =>
  `https://developer.api.autodesk.com/hq/v1/accounts/${accountID}/projects/${projectID}`;

export const fetch = async (accessToken: string, { accountID, projectID }: { accountID: string; projectID: string }): Promise<Response> => {
  const { fetch } = fetchPonyfill();
  const res = await fetch(url({ accountID, projectID }), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const body: Response = await res.json();
  const data = utils.parseProject(body);
  try {
    assertType<types.Project>(data);
  } catch (e) {
    console.log(JSON.stringify(data, null, 2));
    console.error(e);
  }
  return data;
};
