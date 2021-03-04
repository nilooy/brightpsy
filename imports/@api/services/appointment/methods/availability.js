import { Availabilities } from "../model/AvailabilityCollection";
import { defaultAvailabilityData } from "../model/defaultAvailabilities";

Meteor.methods({
  "availability.createDefault"({ data }) {
    if (Availabilities.findOne({ userId: Meteor.userId() })) {
      return Availabilities.findOne({ userId: Meteor.userId() });
    }

    const availabilityId = Availabilities.insert({
      ...defaultAvailabilityData,
      userId: Meteor.userId(),
    });

    if (availabilityId) return Availabilities.findOne(availabilityId);

    return Meteor.Error("server-error", "Something went wrong");
  },

  "availability.resetToDefault"({ data }) {
    return Availabilities.update(data._id, {
      $set: { ...defaultAvailabilityData, userId: Meteor.userId() },
    });
  },
});
