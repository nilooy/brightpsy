const roles = ["admin", "doctor", "user"];

export const createRoles = (callback) => {
  roles.forEach((role) => Roles.createRole(role, { unlessExists: true }));
  callback();
};

export const addUserRoles = (userId, roleToadd) => {
  if (!userId)
    throw new Meteor.Error("authorization", "User not found to add roles");

  // check if the sent role is in the roles array
  if (roles.find((role) => role === roleToadd)) {
    Roles.addUsersToRoles(userId, "student");
  }
};
