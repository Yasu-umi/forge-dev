export type HubData = {
  type: "hubs";
  id: string;
  attributes: {
    name: string;
    extension: {
      type: "hubs:autodesk.bim360:Account";
      version: "1.0";
      schema: {
        href: "https://developer.api.autodesk.com/schema/v1/versions/hubs:autodesk.bim360:Account-1.0";
      };
      data: unknown;
    };
    region: "US";
  };
  links: { self: { href: string } };
  relationships: {
    projects: {
      links: { related: { href: string } };
    };
  };
};

export type ProjectData = {
  type: "projects";
  id: string;
  attributes: {
    name: string;
    scopes: string[];
    extension: {
      type: "projects:autodesk.bim360:Project";
      version: "1.0";
      schema: {
        href: "https://developer.api.autodesk.com/schema/v1/versions/projects:autodesk.bim360:Project-1.0";
      };
      data: {
        projectType: "BIM360";
      };
    };
  };
  links: { self: { href: string } };
  relationships: {
    hub: {
      data: {
        type: "hubs";
        id: string;
      };
      links: { related: { href: string } };
    };
    rootFolder: {
      data: {
        type: "folders";
        id: string;
      };
      meta: { link: { href: string } };
    };
    topFolders: {
      links: { related: { href: string } };
    };
    issues: {
      data: {
        type: "issueContainerId";
        id: string;
      };
      meta: { link: { href: string } };
    };
    submittals: {
      data: {
        type: "submittalContainerId";
        id: string;
      };
      meta: { link: { href: string } };
    };
    rfis: {
      data: {
        type: "rfisContainerId";
        id: string;
      };
      meta: { link: { href: string } };
    };
    markups: {
      data: {
        type: "markupsContainerId";
        id: string;
      };
      meta: { link: { href: string } };
    };
    checklists: {
      data: {
        type: "checklistsContainerId";
        id: string;
      };
      meta: { link: { href: string } };
    };
    cost: {
      data: {
        type: "costContainerId";
        id: string;
      };
      meta: { link: { href: string } };
    };
    locations: {
      data: {
        type: "locationsContainerId";
        id: string;
      };
      meta: { link: { href: string } };
    };
  };
};

export type dataType =
  | "folders"
  | "folders:autodesk.bim360:Folder"
  | "items:autodesk.bim360:File"
  | "items:autodesk.bim360:Document"
  | "items:autodesk.bim360:TitleBlock"
  | "items:autodesk.bim360:ReviewDocument";

export type TopFolderData = {
  type: "folders";
  id: string;
  attributes: {
    name: string;
    displayName: string;
    createTime: Date;
    createUserId: string;
    createUserName: string;
    lastModifiedTime: Date;
    lastModifiedUserId: string;
    lastModifiedUserName: string;
    objectCount: number;
    hidden: boolean;
    extension: {
      type: "folders:autodesk.bim360:Folder";
      version: "1.0";
      schema: {
        href: "https://developer.api.autodesk.com/schema/v1/versions/folders%3Aautodesk.bim360%3AFolder-1.0";
      };
      data: {
        allowedTypes: dataType[];
        visibleTypes: dataType[];
      };
    };
  };
  links: {
    self: {
      href: string;
    };
  };
  relationships: {
    parent: {
      links: {
        related: {
          href: string;
        };
      };
      data: {
        type: "folders";
        id: string;
      };
    };
    refs: {
      links: {
        self: {
          href: string;
        };
        related: {
          href: string;
        };
      };
    };
    links: {
      links: {
        self: {
          href: string;
        };
      };
    };
    contents: {
      links: {
        related: {
          href: string;
        };
      };
    };
  };
};
