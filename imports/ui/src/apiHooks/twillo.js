import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { methodCall } from "../utils/asyncMeteorMethod";
const Chat = require("twilio-chat");

// export const useTwilloToken = (id) => {
//   const name = "twilio.tokenGen";
//   return useQuery(name, async () => await methodCall(name, { id }), {
//     enabled: !!id, // won't send req if id is undefined
//   });
// };

export const useTwilloChat = ({ userId, onChannelJoin }) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [channel, setChannel] = useState(null);

  const joinChannel = async (channel) => {
    if (channel.channelState.status !== "joined") {
      await channel.join();
    }

    setChannel(channel);
    setLoading(false);

    channel.on("messageAdded", handleMessageAdded);
    if (onChannelJoin) onChannelJoin();
  };

  const handleMessageAdded = (message) => {
    console.log(messages);
    setMessages((oldMsg) => [...oldMsg, message]);
    onChannelJoin();
    console.log("msg added");
  };

  useEffect(() => {
    setMessages([]);
    setLoading(true);
    let client;
    const setTwilloChat = async () => {
      if (!Meteor.userId || !userId) return null;

      let token = "";

      try {
        const data = await methodCall("twilio.tokenGen");
        token = data.token;
      } catch {
        throw new Error("Unable to get token, please reload this page");
      }

      client = await Chat.Client.create(token);
      client.removeAllListeners();
      if (channel) {
        channel.removeAllListeners();
        channel.leave();
      }

      client.on("tokenAboutToExpire", async () => {
        const data = await methodCall("twilio.tokenGen", { id: userId });
        token = data.token;
        client.updateToken(token);
      });

      client.on("tokenExpired", async () => {
        const data = await methodCall("twilio.tokenGen", { id: userId });
        token = data.token;
        client.updateToken(token);
      });

      client.on("channelJoined", async (channel) => {
        // getting list of all messages since this is an existing channel
        console.log("channel", channel);
        const res = await channel.getMessages();
        setMessages(res.items);
        setLoading(false);
        if (onChannelJoin) onChannelJoin();
      });

      try {
        const room = await methodCall("room.find", { to: userId });
        console.log("room", room);
        const channel = await client.getChannelByUniqueName(room._id);
        joinChannel(channel);
      } catch (err) {
        try {
          const room = await methodCall("room.create", {
            participants: [Meteor.userId(), userId],
          });

          console.log("roomCreated", room);

          const channel = await client.createChannel({
            uniqueName: room,
            friendlyName: room,
          });
          joinChannel(channel);
        } catch {
          throw new Error("Unable to create channel, please reload this page");
        }
      }
    };

    setTwilloChat();
  }, [userId]);

  const sendMessage = () => {
    if (text) {
      setLoading(true);
      channel.sendMessage(String(text).trim());
      setText("");
      setLoading(false);
    }
  };

  return { loading, text, setText, messages, sendMessage };
};
