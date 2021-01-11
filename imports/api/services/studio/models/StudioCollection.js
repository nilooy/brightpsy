import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Studios = new Mongo.Collection("studios");

const StudioSchema = new SimpleSchema({
  name: { type: String },
  email: { type: String, optional: true },
  tel: { type: String, optional: true },
  type: {
    type: String,
    allowedValues: ["personal", "business"],
    defaultValue: "personal",
  },
  online: {
    type: Boolean,
    optional: true,
  },
  physical: {
    type: Boolean,
    optional: true,
  },
  desc: { type: String, optional: true },
  tags: { type: Array, optional: true },
  "tags.$": { type: Object, optional: true },
  "tags.$.id": { type: String, optional: true },
  "tags.$.text": { type: String, optional: true },
  imageUrl: { type: String, optional: true },
  userId: { type: String },
});

Studios.attachSchema(StudioSchema);

export { StudioSchema, Studios };
