import { Meteor } from "meteor/meteor";
import "./services/auth/signup";
import "./services/studio/createStudio";
import "./services/studio/listStudio";
import { createRoles } from "./utils/authorization";
import "../imports/main";

Meteor.startup(() => {
  // Create accepted roles
  createRoles(() => console.log("@=> Roles created"));
});
