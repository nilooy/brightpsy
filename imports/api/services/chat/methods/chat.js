import { Chat } from "../model/ChatCollection";
import { Rooms } from "../model/RoomCollection";

Meteor.methods({
  "room.create"({ members, studioId, userId }) {
    return Rooms.insert({ members, studioId, userId });
  },
  "room.findOrCreate"({ to, members, studioId, userId }) {
    const from = Meteor.userId();
    let roomId = null;
    roomId = Rooms.findOne({ members: { $all: [from, to] } })?._id;
    console.log("room", { members: { $all: [from, to] } });
    if (!roomId) {
      roomId = Rooms.insert({ members, studioId, userId });
    }
    return roomId;
  },
  "chat.create"({ text, roomId }) {
    return Chat.insert({ text, roomId });
  },
});
