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

export const fetch = async (accessToken: string, { urn }: { urn: string }): Promise<types.Metadata[]> => {
  const { fetch } = fetchPonyfill();
  const res = await fetch(url({ urn: base64Encode(urn) }), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/vnd.api+json",
    },
  });
  const body: Response = await res.json();
  const data = body.data.metadata;
  try {
    assertType<types.Metadata[]>(data);
  } catch (e) {
    console.log(JSON.stringify(data, null, 2));
    console.error(e);
  }
  return data;
};
