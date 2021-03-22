import React, { useRef, useState } from "react";
import { useEffect } from "react";

const SwitchBox = ({ label, name, id, helpText, register, ...props }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(document.querySelector(`[data-input='${name}']`).checked);
  }, [props]);

  return (
    <div className="flex justify-between items-center my-3">
      <div className="w-9/12">
        <p className="text-sm text-gray-800 pb-1">{label}</p>
        <p className="text-sm text-gray-500">{helpText}</p>
      </div>
      <div
        className="cursor-pointer rounded-full relative shadow-sm"
        onClick={() => {
          document.querySelector(`[data-input='${name}']`).click();
          setChecked(!checked);
        }}
      >
        <div
          className={`focus:outline-none checkbox w-4 h-4 rounded-full bg-white absolute m-1 shadow-sm appearance-none cursor-pointer ${
            checked ? "right-0" : ""
          }`}
        />
        <input
          {...props}
          ref={register}
          data-input={name}
          name={name}
          id={id ? id : name}
          type="checkbox"
          className="hidden checkbox"
        />
        <label
          htmlFor={id ? id : name}
          className={`block w-12 h-6 overflow-hidden rounded-full bg-gray-300 cursor-pointer ${
            checked ? "bg-green-300" : ""
          }`}
        />
        <div className="w-12 h-6 absolute left-0 top-0 rounded-full" />
      </div>
    </div>
  );
};

export default SwitchBox;
