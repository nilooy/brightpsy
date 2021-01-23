import React from "react";
import PageTitle from "@ui/components/Typography/PageTitle";
import { useHistory } from "react-router-dom";
import { Card, CardBody, Button } from "@windmill/react-ui";
import { privatePath } from "@ui/routes/privatePath";
import { usePricePackages } from "@ui/api-hooks/price-package";

const ListPricePackage = () => {
  const history = useHistory();
  const userId = Meteor.userId();

  const { data: pricePackages } = usePricePackages(userId);

  return (
    <>
      <div className="flex justify-between mt-3">
        <PageTitle>Pacchetti</PageTitle>
        <Button
          onClick={() => history.push(privatePath.packagesCreate)}
          aria-label="Crea Pacchetti"
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
                <p className="text-gray-600 dark:text-gray-400 p-2">
                  {item.desc}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {item.quantity} Sedute
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {item.hours} Ore
                </p>
                <p className="dark:text-gray-400 text-3xl text-green-400">
                  {item.cost} €
                </p>
              </CardBody>
            </Card>
          ))}
      </div>
    </>
  );
};

export default ListPricePackage;