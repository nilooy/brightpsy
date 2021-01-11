import { Meteor } from "meteor/meteor";
import { Addresses } from "../models/AddressCollection";
import { Studios } from "../models/StudioCollection";

Meteor.publish("studios.get", function () {
  return Studios.lookup({ userId: this.userId }, {}, [
    {
      collection: Addresses,
      localField: "_id",
      foreignField: "studioId",
      selector: {},
    },
  ]);
});

Meteor.publish("studios.getById", function (studioId) {
  return Studios.lookup({ _id: studioId }, {}, [
    {
      collection: Addresses,
      localField: "_id",
      foreignField: "studioId",
      selector: {},
    },
  ]);
});

Meteor.publish("studios.public.getAll", function () {
  return Studios.lookup({}, { limit: 10 }, [
    {
      collection: Addresses,
      localField: "_id",
      foreignField: "studioId",
      options: { fields: { formatted_address: 1 } },
    },
  ]);
});
