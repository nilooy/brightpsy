import React, { useRef } from "react";

import { Input, Label, Avatar } from "@windmill/react-ui";
import { GrSend } from "@react-icons/all-files/gr/GrSend";
import MessageBox from "../../components/features/Chat/MessageBox";
import { useTwilloChat } from "../../apiHooks/twillo";

const MessageSingle = ({ userId, selectedUser }) => {
  const messageBoxContainer = useRef();

  const scrollToBottom = () => {
    if (!messageBoxContainer.current) return null;
    const scrollHeight = messageBoxContainer.current.scrollHeight;
    const height = messageBoxContainer.current.clientHeight;
    const maxScrollTop = scrollHeight - height;
    messageBoxContainer.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  };

  const { text, setText, messages, sendMessage } = useTwilloChat({
    userId,
    onChannelJoin: scrollToBottom,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  console.log(messages);

  return (
    <div
      className="flex justify-between flex-col w-full"
      style={{ height: "90vh" }}
    >
      {selectedUser && (
        <div className="bg-gray-700 text-white text-xl p-3 flex">
          <Avatar src={selectedUser?.imageUrl} alt="user avatar" />
          <p className="ml-3">
            {selectedUser?.firstName + " " + selectedUser?.lastName}
          </p>
          <div className="ml-2 w-2 h-2 align-middle rounded-full bg-green-400"></div>
        </div>
      )}
      <div
        ref={messageBoxContainer}
        className="flex-1 bg-gray-200 p-5 overflow-y-scroll"
      >
        {/* Messages */}

        {messages &&
          messages.map((msg) => (
            <MessageBox
              key={msg.sid}
              text={msg.body}
              dateTime={msg.dateUpdated}
              right={Meteor.userId() === msg.author}
            />
          ))}

        {/* Messages */}
      </div>
      <div className="">
        <form onSubmit={handleSubmit}>
          <Label className="mt-4 flex">
            <Input
              onChange={(e) => {
                setText(e.target.value);
              }}
              value={text}
              className="mt-1 rounded-2xl text-lg mr-3"
              placeholder="Scrivi qui"
              type="text"
              name=""
              required
            />
            <button type="submit">
              <GrSend className="text-3xl mt-2" />
            </button>
          </Label>
        </form>
      </div>
    </div>
  );
};

export default MessageSingle;
