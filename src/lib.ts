export const urls = {
  login: {
    get: "/login",
  },
  logout: {
    get: "/logout",
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
          get: ({ projectID, folderID }: { projectID: string; folderID: string }) => `/api/data/project/${projectID}/folders/${folderID}`,
          contents: {
            get: ({ projectID, folderID }: { projectID: string; folderID: string }) => `/api/data/project/${projectID}/folders/${folderID}/contents`,
          },
        },
      },
    },
    hq: {
      account: {
        projects: {
          get: ({ accountID }: { accountID: string }) => `/api/hq/account/${accountID}/projects`,
        },
        project: {
          get: ({ accountID, projectID }: { accountID: string; projectID: string }) => `/api/hq/account/${accountID}/project/${projectID}`,
        },
      },
    },
    issues: {
      container: {
        qualityIssues: {
          get: ({ issueContainerID }: { issueContainerID: string }) => `/api/issues/container/${issueContainerID}/quality-issues`,
        },
      },
    },
    project: {
      hubs: {
        get: "/api/project/hubs",
      },
      hub: {
        get: ({ hubID }: { hubID: string }) => `/api/project/hubs/${hubID}`,
        projects: {
          get: ({ hubID }: { hubID: string }) => `/api/project/hubs/${hubID}/projects`,
        },
        project: {
          get: ({ hubID, projectID }: { hubID: string; projectID: string }) => `/api/project/hubs/${hubID}/projects/${projectID}`,
          topFolders: {
            get: ({ hubID, projectID }: { hubID: string; projectID: string }) => `/api/project/hubs/${hubID}/projects/${projectID}/topFolders`,
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
