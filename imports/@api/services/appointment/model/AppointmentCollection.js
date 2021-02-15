import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { activitySchema } from "../../../utils/activitySchema";

const Appointments = new Mongo.Collection("appointments");

const AppointmentSchema = new SimpleSchema({
  startsAt: { type: Date },
  endsAt: { type: Date },
  packageId: { type: String },
  userId: { type: String },
  doctorId: { type: String },
  orderId: { type: String },
  ...activitySchema,
});

Appointments.attachSchema(AppointmentSchema);

export { AppointmentSchema, Appointments };
