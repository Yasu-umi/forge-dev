import fetchPonyfill from "fetch-ponyfill";
import { scope } from "../../scopes";

export type Response = {
  token_type: string;
  expires_in: number;
  access_token: string;
};

export const url = "https://developer.api.autodesk.com/authentication/v1/authenticate";

export const fetch = async (
  { clientID, clientSecret }: { clientID: string; clientSecret: string },
  scopes: scope[],
  grant_type: "client_credentials" | "code",
): Promise<Response> => {
  const { fetch } = fetchPonyfill();
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=${grant_type}&client_id=${clientID}&client_secret=${clientSecret}&scope=${scopes.join(" ")}`,
  });
  return await res.json();
};
