import { useQuery, useMutation } from "react-query";
import { methodCall } from "../utils/asyncMeteorMethod";

export const useAvailability = () => {
  const name = "availability.getByUser";
  return useQuery(name, async () => await methodCall(name, {}), {
    refetchOnWindowFocus: false,
  });
};

export const useAvailabilityByUserId = ({ userId }) => {
  const name = "availability.getByUserId";
  return useQuery(name, async () => await methodCall(name, { userId }), {
    refetchOnWindowFocus: false,
    enabled: !!userId,
  });
};

export const useAvailabilityUpdate = () =>
  useMutation((data) => methodCall("availability.update", { data }), {
    onSuccess: (res) => {
      console.log({ res });
    },
  });
