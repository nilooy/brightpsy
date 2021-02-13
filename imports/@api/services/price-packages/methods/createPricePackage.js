import {
  PricePackages,
  PricePackageSchema,
} from "../models/PricePackageCollection";

Meteor.methods({
  "pricePackage.create"({ data }) {
    return PricePackages.upsert(data?._id, { $set: data });
  },
});
