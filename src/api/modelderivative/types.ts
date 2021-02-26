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

export type Property = {
  objectid: number;
  name: string;
  externalId: string;
  properties: {
    Name?: string;
    Mass?: string;
    Material?: string;
    "Component Name"?: string;
    "Design Tracking Properties"?: { [key: string]: string };
    "File Properties"?: { [key: string]: string };
    "Mass Properties"?: { [key: string]: string };
    [key: string]: string | undefined | { [key: string]: string };
  };
};
