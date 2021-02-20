import { useParams } from "react-router-dom";
import * as api from "api";

export const useHubID = () => {
  const params = useParams<{ hubID?: string }>();
  const hubID = !params.hubID || params.hubID !== ":hubID" ? params.hubID : undefined;
  return hubID;
};

export const useAccountID = () => {
  const params = useParams<{ accountID?: string }>();
  const accountID = !params.accountID || params.accountID !== ":accountID" ? params.accountID : undefined;
  return accountID;
};

export const useProjectID = () => {
  const params = useParams<{ projectID?: string }>();
  const projectID = !params.projectID || params.projectID !== ":projectID" ? params.projectID : undefined;
  return projectID;
};

export const useFolderID = () => {
  const params = useParams<{ folderID?: string }>();
  const folderID = !params.folderID || params.folderID !== ":folderID" ? params.folderID : undefined;
  return folderID;
};

export const useItemID = () => {
  const params = useParams<{ itemID?: string }>();
  const itemID = !params.itemID || params.itemID !== ":itemID" ? params.itemID : undefined;
  return itemID;
};

export const useIssueContainerID = () => {
  const params = useParams<{ issueContainerID?: string }>();
  const issueContainerID = !params.issueContainerID || params.issueContainerID !== ":issueContainerID" ? params.issueContainerID : undefined;
  return issueContainerID;
};

export const useURN = () => {
  const params = useParams<{ urn?: string }>();
  const urn = typeof params.urn === "string" && params.urn !== ":urn" ? api.utils.base64Decode(params.urn) : undefined;
  return urn;
};
