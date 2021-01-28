import React from "react";
import PageTitle from "@ui/components/Typography/PageTitle";
import { useHistory } from "react-router-dom";
import { Card, CardBody, Button } from "@windmill/react-ui";
import { privatePath } from "@ui/routes/privatePath";
import { usePricePackages } from "@ui/api-hooks/price-package";
import PackageCard from "@ui/components/Cards/PackageCard";

const ListPricePackage = () => {
  const history = useHistory();
  const userId = Meteor.userId();

  const { data: pricePackages } = usePricePackages(userId);

  console.log(pricePackages);

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
      <div class="container w-11/12 mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-12 gap-8">
        {pricePackages &&
          pricePackages.map((item) => <PackageCard key={item._id} {...item} />)}
      </div>
    </>
  );
};

export default ListPricePackage;
