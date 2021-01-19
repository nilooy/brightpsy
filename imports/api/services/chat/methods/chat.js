import { Rooms } from "../model/RoomCollection";

Meteor.methods({
  "room.create"({ members, studioId, userId }) {
    return Rooms.insert({ members, studioId, userId });
  },
  "room.find"({ to }) {
    const from = Meteor.userId();
    return Rooms.findOne({ members: { $all: [from, to] } });
  },
  "chat.create"({ text, roomId }) {
    return Rooms.insert({ text, roomId });
  },
});
