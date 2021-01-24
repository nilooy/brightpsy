import React from "react";

const TextAvatar = ({ firstName, lastName }) => {
  const nameAbbr = firstName[0].toUpperCase() + lastName[0].toUpperCase();

  return (
    <div className="h-12 w-12 mb-4 lg:mb-0 mr-4 bg-gray-100 shadow-lg flex justify-center items-center rounded-full">
      <p className="text-green-700 font-bold text-lg mt-1">{nameAbbr}</p>
    </div>
  );
};

const ImageAvatar = ({ imageUrl, alt }) => (
  <div className="h-12 w-12 mb-4 lg:mb-0 mr-4">
    <img
      src={imageUrl}
      alt={alt}
      className="h-full w-full rounded-full overflow-hidden shadow"
    />
  </div>
);

export const UserAvatar = (props) => {
  const { firstName, lastName, imageUrl } = props;
  return imageUrl ? (
    <ImageAvatar {...props} imageUrl={imageUrl} alt={firstName} />
  ) : (
    <TextAvatar {...props} firstName={firstName} lastName={lastName} />
  );
};

export default UserAvatar;
