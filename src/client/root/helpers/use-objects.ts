import { useEffect, useState } from "react";
import * as api from "api";
import * as fetch from "client/fetch";

export const useObjects = ({ urn, guid }: { urn: string | undefined; guid: string | undefined }) => {
  const [objects, setObjects] = useState<api.modelderivative.designdata.metadata.objects.get.Response | undefined>(undefined);
  useEffect(() => {
    (async () => {
      if (!urn || !guid) return;
      const objects = await fetch.modelderivative.designdata.metadata.objects.get({ urn, guid });
      setObjects(objects);
    })();
  }, [urn, guid]);
  return [objects, setObjects];
};
