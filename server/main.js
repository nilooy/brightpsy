import { Meteor } from "meteor/meteor";
import "./services/auth/signup";
import { createRoles } from "./utils/authorization";

Meteor.startup(() => {
  // Create accepted roles
  createRoles(() => console.log("@=> Roles created"));
});
