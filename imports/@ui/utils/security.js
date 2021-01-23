export const isDoctor = Roles.getRolesForUser(Meteor.userId())[0] === "doctor";
export const isUser = Roles.getRolesForUser(Meteor.userId())[0] === "user";
