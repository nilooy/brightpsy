import React from "react";

const PackageCard = ({
  title,
  user,
  onClick,
  visits = [],
  images = [],
  isPhysical,
  isVirtual,
}) => {
  const price = visits.length && visits?.[0]?.price;
  return (
    <div
      onClick={onClick}
      className="bg-white shadow border border-gray-200 rounded transition duration-150 ease-in-out hover:shadow-lg cursor-pointer"
    >
      <div className="relative w-full h-40">
        {images?.[0] ? (
          <img
            className="rounded-t z-0 w-full h-full absolute inset-0 object-cover"
            src={images[0]}
            alt="banner"
          />
        ) : (
          <img
            className="rounded-t z-0 w-full h-full absolute inset-0 object-cover"
            src="https://tuk-cdn.s3.amazonaws.com/assets/templates/Education-Portal/ep_9.png"
            alt="banner"
          />
        )}
      </div>
      <div className="pt-5 w-full h-full">
        <div className="px-5 items-center mb-4 flex">
          {isPhysical && (
            <p className="bg-green-300 text-gray-600 p-2 mr-1 rounded-3xl leading-3 tracking-normal text-xs font-normal">
              In presenza
            </p>
          )}
          {isVirtual && (
            <p className="bg-green-300 text-gray-600 p-2 rounded-3xl leading-3 tracking-normal text-xs font-normal">
              Sedute Online
            </p>
          )}
        </div>
        <h4 className="px-5 text-lg leading-5 font-bold tracking-normal text-gray-800 mb-2">
          {title}
        </h4>
        {user && (
          <p className="px-5 text-green-300 text-sm font-normal tracking-normal leading-5 mb-4">
            {user.profile?.firstName} {user.profile?.lastName}
          </p>
        )}
        <div className="py-4 px-5 flex justify-between border-t border-gray-300">
          {price && (
            <p className="text-green-400 text-lg font-bold leading-5 tracking-normal">
              {price} &euro;
            </p>
          )}
          <div className="flex items-center">
            <svg
              className="w-3 mr-1 text-green-400 icon icon-tabler icon-tabler-star"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" fill="none" d="M0 0h24v24H0z"></path>
              <path
                fill="currentColor"
                d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z"
              ></path>
            </svg>
            <svg
              className="w-3 mr-1 text-green-400 icon icon-tabler icon-tabler-star"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" fill="none" d="M0 0h24v24H0z"></path>
              <path
                fill="currentColor"
                d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z"
              ></path>
            </svg>
            <svg
              className="w-3 mr-1 text-green-400 icon icon-tabler icon-tabler-star"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" fill="none" d="M0 0h24v24H0z"></path>
              <path
                fill="currentColor"
                d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z"
              ></path>
            </svg>
            <svg
              className="w-3 mr-1 text-green-400 icon icon-tabler icon-tabler-star"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" fill="none" d="M0 0h24v24H0z"></path>
              <path
                fill="currentColor"
                d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z"
              ></path>
            </svg>
            <svg
              className="w-3 text-gray-200 icon icon-tabler icon-tabler-star"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" fill="none" d="M0 0h24v24H0z"></path>
              <path
                fill="currentColor"
                d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
