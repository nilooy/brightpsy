import React from "react";

const Input = (props) => {
  const { type = "text", error, id, name, label, helpText, register } = props;

  return (
    <div className="flex flex-col w-full my-3">
      <label
        htmlFor={id ? id : name}
        className="pb-2 text-sm font-bold text-gray-800"
      >
        {label}
      </label>
      <input
        {...props}
        name={name}
        ref={register}
        type={type}
        className="border border-gray-300 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 text-gray-800"
      />
      {helpText && (
        <p className="w-full text-right text-xs text-gray-500 pt-1">
          {helpText}
        </p>
      )}
      {error && <p className="text-red-500">⚠ {error}</p>}
    </div>
  );
};

export default Input;
