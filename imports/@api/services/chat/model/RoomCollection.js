import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { activitySchema } from "../../../utils/activitySchema";

const Rooms = new Mongo.Collection("rooms");

const RoomSchema = new SimpleSchema({
  members: { type: Array, optional: true },
  "members.$": { type: String, optional: true },
  userId: { type: String },
  ...activitySchema,
});

Rooms.attachSchema(RoomSchema);

export { Rooms, RoomSchema };
