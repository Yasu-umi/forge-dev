export type Metadata = {
  name: string;
  role: "3d" | "2d";
  guid: string;
};

export type ObjectType = {
  objectid: number;
  name?: string;
  objects?: ObjectType[];
};
