import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { activitySchema } from "../../../utils/activitySchema";
import { Random } from "meteor/random";

const Availabilities = new Mongo.Collection("availabilities");

// Following english week
export const availabilityDays = [
  "sun",
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
];

let constructAvailabilitySchema = {};

// Create schema by days in this format
/* =================================================================>
sun: {dayIndex: Number,  timeSlots: (Array) [{_id: String, from: String, to: String}]},
mon: {dayIndex: Number, timeZone: String, userId: String, timeSlots: (Array) [{_id: String, from: String, to: String}]},
...
timeZone: String, 
userId: String,
=================================================================>
*/
availabilityDays.forEach((day, index) => {
  constructAvailabilitySchema[day] = {
    type: Object,
    optional: true,
    maxCount: 4,
  };
  constructAvailabilitySchema[`${day}.dayIndex`] = {
    type: Number,
    autoValue: () => index, // Set index automically || Used english day code
  };
  constructAvailabilitySchema[`${day}.isEnabled`] = {
    type: Boolean,
    defaultValue: false,
  };
  constructAvailabilitySchema[`${day}.timeSlots`] = { type: Array };
  constructAvailabilitySchema[`${day}.timeSlots.$`] = { type: Object };
  constructAvailabilitySchema[`${day}.timeSlots.$._id`] = {
    type: SimpleSchema.RegEx.Id, // having a individual timeslot id make the process simpler
    optional: true,
    autoValue: function () {
      if (this.isInsert) {
        return Random.id();
      }
    },
  };
  constructAvailabilitySchema[`${day}.timeSlots.$.from`] = { type: String };
  constructAvailabilitySchema[`${day}.timeSlots.$.to`] = { type: String };
});

const AvailabilitySchema = new SimpleSchema({
  ...constructAvailabilitySchema,
  userId: { type: String }, // doctor
  timeZone: { type: String, optional: true },
  ...activitySchema,
});

Availabilities.attachSchema(AvailabilitySchema);

export { AvailabilitySchema, Availabilities };
