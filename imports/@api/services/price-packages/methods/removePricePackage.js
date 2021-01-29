import { PricePackages } from "../models/PricePackageCollection";

Meteor.methods({
  "pricePackage.remove"({ id }) {
    check(id, String);
    return PricePackages.remove(id);
  },
});
