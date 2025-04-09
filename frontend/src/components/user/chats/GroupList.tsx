import React, { useEffect, useState } from "react";
import { MessageSquare, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRQ } from "@/hooks/userRQ";
import { fetchGroups } from "@/service/Api/chatApi";
import Loader from "@/components/global/Loader";
import { useSocket } from "@/context/socketCotext";

interface Group {
  _id: string;
  name: string;
  recentMessage: {
    _id: string;
    category: string;
    content: string;
    timestamp: Date;
  };
}

const GroupList: React.FC = () => {
  const navigate = useNavigate();
  const socket = useSocket();
  const { isLoading, data } = useRQ(fetchGroups, "groups");
  const [onlineUsers, setOnlineUsers] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (socket) {
      // Only listen for updates
      socket.on('onlineUsers', ({ roomId, count }) => {
        setOnlineUsers(prev => ({
          ...prev,
          [roomId]: count
        }));
      });

      // Request current counts for all rooms
      socket.emit('getRoomCounts');

      return () => {
        socket.off('onlineUsers');
      };
    }
  }, [socket, data]);

  const handleSelectGroup = (groupId: string, category: string) => {
    navigate(`/community/${groupId}`, { state: { category } });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="flex flex-col w-full h-full">
      <div className="text-white p-4">
        <h1 className="text-xl text-center font-semibold">Auction Chat Groups</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {(data as Group[]).map((group) => (
            <div
              key={group._id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
            >
              <div className="bg-indigo-900 p-4 flex justify-between items-center">
                <MessageSquare className="h-8 w-8 text-white" />
                <div className="flex items-center text-white text-sm">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{onlineUsers[group._id] || 0 } active</span>
                </div>
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-gray-800 mb-2 truncate">{group.name}</h2>
                <p className="text-sm text-gray-600 mb-2 h-10 overflow-hidden">
                  {group.recentMessage?.content}
                </p>
                <button
                  onClick={() => handleSelectGroup(group._id, group.name)}
                  className="bg-indigo-800 hover:bg-indigo-700 text-white text-sm font-semibold px-3 py-1 rounded transition-colors duration-200"
                >
                  Join Chat
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupList;
