import { Meteor } from "meteor/meteor";
import { PricePackageCollection } from "../../../imports/api/PricePackageCollection";

Meteor.publish("pricePackage.getByStudio", function (studioId) {
  return PricePackageCollection.find({ studioId });
});
