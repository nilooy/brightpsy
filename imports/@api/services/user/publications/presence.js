// TODO: remove this pub

Meteor.publish("user.status", function() {
    console.log(Meteor.userId())
    return Meteor.users.find({ "status.online": true, _id: { $ne: Meteor.userId() } });
});