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
        projects: {
          get: ({ hubID }: { hubID: string }) => `/api/data-management/hubs/${hubID}/projects`,
        },
      },
    },
    bim360: {
      issues: {
        get: ({ issueContainerID }: { issueContainerID: string }) => `/api/bim360/${issueContainerID}/issues`,
      },
    },
    oss: {
      buckets: {
        get: "/api/oss/buckets",
      },
    },
  },
};
