import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Rooms = new Mongo.Collection("rooms");

const RoomSchema = new SimpleSchema({
  participants: { type: Array, optional: true },
  "participants.$": { type: String, optional: true },
  createdBy: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function () {
      if (this.isInsert || this.isUpsert) {
        return this.userId;
      }
    },
  },
});

Rooms.attachSchema(RoomSchema);

export { Rooms, RoomSchema };
