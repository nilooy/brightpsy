const { getUniqueId } = require("@ui/utils/helpers");

const {
  bucket,
  GoogleAccessId,
  GoogleSecretKey,
} = Meteor.settings.googleCloudBucket;

const directiveName = "image.upload";

Slingshot.fileRestrictions(directiveName, {
  allowedFileTypes: ["image/png", "image/jpeg"],
  maxSize: 10 * 1024 * 1024, // 10 MB (use null for unlimited).
});

Slingshot.createDirective(directiveName, Slingshot.GoogleCloud, {
  bucket,
  GoogleAccessId,
  GoogleSecretKey,
  acl: "public-read",
  authorize: function () {
    //Deny uploads if user is not logged in.
    if (!this.userId) {
      var message = "Please login before posting files";
      throw new Meteor.Error("Login Required", message);
    }

    return true;
  },

  key: function (file) {
    //Store file into a directory by the user's username.
    var user = Meteor.users.findOne(this.userId);
    return (
      user.username + "/" + file.name.replace(/\s/g, "") + "-" + getUniqueId()
    );
  },
});

//CORS settings
[
  {
    origin: ["*"],
    responseHeader: ["*"],
    method: ["GET", "POST", "PUT", "HEAD"],
    maxAgeSeconds: 3000,
  },
];
