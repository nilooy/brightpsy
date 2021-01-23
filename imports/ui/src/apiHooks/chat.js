import { useQuery } from "react-query";
import { methodCall } from "../utils/asyncMeteorMethod";

// TODO: make mutation with query
export const useRoomByUser = ({ to, members, userId }) => {
  const name = "room.find";
  const { data: roomId } = useQuery(
    name,
    async () => await methodCall(name, { to, members, userId }),
    {
      enabled: !!userId,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );
};
