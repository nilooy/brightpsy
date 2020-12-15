import { Meteor } from "meteor/meteor";
import "./services/auth/signup";
import "./services/studio/createStudio";
import { createRoles } from "./utils/authorization";

Meteor.startup(() => {
  // Create accepted roles
  createRoles(() => console.log("@=> Roles created"));
});
