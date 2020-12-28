import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

Meteor.methods({
  "profile.addPhoto"(data) {
    const { imageUrl } = data;
    Accounts.users.update(
      { _id: Meteor.userId() },
      {
        $set: {
          "profile.imageUrl": imageUrl,
        },
      }
    );
  },
});
