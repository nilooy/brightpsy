import { methodCall } from "@ui/utils/asyncMeteorMethod";
import { useMutation } from "react-query";

// Profile image
export const useImage = () =>
  useMutation((file) => imageUploadAsync(file), {
    onSuccess: (data, { field }) => {
      return Meteor.users.update(Meteor.userId(), {
        $set: { [`profile.${field}`]: data },
      });
    },
  });

export const usePackageImage = (setImage) =>
  useMutation((file) => imageUploadAsync(file), {
    onSuccess: (data) => {
      setImage(data);
    },
  });

export const imageUploadAsync = (file) =>
  new Promise((resolve, reject) => {
    const uploader = new Slingshot.Upload("image.upload");
    uploader.send(file, function (error, imageUrl) {
      if (error) {
        return reject(error);
      } else {
        return resolve(imageUrl);
      }
    });
  });

// CORS: gsutil cors set gs-cors.json gs://brightpsy
