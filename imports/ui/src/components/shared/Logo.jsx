import React from "react";
import { GiMeditation } from "@react-icons/all-files/gi/GiMeditation";

const Logo = ({ link }) => {
  return (
    <a
      className="flex ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
      href={link}
    >
      <GiMeditation className="text-purple-700 text-2xl ml-2" />
      Psicologi
    </a>
  );
};

export default Logo;
