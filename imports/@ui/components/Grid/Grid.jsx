import React from "react";

const Grid = ({
  sm = 1,
  md = 2,
  lg = 2,
  xl = 2,
  gap = 8,
  children,
  className,
}) => {
  return (
    <div
      className={`container mx-auto grid grid-flow-row auto-rows-min sm:grid-cols-${sm} md:grid-cols-${md} lg:grid-cols-${lg} xl:grid-cols-${xl} gap-${gap} ${
        className ? className : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Grid;
