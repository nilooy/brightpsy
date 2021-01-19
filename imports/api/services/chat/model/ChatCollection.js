import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { activitySchema } from "../../../utils/activitySchema";

const Chat = new Mongo.Collection("chat");

const Chatchema = new SimpleSchema({
  text: { type: String },
  roomId: { type: String },
  ...activitySchema,
});

Chat.attachSchema(Chatchema);

export { Chatchema, Chat };
