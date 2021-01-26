import fetchPonyfill from "fetch-ponyfill";
import { assertType } from "typescript-is";
import * as types from "../../types";

export type Response = types.Metadata;

export const url = ({ urn }: { urn: string }) => `https://developer.api.autodesk.com/modelderivative/v2/designdata/${urn}/metadata`;

export const fetch = async (accessToken: string, { urn }: { urn: string }): Promise<types.Metadata> => {
  const { fetch } = fetchPonyfill();
  const res = await fetch(url({ urn }), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/vnd.api+json",
    },
  });
  const body: Response = await res.json();
  try {
    assertType<types.Metadata[]>(body);
  } catch (e) {
    console.log(JSON.stringify(body, null, 2));
    console.error(e);
  }
  return body;
};
