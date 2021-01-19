import React from "react";

const MessageBox = ({ right, text, dateTime }) => (
  <div className={"flex my-2 " + (right ? "justify-end" : "justify-start")}>
    <div
      className={
        "rounded-lg shadow-lg p-4 " + (right ? "bg-green-300" : "bg-white")
      }
    >
      <p>{text}</p>
      {dateTime && (
        <p className="text-right text-xs font-thin">
          {new Date().toLocaleString(dateTime)}
        </p>
      )}
    </div>
  </div>
);

export default MessageBox;
