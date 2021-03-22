import React, { useEffect, useState } from "react";

const Success = ({ title, msg, btn1, btn2 }) => {
  console.log({ btn1, btn2 });
  return (
    <section className="max-w-8xl pt-16 mx-auto container bg-white">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 px-4 md:px-2 lg:px-12 py-10 flex items-center">
          <img className="rounded" src="/img/undraw_mindfulness_scgo.png" alt />
        </div>
        <div className="flex flex-col justify-center w-full md:w-1/2 px-4 md:pr-12">
          <div className="pl-4">
            {title && (
              <h3 className="text-4xl font-bold leading-tight text-gray-800">
                {title}
              </h3>
            )}
            {msg && (
              <p className="text-xl text-gray-600 leading-normal pt-4">{msg}</p>
            )}
            {(btn1 || btn2) && (
              <div className="flex flex-wrap">
                {btn1 && (
                  <button
                    onClick={btn1.onClick}
                    className={`my-8 lg:mb-0 bg-green-200 transition duration-150 ease-in-out hover:bg-green-300 focus:outline-none rounded text-green-700 px-8 py-4 text-xl ${btn1.className}`}
                  >
                    {btn1.text}
                  </button>
                )}
                {btn2 && (
                  <button
                    onClick={btn2.onClick}
                    className={`my-8 mx-2 lg:mb-0 bg-blue-200 transition duration-150 ease-in-out hover:bg-blue-300 focus:outline-none rounded text-blue-700 px-8 py-4 text-xl ${btn2.className}`}
                  >
                    {btn2.text}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Success;
