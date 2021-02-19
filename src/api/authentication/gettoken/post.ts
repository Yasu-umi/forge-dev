import fetchPonyfill from "fetch-ponyfill";

export type Response = {
  token_type: string;
  expires_in: number;
  refresh_token: string;
  access_token: string;
};

export const url = "https://developer.api.autodesk.com/authentication/v1/gettoken";

export const fetch = async ({
  code,
  clientID,
  clientSecret,
  redirectURI,
}: {
  code: string;
  clientID: string;
  clientSecret: string;
  redirectURI: string;
}): Promise<Response> => {
  const { fetch } = fetchPonyfill();
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=authorization_code&code=${code}&client_id=${clientID}&client_secret=${clientSecret}&redirect_uri=${redirectURI}`,
  });
  return await res.json();
};
