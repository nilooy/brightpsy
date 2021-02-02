export const roles = ["admin", "doctor", "user"];

export const createRoles = (callback) => {
  roles.forEach((role) => Roles.createRole(role, { unlessExists: true }));
  callback();
};

export const addUserRoles = (userId, roleToadd, identity_numb) => {
  if (!userId)
    throw new Meteor.Error("authorization", "User not found to add roles");

  // check if the sent role is in the roles array
  if (roles.find((role) => role === roleToadd)) {
    if (identity_numb) {
      Roles.addUsersToRoles(userId, "doctor");
    } else {
      Roles.addUsersToRoles(userId, "user");
    }
  }
};

