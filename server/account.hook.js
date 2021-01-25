import cloudinary from "cloudinary";

Accounts.onCreateUser((options, user) => {
  if (user.services.password) {
    user.profile = options.profile;
  }

  if (user.services.google) {
    const data = user.services.google;
    user.profile = {
      firstName: data?.given_name,
      lastName: data?.family_name,
      profileImg: data?.picture,
    };

    user.username = data?.email; // to avoid duplicate email
    Roles.addUsersToRoles(user._id, "user");
  }

  if (user.services.facebook) {
    const data = user.services.facebook;

    user.profile = {
      firstName: data?.first_name,
      lastName: data?.last_name,
      profileImg: data?.picture?.data?.url,
    };

    user.username = data?.email; // to avoid duplicate email
    Roles.addUsersToRoles(user._id, "user");
  }

  if (!user.services.password) {
    const cloudinaryUpload = Meteor.wrapAsync(cloudinary.v2.uploader.upload);
    const res = cloudinaryUpload(user.profile.profileImg);
    user.profile.profileImg = res.secure_url;
  }

  user.profile.coverImg = `https://storage.googleapis.com/brightpsy/predefinedCoverImages/${
    Math.floor(Math.random() * (10 - 1 + 1)) + 1
  }.jpg`;

  return user;
});
