import { Addresses } from "../models/AddressCollection";
import { Studios } from "../models/StudioCollection";

Meteor.methods({
  "studio.getAll"() {
    const query = Studios.rawCollection().aggregate([
      {
        $lookup: {
          from: "addresses",
          localField: "_id",
          foreignField: "studioId",
          as: "address",
        },

        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "userId",
          as: "user",
        },
      },
    ]);

    return query.toArray();
  },

  "studio.getByUser"() {
    const studio = Studios.findOne({ userId: this.userId });
    const address = Addresses.findOne({ studioId: studio._id });

    Object.assign(studio, { address });

    return studio;
  },

  "studio.getById"({ studioId }) {
    console.log("studioId", studioId);
    const studio = Studios.findOne({ _id: studioId });
    const address = Addresses.findOne({ studioId: studioId });

    Object.assign(studio, { address });

    return studio;
  },
});
