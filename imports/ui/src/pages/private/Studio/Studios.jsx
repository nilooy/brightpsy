import React from "react";
import { Redirect } from "react-router-dom";
import { useStudioByUser } from "../../../apiHooks/studio";
import { privatePath } from "../../../routes/privatePath";

const ListStudio = () => {
  const { data: studio } = useStudioByUser();

  return !studio ? (
    <Redirect to={privatePath.studioCreate} />
  ) : (
    <Redirect to={privatePath.studioEdit} />
  );
};

export default ListStudio;
