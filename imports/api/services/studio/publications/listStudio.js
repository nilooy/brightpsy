import { Meteor } from "meteor/meteor";
import { Addresses } from "../models/AddressCollection";
import { Studios } from "../models/StudioCollection";

Meteor.publish("studios.get", function publishTasks() {
  return Studios.lookup({ userId: this.userId }, {}, [
    {
      collection: Addresses,
      localField: "_id",
      foreignField: "studioId",
      selector: {},
    },
  ]);
});
