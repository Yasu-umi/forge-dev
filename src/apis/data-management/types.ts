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

type FolderType = {
  type: "folders";
  id: string;
  attributes: {
    name: string;
    displayName: string;
    createTime: Date;
    createUserId: string;
    createUserName: string;
    lastModifiedTime: Date;
    lastModifiedTimeRollup?: Date;
    lastModifiedUserId: string;
    lastModifiedUserName: string;
    objectCount: number;
    hidden: boolean;
    extension: {
      type: "folders:autodesk.bim360:Folder";
      version: "1.0";
      schema: {
        href: "https://developer.api.autodesk.com/schema/v1/versions/folders:autodesk.bim360:Folder-1.0";
      };
      data: {
        allowedTypes: dataType[];
        visibleTypes: dataType[];
        actions: actionType[];
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

type VersionType = {
  type: "versions";
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
    versionNumber: number;
    storageSize: number;
    fileType: "rvt";
  };
  links: {
    self: {
      href: string;
    };
    webView: {
      href: string;
    };
  };
  relationships: {
    item: {
      data: {
        type: "items";
        id: string;
      };
      links: {
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
    downloadFormats: {
      links: {
        related: {
          href: string;
        };
      };
    };
    derivatives: {
      data: {
        type: "derivatives";
        id: string;
      };
      meta: {
        link: {
          href: string;
        };
      };
    };
    thumbnails: {
      data: {
        type: "thumbnails";
        id: string;
      };
      meta: {
        link: {
          href: string;
        };
      };
    };
    storage: {
      data: {
        type: "objects";
        id: string;
      };
      meta: {
        link: {
          href: string;
        };
      };
    };
  };
};

type ItemType = {
  type: "items";
  id: string;
  attributes: {
    displayName: string;
    createTime: Date;
    createUserId: string;
    createUserName: string;
    lastModifiedTime: Date;
    lastModifiedUserId: string;
    lastModifiedUserName: string;
    hidden: boolean;
    reserved: boolean;
    reservedTime?: Date;
    reservedUserId?: string;
    reservedUserName?: string;
    extension: {
      type: "items:autodesk.bim360:File";
      version: "1.0";
      schema: {
        href: "https://developer.api.autodesk.com/schema/v1/versions/items:autodesk.bim360:File-1.0";
      };
      data: {
        sourceFileName: string;
      };
    };
  };
  links: {
    self: {
      href: string;
    };
    webView: {
      href: string;
    };
  };
  relationships: {
    tip: {
      links: {
        related: {
          href: string;
        };
      };
      data: {
        type: "versions";
        id: string;
      };
    };
    versions: {
      links: {
        related: {
          href: string;
        };
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
  };
};

export type TopFolderData = FolderType;

export type FolderData = FolderType;

export type actionType = "CONVERT" | "SPLIT" | "OCR";

export type ContentData = FolderType | VersionType | ItemType;

export type ContentIncludedData = {
  type: "versions";
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
    versionNumber: number;
    extension: {
      type: "versions:autodesk.bim360:File";
      version: "1.0";
      schema: {
        href: "https://developer.api.autodesk.com/schema/v1/versions/versions:autodesk.bim360:File-1.0";
      };
      data: {
        processState: "PROCESSING_COMPLETE";
        extractionState: "SUCCESS";
        splittingState: "NOT_SPLIT";
        reviewState: "NOT_IN_REVIEW";
        revisionDisplayLabel: string;
        sourceFileName: string;
      };
    };
  };
  links: {
    self: {
      href: string;
    };
  };
  relationships: {
    item: {
      links: {
        related: {
          href: string;
        };
      };
      data: {
        type: "items";
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
    storage: {
      meta: {
        link: {
          href: string;
        };
      };
      data: {
        type: "objects";
        id: string;
      };
    };
  };
};
