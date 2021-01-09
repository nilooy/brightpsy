import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Addresses = new Mongo.Collection("addresses");

const AddressSchema = new SimpleSchema({
  studioId: { type: String },
  formatted_address: {
    type: String,
  },
  address_parts: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  "address_parts.street_number": {
    type: String,
  },
  "address_parts.neighborhood": {
    type: String,
  },
  "address_parts.route": {
    type: String,
  },
  "address_parts.locality": {
    type: String,
  },
  "address_parts.administrative_area_level_3": {
    type: String,
  },
  "address_parts.administrative_area_level_2": {
    type: String,
  },
  "address_parts.administrative_area_level_1": {
    type: String,
  },
  "address_parts.country": {
    type: String,
  },
  "address_parts.postal_code": {
    type: String,
  },
  geo: {
    type: Object,
    optional: true,
  },
  "geo.lat": {
    type: Number,
    optional: true,
  },
  "geo.lng": {
    type: Number,
    optional: true,
  },
  primary: {
    type: Boolean,
    optional: true,
    autoValue: function () {
      if ((this.isInsert || this.isUpsert) && !Addresses.find().count()) {
        return true;
      }
    },
  },
});

Addresses.attachSchema(AddressSchema);

export { Addresses, AddressSchema };
