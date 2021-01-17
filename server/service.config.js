import cloudinary from "cloudinary";

ServiceConfiguration.configurations.upsert(
  {
    service: "facebook",
  },
  {
    $set: {
      appId: Meteor.settings.facebook.appId,
      loginStyle: "popup",
      secret: Meteor.settings.facebook.secret,
    },
  }
);

ServiceConfiguration.configurations.upsert(
  {
    service: "google",
  },
  {
    $set: {
      clientId: Meteor.settings.google.clientId,
      loginStyle: "popup",
      secret: Meteor.settings.google.secret,
    },
  }
);

cloudinary.v2.config({
  cloud_name: Meteor.settings.cloudinary.cloud_name,
  api_key: Meteor.settings.cloudinary.api_key,
  api_secret: Meteor.settings.cloudinary.api_secret,
});
