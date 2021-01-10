import React, { useContext } from "react";
import PageTitle from "../../../components/shared/Typography/PageTitle";

import { Card, CardBody, Button } from "@windmill/react-ui";
import { StudioContext } from "../../../context/StudioContext";
import { useHistory } from "react-router-dom";

const ListStudio = () => {
  const { studios, selectedStudio, setSelectStudio } = useContext(
    StudioContext
  );

  const history = useHistory();

  return (
    <>
      <div className="flex justify-between mt-3 mb-2">
        <PageTitle>Studios</PageTitle>
        <Button
          onClick={() => history.push("/studios/create")}
          aria-label="Create Studio"
          aria-haspopup="true"
        >
          Crea Studio +
        </Button>
      </div>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        {studios &&
          studios.map((studio) => (
            <Card key={studio._id} className="flex h-full">
              <img className="object-cover w-1/3" src={studio.imageUrl} />
              <CardBody>
                <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">
                  {studio.name}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <b>Address:</b> {studio.address}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <b>Tel:</b> +398626267
                </p>
                <div className="flex mt-2">
                  <Button
                    disabled={selectedStudio?._id === studio._id}
                    onClick={() => setSelectStudio(studio)}
                  >
                    Select
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
      </div>
    </>
  );
};

export default ListStudio;
