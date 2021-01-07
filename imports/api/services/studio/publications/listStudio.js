import { Meteor } from "meteor/meteor";
import { Studios } from "../models/StudioCollection";

Meteor.publish("studios.get", function publishTasks() {
  return Studios.find({ userId: this.userId });
});
