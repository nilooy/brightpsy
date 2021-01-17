import { Rooms } from "../collections/RoomCollection";
Meteor.methods({
  "room.create"({ participants }) {
    return Rooms.insert({ participants });
  },

  "room.find"({ to }) {
    const from = Meteor.userId();
    return Rooms.findOne({ participants: { $all: [from, to] } });
  },
});
