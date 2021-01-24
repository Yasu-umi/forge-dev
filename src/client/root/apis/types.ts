import React from "react";

export type NodeElement = { apiURL: string; docURL: string; Viewer: React.FC; children?: Node } | { children: Node };
export type Node = { [name: string]: NodeElement };
