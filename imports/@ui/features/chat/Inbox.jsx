import React, { useEffect } from "react";
import {useOnlineUser, useUsers} from "@ui/api-hooks/user";
import { useHistory, useParams } from "react-router-dom";
import { privatePath } from "@ui/routes/privatePath";
import MessageSingle from "./MessageSingle";
import useMediaQuery from "@ui/utils/useMediaQuery";
import UserAvatar from "@ui/components/Avatar/UserAvatar";

const Inbox = () => {
  const { data: users } = useOnlineUser();

  const history = useHistory();
  const { id: userId } = useParams();
  const selectedUser = users?.find((user) => user._id === userId)?.profile;

  const { screenXs } = useMediaQuery();

  const UserCard = ({ id, profileImg, firstName, lastName, onClick }) => (
    <div
      onClick={onClick}
      className={
        "flex my-5 p-1 shadow-md rounded-2xl relative " +
        (id === userId ? "bg-green-300 pointer-events-none" : "cursor-pointer")
      }
    >
      <UserAvatar
        size={12}
        imageUrl={profileImg}
        firstName={firstName}
        lastName={lastName}
      />
      <p className="text-xs self-center">{`${firstName}`}</p>
      <div className=" ml-2 w-2 h-2 rounded-full bg-green-400 absolute right-2 top-2 z-10"></div>
    </div>
  );

  console.log("screenXs", screenXs);

  useEffect(() => {
    if (users && users?.length && !userId && !screenXs)
      history.push(privatePath.inboxById(users?.[0]?._id));
  }, [users, screenXs]);

  console.log(screenXs, history.location.pathname, privatePath.inbox);

  return (
    <div className="md:mt-2 flex 2xl:mx-40 overflow-y-hidden" style={{
      height: "calc(100vh - 4rem)"
    }}>
      {(screenXs && !userId) || !screenXs ? (
        <div className="flex-grow rounded-md text-gray-500 font-semibold  py-3 px-2 2xl:w-3/12">
          {users?.length ?
            users.map((user) => (
              <UserCard
                {...user.profile}
                id={user._id}
                key={user._id}
                onClick={() => history.push(privatePath.inboxById(user._id))}
              />
            )) :
              <p className="bg-green-200 p-3 text-gray-400 text-center text-sm">
                Nessun contatto disponibile
              </p>
          }
        </div>
      ) : (
        ""
      )}
      {userId && (
        <div className="flex-grow w-full rounded-md font-semibold flex justify-center lg:py-3 lg:px-6 bg-gray-100">
          <MessageSingle userId={userId} selectedUser={selectedUser} />
        </div>
      )}
    </div>
  );
};

export default Inbox;
