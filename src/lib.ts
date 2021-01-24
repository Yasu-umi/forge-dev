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
    dataManagement: {
      hubs: {
        get: "/api/data-management/hubs",
      },
      hub: {
        get: ({ hubID }: { hubID: string }) => `/api/data-management/hubs/${hubID}`,
        projects: {
          get: ({ hubID }: { hubID: string }) => `/api/data-management/hubs/${hubID}/projects`,
        },
        project: {
          get: ({ hubID, projectID }: { hubID: string; projectID: string }) => `/api/data-management/hubs/${hubID}/projects/${projectID}`,
          topFolders: {
            get: ({ hubID, projectID }: { hubID: string; projectID: string }) =>
              `/api/data-management/hubs/${hubID}/projects/${projectID}/top-folders`,
          },
        },
      },
      project: {
        folder: {
          get: ({ projectID, folderID }: { projectID: string; folderID: string }) => `/api/data-management/project/${projectID}/folders/${folderID}`,
          contents: {
            get: ({ projectID, folderID }: { projectID: string; folderID: string }) =>
              `/api/data-management/project/${projectID}/folders/${folderID}/contents`,
          },
        },
      },
    },
    bim360: {
      issues: {
        get: ({ issueContainerID }: { issueContainerID: string }) => `/api/bim360/${issueContainerID}/issues`,
      },
      account: {
        projects: {
          get: ({ accountID }: { accountID: string }) => `/api/bim360/account/${accountID}/projects`,
        },
        project: {
          get: ({ accountID, projectID }: { accountID: string; projectID: string }) => `/api/bim360/account/${accountID}/project/${projectID}`,
        },
      },
    },
    oss: {
      buckets: {
        get: "/api/oss/buckets",
      },
    },
  },
};
