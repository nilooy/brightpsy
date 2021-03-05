import { useQuery } from "react-query";
import { methodCall } from "../utils/asyncMeteorMethod";

export const useAvailability = () => {
  const name = "availability.getByUser";
  return useQuery(name, async () => await methodCall(name, {}));
};
