import * as api from "api";
import { urls } from "lib";
export * from "./_objects";

export const get = async ({ urn, guid }: { urn: string; guid: string }): Promise<api.modelderivative.designdata.metadata.objects.get.Response> => {
  const res = await fetch(urls.api.modelderivative.designdata.metadata.objects.get({ urn: api.utils.base64Encode(urn), guid }));
  return (await res.json()).data;
};
