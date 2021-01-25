import fetchPonyfill from "fetch-ponyfill";
import { assertType } from "typescript-is";
import * as types from "../types";

export type Response = {
  jsonapi: {
    version: "1.0";
  };
} & (
  | {
      links: {
        self: {
          href: string;
        };
      };
      data: types.HubData[];
    }
  | {
      errors: {
        status: string;
        code: string;
        title: string;
        detail: string;
      }[];
    }
);

export const url = "https://developer.api.autodesk.com/project/v1/hubs";

export const fetch = async (accessToken: string): Promise<types.HubData[] | undefined> => {
  const { fetch } = fetchPonyfill();
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/vnd.api+json",
    },
  });
  const body: Response = await res.json();
  if ("errors" in body) {
    body.errors.forEach((err) => console.error(err));
    return;
  }
  try {
    assertType<types.HubData[]>(body.data);
  } catch (e) {
    console.log(JSON.stringify(body.data, null, 2));
    console.error(e);
  }
  return body.data;
};
