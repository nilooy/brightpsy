import {
  PricePackages,
  PricePackageSchema,
} from "../models/PricePackageCollection";

Meteor.methods({
  "pricePackage.getById"({ _id }) {
    return PricePackages.findOne({ _id });
  },
  "pricePackage.getAllByUser"({}) {
    return PricePackages.find({ userId: this.userId }).fetch();
  },

  "pricePackage.getAll"({}) {
    return PricePackages.rawCollection().aggregate([
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

  "pricePackage.search"({ searchValue }) {
    check(searchValue, String);

    console.log(
      "search",
      searchValue,
      PricePackages.rawCollection()
        .find({
          $text: { $search: searchValue },
        })
        .toArray()
    );

    return PricePackages.rawCollection()
      .find({
        $text: { $search: searchValue },
      })
      .toArray();
  },
});
