import React from "react";
import StarReviews from "../StarReviews";

const StudioCard = ({
  title,
  address,
  online,
  physical,
  doctor,
  type,
  desc,
  tags,
  imageUrl,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="max-w-md mx-auto xl:max-w-5xl lg:max-w-5xl md:max-w-xl mb-6 bg-gray-700 max-h-screen shadow-2xl flex-row rounded relative lg:flex cursor-pointer "
    >
      <div className="h-48 lg:h-auto lg:w-64 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden ">
        {imageUrl && (
          <img
            src={imageUrl}
            alt=""
            className=" inset-0 w-full h-full object-cover"
          />
        )}
      </div>
      <div className="w-full border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-2">
          <p className="text-sm text-grey-dark flex items-center">
            {address?.[0]?.formatted_address}
          </p>
          <div className="text-base lg:text-2xl text-black font-bold   mb-2">
            {title}
          </div>
          <p className="text-xs lg:text-base text-grey-darker ">{desc}</p>
        </div>

        <div className="px-3 pb-2 mt-1">
          {tags &&
            tags.map((tag) => (
              <p
                key={tag.id}
                className="inline-block px-3 py-1 my-1 mr-2 text-xs font-semibold text-white bg-teal-400 rounded-full"
              >
                #{tag.text}
              </p>
            ))}
          {online && (
            <p className="inline-block px-3 py-1 my-1 mr-2 text-xs font-semibold text-white bg-teal-400 rounded-full">
              Online
            </p>
          )}
          {physical && (
            <p className="inline-block px-3 py-1 my-1 mr-2 text-xs font-semibold text-white bg-teal-400 rounded-full">
              In presenza
            </p>
          )}
        </div>

        <div className="flex items-center">
          {doctor?.imageUrl && (
            <img
              className="w-10 h-10 rounded-full mr-4"
              src={doctor?.imageUrl}
              alt="avatar"
            />
          )}

          <div className="text-sm">
            <p className="text-black-dark leading-none">{doctor?.firstName}</p>
            <p className="text-grey-dark text-xs">{doctor?.lastName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudioCard;
