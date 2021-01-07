import { Meteor } from "meteor/meteor";
import { Studios, StudioSchema } from "../models/StudioCollection";
// import { Addresses } from "../models/AddressSchema";
import { ValidatedMethod } from "meteor/mdg:validated-method";

import SimpleSchema from "simpl-schema";

// TODO: Confirm if this can be risky as imported on client

export const createStudio = new ValidatedMethod({
  name: "studio.create",
  validate: new SimpleSchema({
    name: { type: String },
    address: { type: Object },
  }).validator(),
  run({ name, type }) {
    const studioId = Studios.insert({
      name,
      type,
    });

    // Addresses.insert({ formatted_address: "asdas" });
  },
});

export const addPhoto = new ValidatedMethod({
  name: "studio.addPhoto",
  validate: StudioSchema.pick("imageUrl").validator(),
  run({ studioId, imageUrl }) {
    return Studios.update(studioId, {
      $set: {
        imageUrl,
      },
    });
  },
});
