import React from "react";

const Select = ({
  label,
  id,
  name,
  value,
  options,
  required = false,
  className,
  onChange,
  disabled = false,
  readOnly = false,
  register,
}) => {
  return (
    <div className="w-full flex flex-col">
      {label && (
        <label for="City" className="pb-2 text-sm font-bold text-gray-800">
          {label}
        </label>
      )}
      <div
        className={
          "border border-gray-300 shadow-sm rounded flex relative " +
          (disabled ? "bg-gray-200" : " ") +
          (readOnly ? "bg-gray-200 pointer-events-none" : "")
        }
      >
        <select
          disabled={disabled}
          readOnly={readOnly}
          name={name}
          id={id}
          ref={register}
          required={required}
          value={value}
          onChange={onChange}
          className={
            "bg-transparent appearance-none z-10 pl-3 py-3 w-full text-sm border border-transparent focus:outline-none focus:border-indigo-700 text-gray-800 rounded " +
            (className ? className : " ")
          }
        >
          {options &&
            options.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
        </select>
        <div className="px-4 flex items-center border-l border-gray-300 flex-col justify-center text-gray-500 absolute right-0 bottom-0 top-0 mx-auto z-0">
          <svg
            tabIndex="0"
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-chevron-up"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <polyline points="6 15 12 9 18 15" />
          </svg>
          <svg
            tabIndex="0"
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-chevron-down"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Select;
