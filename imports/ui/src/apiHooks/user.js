import { useQuery } from "react-query";
import { methodCall } from "../utils/asyncMeteorMethod";

export const useUsers = () => {
  const name = "user.getAll";
  return useQuery(
    name,
    async () => await methodCall(name, { excludeMe: true })
  );
};
