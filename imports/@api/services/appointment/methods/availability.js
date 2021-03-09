import { Availabilities } from "../model/AvailabilityCollection";
import { defaultAvailabilityData } from "../model/defaultAvailabilities";

Meteor.methods({
  "availability.createDefault"({ data }) {
    if (Availabilities.findOne({ userId: Meteor.userId() })) {
      return Meteor.Error(
        "availabilities-already-exist",
        "User already have Availabilities"
      );
    }

    return Availabilities.insert({
      ...defaultAvailabilityData,
      userId: Meteor.userId(),
    });
  },

  "availability.update"({ data }) {
    console.log({ data });
    return Availabilities.update(data._id, {
      $set: { ...data, userId: Meteor.userId() },
    });
  },

  "availability.resetToDefault"({ data }) {
    console.log({ data });
    return Availabilities.update(data._id, {
      $set: { ...defaultAvailabilityData, userId: Meteor.userId() },
    });
  },

  "availability.getByUser"({}) {
    return Availabilities.findOne({ userId: Meteor.userId() });
  },
  "availability.getByUserId"({ userId }) {
    console.log(userId);
    check(userId, String);
    return Availabilities.findOne({ userId });
  },
});
