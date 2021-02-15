import { Metadata } from "../../../../apis/modelderivative/types";
import { base64Encode } from "../../../../apis/utils";
import { urls } from "../../../../lib";

export const get = async ({ urn }: { urn: string }): Promise<Metadata[]> => {
  const res = await fetch(urls.api.modelderivative.designdata.metadata.get({ urn: base64Encode(urn) }));
  return (await res.json()).data;
};
