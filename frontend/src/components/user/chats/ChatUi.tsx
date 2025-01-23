import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, ArrowLeft, User } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSocket } from "@/context/socketCotext";
import { useRQ } from "@/hooks/userRQ";
import { getAllMessages, sendMessage } from "@/service/Api/chatApi";
import moment from "moment";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { errorFn } from "@/utils/validation/user";
import { useSelector } from "react-redux";
import { Rootstate } from "@/redux/store/store";
import Loader from "@/components/global/Loader";
import { useQueryClient } from "@tanstack/react-query";

interface Message {
  _id: string;
  category: string;
  user?: { firstName: string };
  content: string;
  timestamp: Date;
  isSent?: boolean;
}

const ChatUI: React.FC = () => {
  const socket = useSocket();
  const { groupId } = useParams();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState<Message[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { userName } = useSelector((state: Rootstate) => state.user);
  const queryclient = useQueryClient();
  const chatEndRef = useRef<HTMLDivElement>(null); // For scrolling
  const { isLoading, data } = useRQ(
    () => getAllMessages(groupId, `?page=${page}`),
    "chats",
    page
  );
  const { category } = location.state || { category: "Unknown" };
  const navigate = useNavigate();
  const [roomMemberCount, setRoomMemberCount] = useState<{ [roomId: string]: number }>({});
  const { register, handleSubmit, reset } = useForm<{ message: string }>({
    resolver: zodResolver(
      z.object({ message: z.string().min(1, "Type something") })
    ),
  });

  useEffect(() => {
    if (socket && groupId) {
      socket.emit("joinChatRoom", groupId);

      socket.on("onlineUsers", (data: { roomId: string; count: number }) => {
        setRoomMemberCount((prev) => ({
          ...prev,
          [data.roomId]: data.count, 
        }));
      });

      socket.on("newMessage", (message: Message) => {
        queryclient.invalidateQueries({ queryKey: ["chats"] });
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.emit("leaveChatRoom", groupId);
        socket.off("onlineUsers");
        socket.off("newMessage");
      };
    }
  }, [socket, groupId]);

  useEffect(() => {
    if (data) {
      const newMessages = data as Message[];
      if (newMessages.length < 20) setHasMore(false);
      setMessages(() => [...newMessages.reverse()]);
    }
  }, [data]);

  useEffect(() => {
    queryclient.invalidateQueries({ queryKey: ["chats"] });
  }, [page]);

  // useEffect(() => {
  //   chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  const handleSendMessage = async (datas: { message: string }) => {
  
    socket.emit('sendMessage',{roomId:groupId,message:datas.message,user:userName})
    const { data } = await sendMessage(groupId as string, datas.message);
    if (data.success) {
      reset()
    }
  };

  const loadMoreMessages = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const groupMessagesByDate = (msgs: Message[]) => {
    const grouped: { [key: string]: Message[] } = {};

    msgs.forEach((msg) => {
      const date = moment(msg.timestamp).calendar({
        sameDay: "[Today]",
        lastDay: "[Yesterday]",
        lastWeek: "dddd",
        sameElse: "MM/DD/YYYY",
      });

      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(msg);
    });

    return grouped;
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="flex flex-col w-full h-screen sticky">
      {/* Header */}
      <div className="border-b border-gray-700 text-white p-4 flex items-center ">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold flex-1 truncate">{category}</h1>
        <p className="flex gap-1 pe-3">
          <User />
          {roomMemberCount[groupId as string]} online
        </p>
      </div>

      {/* Chat Area */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex-1 w-full h-full overflow-y-auto p-4 space-y-4">
          {hasMore && (
            <div className="text-center">
              <button
                onClick={loadMoreMessages}
                className="text-indigo-600 hover:underline"
              >
                Load More Messages
              </button>
            </div>
          )}

          {Object.entries(groupedMessages).map(([date, dateMessages]) => (
            <div key={date}>
              <div className="text-center text-gray-500 my-4">
                <span className="bg-zinc-900 px-3 py-1 rounded-full text-sm">
                  {date}
                </span>
              </div>
              {dateMessages.map((message) => (
                <div
                  key={message._id}
                  className={`flex ${
                    message.user?.firstName === userName
                      ? "justify-end"
                      : "justify-start"
                  } mb-2`}
                >
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-2 ${
                      message.user?.firstName === userName
                        ? "bg-indigo-100 text-gray-800"
                        : "bg-white text-gray-800 border"
                    }`}
                  >
                    <p className="font-semibold text-indigo-600 ">
                      {message.user?.firstName === userName
                        ? "You"
                        : message.user?.firstName || "LuxBid™️"}
                    </p>
                    <div className="flex gap-2 justify-between">
                      <p>{message.content}</p>
                      <p className="text-xs text-gray-500 mt-1 text-right">
                        {moment(message.timestamp).format("LT")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 ">
        <form
          onSubmit={handleSubmit(handleSendMessage, errorFn)}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            {...register("message")}
            placeholder="Type a message"
            className="flex-1 p-3 rounded-full bg-[#8582824f] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition-colors duration-200"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatUI;
