import { Chat } from "../model/ChatCollection";
import { Rooms } from "../model/RoomCollection";

Meteor.publish("chat.getChatByRoom", function ({ roomId }) {
  return Chat.find({ roomId });
});

Meteor.publish("room.getRoomsByUser", function ({ userId }) {
  return Rooms.find({ userId });
});
