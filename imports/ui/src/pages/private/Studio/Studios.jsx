import React, { useContext, useEffect } from "react";
import PageTitle from "../../../components/shared/Typography/PageTitle";

import { Card, CardBody, Button } from "@windmill/react-ui";
import { StudioContext } from "../../../context/StudioContext";
import { Redirect, useHistory } from "react-router-dom";

const ListStudio = () => {
  const { studios, selectedStudio, setSelectStudio } = useContext(
    StudioContext
  );

  return !studios.length ? (
    <Redirect to="/studio/create" />
  ) : (
    <Redirect to="/studio/edit" />
  );
};

export default ListStudio;
