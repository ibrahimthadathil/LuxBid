
import type React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Send,
  ArrowLeft,
  User,
  Mic,
  Smile,
  Paperclip,
  Reply,
  X,
  Maximize2
} from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSocket } from "@/context/socketCotext";
import { useRQ } from "@/hooks/userRQ";
import {
  addReaction,
  getAllMessages,
  sendMessage,
} from "@/service/Api/chatApi";
import moment from "moment";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { errorFn } from "@/utils/validation/user";
import { useSelector } from "react-redux";
import type { Rootstate } from "@/redux/store/store";
import Loader from "@/components/global/Loader";
import { useQueryClient } from "@tanstack/react-query";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";

interface IEmoji {
  emoji: string;
  count: number;
  users: string[];
  _id: string;
}

interface Message {
  _id: string;
  category: string;
  user?: { 
    _id: string;
    firstName: string;
    profile: string;
  };
  content: string;
  timestamp: Date;
  replyTo: string | null;
  emojis: IEmoji[];
  attachments: string[];
  __v: number;
}

interface ReplyMessageType {
  _id: string;
  content: string;
  user: {
    firstName: string;
  };
}

interface ReplyMessageType {
  _id: string;
  content: string;
  user: {
    firstName: string;
  };
}

// Define a new interface for selected files
interface SelectedFile {
  file: File;
  preview: string;
  id: string; // unique ID for each file to help with removal
}

