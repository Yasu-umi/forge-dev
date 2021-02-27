import fetchPonyfill from "fetch-ponyfill";
import { assertType } from "typescript-is";
import { base64Encode } from "../../../../../utils";
import * as types from "../../../../types";

export type Response =
  | {
      data: {
        type: "properties";
        collection: types.Property[];
      };
    }
  | {
      result: "success";
    }
  | { diagnostic: string };

export const url = ({ urn, guid }: { urn: string; guid: string }) =>
  `https://developer.api.autodesk.com/modelderivative/v2/designdata/${urn}/metadata/${guid}/properties`;

export const fetch = async (accessToken: string, { urn, guid }: { urn: string; guid: string }): Promise<Response> => {
  const { fetch } = fetchPonyfill();
  const res = await fetch(url({ urn: base64Encode(urn), guid }), {
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
