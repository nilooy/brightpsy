import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const PricePackages = new Mongo.Collection("price_packages");

const PricePackageSchema = new SimpleSchema({
  title: { type: String },
  desc: { type: String },
  quantity: { type: String },
  hours: { type: String },
  cost: { type: String },
  studioId: { type: String },
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function () {
      if (this.isInsert || this.isUpsert) {
        return this.userId;
      }
    },
  },
});

PricePackages.attachSchema(PricePackageSchema);

export { PricePackageSchema, PricePackages };
