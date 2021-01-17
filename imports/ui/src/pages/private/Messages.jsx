import React, { useEffect } from "react";
import { useUsers } from "../../apiHooks/user";
import { Avatar } from "@windmill/react-ui";
import MessageSingle from "./MessageSingle";
import { useHistory, useParams } from "react-router-dom";
import { privatePath } from "../../routes/privatePath";

const Messages = () => {
  const { data: users } = useUsers();

  const history = useHistory();
  const { id: userId } = useParams();
  const selectedUser = users?.find((user) => user._id === userId)?.profile;

  const UserCard = ({ name, imageUrl, onClick }) => (
    <div onClick={onClick} className="flex my-5 p-4 shadow-md rounded-2xl">
      <Avatar src={imageUrl} alt="George" />
      <p className="ml-5">{name}</p>
      <div className="ml-2 w-2 h-2 align-middle rounded-full bg-green-400"></div>
    </div>
  );

  useEffect(() => {
    if (users && !userId)
      history.push(privatePath.messageByUserId(users?.[0]?._id));
  }, [users]);

  return (
    <div className="mt-2 flex h-screen lg:mx-40">
      <div className="w-64 rounded-md text-gray-500 font-semibold  py-3 px-6">
        {users &&
          users.map(({ _id, profile }) => (
            <UserCard
              onClick={() => history.push(privatePath.messageByUserId(_id))}
              key={_id}
              name={profile?.firstName}
              imageUrl={profile?.imageUrl}
            />
          ))}
      </div>
      <div className="flex-1 rounded-md font-semibold flex justify-center py-3 px-6 bg-gray-100">
        <MessageSingle userId={userId} selectedUser={selectedUser} />
      </div>
    </div>
  );
};

export default Messages;
