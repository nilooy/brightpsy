import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { activitySchema } from "../../../utils/activitySchema";

const Availabilities = new Mongo.Collection("availabilities");

// Following english week
const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

let constructAvailabilitySchema = {};

// Create schema by days in this format
/* =================================================================>
sun: {from: String, to: String, dayIndex: 1},
mon: {from: String, to: String, dayIndex: 2},
...
=================================================================>
*/
days.forEach((day, index) => {
  constructAvailabilitySchema[day] = { type: String, optional: true };
  constructAvailabilitySchema[`${day}.$`] = { type: Object };
  constructAvailabilitySchema[`${day}.$.from`] = { type: String };
  constructAvailabilitySchema[`${day}.$.to`] = { type: String };
  constructAvailabilitySchema[`${day}.$.dayIndex`] = {
    type: Number,
    autoValue: index, // Set index automically || Used english day code
  };
});

const AvailabilitySchema = new SimpleSchema({
  ...constructAvailabilitySchema,
  userId: { type: String }, // doctor
  ...activitySchema,
});

Availabilities.attachSchema(AvailabilitySchema);

export { AvailabilitySchema, Availabilities };
