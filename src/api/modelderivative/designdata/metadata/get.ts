import fetchPonyfill from "fetch-ponyfill";
import { assertType } from "typescript-is";
import { base64Encode } from "../../../utils";
import * as types from "../../types";

export type Response = {
  data: {
    type: "metadata";
    metadata: types.Metadata[];
  };
};

export const url = ({ urn }: { urn: string }) => `https://developer.api.autodesk.com/modelderivative/v2/designdata/${urn}/metadata`;

export const fetch = async (accessToken: string, { urn }: { urn: string }): Promise<Response> => {
  const { fetch } = fetchPonyfill();
  const res = await fetch(url({ urn: base64Encode(urn) }), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/vnd.api+json",
      "Accept-Encoding": "*",
    },
  });
  const body: Response = await res.json();
  try {
    assertType<Response>(body);
  } catch (e) {
    console.log(JSON.stringify(body, null, 2));
    console.error(e);
  }
  return body;
};
