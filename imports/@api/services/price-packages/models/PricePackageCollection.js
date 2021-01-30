import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const PricePackages = new Mongo.Collection("price_packages");

const PricePackageSchema = new SimpleSchema({
  title: { type: String },
  desc: { type: String },
  isPhysical: { type: Boolean },
  isVirtual: { type: Boolean },
  tags: { type: Array },
  "tags.$": { type: Object },
  "tags.$.label": { type: String },
  "tags.$.value": { type: String },
  images: { type: Array },
  "images.$": { type: String },
  visits: { type: Array },
  "visits.$": { type: Object },
  "visits.$.numOfVisits": { type: Number },
  "visits.$.price": { type: Number },
  duration: { type: Number },
  published: { type: Boolean, defaultValue: false },
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
