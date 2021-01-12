// Support for playing D&D: Roll 3d6 for dexterity.
Accounts.onCreateUser((options, user) => {
  if (user.services.google) {
    const data = user.services.google;
    user.profile = {
      firstName: data?.given_name,
      lastName: data?.family_name,
      imageUrl: data?.picture,
    };
  }

  if (user.services.facebook) {
    const data = user.services.facebook;

    user.profile = {
      firstName: data?.first_name,
      lastName: data?.last_name,
      imageUrl: data?.picture?.data?.url,
    };
  }

  return user;
});
