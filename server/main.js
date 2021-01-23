import { Meteor } from "meteor/meteor";
import { createRoles } from "../imports/@api/utils/authorization";

Meteor.startup(() => {
  // Create accepted roles
  createRoles(() => console.log("@=> Roles created"));
  // Register all methods and Publications
  import "../imports/@api/register-api";
  // SSR ***
  import "../imports/client";

  // Service config
  import "./service.config";

  // Account Hooks
  import "./account.hook";
});

process.on("unhandledRejection", (reason, promise) => {});
