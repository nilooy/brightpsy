import React, { useContext } from "react";
import PageTitle from "../../../components/ui/Typography/PageTitle";
import { useHistory } from "react-router-dom";
import { Card, CardBody, Button } from "@windmill/react-ui";
import { PricePackageContext } from "../../../context/PricePackageContext";

const ListPricePackage = () => {
  const history = useHistory();

  const { pricePackages } = useContext(PricePackageContext);

  console.log(pricePackages);

  return (
    <>
      <div className="flex justify-between mt-3">
        <PageTitle>Pacchetti</PageTitle>
        <Button
          onClick={() => history.push("/pacchetti/create")}
          aria-label="Select Studio"
          aria-haspopup="true"
        >
          Crea Pacchetti +
        </Button>
      </div>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        {pricePackages &&
          pricePackages.map((item) => (
            <Card key={item._id} className="flex h-full bg-gray-100 shadow-lg">
              <CardBody>
                <p className="mb-4 font-semibold text-gray-600 text-3xl dark:text-gray-300">
                  {item.title}
                </p>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.quantity} Sedute
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.hours} Ore
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Costo: {item.cost} €
                </p>
              </CardBody>
            </Card>
          ))}
      </div>
    </>
  );
};

export default ListPricePackage;
