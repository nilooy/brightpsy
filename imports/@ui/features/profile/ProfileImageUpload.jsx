import React, { useEffect, useRef, useState } from "react";
import { FiEdit3 } from "@react-icons/all-files/fi/FiEdit3";
import { useImage } from "@ui/api-hooks/file";
import { useUserData } from "@ui/api-hooks/user";

const ProfileImageUpload = () => {
  const coverImgInput = useRef();
  const profileImgInput = useRef();

  const user = useUserData();

  const imageMutation = useImage();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    file.field = e.target.name;
    const res = imageMutation.mutate(file);
  };

  const coverImgUrl = user.profile?.coverImg;
  const profileImgUrl = user.profile?.profileImg;

  return (
    <div className="mt-5">
      <div className="container mx-auto shadow bg-white rounded xl:w-9/12 p-4">
        <div className="xl:w-full border-b border-gray-300 py-5">
          <div className="flex items-center w-11/12 mx-auto">
            <p className="text-lg text-gray-800 font-bold">Profile</p>
            <div className="ml-2 cursor-pointer text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={16}
                height={16}
              >
                <path
                  className="heroicon-ui"
                  d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full mx-auto">
          <div className="xl:w-full m-auto">
            <div className="bg-center bg-cover bg-no-repeat rounded relative mt-8 h-48">
              <img
                src={coverImgUrl}
                alt={user.profile?.firstName + "-cover"}
                className="w-full h-full object-cover overflow-hidden rounded shadow"
              />
              <input
                name="profileImg"
                onChange={handleImageUpload}
                ref={coverImgInput}
                type="file"
                className="hidden"
              />
              <button
                onClick={() => coverImgInput.current.click()}
                className="flex bg-white items-center px-3 py-2 shadow rounded absolute right-0 mr-4 mt-4 cursor-pointer top-0"
              >
                <p className="text-xs text-gray-600">Change Cover Photo</p>

                <div className="ml-2 text-gray-600">
                  <FiEdit3 />
                </div>
              </button>
              <input
                name="coverImg"
                onChange={handleImageUpload}
                ref={profileImgInput}
                type="file"
                className="hidden"
              />
              <div
                onClick={() => profileImgInput.current.click()}
                className="w-20 h-20 rounded-full bg-cover bg-center bg-no-repeat absolute bottom-0 -mb-10 ml-12 shadow"
              >
                <img
                  src={profileImgUrl}
                  alt={user.profile?.firstName + "-avatar"}
                  className="w-full h-full object-cover overflow-hidden absolute z-0 rounded-full shadow"
                />
                <span className="bg-white h-6 w-6 rounded-full flex items-center justify-center right-0 absolute cursor-pointer text-gray-600">
                  <FiEdit3 />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileImageUpload;
