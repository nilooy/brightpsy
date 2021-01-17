import cloudinary from "cloudinary";

Meteor.methods({
  "user.uploadPhoto"({ url }) {
    check(url, String);

    cloudinary.v2.uploader.upload(url, function (error, result) {
      console.log(result, error);
    });
  },
});
