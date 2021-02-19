export type PathParam = string | undefined;

export const urls = {
  login: {
    get: "/login",
  },
  logout: {
    get: "/logout",
  },
  views: {
    login: {
      get: "/views/login",
    },
    api: {
      get: "/views/api",
      data: {
        project: {
          folder: {
            get: ({ projectID, folderID }: { projectID: PathParam; folderID: PathParam }) =>
              `/api/data/project/${projectID || ":projectID"}/folder/${folderID || ":folderID"}`,
            contents: {
              get: ({ projectID, folderID }: { projectID: PathParam; folderID: PathParam }) =>
                `/views/api/data/project/${projectID || ":projectID"}/folders/${folderID || ":folderID"}/contents`,
            },
          },
          item: {
            versions: {
              get: ({ projectID, itemID }: { projectID: PathParam; itemID: PathParam }) =>
                `/views/api/data/project/${projectID || ":projectID"}/item/${itemID || ":itemID"}/versions`,
            },
          },
        },
      },
      hq: {
        account: {
          projects: {
            get: ({ accountID }: { accountID: PathParam }) => `/views/api/hq/account/${accountID || ":accountID"}/projects`,
          },
          project: {
            get: ({ accountID, projectID }: { accountID: PathParam; projectID: PathParam }) =>
              `/views/api/hq/account/${accountID || ":accountID"}/project/${projectID || ":projectID"}`,
          },
        },
      },
      issues: {
        container: {
          qualityIssues: {
            get: ({ issueContainerID }: { issueContainerID: PathParam }) =>
              `/views/api/issues/container/${issueContainerID || ":issueContainerID"}/quality-issues`,
          },
        },
      },
      project: {
        hubs: {
          get: "/views/api/project/hubs",
        },
        hub: {
          get: ({ hubID }: { hubID: PathParam }) => `/views/api/project/hub/${hubID || ":hubID"}`,
          projects: {
            get: ({ hubID }: { hubID: PathParam }) => `/views/api/project/hub/${hubID || ":hubID"}/projects`,
          },
          project: {
            get: ({ hubID, projectID }: { hubID: PathParam; projectID: PathParam }) =>
              `/views/api/project/hub/${hubID || ":hubID"}/project/${projectID || ":projectID"}`,
            topFolders: {
              get: ({ hubID, projectID }: { hubID: PathParam; projectID: PathParam }) =>
                `/views/api/project/hub/${hubID || ":hubID"}/project/${projectID || ":projectID"}/topFolders`,
            },
          },
        },
      },
      oss: {
        buckets: {
          get: "/views/api/oss/buckets",
        },
      },
      modelderivative: {
        designdata: {
          metadata: {
            get: ({ urn }: { urn: PathParam }) => `/views/api/modelderivative/designdata/${urn || ":urn"}/metadata`,
          },
        },
      },
    },
  },
  api: {
    oauth: {
      callback: {
        get: "/api/oauth/callback",
      },
    },
    data: {
      project: {
        folder: {
          get: ({ projectID, folderID }: { projectID: PathParam; folderID: PathParam }) =>
            `/api/data/project/${projectID || ":projectID"}/folder/${folderID || ":folderID"}`,
          contents: {
            get: ({ projectID, folderID }: { projectID: PathParam; folderID: PathParam }) =>
              `/api/data/project/${projectID || ":projectID"}/folder/${folderID || ":folderID"}/contents`,
          },
        },
        item: {
          versions: {
            get: ({ projectID, itemID }: { projectID: PathParam; itemID: PathParam }) =>
              `/api/data/project/${projectID || ":projectID"}/item/${itemID || ":itemID"}/versions`,
          },
        },
      },
    },
    hq: {
      account: {
        projects: {
          get: ({ accountID }: { accountID: PathParam }) => `/api/hq/account/${accountID}/projects`,
        },
        project: {
          get: ({ accountID, projectID }: { accountID: PathParam; projectID: PathParam }) =>
            `/api/hq/account/${accountID || ":accountID"}/project/${projectID || ":projectID"}`,
        },
      },
    },
    issues: {
      container: {
        qualityIssues: {
          get: ({ issueContainerID }: { issueContainerID: PathParam }) =>
            `/api/issues/container/${issueContainerID || ":issueContainerID"}/quality-issues`,
        },
      },
    },
    project: {
      hubs: {
        get: "/api/project/hubs",
      },
      hub: {
        get: ({ hubID }: { hubID: PathParam }) => `/api/project/hub/${hubID || ":hubID"}`,
        projects: {
          get: ({ hubID }: { hubID: PathParam }) => `/api/project/hub/${hubID || ":hubID"}/projects`,
        },
        project: {
          get: ({ hubID, projectID }: { hubID: PathParam; projectID: PathParam }) =>
            `/api/project/hub/${hubID || ":hubID"}/project/${projectID || ":projectID"}`,
          topFolders: {
            get: ({ hubID, projectID }: { hubID: PathParam; projectID: PathParam }) =>
              `/api/project/hub/${hubID || ":hubID"}/project/${projectID || ":projectID"}/topFolders`,
          },
        },
      },
    },
    oss: {
      buckets: {
        get: "/api/oss/buckets",
      },
    },
    modelderivative: {
      designdata: {
        metadata: {
          get: ({ urn }: { urn: string }) => `/api/modelderivative/designdata/${urn}/metadata`,
        },
      },
    },
  },
};
