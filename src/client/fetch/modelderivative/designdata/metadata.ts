import { Metadata } from "../../../../apis/modelderivative/types";
import { urls } from "../../../../lib";

export const get = async ({ urn }: { urn: string }): Promise<Metadata> => {
  const res = await fetch(urls.api.modelderivative.designdata.metadata.get({ urn }));
  return (await res.json()).data;
};
