import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Tags = new Mongo.Collection("tags");

const TagSchema = new SimpleSchema({
  text: { type: String },
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function () {
      if (this.isInsert || this.isUpsert) {
        return this.userId;
      }
    },
  },
});

Tags.attachSchema(TagSchema);

export { Tags, TagSchema };
