import { useEffect, useState } from "react";
import * as api from "api";
import * as fetch from "client/fetch";

export const useProperties = ({ urn, guid }: { urn: string | undefined; guid: string | undefined }) => {
  const [properties, setProperties] = useState<api.modelderivative.designdata.metadata.objects.properties.get.Response | undefined>(undefined);
  useEffect(() => {
    (async () => {
      if (!urn || !guid) return;
      const properties = await fetch.modelderivative.designdata.metadata.objects.properties.get({ urn, guid });
      setProperties(properties);
    })();
  }, [urn, guid]);
  return [properties, setProperties] as const;
};
