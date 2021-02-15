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
    apis: {
      get: "/views/apis",
      data: {
        project: {
          folder: {
            get: ({ projectID, folderID }: { projectID: PathParam; folderID: PathParam }) =>
              `/api/data/project/${projectID || ":projectID"}/folder/${folderID || ":folderID"}`,
            contents: {
              get: ({ projectID, folderID }: { projectID: PathParam; folderID: PathParam }) =>
                `/views/apis/data/project/${projectID || ":projectID"}/folders/${folderID || ":folderID"}/contents`,
            },
          },
          item: {
            versions: {
              get: ({ projectID, itemID }: { projectID: PathParam; itemID: PathParam }) =>
                `/views/apis/data/project/${projectID || ":projectID"}/item/${itemID || ":itemID"}/versions`,
            },
          },
        },
      },
      hq: {
        account: {
          projects: {
            get: ({ accountID }: { accountID: PathParam }) => `/views/apis/hq/account/${accountID || ":accountID"}/projects`,
          },
          project: {
            get: ({ accountID, projectID }: { accountID: PathParam; projectID: PathParam }) =>
              `/views/apis/hq/account/${accountID || ":accountID"}/project/${projectID || ":projectID"}`,
          },
        },
      },
      issues: {
        container: {
          qualityIssues: {
            get: ({ issueContainerID }: { issueContainerID: PathParam }) =>
              `/views/apis/issues/container/${issueContainerID || ":issueContainerID"}/quality-issues`,
          },
        },
      },
      project: {
        hubs: {
          get: "/views/apis/project/hubs",
        },
        hub: {
          get: ({ hubID }: { hubID: PathParam }) => `/views/apis/project/hub/${hubID || ":hubID"}`,
          projects: {
            get: ({ hubID }: { hubID: PathParam }) => `/views/apis/project/hub/${hubID || ":hubID"}/projects`,
          },
          project: {
            get: ({ hubID, projectID }: { hubID: PathParam; projectID: PathParam }) =>
              `/views/apis/project/hub/${hubID || ":hubID"}/project/${projectID || ":projectID"}`,
            topFolders: {
              get: ({ hubID, projectID }: { hubID: PathParam; projectID: PathParam }) =>
                `/views/apis/project/hub/${hubID || ":hubID"}/project/${projectID || ":projectID"}/topFolders`,
            },
          },
        },
      },
      oss: {
        buckets: {
          get: "/views/apis/oss/buckets",
        },
      },
      modelderivative: {
        designdata: {
          metadata: {
            get: ({ urn }: { urn: PathParam }) => `/views/apis/modelderivative/designdata/${urn || ":urn"}/metadata`,
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
