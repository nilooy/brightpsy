import { useTracker } from "meteor/react-meteor-data";

export const isDoctor = () =>
  useTracker(() => Roles.getRolesForUser(Meteor.userId())[0] === "doctor");
export const isUser = () =>
  useTracker(() => Roles.getRolesForUser(Meteor.userId())[0] === "user");
