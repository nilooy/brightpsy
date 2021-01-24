import React from "react";

const FormCard = ({ title, TitleIcon, className, children }) => {
  return (
    <div
      className={
        "container mx-auto mt-10 bg-white shadow rounded " +
        (className ? className : "")
      }
    >
      <div className="xl:w-full border-b border-gray-300 py-5">
        <div className="flex items-center w-11/12 mx-auto">
          <p className="text-lg text-gray-800 font-bold">{title}</p>
          <div className="ml-2 cursor-pointer text-gray-600">
            {TitleIcon && <TitleIcon />}
          </div>
        </div>
      </div>

      {children}
    </div>
  );
};

export default FormCard;
