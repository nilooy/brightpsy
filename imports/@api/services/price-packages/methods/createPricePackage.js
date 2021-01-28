import {
  PricePackages,
  PricePackageSchema,
} from "../models/PricePackageCollection";

Meteor.methods({
  "pricePackage.create"({ data }) {
    return PricePackages.insert(data);
  },
});
