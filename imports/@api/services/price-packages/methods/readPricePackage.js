import { PricePackages } from "../models/PricePackageCollection";

Meteor.methods({
  "pricePackage.getAllByUser"({}) {
    return PricePackages.find({ userId: this.userId }).fetch();
  },

  "pricePackage.getAll"({}) {
    return PricePackageSchema.rawCollection().aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
    ]);
  },
});
