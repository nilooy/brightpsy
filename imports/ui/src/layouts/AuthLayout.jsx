import React from "react";
import { Redirect } from "react-router-dom";
import { GiMeditation } from "@react-icons/all-files/gi/GiMeditation";
import { privatePath } from "../routes/privatePath";
import Logo from "../components/shared/Logo";

const ImageLight = "/img/login-office.jpeg";
const ImageDark = "/img/login-office-dark.jpeg";

const AuthLayout = ({ children }) => {
  if (Meteor.userId()) return <Redirect to={privatePath.dashboard} />;

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2 relative">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
            {/* Title */}
            <div className="absolute top-1/2 w-full flex justify-center">
              <Logo />
            </div>
            {/* Title */}
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
