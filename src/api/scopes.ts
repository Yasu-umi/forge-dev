export const scopes = {
  userProfile: {
    read: "user-profile:read",
  },
  user: {
    read: "user:read",
  },
  viewables: {
    read: "viewables:read",
  },
  data: {
    read: "data:read",
    write: "data:write",
    search: "data:search",
  },
  bucket: {
    create: "bucket:create",
    read: "bucket:read",
    update: "bucket:update",
    delete: "data:delete",
  },
  code: {
    all: "code:all",
  },
  account: {
    read: "account:read",
    write: "account:write",
  },
} as const;

export type scope =
  | typeof scopes.userProfile[keyof typeof scopes.userProfile]
  | typeof scopes.user[keyof typeof scopes.user]
  | typeof scopes.viewables[keyof typeof scopes.viewables]
  | typeof scopes.data[keyof typeof scopes.data]
  | typeof scopes.bucket[keyof typeof scopes.bucket]
  | typeof scopes.code[keyof typeof scopes.code]
  | typeof scopes.account[keyof typeof scopes.account];
