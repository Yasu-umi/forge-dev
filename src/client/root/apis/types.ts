export type NodeElement = { apiURL: string; docURL: string; path: string; Viewer: React.FC; children?: Node } | { children: Node };
export type Node = { [name: string]: NodeElement };
