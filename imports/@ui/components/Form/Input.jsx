import React from "react";

const Input = (props) => {
  const {
    type = "text",
    error,
    id,
    name,
    label,
    helpText,
    register,
    prefix,
    prefixClass,
    suffix,
    suffixClass,
  } = props;

  return (
    <div className="flex flex-col w-full my-3">
      {label && (
        <label
          htmlFor={id ? id : name}
          className="pb-2 text-sm font-bold text-gray-800"
        >
          {label}
        </label>
      )}
      <div className="flex border border-gray-300">
        {prefix ? (
          typeof prefix === "string" ? (
            <span
              className={
                "uppercase text-sm leading-tight tracking-normal p-3 bg-green-200 flex flex-col self-center h-full " +
                (prefixClass ? prefixClass : "")
              }
            >
              {prefix}
            </span>
          ) : (
            prefix
          )
        ) : (
          ""
        )}

        <input
          {...props}
          name={name}
          ref={register}
          type={type}
          className={
            " pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-green-700 text-gray-800 w-full "
          }
        />

        {suffix ? (
          typeof suffix === "string" ? (
            <span
              className={
                "uppercase text-lg leading-tight tracking-normal p-3 bg-green-300 flex flex-col self-center h-full " +
                (suffixClass ? suffixClass : "")
              }
            >
              {suffix}
            </span>
          ) : (
            suffix
          )
        ) : (
          ""
        )}
      </div>

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
