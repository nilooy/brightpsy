import { useQuery } from "react-query";
import { methodCall } from "../utils/asyncMeteorMethod";

export const usePricePackages = () => {
  const name = "pricePackage.getAllByUser";
  return useQuery(name, async () => await methodCall(name, {}));
};
