import fetchPonyfill from "fetch-ponyfill";
import { assertType } from "typescript-is";
import * as types from "../../types";

export type Response = {
  jsonapi: {
    version: "1.0";
  };
  links: {
    self: {
      href: string;
    };
  };
  data: types.ProjectData[];
};

export const url = ({ hubID }: { hubID: string }) => `https://developer.api.autodesk.com/project/v1/hubs/${hubID}/projects`;

export const fetch = async (accessToken: string, { hubID }: { hubID: string }): Promise<types.ProjectData[]> => {
  const { fetch } = fetchPonyfill();
  const res = await fetch(url({ hubID }), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/vnd.api+json",
    },
  });
  const body: Response = await res.json();
  try {
    assertType<types.ProjectData[]>(body.data);
  } catch (e) {
    console.log(JSON.stringify(body.data, null, 2));
    console.error(e);
  }
  return body.data;
};
