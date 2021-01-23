import { PricePackages } from "../models/PricePackageCollection";

Meteor.methods({
  "pricePackage.getAllByUser"({}) {
    return PricePackages.find({ userId: this.userId }).fetch();
  },
});
