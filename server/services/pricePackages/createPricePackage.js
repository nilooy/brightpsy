import { Meteor } from "meteor/meteor";
import { PricePackageCollection } from "../../../imports/api/PricePackageCollection";

Meteor.methods({
  "pricePackage.create"(data) {
    const { title, desc, quantity, hours, cost, studioId } = data;
    return PricePackageCollection.insert({
      title,
      desc,
      quantity,
      hours,
      cost,
      studioId,
      userId: this.userId,
      createdAt: new Date(),
    });
  },
});
