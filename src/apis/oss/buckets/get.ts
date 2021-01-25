import fetchPonyfill from "fetch-ponyfill";
import { assertType } from "typescript-is";
import * as types from "../types";

export type Response = {
  items: types.BucketData[];
  next?: string;
};

export const url = "https://developer.api.autodesk.com/oss/v2/buckets";

export const fetch = async (accessToken: string): Promise<types.BucketData[]> => {
  const { fetch } = fetchPonyfill();
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/vnd.api+json",
    },
  });
  const body: Response = await res.json();
  try {
    assertType<types.BucketData[]>(body.items);
  } catch (e) {
    console.log(JSON.stringify(body.items, null, 2));
    console.error(e);
  }
  return body.items;
};
