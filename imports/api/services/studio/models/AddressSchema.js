import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Addresses = new Mongo.Collection("addresses");

const AddressSchema = new SimpleSchema({
  formatted_address: {
    type: String,
  },
  address_parts: {
    type: Array,
    optional: true,
  },
  "address_parts.$": Object,
  "address_parts.$.long_name": String,
  "address_parts.$.short_name": String,
  "address_parts.$.types": Array,
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
});

Addresses.attachSchema(Addresses);

export { Addresses, AddressSchema };
