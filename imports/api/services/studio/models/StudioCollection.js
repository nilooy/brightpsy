import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Studios = new Mongo.Collection("studios");

const StudioSchema = new SimpleSchema({
  name: { type: String },
  type: {
    type: String,
    allowedValues: ["public", "private", "personal"],
    defaultValue: "personal",
  },
  imageUrl: { type: String, optional: true },
  default: {
    type: Boolean,
    optional: true,
    autoValue: function () {
      if (this.isInsert && !Studios.find().count()) {
        return true;
      }
    },
  },
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function () {
      if (this.isInsert) {
        return this.userId;
      }
    },
  },
});

Studios.attachSchema(StudioSchema);

export { StudioSchema, Studios };
