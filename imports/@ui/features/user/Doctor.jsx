import React from "react";
import { useDoctors } from "@ui/api-hooks/user";

const Doctor = () => {
  const { data: doctors } = useDoctors();

  return (
    <div>
      <h1>Doctor</h1>
    </div>
  );
};

export default Doctor;
