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
    className="max-w-md mx-auto xl:max-w-5xl lg:max-w-5xl md:max-w-xl mb-6 bg-gray-700 max-h-screen shadow-2xl flex-row rounded relative lg:flex cursor-pointer ">
  <div className="h-48 lg:h-auto lg:w-64 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden ">
  <img
              src={imageUrl}
              alt=""
              className=" inset-0 w-full h-full object-cover"
            />  
  </div>
  <div className="w-full border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
    <div className="mb-2">
      <p className="text-sm text-grey-dark flex items-center">
       
        {address?.[0]?.formatted_address}
      </p>
      <div className="text-base lg:text-2xl text-black font-bold   mb-2">{title}</div>
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
      <img className="w-10 h-10 rounded-full mr-4" src={doctor.imageUrl} alt="avatar"/>
      <div className="text-sm">
        <p className="text-black-dark leading-none">{doctor.firstName}</p>
        <p className="text-grey-dark text-xs">{doctor.lastName}</p>
      </div>
    </div>
  </div>
</div>

 
    
  );
};

export default StudioCard;

















/* 

<div
      onClick={onClick}
      className="grid grid-cols-1 sm:grid-cols-2 sm:px-8 sm:py-12 sm:gap-x-8 md:py-4 shadow-md rounded-3xl cursor-pointer"
    >
      <div className="relative z-10 col-start-1 row-start-1 px-4 pb-3 bg-gradient-to-t from-black sm:bg-none">
        <p className="text-sm font-medium text-white sm:mb-1 sm:text-gray-500">
          {type}
        </p>
        <h2 className="text-xl font-semibold text-white sm:text-2xl sm:leading-7 sm:text-black md:text-3xl">
          {title}
        </h2>
      </div>
      <div className="col-start-1 row-start-2 px-4 sm:pb-16">
        <div className="flex items-center text-sm font-medium my-5 sm:mt-2 sm:mb-4">
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="text-green-600"
          >
            <path d="M9.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.784-.57-.381-1.81.587-1.81H7.03a1 1 0 00.95-.69L9.05 3.69z" />
          </svg>
          <div className="ml-1">
            <span className="text-black">4.94</span>
            <span className="sm:hidden md:inline">(128)</span>
          </div>
          <div className="text-base font-normal mx-2">·</div>
          <div>{address}</div>
        </div>
        <hr className="w-16 border-gray-300 hidden sm:block" />
        <p className="text-gray-500 mt-1">{desc}</p>
        <div className="px-3 pb-4 mt-1">
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
      </div>
      <div className="col-start-1 row-start-3 space-y-3 px-4">
        <p className="flex items-center text-black text-sm font-medium">
          <img
            src="https://tailwindcss.com/_next/static/media/kevin-francis.96abb150fe2c7e0df92da9d24b44bfc0.jpg"
            alt=""
            className="w-6 h-6 rounded-full mr-2 bg-gray-100"
          />
          {doctor}
        </p>
        <button
          type="button"
          className="bg-green-100 text-green-700 text-base font-semibold px-6 py-2 rounded-lg"
        >
          Contatti
        </button>
      </div>
      <div className="col-start-1 row-start-1 flex sm:col-start-2 sm:row-span-3">
        <div className="w-full grid grid-cols-3 grid-rows-2 gap-2">
          <div className="relative col-span-3 row-span-2 md:col-span-2">
            <img
              src={imageUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-cover bg-gray-100 sm:rounded-lg"
            />
          </div>
          <div className="relative hidden md:block">
            <img
              src={imageUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-cover rounded-lg bg-gray-100"
            />
          </div>
          <div className="relative hidden md:block">
            <img
              src={imageUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-cover rounded-lg bg-gray-100"
            />
          </div>
        </div>
      </div>
    </div>

*/