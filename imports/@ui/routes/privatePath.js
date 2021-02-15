export const rootPath = "/app";

export const privatePath = {
  dashboard: rootPath + "/dashboard",
  profile: rootPath + "/profile",
  accounts: rootPath + "/accounts",
  packages: rootPath + "/packages",
  packagesCreate: rootPath + "/package/create",
  packagesEditById: (id = ":id") => rootPath + "/package/edit/" + id,
  packageById: (id = ":id") => rootPath + "/package/" + id,
  search: rootPath + "/search",
  inbox: rootPath + "/inbox",
  inboxById: (id = ":id") => rootPath + "/inbox/" + id,
  paymentSuccess: rootPath + "/payment/success",
  appointments: rootPath + "/appointments",
  appointmentById: (id = ":id") => rootPath + "/appointments/" + id,
};
