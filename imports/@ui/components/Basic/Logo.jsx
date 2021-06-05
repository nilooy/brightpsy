import React from "react";
import { GiMeditation } from "@react-icons/all-files/gi/GiMeditation";
import {Link} from "react-router-dom";

const Logo = ({ link }) => {
  return (
    <Link
      className="flex ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
      to={link}
    >
      <img src="/img/logo.png" className="w-20 lg:w-32 h-full" />
    </Link>
  );
};

export default Logo;
