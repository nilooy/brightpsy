import { useQuery } from "react-query";
import { methodCall } from "../utils/asyncMeteorMethod";

export const useStudioByUser = () => {
  const name = "studio.getByUser";
  return useQuery(name, async () => await methodCall(name, {}));
};

export const useStudios = () => {
  const name = "studio.getAll";
  return useQuery(name, async () => await methodCall(name, {}));
};

export const useStudioById = (studioId) => {
  const name = "studio.getById";
  return useQuery(name, async () => await methodCall(name, { studioId }));
};
