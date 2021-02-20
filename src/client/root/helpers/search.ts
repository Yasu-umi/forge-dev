import queryString from "query-string";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export const useHubID = () => {
  const { search } = useLocation();
  const hubID = useMemo(() => {
    const query = queryString.parse(search);
    return typeof query["hubID"] === "string" ? query["hubID"] : undefined;
  }, [search]);
  return hubID;
};

export const useProjectID = () => {
  const { search } = useLocation();
  const projectID = useMemo(() => {
    const query = queryString.parse(search);
    return typeof query["projectID"] === "string" ? query["projectID"] : undefined;
  }, [search]);
  return projectID;
};

export const useFolderID = () => {
  const { search } = useLocation();
  const folderID = useMemo(() => {
    const query = queryString.parse(search);
    return typeof query["folderID"] === "string" ? query["folderID"] : "hoge";
  }, [search]);
  return folderID;
};
