import React from "react";
import StarReviews from "../StarReviews";

const StudioCard = ({ title, address, desc, tags, imageUrl, onClick }) => {
  return (
    <div
      className="p-4 w-full md:w-2/6 lg:w-2/6 xl:w-1/5 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col overflow-hidden transition duration-500 ease-in-out transform bg-white rounded-lg shadow-2xl hover:scale-105">
        {imageUrl && (
          <img
            className="h-56 rounded-t-lg"
            alt="article image"
            src={imageUrl}
          />
        )}
        <div className="px-3 pt-4 mb-2 text-xl font-bold">
          <span>{title}</span>
        </div>
        <div className="px-3 pt-2">
          <small>{desc}</small>
          {address && <div className="overflow-hidden h-16">{address}</div>}
        </div>
        <div className="px-3 pb-4">
          {tags &&
            tags.map((tag) => (
              <p
                key={tag.id}
                className="inline-block px-3 py-1 my-1 mr-2 text-xs font-semibold text-white bg-teal-400 rounded-full"
              >
                #{tag.text}
              </p>
            ))}
        </div>
        <StarReviews />
      </div>
    </div>
  );
};

export default StudioCard;
