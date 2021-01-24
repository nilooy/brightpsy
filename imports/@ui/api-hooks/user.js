import { useQuery } from "react-query";
import { methodCall } from "../utils/asyncMeteorMethod";
import { useTracker } from "meteor/react-meteor-data";

export const useUserData = () => useTracker(() => Meteor.user());

export const useUsers = () => {
  const name = "user.getAll";
  return useQuery(
    name,
    async () => await methodCall(name, { excludeMe: true })
  );
};
