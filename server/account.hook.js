import { roles } from "../imports/api/utils/authorization";

Accounts.onCreateUser((options, user) => {
  if (user.services.google) {
    const data = user.services.google;
    user.profile = {
      firstName: data?.given_name,
      lastName: data?.family_name,
      imageUrl: data?.picture,
    };

    user.username = data?.email; // to avoid duplicate email
  }

  if (user.services.facebook) {
    const data = user.services.facebook;

    user.profile = {
      firstName: data?.first_name,
      lastName: data?.last_name,
      imageUrl: data?.picture?.data?.url,
    };

    user.username = data?.email; // to avoid duplicate email
  }

  if (!Roles.userIsInRole(user._id, roles)) {
    Roles.addUsersToRoles(user._id, "user");
  }

  return user;
});
