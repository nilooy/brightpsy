import {Rooms} from "@api/services/chat/model/RoomCollection";

Meteor.publish("rooms.userOnline", function() {
    const loggedInUser = Meteor.userId();
    if(!loggedInUser) return;

    const rooms = Rooms.find({
        members: Meteor.userId()
    } , {fields:
    {
        members: 1,
        _id: 0
    }
    }).fetch()

    if(!rooms?.length) return;

    let userIds = []

    rooms.forEach(room => {
        userIds.push(...room.members.filter(member => member !== loggedInUser))
    })

    if(!userIds?.length) return;

    return Meteor.users.find({ _id: { $in: userIds } });
});