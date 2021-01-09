import { Tags } from "../model/TagsCollection";
import { ValidatedMethod } from "meteor/mdg:validated-method";

import SimpleSchema from "simpl-schema";

export const createOrUpdateTag = new ValidatedMethod({
  name: "tag.createOrUpdate",
  validate: new SimpleSchema({
    id: { type: String, optional: true },
    text: { type: String },
  }).validator(),
  run({ id, text }) {
    // TODO: Not save tag if the tag exist because it's just for tag suggestion / autocomplete, shouldn't have duplicate
    /*   const findTag = Tags.find({ tag: tag }).fetch();

    console.log("findTag", findTag);

    if (findTag.length) return findTag._id; */
    // for update we need studioId as id and addressId
    const savedTag = Tags.upsert(id, {
      $set: {
        text,
      },
    });

    return savedTag?.insertedId;
  },
});

export const removeTag = new ValidatedMethod({
  name: "tag.remove",
  validate: new SimpleSchema({
    id: { type: String, optional: true },
  }).validator(),
  run({ id }) {
    Tags.remove({ _id: id, userId: this.userId });
  },
});
