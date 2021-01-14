import React, { useEffect, useRef, useState } from "react";
import PageTitle from "../../components/shared/Typography/PageTitle";
import { Avatar } from "@windmill/react-ui";
import { MdEdit } from "@react-icons/all-files/md/MdEdit";
import { storage } from "../../../firebase";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

function Profile() {
  const fileInput = useRef();

  const [file, setFile] = useState(null);

  const user = useTracker(() => Meteor.user());

  useEffect(() => {
    if (file) {
      uploadImage((imageUrl) => {
        Meteor.call("profile.addPhoto", { imageUrl }, (error) => {
          if (error) {
            console.error(error);
          }
        });
      });
    }
  }, [file]);

  const uploadImage = (callback) => {
    const uploadTask = storage.ref(`images/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => console.log(error),
      () => {
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            callback(url);
          });
      }
    );
  };

  const avatar = user
    ? user?.profile?.imageUrl
    : "https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82";

  return (
    <>
      <PageTitle>Profile</PageTitle>

      <div
        onClick={() => fileInput.current.click()}
        className="relative cursor-pointer overflow-hidden w-44 h-44 hover:opacity-90 border-green-300 border-5 rounded-full"
      >
        <Avatar
          className="align-middle w-44 h-44"
          src={avatar}
          alt=""
          aria-hidden="true"
        />
        <MdEdit className="text-4xl absolute top-1/2 z-10 text-white m-auto w-full" />
      </div>
      <input
        onChange={(e) => setFile(e.target.files[0])}
        ref={fileInput}
        type="file"
        className="hidden"
      />

      <p className="text-4xl">
        {user?.profile?.firstName + " " + user?.profile?.lastName}
      </p>
      <p className="text-2xl">{user?.username}</p>
    </>
  );
}

export default Profile;
