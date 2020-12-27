import { Meteor } from "meteor/meteor";
import { StudioCollection } from "../../../imports/api/StudioCollection";

Meteor.publish("studios.get", function publishTasks() {
  return StudioCollection.find({ userId: this.userId });
});
