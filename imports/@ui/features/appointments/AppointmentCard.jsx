import React from "react";
import UserAvatar from "../../components/Avatar/UserAvatar";
import { RiWechatLine } from "@react-icons/all-files/ri/RiWechatLine";
import { BiCalendarHeart } from "@react-icons/all-files/bi/BiCalendarHeart";
import { useHistory } from "react-router-dom";
import { privatePath } from "@ui/routes/privatePath";
const AppointmentCard = ({ data, onClick }) => {
  const {
    package: { title, images = [] },
    user: {
      profile: { firstName, lastName, profileImg },
      _id: userId,
    },
    amount,
    quantity = [],
    createdAt,
  } = data;

  const history = useHistory();

  const fullName = firstName + " " + lastName;

  return (
    <>
      <div className="border rounded-3xl py-4 px-5 border-gray-400 dark:border-gray-200">
        <div className="flex  justify-between mb-3">
          <div className="flex flex-wrap w-1/2">
            {quantity &&
              [...Array(quantity).keys()].map((i) => (
                <span
                  key={i}
                  className="w-6 h-6 mr-1 flex flex-col text-center justify-center bg-teal-200 text-teal-600 rounded-full text-xs"
                >
                  {i + 1}
                </span>
              ))}
          </div>
          <div className="w-1/2 text-right">
            <p className=" inline-block text-xs leading-3 text-orange-600 bg-orange-200 px-4 py-2 mb-3 rounded-2xl">
              In Attesa 1/5
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium leading-4 text-gray-700 dark:text-gray-100">
            {title}
          </p>
          <p className="text-xs font-semibold leading-3 text-gray-400 dark:text-gray-200">
            {new Date(createdAt).toLocaleString()}
          </p>
        </div>
        <div className="sm:flex  items-end justify-between pt-2">
          <div className="flex sm:mb-0 mb-4 items-center">
            {images.length &&
              images.map((img) => (
                <img
                  key={img}
                  alt={"packages-" + img}
                  className="w-8 h-8 rounded mr-2 object-cover object-center"
                  src={img}
                />
              ))}
          </div>
        </div>
        <div className="mt-2 sm:flex items-center justify-between">
          <p className="text-xs sm:mb-0 mb-4 font-medium leading-3 text-gray-400 dark:text-gray-200">
            Cliente:
            <span className="text-sm font-medium leading-4 text-gray-700 dark:text-gray-100">
              {" "}
              {fullName}
            </span>
          </p>
          <UserAvatar
            size={12}
            imageUrl={profileImg}
            firstName={firstName}
            lastName={lastName}
          />
        </div>

        <div className="pt-2 flex items-center">
          <button
            onClick={() => history.push(privatePath.inboxById(userId))}
            className="mr-4 cursor-pointer text-3xl text-blue-500"
          >
            <RiWechatLine />
          </button>

          <button
            onClick={onClick}
            className="flex ml-2 text-xs leading-3 text-green-600 bg-green-200 p-2 border"
          >
            Appuntamenti
            <BiCalendarHeart className="text-md ml-1" />
          </button>
        </div>
      </div>
    </>
  );
};

export default AppointmentCard;
