import { Meteor } from "meteor/meteor";
import { createRoles } from "../imports/api/utils/authorization";

// Register all methods and Publications
import "../imports/api/register-api";
// SSR ***
import "../imports/client";

Meteor.startup(() => {
  // Create accepted roles
  createRoles(() => console.log("@=> Roles created"));
});
