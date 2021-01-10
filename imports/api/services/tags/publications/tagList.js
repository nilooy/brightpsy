import { Meteor } from "meteor/meteor";
import { Tags } from "../model/TagsCollection";

Meteor.publish("tags.get", function publishTasks() {
  return Tags.find({});
});
