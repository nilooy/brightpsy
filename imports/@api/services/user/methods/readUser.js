Meteor.methods({
  "user.getAll"({ excludeMe }) {
    if (excludeMe)
      return Meteor.users.find({ _id: { $ne: this.userId } }).fetch();

    return Meteor.users.find().fetch();
  },
  "user.getAllDoctor"() {
    return Meteor.users
      .find({
        "profile.identity_numb": { $exists: true },
      })
      .fetch();
  },
});
