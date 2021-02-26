import { useEffect, useState } from "react";
import * as api from "api";
import * as fetch from "client/fetch";

export const useMetadata = ({ urn }: { urn: string | undefined }) => {
  const [metadata, setMetadata] = useState<api.modelderivative.designdata.metadata.get.Response | undefined>(undefined);
  useEffect(() => {
    (async () => {
      if (!urn) return;
      const metadata = await fetch.modelderivative.designdata.metadata.get({ urn });
      setMetadata(metadata);
    })();
  }, [urn]);
  return [metadata, setMetadata] as const;
};
