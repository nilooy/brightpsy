import { Studios } from "../models/StudioCollection";
import { Addresses } from "../models/AddressCollection";
import { ValidatedMethod } from "meteor/mdg:validated-method";

import SimpleSchema from "simpl-schema";

// TODO: Confirm if this can be risky as imported on client

export const createOrUpdateStudio = new ValidatedMethod({
  name: "studio.createOrUpdate",
  validate: new SimpleSchema({
    name: { type: String },
    email: { type: String, optional: true },
    tel: { type: String, optional: true },
    address: { type: Object, optional: true, blackbox: true },
    type: { type: String, optional: true },
    online: { type: Boolean, optional: true },
    physical: { type: Boolean, optional: true },
    studioId: { type: String, optional: true },
    addressId: { type: String, optional: true },
    tags: { type: Array, optional: true },
    "tags.$": { type: Object, optional: true },
    "tags.$.id": { type: String, optional: true },
    "tags.$.text": { type: String, optional: true },
    desc: { type: String, optional: true },
  }).validator(),
  run({
    name,
    type,
    address,
    mode,
    online,
    physical,
    studioId: id,
    addressId,
    tags,
    desc,
    email,
    tel,
  }) {
    // for update we need studioId as id and addressId
    const studio = Studios.upsert(id, {
      $set: {
        name,
        type,
        mode,
        online,
        physical,
        tags,
        desc,
        email,
        tel,
        userId: this.userId,
      },
    });

    if (!id) {
      Addresses.upsert(addressId, {
        $set: { studioId: studio?.insertedId, ...address },
      });
    }

    return studio?.insertedId;
  },
});

export const addPhoto = new ValidatedMethod({
  name: "studio.addPhoto",
  validate: new SimpleSchema({
    studioId: String,
    imageUrl: String,
  }).validator(),
  run({ studioId, imageUrl }) {
    return Studios.update(studioId, {
      $set: {
        imageUrl,
      },
    });
  },
});
