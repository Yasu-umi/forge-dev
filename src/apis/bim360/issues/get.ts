import fetchPonyfill from "fetch-ponyfill";
import * as types from "../types";

export type Response = {
  data: types.IssueData[];
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

export const fetch = async (accessToken: string, { issueContainerID }: { issueContainerID: string }): Promise<types.IssueData[]> => {
  const { fetch } = fetchPonyfill();
  const res = await fetch(url({ issueContainerID }), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/vnd.api+json",
    },
  });
  const body: Response = await res.json();
  return body.data;
};
