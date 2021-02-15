import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { activitySchema } from "../../../utils/activitySchema";

const Orders = new Mongo.Collection("orders");

const OrderSchema = new SimpleSchema({
  packageId: { type: String },
  doctorId: { type: String },
  userId: { type: String },
  appointmentId: { type: String, optional: true },
  stripeCustomerId: { type: String },
  checkoutSessionId: { type: String },
  quantity: { type: Number },
  amount: { type: Number },
  payment_intent: { type: String },
  payment_status: { type: String },
  ...activitySchema,
});

Orders.attachSchema(OrderSchema);

export { OrderSchema, Orders };
