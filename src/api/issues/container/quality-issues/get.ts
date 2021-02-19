import fetchPonyfill from "fetch-ponyfill";
import { assertType } from "typescript-is";
import * as types from "../../../types";
import * as utils from "../../../utils";

export type Response = {
  data: types.Issue[];
  meta: {
    page: {
      offset: number;
      limit: number;
    };
    record_count: number;
  };
  links: {
    first: string;
    last: string;
  };
};

export const url = ({ issueContainerID }: { issueContainerID: string }) =>
  `https://developer.api.autodesk.com/issues/v1/containers/${issueContainerID}/quality-issues`;

export const fetch = async (accessToken: string, { issueContainerID }: { issueContainerID: string }): Promise<Response> => {
  const { fetch } = fetchPonyfill();
  const res = await fetch(url({ issueContainerID }), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/vnd.api+json",
    },
  });
  const body: Response = await res.json();
  body.data = body.data.map((d) => utils.parseIssue(d));
  try {
    assertType<Response>(body);
  } catch (e) {
    console.log(JSON.stringify(body, null, 2));
    console.error(e);
  }
  return body;
};
