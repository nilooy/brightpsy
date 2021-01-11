import React from "react";
import { Link } from "react-router-dom";

function AuthWelcome() {
  return (
    <div
      className="flex flex-col justify-center text-center"
      style={{ height: "65vh" }}
    >
      <Link
        className="text-blue-500 bg-transparent border border-solid border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-3"
        style={{ transition: "all .15s ease" }}
        to="/create-account/doctor"
      >
        Sei un psicologo?
      </Link>

      <Link
        className="text-blue-500 bg-transparent border border-solid border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1"
        style={{ transition: "all .15s ease" }}
        to="/create-account"
      >
        Sto cercando un psicologo
      </Link>

      <Link
        className="text-xs mt-5 text-gray-500 bg-transparent border border-solid border-gray-500 hover:bg-gray-500 hover:text-white active:bg-gray-600 uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1"
        style={{ transition: "all .15s ease" }}
        to="/login"
      >
        Sono già registrato
      </Link>
    </div>
  );
}

export default AuthWelcome;
