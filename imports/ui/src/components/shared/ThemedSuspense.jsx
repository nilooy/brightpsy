import React, { useEffect } from "react";
import { GiMeditation } from "@react-icons/all-files/gi/GiMeditation";
import { useHistory } from "react-router-dom";

function ThemedSuspense() {
  const history = useHistory();

  useEffect(() => {
    if (Meteor.useId) {
      history.push("/dashboard");
    } else {
      setTimeout(() => {
        history.push("/dashboard");
      }, 1500);
    }
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center p-6 text-lg font-medium text-purple-700 dark:text-gray-200 dark:bg-gray-900">
      <div className="w-32 h-32 flex justify-center items-center bg-purple-200 rounded-full animate-ping">
        <GiMeditation className="text-purple-700 text-6xl" />
      </div>
    </div>
  );
}

export default ThemedSuspense;
