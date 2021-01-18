import React from "react";
import { GiMeditation } from "@react-icons/all-files/gi/GiMeditation";

const Logo = ({ link }) => {
  return (
    <a
      className="flex ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
      href={link}
    >
      <img src="/img/logo.png" className="w-20 lg:w-32" />
    </a>
  );

  return (
    <a
      className="flex ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
      href={link}
    >
      <GiMeditation className="text-blue-700 text-2xl" />
      Bright<span className="text-blue-700 text-xl">Psi</span>
    </a>
  );
};

export default Logo;
