import { useQuery } from "react-query";
import { methodCall } from "../utils/asyncMeteorMethod";

export const usePricePackages = () => {
  const name = "pricePackage.getAllByUser";
  return useQuery(name, async () => await methodCall(name, {}));
};

export const usePricePackagesSearch = (searchValue) => {
  const name = "pricePackage.search";
  return useQuery(name, async () => await methodCall(name, { searchValue }), {
    enabled: !!searchValue,
  });
};

export const usePricePackageById = (id) => {
  const name = "pricePackage.getById";
  return useQuery(name, async () => await methodCall(name, { _id: id }));
};
