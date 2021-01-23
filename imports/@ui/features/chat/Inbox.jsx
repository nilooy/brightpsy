import React, { useEffect } from "react";
import { useUsers } from "@ui/api-hooks/user";
import { Avatar } from "@windmill/react-ui";
import { useHistory, useParams } from "react-router-dom";
import { privatePath } from "@ui/routes/privatePath";
import MessageSingle from "./MessageSingle";
import useMediaQuery from "@ui/utils/useMediaQuery";

const Inbox = () => {
  const { data: users } = useUsers();

  const history = useHistory();
  const { id: userId } = useParams();
  const selectedUser = users?.find((user) => user._id === userId)?.profile;

  const { screenXs } = useMediaQuery();

  const UserCard = ({ id, name, imageUrl, onClick }) => (
    <div
      onClick={onClick}
      className={
        "flex my-5 p-4 shadow-md rounded-2xl " +
        (id === userId ? "bg-green-300 pointer-events-none" : "cursor-pointer")
      }
    >
      <Avatar src={imageUrl} alt="George" />
      <p className="ml-5">{name}</p>
      <div className="ml-2 w-2 h-2 align-middle rounded-full bg-green-400"></div>
    </div>
  );

  console.log("screenXs", screenXs);

  useEffect(() => {
    if (users && users?.length && !userId && !screenXs)
      history.push(privatePath.inboxById(users?.[0]?._id));
  }, [users, screenXs]);

  console.log(screenXs, history.location.pathname, privatePath.inbox);

  return (
    <div className="mt-2 flex h-screen 2xl:mx-40">
      {(screenXs && !userId) || !screenXs ? (
        <div className="flex-grow rounded-md text-gray-500 font-semibold  py-3 px-6">
          {users &&
            users.map(({ _id, profile }) => (
              <UserCard
                onClick={() => history.push(privatePath.inboxById(_id))}
                key={_id}
                id={_id}
                name={profile?.firstName + " " + profile?.lastName}
                imageUrl={profile?.imageUrl}
              />
            ))}
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
