import React from 'react'
import { MessageSquare, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Group {
  id: string
  name: string
  lastMessage: string
  unreadCount: number
  activeUsers: number
}

interface GroupListProps {
  groups?: Group[]
  
}
const Groups = [
    { id: '1', name: 'Electronics', lastMessage: 'New iPhone auction starting soon!', unreadCount: 3, activeUsers: 15 },
    { id: '2', name: 'Fashion', lastMessage: 'Vintage Chanel bag up for grabs', unreadCount: 0, activeUsers: 8 },
    { id: '3', name: 'Home & Garden', lastMessage: 'Antique furniture collection auction', unreadCount: 5, activeUsers: 12 },
    { id: '4', name: 'Sports', lastMessage: 'Signed NBA jersey auction ending in 1 hour', unreadCount: 1, activeUsers: 20 },
    // { id: '5', name: 'Art', lastMessage: 'Impressionist painting from private collection', unreadCount: 2, activeUsers: 6 },
    // { id: '6', name: 'Collectibles', lastMessage: 'Rare comic book auction this weekend', unreadCount: 0, activeUsers: 10 },
    // { id: '7', name: 'Jewelry', lastMessage: 'Diamond necklace auction starting at $10,000', unreadCount: 4, activeUsers: 9 },
    // { id: '8', name: 'Cars', lastMessage: 'Classic 1967 Mustang up for auction', unreadCount: 1, activeUsers: 14 },
    // { id: '9', name: 'Books', lastMessage: 'First edition novels from famous authors', unreadCount: 0, activeUsers: 7 },
    // { id: '10', name: 'Music', lastMessage: 'Signed guitar from rock legend auction', unreadCount: 2, activeUsers: 11 },
  ]
  
const GroupList: React.FC<GroupListProps> = ({ groups=Groups }) => {
    const navigate = useNavigate()

    const handleSelectGroup = (groupId: string) => {
      navigate(`/community/${groupId}`) // Navigate to the chat page for the selected group
    }
  return (
    <div className="flex flex-col w-full h-full">
      <div className=" text-white p-4">
        <h1 className="text-xl text-center font-semibold">Auction Chat Groups</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {groups.map((group) => (
            <div
              key={group.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
            >
              <div className="bg-indigo-600 p-4 flex justify-between items-center">
                <MessageSquare className="h-8 w-8 text-white" />
                <div className="flex items-center text-white text-sm">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{group.activeUsers} active</span>
                </div>
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-gray-800 mb-2 truncate">{group.name}</h2>
                <p className="text-sm text-gray-600 mb-2 h-10 overflow-hidden">{group.lastMessage}</p>
                <div className="flex justify-between items-center">
                  {group.unreadCount > 0 && (
                    <div className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {group.unreadCount} new
                    </div>
                  )}
                  <button
                     onClick={() => handleSelectGroup(group.id)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-3 py-1 rounded transition-colors duration-200"
                  >
                    Join Chat
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GroupList
