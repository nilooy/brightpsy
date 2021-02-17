import { Meteor } from "meteor/meteor";
import { createRoles } from "../imports/@api/utils/authorization";

// Register all methods and Publications
import "../imports/@api/register-api";

// SSR ***
import "../imports/client";

// Service config
import "./helpers/service.config";

// Account Hooks
import "./helpers/account.hook";

Meteor.startup(() => {
  // Create accepted roles
  createRoles(() => console.log("@=> Roles created"));

  import "./helpers/setConfig";
});

process.on("unhandledRejection", (reason, promise) => {});
