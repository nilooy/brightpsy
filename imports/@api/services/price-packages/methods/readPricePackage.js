import {
  PricePackages,
  PricePackageSchema,
} from "../models/PricePackageCollection";

Meteor.methods({
  "pricePackage.getById"({ _id }) {
    const package = PricePackages.findOne({ _id });
    const user = Meteor.users.findOne(package.userId);

    Object.assign(package, { user });

    return package;
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
    if (!searchValue) {
      return PricePackages.find({}).fetch();
    }

    check(searchValue, String);

    return PricePackages.rawCollection()
      .find({
        $text: { $search: searchValue },
      })
      .toArray();
  },
});
