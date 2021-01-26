export type MetadataType = {
  name: string;
  role: "3d" | "2d";
  guid: string;
};

export type Metadata = {
  data: {
    type: "metadata";
    metadata: {
      name: string;
      role: "3d" | "2d";
      guid: string;
    }[];
  };
};
