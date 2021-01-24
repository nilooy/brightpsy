import React, { useEffect, useState } from "react";
import { FiEdit3 } from "@react-icons/all-files/fi/FiEdit3";

const ProfileImageUpload = () => {
  useEffect(() => {}, []);

  const [coverImg, setCoverImg] = useState(null);
  const [profileImg, setProfileImg] = useState(null);

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
                src="https://cdn.tuk.dev/assets/photo-1519252161722-1d52d47ac7df.jpg"
                alt
                className="w-full h-full object-cover overflow-hidden rounded shadow"
              />
              <div className="flex bg-white items-center px-3 py-2 shadow rounded absolute right-0 mr-4 mt-4 cursor-pointer top-0">
                <p className="text-xs text-gray-600">Change Cover Photo</p>
                <div className="ml-2 text-gray-600">
                  <FiEdit3 />
                </div>
              </div>
              <div className="w-20 h-20 rounded-full bg-cover bg-center bg-no-repeat absolute bottom-0 -mb-10 ml-12 shadow">
                <img
                  src="https://cdn.tuk.dev/assets/webapp/forms/form_layouts/form2.jpg"
                  alt
                  className="w-full h-full object-cover overflow-hidden absolute z-0 rounded-full shadow"
                />
                <div className="bg-white h-6 w-6 rounded-full flex items-center justify-center right-0 absolute cursor-pointer text-gray-600">
                  <FiEdit3 />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileImageUpload;
