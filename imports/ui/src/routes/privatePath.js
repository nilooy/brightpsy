export const rootPath = "/app";

export const privatePath = {
  dashboard: rootPath + "/dashboard",
  profile: rootPath + "/profile",
  studio: rootPath + "/studio",
  studioCreate: rootPath + "/studio/create",
  studioEdit: rootPath + "/studio/edit",
  packages: rootPath + "/packages",
  packagesCreate: rootPath + "/package/create",
  search: rootPath + "/search",
  studioById: (id = ":id") => rootPath + "/studio/" + id,
  inbox: rootPath + "/inbox",
  inboxById: (id = ":id") => rootPath + "/inbox/" + id,
};
