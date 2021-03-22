import { useQuery } from "react-query";
import { methodCall } from "../utils/asyncMeteorMethod";
import { useTracker } from "meteor/react-meteor-data";

export const useUserData = () => useTracker(() => Meteor.user());

export const useUserRole = () => {
  const role = useTracker(() => Roles.getRolesForUser(Meteor.userId())[0]);
  const isDoctor = role === "doctor";
  const isUser = role === "user";

  return { isDoctor, isUser };
};

export const useUsers = () => {
  const name = "user.getAll";
  return useQuery(
    name,
    async () => await methodCall(name, { excludeMe: true })
  );
};

export const useDoctors = () => {
  const name = "user.getAllDoctor";
  return useQuery(name, async () => await methodCall(name));
};
