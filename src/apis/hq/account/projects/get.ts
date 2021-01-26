import fetchPonyfill from "fetch-ponyfill";
import { assertType } from "typescript-is";
import * as types from "../../types";
import * as utils from "../../utils";

export type Response = types.Project[];

export const url = ({ accountID }: { accountID: string }) => `https://developer.api.autodesk.com/hq/v1/accounts/${accountID}/projects`;

export const fetch = async (accessToken: string, { accountID }: { accountID: string }): Promise<types.Project[]> => {
  const { fetch } = fetchPonyfill();
  const res = await fetch(url({ accountID }), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/vnd.api+json",
    },
  });
  const body: Response = await res.json();
  const data = body.map(utils.parseProject);
  try {
    assertType<types.Project[]>(data);
  } catch (e) {
    console.log(JSON.stringify(data, null, 2));
    console.error(e);
  }
  return data;
};
