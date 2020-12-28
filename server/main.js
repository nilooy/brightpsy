import { Meteor } from "meteor/meteor";
import "./services/auth/signup";
import "./services/auth/addProfilePic";
import "./services/studio/createStudio";
import "./services/studio/listStudio";
import "./services/pricePackages/createPricePackage";
import "./services/pricePackages/listPricePackage";
import { createRoles } from "./utils/authorization";
import "../imports/main";

Meteor.startup(() => {
  // Create accepted roles
  createRoles(() => console.log("@=> Roles created"));
});
