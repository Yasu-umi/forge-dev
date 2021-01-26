export type Hub = {
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

export type Project = {
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

export type DataType =
  | "folders"
  | "folders:autodesk.bim360:Folder"
  | "items:autodesk.bim360:File"
  | "items:autodesk.bim360:Document"
  | "items:autodesk.bim360:TitleBlock"
  | "items:autodesk.bim360:ReviewDocument";

export type Folder = {
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
        allowedTypes: DataType[];
        visibleTypes: DataType[];
        actions: ActionType[];
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

export type Version = {
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

export type Item = {
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

export type ActionType = "CONVERT" | "SPLIT" | "OCR";

export type ContentType = Folder | Version | Item;

export type ContentIncluded = {
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

export type StatusType = "work_completed" | "ready_to_inspect" | "not_approved" | "in_dispute" | "closed" | "void" | "answered";

export type AssignedToType = "user" | "company" | "role";

export type IssueStatusType = "draft" | "open" | "close";

export type AttributeType =
  | "assigned_to"
  | "assigned_to_type"
  | "description"
  | "due_date"
  | "location_description"
  | "trades"
  | "owner"
  | "issue_type"
  | "issue_type_id"
  | "root_cause"
  | "root_cause_id"
  | "title"
  | "status"
  | "sheet_metadata"
  | "lbs_location"
  | "answer"
  | "pushpin_attributes"
  | "snapshot_urn"
  | "close_version"
  | "comments_attributes"
  | "attachments_attributes"
  | "markup_metadata"
  | "updated_at"
  | "tags"
  | "collection_urn"
  | "custom_attributes"
  | "ng_issue_subtype_id";

export type PushpinAttibutesType = {
  type: "TwoDVectorPushpin";
  location: {
    x: number;
    y: number;
    z: number;
  };
  object_id: null;
  viewer_state: {
    seedURN: string;
    viewport: {
      up: [number, number, number];
      eye: [string, string, string]; // number
      name: string;
      target: [string, string, string]; // number
      pivotPoint: [string, string, string]; // number
      projection: "orthographic";
      aspectRatio: number;
      worldUpVector: [number, number, number];
      isOrthographic: boolean;
      distanceToOrbit: number;
      orthographicHeight: number;
    };
    cutplanes: string[]; // unknown
    floorGuid: null;
    objectSet: [{ id: string[]; hidden: string[]; idType: "lmv"; isolated: string[]; explodeScale: number }];
    globalOffset: {
      x: number;
      y: number;
      z: number;
    };
    renderOptions: {
      toneMap: {
        method: number;
        exposure: number;
        lightMultiplier: number;
      };
      appearance: {
        ghostHidden: boolean;
        antiAliasing: boolean;
        displayLines: boolean;
        ambientShadow: boolean;
        displayPoints: boolean;
        swapBlackAndWhite: boolean;
        progressiveDisplay: boolean;
      };
      environment: "Boardwalk";
      ambientOcclusion: {
        radius: number;
        enabled: boolean;
        intensity: number;
      };
    };
    attributesVersion: 2;
  };
  created_at: Date;
  created_by: string;
  created_doc_version: null;
  external_id: string;
  attributes_version: 1;
};

export type Issue = {
  id: string;
  type: "quality_issues";
  links: { self: string };
  attributes: {
    created_at: Date;
    synced_at: Date;
    updated_at: Date;
    close_version: number | null;
    closed_at: Date | null;
    closed_by: string | null;
    created_by: string;
    starting_version: number;
    title: string;
    description: string;
    location_description: string | null;
    markup_metadata: string | null;
    tags: null;
    target_urn: string | null;
    snapshot_urn: null;
    target_urn_page: string | null;
    collection_urn: null;
    due_date: Date;
    identifier: number;
    status: IssueStatusType;
    assigned_to: string | null;
    assigned_to_type: AssignedToType | null;
    answer: string | null;
    answered_at: Date | null;
    answered_by: string | null;
    pushpin_attributes: PushpinAttibutesType | null;
    owner: string;
    issue_type_id: string | null;
    issue_type: "4" | null;
    issue_sub_type: null;
    root_cause_id: string | null;
    root_cause: "COORDINATION" | "DESIGN_CHANGE" | null;
    quality_urns: null;
    permitted_statuses: StatusType[];
    permitted_attributes: AttributeType[];
    comment_count: number;
    attachment_count: number;
    permitted_actions: ("add_comment" | "add_attachment")[];
    sheet_metadata: { is3D: boolean; sheetGuid: string; sheetName: string } | null;
    lbs_location: string | null;
    ng_issue_subtype_id: string;
    ng_issue_type_id: string;
    custom_attributes: unknown[];
    trades: null;
    comments_attributes: null;
    attachments_attributes: null;
  };
  relationships: {
    container: {
      links: { self: string; related: string };
    };
    attachments: {
      links: { self: string; related: string };
    };
    activity_batches: {
      links: { self: string; related: string };
    };
    comments: {
      links: { self: string; related: string };
    };
    root_cause_obj: {
      links: { self: string; related: string };
    };
    issue_type_obj: {
      links: { self: string; related: string };
    };
  };
};
