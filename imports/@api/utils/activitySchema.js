import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const activitySchema = {
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      }
    },
  },
  updatedAt: {
    type: Date,
    optional: true,
    autoValue: function () {
      if (this.isUpsert) {
        return new Date();
      }
    },
  },
  createdBy: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function () {
      if (this.isInsert) {
        return this.userId;
      }
    },
  },
  updatedBy: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
    autoValue: function () {
      if (this.isUpsert) {
        return this.userId;
      }
    },
  },
};

export { activitySchema };
