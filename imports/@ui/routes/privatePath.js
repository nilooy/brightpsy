export const rootPath = "/app";

export const privatePath = {
  dashboard: rootPath + "/dashboard",
  profile: rootPath + "/profile",
  packages: rootPath + "/packages",
  packagesCreate: rootPath + "/package/create",
  packagesById: (id = ":id") => rootPath + "/package/" + id,
  search: rootPath + "/search",
  inbox: rootPath + "/inbox",
  inboxById: (id = ":id") => rootPath + "/inbox/" + id,
};