import React from "react";

const Loading = () => (
  <div className="flex flex-col justify-center" style={{ height: "90vh" }}>
    <span className="flex h-64 w-64 relative justify-center flex-col">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 m-auto"></span>
    </span>
  </div>
);

export default Loading;
