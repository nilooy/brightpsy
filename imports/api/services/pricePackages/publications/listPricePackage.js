import { Meteor } from "meteor/meteor";
import { PricePackages } from "../models/PricePackageCollection";

Meteor.publish("pricePackage.getByStudio", function (studioId) {
  return PricePackages.find({ studioId, userId: this.userId });
});
