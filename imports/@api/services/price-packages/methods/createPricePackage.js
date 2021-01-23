import { PricePackages } from "../models/PricePackageCollection";

import { ValidatedMethod } from "meteor/mdg:validated-method";

import SimpleSchema from "simpl-schema";

// TODO: Confirm if this can be risky as imported on client

export const createOrUpdatePricePackage = new ValidatedMethod({
  name: "pricePackage.create",
  validate: new SimpleSchema({
    title: { type: String },
    desc: { type: String },
    quantity: { type: String },
    hours: { type: String },
    cost: { type: String },
  }).validator(),
  run({ title, desc, quantity, hours, cost }) {
    return PricePackages.insert({
      title,
      desc,
      quantity,
      hours,
      cost,
      userId: this.userId,
      createdAt: new Date(),
    });
  },
});