const ChatUI = () => {
  const socket = useSocket();
  const { groupId } = useParams();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState<Message[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { userName } = useSelector((state: Rootstate) => state.user);
  const queryclient = useQueryClient();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isLoading, data } = useRQ(
    () => getAllMessages(groupId as string, `?page=${page}`),
    "chats",
    page
  );
  const { category } = location.state || { category: "Unknown" };
  const navigate = useNavigate();
  const [roomMemberCount, setRoomMemberCount] = useState<{
    [roomId: string]: number;
  }>({});
  const [inputValue, setInputValue] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceLevel, setVoiceLevel] = useState(0);
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
  const [showReactionPicker, setShowReactionPicker] = useState<string | null>(
    null
  );
  const [typingMessage, setTypingMessage] = useState('');
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const [replyTo, setReplyTo] = useState<ReplyMessageType | null>(null);
  
  // Add state for selected files
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue, watch } = useForm<{
    message: string;
  }>({
    resolver: zodResolver(
      z.object({ message: z.string().min(1, "Type something") })
    ),
  });

  const messageValue = watch("message", "");

  useEffect(() => {
    setInputValue(messageValue);
  }, [messageValue]);

  useEffect(() => {
    if (socket && groupId) {

      socket.on('typingStatus', ({ typingMessage }) => {
        setTypingMessage(typingMessage);
    });


      socket.emit("joinChatRoom", groupId);

      socket.on("onlineUsers", (data: { roomId: string; count: number }) => {
        setRoomMemberCount((prev) => ({
          ...prev,
          [data.roomId]: data.count,
        }));
      });

      socket.on("reactionUpdated", () => {
        queryclient.invalidateQueries({ queryKey: ["chats"] });
      });

      socket.on("newMessage", (message: Message) => {
        queryclient.invalidateQueries({ queryKey: ["chats"] });
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.emit("leaveChatRoom", groupId);
        socket.off("onlineUsers");
        socket.off("newMessage");
        socket.off('typingStatus');

      };
    }
  }, [socket, groupId, queryclient]);
  useEffect(() => {
    if (socket && groupId && inputValue) {
        socket.emit('typing', { roomId: groupId, userName });

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            socket.emit('stopTyping', { roomId: groupId });
        }, 1000);
    }

    return () => {
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
    };
}, [inputValue, socket, groupId, userName]);

  useEffect(() => {
    if (data) {
      const newMessages = data as Message[];
      if (newMessages.length < 20) setHasMore(false);
      setMessages(() => [...newMessages.reverse()]);
    }
  }, [data]);

  useEffect(() => {
    queryclient.invalidateQueries({ queryKey: ["chats"] });
  }, [page, queryclient]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Add cleanup for file previews
  useEffect(() => {
    return () => {
      selectedFiles.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [selectedFiles]);

  const handleSendMessage = async (datas: { message: string }) => {

    const files = selectedFiles.map(file => file.file);

    // Add replyTo to the message data if replying to a message
    socket.emit("sendMessage", {
      roomId: groupId,
      message: datas.message,
      user: userName,
      replyTo: replyTo?._id || null,
    });
    
    // Update API call to include replyTo
    const { data } = await sendMessage(
      groupId as string, 
      datas.message, 
      replyTo?._id || null,
      files
    );
    
    if (data.success) {
      reset();
      setInputValue("");
      setReplyTo(null);
      setSelectedFiles([]);
    }
  };

  const handleReply = (message: Message) => {
    setReplyTo({
      _id: message._id,
      content: message.content,
      user: {
        firstName: message.user?.firstName || "Unknown"
      }
    });
    // Focus on the input field
    const input = document.querySelector("input[name='message']") as HTMLInputElement 
    if (input) input.focus();
      };

  const cancelReply = () => {
    setReplyTo(null);
  };

  const loadMoreMessages = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    const currentMessage = messageValue || "";
    setValue("message", currentMessage + emojiData.emoji);
    setInputValue(currentMessage + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles: SelectedFile[] = Array.from(files).map(file => {
        const preview = URL.createObjectURL(file);
        const id = `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        return { file, preview, id };
      });
      
      setSelectedFiles(prev => [...prev, ...newFiles]);
            e.target.value = "";
    }
  };

  // Add a function to remove a file from the selected files
  const removeFile = (fileId: string) => {
    setSelectedFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId);
      
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      
      return prev.filter(f => f.id !== fileId);
    });
  };

  const handleMicClick = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Start recording logic here
      // For demo, we'll just simulate voice levels
      const interval = setInterval(() => {
        setVoiceLevel(Math.random());
      }, 100);

      // This won't actually work as written, but keeping the structure similar to original
      // In a real implementation, you'd store the interval ID and clear it when stopping
      return () => clearInterval(interval);
    } else {
      // Stop recording logic here
      setVoiceLevel(0);
    }
  };

  const handleReaction = async (messageId: string, emoji: string) => { 
    const {data} = await addReaction(messageId, emoji);
    if (data.success) {
      socket.emit("addReaction", {
          messageId,
          emoji,
          user: userName,
          roomId: groupId
      });
    }
    setShowReactionPicker(null);
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

  const findReplyMessage = (replyId: string | null) => {
    if (!replyId) return null;
    return messages.find(msg => msg._id === replyId);
  };

  // Helper function to check if a URL is an image
  const isImageUrl = (url: string) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
    return imageExtensions.some(ext => url.toLowerCase().endsWith(ext));
  };

  // Function to open image preview
  const openImagePreview = (imageUrl: string) => {
    setPreviewImage(imageUrl);
  };

  // Function to close image preview
  const closeImagePreview = () => {
    setPreviewImage(null);
  };

  const groupedMessages = groupMessagesByDate(messages);

  const quickReactions = ["👍", "❤", "😂", "😮", "😢", "🙏"];

  return (
    <div className="flex flex-col w-full h-screen sticky">
      {/* Header */}
      <div className="border-b border-gray-700 text-white  p-4 flex items-center ">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div className="flex-1">
                    <h1 className="text-xl font-semibold truncate">{category}</h1>
                    {typingMessage && (
                        <p className="text-xs text-indigo-400 mt-0.5">{typingMessage}</p>
                    )}
                </div>
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
              {dateMessages.map((message) => {
                const repliedToMessage = findReplyMessage(message.replyTo);
                const hasAttachments = message.attachments && message.attachments.length > 0;
                
                return (
                <div
                  key={message._id}
                  className={`flex ${
                    message.user?.firstName === userName
                      ? "justify-end"
                      : "justify-start"
                  } mb-2`}
                  onMouseEnter={() => setHoveredMessageId(message._id)}
                  onMouseLeave={() => setHoveredMessageId(null)}
                >
                  <div className="relative flex items-center group">
                    {/* Hover actions on the right side */}
                    {hoveredMessageId === message._id && (
                      <div
                        className={`absolute ${
                          message.user?.firstName === userName
                            ? "right-full mr-2"
                            : "left-full ml-2"
                        } `}
                      >
                        <div className="bg-zinc-800 rounded-full shadow-lg flex items-center p-1 space-x-1">
                          {showReactionPicker === message._id ? (
                            <div className="flex space-x-1 p-1 bg-zinc-800 rounded-full">
                              {quickReactions.map((emoji) => (
                                <button
                                  key={emoji}
                                  onClick={() =>
                                    handleReaction(message._id, emoji)
                                  }
                                  className="hover:bg-zinc-700 rounded-full p-1 transition-colors duration-150"
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <>
                              <button
                                onClick={() =>
                                  setShowReactionPicker(message._id)
                                }
                                className="text-white hover:bg-zinc-700 rounded-full p-1 transition-colors duration-150"
                              >
                                <Smile className="h-4 w-4" />
                              </button>
                              <button 
                                className="text-white hover:bg-zinc-700 rounded-full p-1 transition-colors duration-150 flex items-center"
                                onClick={() => handleReply(message)}
                              >
                                <Reply className="h-4 w-4 mr-1" />
                                <span className="text-xs">Reply</span>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    )}

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
                          : message.user?.firstName || "LuxBid™"}
                      </p>
                      
                      {/* Reply reference - show if this message is replying to another message */}
                      {repliedToMessage && (
                        <div className="bg-gray-100 border-l-2 border-indigo-500 pl-2 mb-2 mt-1 text-sm text-gray-600 rounded">
                          <p className="font-semibold text-xs text-indigo-600">
                            {repliedToMessage.user?.firstName === userName
                              ? "You"
                              : repliedToMessage.user?.firstName || "LuxBid™"}
                          </p>
                          <p className="truncate">{repliedToMessage.content}</p>
                        </div>
                      )}
                      
                      <div className="flex flex-col gap-2">
                        {/* Message content */}
                        {message.content && (
                          <p>{message.content}</p>
                        )}
                        
                        {/* Image attachments - MODIFIED for better size control and click action */}
                        {hasAttachments && (
                          <div className="mt-1 grid grid-cols-2 gap-2">
                            {message.attachments.map((attachment, index) => (
                              isImageUrl(attachment) ? (
                                <div 
                                  key={index} 
                                  className="relative w-28 h-28 cursor-pointer group overflow-hidden rounded-md border border-gray-300"
                                  onClick={() => openImagePreview(attachment)}
                                >
                                  <img 
                                    src={attachment} 
                                    alt={`Attachment ${index + 1}`}
                                    className="w-full h-full object-cover hover:opacity-90 transition-opacity duration-200"
                                  />
                                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center transition-all duration-200">
                                    <Maximize2 className="text-white opacity-0 group-hover:opacity-100 h-6 w-6" />
                                  </div>
                                </div>
                              ) : (
                                <div key={index} className="rounded-md border border-gray-300 bg-gray-100 p-2 flex items-center justify-center">
                                  <Paperclip className="h-4 w-4 mr-1 text-gray-500" />
                                  <span className="text-xs truncate">
                                    {attachment.split('/').pop()}
                                  </span>
                                </div>
                              )
                            ))}
                          </div>
                        )}

                        <p className="text-xs text-gray-500 mt-1 text-right">
                          {moment(message.timestamp).format("LT")}
                        </p>
                      </div>

                      {/* Reactions display */}
                      {message.emojis && message.emojis.length > 0 && (
                        <div className="flex flex-wrap mt-2">
                          {message.emojis.map((emojiObj) => (
                            <span
                              key={emojiObj._id}
                              className="bg-gray-200 rounded-full px-2 py-1 text-sm mr-1 mb-1"
                            >
                              {emojiObj.emoji} {emojiObj.count}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )})}
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 relative">
        {showEmojiPicker && (
          <div className="absolute bottom-20 left-4 bg-zinc-800 rounded-lg shadow-lg z-10">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
        
        {/* Reply Message Preview */}
        {replyTo && (
          <div className="mb-2 p-2 bg-zinc-800 rounded-lg flex items-start text-white">
            <div className="flex-1">
              <div className="flex items-center">
                <Reply className="h-4 w-4 mr-2 text-indigo-400" />
                <span className="text-indigo-400 font-medium">Replying to {replyTo.user.firstName}</span>
              </div>
              <p className="text-sm text-gray-300 truncate">{replyTo.content}</p>
            </div>
            <button 
              onClick={cancelReply}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        
        {/* Selected Files Preview */}
        {selectedFiles.length > 0 && (
          <div className="mb-2 p-2 bg-zinc-800 rounded-lg text-white">
            <div className="flex items-center mb-1">
              <Paperclip className="h-4 w-4 mr-2 text-indigo-400" />
              <span className="text-indigo-400 font-medium">Selected Files</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-1">
              {selectedFiles.map((file) => (
                <div key={file.id} className="relative">
                  {/* Image preview */}
                  <div className="relative w-20 h-20 rounded-md overflow-hidden border border-zinc-600">
                    <img 
                      src={file.preview} 
                      alt={file.file.name}
                      className="w-full h-full object-cover"
                    />
                    {/* File type indicator for non-image files */}
                    {!file.file.type.startsWith('image/') && (
                      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                        <span className="text-xs text-white text-center">
                          {file.file.name.split('.').pop()?.toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Remove button */}
                  <button
                    onClick={() => removeFile(file.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors duration-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <form
          onSubmit={handleSubmit(handleSendMessage, errorFn)}
          className="flex items-center space-x-2"
        >
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="text-white p-3 rounded-full hover:bg-zinc-700 transition-colors duration-200"
            >
              <Smile className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleAttachmentClick}
              className="text-white p-3 rounded-full hover:bg-zinc-700 transition-colors duration-200"
            >
              <Paperclip className="h-5 w-5" />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*,video/*"
                multiple
              />
            </button>
          </div>
          {isRecording ? (
            <div className="flex-1 bg-[#8582824f] rounded-full p-3 flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-red-600 h-2.5 rounded-full"
                  style={{ width: `${voiceLevel * 100}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <input
              type="text"
              {...register("message")}
              placeholder={replyTo ? `Reply to ${replyTo.user.firstName}...` : "Type a message"}
              className="flex-1 p-3 rounded-full bg-[#8582824f] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setInputValue(e.target.value)}
            />
          )}
          <button
            type="button"
            onClick={handleMicClick}
            className={`text-white p-3 rounded-full transition-colors duration-200 ${
              isRecording
                ? "bg-red-600 hover:bg-red-700"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            <Mic className="h-5 w-5" />
          </button>
          {!isRecording && (inputValue.trim() || selectedFiles.length > 0) && (
            <button
              type="submit"
              className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition-colors duration-200"
            >
              <Send className="h-5 w-5" />
            </button>
          )}
        </form>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4">
          <div className="max-w-4xl max-h-full flex flex-col">
            <div className="flex justify-end mb-2">
              <button 
                onClick={closeImagePreview}
                className="text-white hover:text-gray-300 p-2 rounded-full bg-zinc-800 hover:bg-zinc-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="overflow-auto">
              <img 
                src={previewImage} 
                alt="Preview" 
                className="max-w-full max-h-[80vh] object-contain" 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatUI;