import { Meteor } from "meteor/meteor";
import { StudioCollection } from "../../../imports/api/StudioCollection";

Meteor.methods({
  "studio.create"(data) {
    const { name, address, imageUrl } = data;
    return StudioCollection.insert({
      name,
      address,
      imageUrl,
      userId: this.userId,
      createdAt: new Date(),
    });
  },
  "studio.addPhoto"(data) {
    const { studioId, imageUrl } = data;
    StudioCollection.update(studioId, {
      $set: {
        imageUrl,
      },
    });
  },
});
