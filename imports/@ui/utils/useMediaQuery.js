import React, { useEffect, useState } from "react";

const useMediaQuery = () => {
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    setScreenSize(window.innerWidth);

    window.addEventListener("resize", () => {
      setScreenSize(window.innerWidth);
    });
  }, []);

  const screenXs = screenSize < 600;
  const screenSm = screenSize < 800 && screenSize > 600;
  const screenMd = screenSize < 1100 && screenSize > 800;
  const screenLg = screenSize > 1100;

  const desktop = screenSize > 1200;

  return {
    screenXs,
    screenSm,
    screenMd,
    screenLg,
    desktop,
  };
};

export default useMediaQuery;
