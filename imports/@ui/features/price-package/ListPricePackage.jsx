import React from "react";
import PageTitle from "@ui/components/Typography/PageTitle";
import { useHistory } from "react-router-dom";
import { Card, CardBody, Button } from "@windmill/react-ui";
import { privatePath } from "@ui/routes/privatePath";
import { usePricePackages } from "@ui/api-hooks/price-package";
import PackageCard from "@ui/components/Cards/PackageCard";
import Container from "@ui/components/Basic/Container";

const ListPricePackage = () => {
  const history = useHistory();
  const userId = Meteor.userId();

  const { data: pricePackages } = usePricePackages(userId);

  return (
    <Container>
      <div className="flex justify-between mt-3">
        <PageTitle>Pacchetti</PageTitle>
        <button
          onClick={() => history.push(privatePath.packagesCreate)}
          aria-label="Crea Pacchetti"
          aria-haspopup="true"
          className="bg-green-200 hover:bg-green-100 text-green-700 font-bold p-4 text-xl rounded-2xl"
        >
          Crea Pacchetti +
        </button>
      </div>

      <div className="container w-11/12 mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-12 gap-8">
        {pricePackages &&
          pricePackages.map((item) => (
            <PackageCard
              onClick={() =>
                history.push(privatePath.packagesEditById(item._id))
              }
              key={item._id}
              {...item}
            />
          ))}
      </div>
      {!pricePackages?.length && (
        <div className="mx-auto container">
          <h1 className="text-color font-black f-f-l text-center text-3xl lg:text-7xl">
            Nessun pacchetti trovati
          </h1>
        </div>
      )}
    </Container>
  );
};

export default ListPricePackage;
