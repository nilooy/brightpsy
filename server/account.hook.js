Accounts.onCreateUser((options, user) => {
  if (user.services.password) {
    user.profile = options.profile;
  }

  if (user.services.google) {
    const data = user.services.google;
    user.profile = {
      firstName: data?.given_name,
      lastName: data?.family_name,
      imageUrl: data?.picture,
    };

    user.username = data?.email; // to avoid duplicate email
    Roles.addUsersToRoles(user._id, "user");
  }

  if (user.services.facebook) {
    const data = user.services.facebook;

    user.profile = {
      firstName: data?.first_name,
      lastName: data?.last_name,
      imageUrl: data?.picture?.data?.url,
    };

    user.username = data?.email; // to avoid duplicate email
    Roles.addUsersToRoles(user._id, "user");
  }

  return user;
});
