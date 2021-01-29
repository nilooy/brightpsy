import React, { useEffect } from "react";
import PageTitle from "@ui/components/Typography/PageTitle";
import { useHistory } from "react-router-dom";
import { Card, CardBody, Button } from "@windmill/react-ui";
import { privatePath } from "@ui/routes/privatePath";
import {
  usePricePackages,
  usePricePackagesSearch,
} from "@ui/api-hooks/price-package";
import { useSearchQuery } from "@ui/api-hooks/helper";
import PackageCard from "@ui/components/Cards/PackageCard";
import Container from "@ui/components/Basic/Container";

const UserSearchPricePackage = () => {
  const searchQuery = useSearchQuery();
  const history = useHistory();
  const userId = Meteor.userId();

  const searchValue = searchQuery.get("q");

  const { data: pricePackages, refetch } = usePricePackagesSearch(searchValue);

  console.log(pricePackages);

  useEffect(() => {
    if (searchValue) {
      refetch();
    }
  }, [searchValue, refetch]);

  return (
    <Container>
      <div className="flex justify-between mt-3">
        <PageTitle>Pacchetti</PageTitle>
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

export default UserSearchPricePackage;
