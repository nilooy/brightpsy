import { useQuery } from "react-query";
import { methodCall } from "../utils/asyncMeteorMethod";

export const useRoomByUser = ({ to, members, studioId, userId }) => {
  const name = "room.find";
  const { data: roomId } = useQuery(
    name,
    async () => await methodCall(name, { to, members, studioId, userId }),
    {
      enabled: !!userId,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );
};
