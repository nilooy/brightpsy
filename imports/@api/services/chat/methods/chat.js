import { Chat } from "../model/ChatCollection";
import { Rooms } from "../model/RoomCollection";

Meteor.methods({
  "room.create"({ members, userId }) {
    return Rooms.insert({ members, userId });
  },
  "room.findOrCreate"({ to, members, userId }) {
    const from = Meteor.userId();
    let roomId = null;
    roomId = Rooms.findOne({ members: { $all: [from, to] } })?._id;
    if (!roomId) {
      roomId = Rooms.insert({ members, userId });
    }
    return roomId;
  },
  "chat.create"({ text, roomId }) {
    return Chat.insert({ text, roomId });
  },
});
