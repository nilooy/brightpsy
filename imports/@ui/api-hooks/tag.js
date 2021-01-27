import { useQuery } from "react-query";
import { useMutation } from "react-query";
import { methodCall } from "../utils/asyncMeteorMethod";

export const useTags = () => {
  const name = "tag.getAll";
  return useQuery(name, async () => await methodCall(name, {}));
};

export const useTagMutation = () =>
  useMutation((text) => methodCall("tag.create", { text }), {
    onSuccess: (res) => {
      console.log({ res });
    },
  });
