import { useQuery } from "react-query";
import { methodCall } from "../utils/asyncMeteorMethod";

export const useTags = () => {
  const name = "tag.getAll";
  return useQuery(name, async () => await methodCall(name, {}));
};
