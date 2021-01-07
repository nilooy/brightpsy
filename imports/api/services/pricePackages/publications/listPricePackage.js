import { Meteor } from "meteor/meteor";
import { PricePackageCollection } from "../models/PricePackageCollection";

Meteor.publish("pricePackage.getByStudio", function (studioId) {
  return PricePackageCollection.find({ studioId });
});
