import React from "react";

const MessageBox = ({ right, text, dateTime }) => (
  <div className={"flex my-2 " + (right ? "justify-end" : "justify-start")}>
    <div
      className={
        "rounded-lg shadow-lg p-2 " + (right ? "bg-green-200" : "bg-white")
      }
    >
      <p className="font-thin text-gray-700" style={{fontSize: '14px'}}>{text}</p>
      {dateTime && (
        <p className="text-right font-thin text-gray-600" style={{fontSize: '11px'}}>
          {new Date().toLocaleString(dateTime)}
        </p>
      )}
    </div>
  </div>
);

export default MessageBox;
