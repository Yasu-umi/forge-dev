import fetchPonyfill from "fetch-ponyfill";
import { assertType } from "typescript-is";
import * as types from "../../../../types";
import * as utils from "../../../../utils";

export const url = ({ projectID, itemID }: { projectID: string; itemID: string }) =>
  `https://developer.api.autodesk.com/data/v1/projects/${projectID}/items/${itemID}/versions`;

export type Response = {
  jsonapi: {
    version: "1.0";
  };
  links: {
    self: {
      href: string;
    };
    first: {
      href: string;
    };
    prev: {
      href: string;
    };
    next: {
      href: string;
    };
  };
  data: types.Version[];
};

export const fetch = async (accessToken: string, { projectID, itemID }: { projectID: string; itemID: string }): Promise<Response> => {
  const { fetch } = fetchPonyfill();
  const res = await fetch(url({ projectID, itemID }), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/vnd.api+json",
    },
  });
  const body: Response = await res.json();
  body.data = body.data.map(utils.parseVersion);
  try {
    assertType<Response>(body);
  } catch (e) {
    console.log(JSON.stringify(body, null, 2));
    console.error(e);
  }
  return body;
};
