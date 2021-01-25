import React from "react";

const TextAvatar = ({ firstName, lastName, size }) => {
  const nameAbbr = firstName?.[0].toUpperCase() + lastName?.[0].toUpperCase();

  return (
    <div
      className={
        "mb-4 lg:mb-0 mr-4 bg-gray-100 shadow-lg flex justify-center items-center rounded-full " +
        (size ? "w-" + size + " " + "h-" + size : "")
      }
    >
      <p className="text-green-700 font-bold text-lg mt-1">{nameAbbr}</p>
    </div>
  );
};

const ImageAvatar = ({ imageUrl, alt, size }) => (
  <div
    className={
      "lg:mb-0 mr-2 bg-cover " + (size ? "w-" + size + " " + "h-" + size : "")
    }
  >
    <img
      className={
        "rounded-full overflow-hidden shadow bg-white object-cover w-full h-full"
      }
      src={imageUrl}
      alt={alt}
    />
  </div>
);

export const UserAvatar = (props) => {
  const { firstName, lastName, imageUrl, size } = props;
  return imageUrl ? (
    <ImageAvatar {...props} imageUrl={imageUrl} alt={firstName} size={size} />
  ) : (
    <TextAvatar
      {...props}
      firstName={firstName}
      lastName={lastName}
      size={size}
    />
  );
};

export default UserAvatar;
