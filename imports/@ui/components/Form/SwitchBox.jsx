import React, { useRef } from "react";

const SwitchBox = (props) => {
  const { label, name, id, helpText, register } = props;

  return (
    <div className="flex justify-between items-center my-3">
      <div className="w-9/12">
        <p className="text-sm text-gray-800 pb-1">{label}</p>
        <p className="text-sm text-gray-500">{helpText}</p>
      </div>
      <div
        className="cursor-pointer rounded-full relative shadow-sm"
        onClick={() => {
          document.querySelector(
            `[data-input='${name}']`
          ).checked = !document.querySelector(`[data-input='${name}']`).checked;

          document.querySelector(`[data-input='${name}']`).click();
        }}
      >
        <input
          {...props}
          ref={register}
          data-input={name}
          name={name}
          type="checkbox"
          className="focus:outline-none checkbox w-4 h-4 rounded-full bg-white absolute m-1 shadow-sm appearance-none cursor-pointer"
        />
        <label
          htmlFor={id ? id : name}
          className="toggle-label block w-12 h-6 overflow-hidden rounded-full bg-gray-300 cursor-pointer"
        />
      </div>
      <style>
        {` .checkbox:checked {
                        /* Apply class right-0*/
                        right: 0;
                    }
                    .checkbox:checked + .toggle-label {
                        background-color: #ACD8AA;
                    }`}
      </style>
    </div>
  );
};

export default SwitchBox;
