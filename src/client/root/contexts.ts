import { createContext } from "react";
import { HubData } from "../../apis/data-management/types";

export const hubIDContext = createContext<null | string>(null);

export const hubsContext = createContext<HubData[]>([]);
