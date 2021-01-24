import React from "react";

const TextArea = (props) => {
  const { name, id, label, rows = 5, helpText, error, register } = props;

  return (
    <div className="flex flex-col w-full my-3">
      <label
        htmlFor={id ? id : name}
        className="pb-2 text-sm font-bold text-gray-800"
      >
        {label}
      </label>
      <textarea
        {...props}
        name={name}
        ref={register}
        className="border border-gray-300 pl-3 py-2 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 resize-none text-gray-800"
        rows={rows}
        defaultValue={""}
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

export default TextArea;
