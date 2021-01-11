import React, { useContext, useEffect } from "react";
import PageTitle from "../../../components/shared/Typography/PageTitle";

import { Card, CardBody, Button } from "@windmill/react-ui";
import { StudioContext } from "../../../context/StudioContext";
import { Redirect, useHistory } from "react-router-dom";
import { privatePath } from "../../../routes/privatePath";

const ListStudio = () => {
  const { studios, selectedStudio, setSelectStudio } = useContext(
    StudioContext
  );

  return !studios.length ? (
    <Redirect to={privatePath.studioCreate} />
  ) : (
    <Redirect to={privatePath.studioEdit} />
  );
};

export default ListStudio;
