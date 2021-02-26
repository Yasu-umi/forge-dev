import * as api from "api";
import { urls } from "lib";
export * from "./_metadata";

export const get = async ({ urn }: { urn: string }): Promise<api.modelderivative.designdata.metadata.get.Response> => {
  const res = await fetch(urls.api.modelderivative.designdata.metadata.get({ urn: api.utils.base64Encode(urn) }));
  return (await res.json()).data;
};
