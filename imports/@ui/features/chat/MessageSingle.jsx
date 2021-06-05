import React, { useEffect, useRef, useState } from "react";

import { Textarea, Label } from "@windmill/react-ui";
import { GrSend } from "@react-icons/all-files/gr/GrSend";
import MessageBox from "./MessageBox";
import { Chat } from "@api/services/chat/model/ChatCollection";
import { useTracker } from "meteor/react-meteor-data";
import { methodCall } from "@ui/utils/asyncMeteorMethod";
import Loading from "./Loading";

import { BiArrowBack } from "@react-icons/all-files/bi/BiArrowBack";
import { Link } from "react-router-dom";
import { privatePath } from "@ui/routes/privatePath";
import UserAvatar from "@ui/components/Avatar/UserAvatar";

const MessageSingle = ({ userId, selectedUser }) => {
  const messageBoxContainer = useRef();

  const scrollToBottom = () => {
    if (!messageBoxContainer.current) return null;
    const scrollHeight = messageBoxContainer.current.scrollHeight;
    const height = messageBoxContainer.current.clientHeight;
    const maxScrollTop = scrollHeight - height;
    messageBoxContainer.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  };

  const [text, setText] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    const checkRoom = async () => {
      const roomId = await methodCall("room.findOrCreate", {
        to: userId,
        members: [Meteor.userId(), userId],
        userId: Meteor.userId(),
      });

      setRoom(roomId);
    };

    if (userId) checkRoom();
  }, [userId]);

  const { messages, isLoading } = useTracker(() => {
    const noDataAvailable = { messages: [] };
    if (!Meteor.user() || !room) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe("chat.getChatByRoom", { roomId: room });

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const messages = Chat.find().fetch();

    return { messages };
  }, [room]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sentMsg = await methodCall("chat.create", { text, roomId: room });
    if (sentMsg) setText("");
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const autoGrow = (element) => {
    element.target.style.height = "5px";
    element.target.style.height = (element.target.scrollHeight)+"px";
    console.log(element.target.style.height)
  }

  return !isLoading || room ? (
    <div className="flex justify-between flex-col w-full overflow-y-hidden">
      {selectedUser && (
        <div className="bg-gray-700 text-white text-xl p-3 flex ">
          <Link
            className="text-white mr-3 lg:hidden self-center"
            to={privatePath.inbox}
          >
            <BiArrowBack />
          </Link>
            <UserAvatar
                size={12}
                imageUrl={selectedUser?.profileImg}
                firstName={selectedUser?.firstName}
                lastName={selectedUser?.lastName}
            />
          <p className="ml-3 self-center">
            {selectedUser?.firstName + " " + selectedUser?.lastName}
          </p>
          <div className="ml-2 w-2 h-2 align-middle rounded-full bg-green-400"></div>
        </div>
      )}
      <div
        ref={messageBoxContainer}
        className="bg-gray-200 p-5 overflow-y-scroll flex-auto"
      >
        {/* Messages */}

        {messages.length ? (
          messages.map((msg) => (
            <MessageBox
              key={msg._id}
              text={msg.text}
              dateTime={msg.createdAt}
              right={Meteor.userId() === msg.createdBy}
            />
          ))
        ) : (
          <p className="bg-green-200 p-3 text-gray-400 text-center text-sm">
            Nessun messaggio disponibile
          </p>
        )}

        {/* Messages */}
      </div>
      <div className="flex-none px-2 pb-2">
        <form onSubmit={handleSubmit}>
          <Label className="mt-1 flex">
            <Textarea
              onChange={(e) => {
                setText(e.target.value);
                autoGrow(e)
              }}
              value={text}
              className="mt-1 rounded-2xl text-md mr-3 overflow-hidden resize-none max-h-24 min-h-12"
              placeholder="Scrivi qui"
              type="text"
              name=""
              required
              rows="1"
            />
            <button type="submit">
              <GrSend className="text-3xl mt-2" />
            </button>
          </Label>
        </form>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MessageSingle;
