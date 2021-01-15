import { PricePackages } from "../models/PricePackageCollection";

Meteor.methods({
  "pricePackage.getAll"({ studioId }) {
    check(studioId, String);

    return PricePackages.find({ studioId, userId: this.userId }).fetch();
  },
});
