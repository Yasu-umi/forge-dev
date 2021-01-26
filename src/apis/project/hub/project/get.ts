import fetchPonyfill from "fetch-ponyfill";
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
  data: types.Project;
};

export const url = ({ hubID, projectID }: { hubID: string; projectID: string }) =>
  `https://developer.api.autodesk.com/project/v1/hubs/${hubID}/projects/${projectID}`;

export const fetch = async (accessToken: string, { hubID, projectID }: { hubID: string; projectID: string }): Promise<types.Project> => {
  const { fetch } = fetchPonyfill();
  const res = await fetch(url({ hubID, projectID }), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/vnd.api+json",
    },
  });
  const body: Response = await res.json();
  return body.data;
};
