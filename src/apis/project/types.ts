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
