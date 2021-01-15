import { useQuery } from "react-query";
import { methodCall } from "../utils/asyncMeteorMethod";

export const usePricePackages = (studioId) => {
  const name = "pricePackage.getAll";
  return useQuery(name, async () => await methodCall(name, { studioId }), {
    enabled: !!studioId,
  });
};
