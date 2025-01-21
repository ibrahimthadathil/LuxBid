import React, { useState } from 'react'
import { MessageCircle, Send, ArrowLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

const ChatUI: React.FC = () => {
  const { groupId } = useParams()
  const navigate = useNavigate()
  const [messages, setMessages] = useState([
    { id: 1, user: 'Alice', text: 'Hey! Check out this new item up for auction!', time: '09:30', isSent: false },
    { id: 2, user: 'You', text: "Wow, that looks interesting. What's the starting bid?", time: '09:31', isSent: true },
    { id: 3, user: 'Alice', text: "The starting bid is $50. It's a rare collectible!", time: '09:32', isSent: false },
    { id: 4, user: 'You', text: "That's not bad. I might place a bid later today.", time: '09:33', isSent: true },
    { id: 5, user: 'Alice', text: "Great! Don't wait too long, though. These items tend to go quickly!", time: '09:34', isSent: false },
  ])

  const [inputMessage, setInputMessage] = useState('')

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return // Prevent sending empty messages
    const newMessage = {
      id: messages.length + 1,
      user: 'You',
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSent: true,
    }
    setMessages([...messages, newMessage])
    setInputMessage('') // Clear input
  }
  return (
    <div className="flex flex-col w-full h-full ">
      {/* Header */}
      <div className=" text-white p-4 flex items-center">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold flex-1 truncate">{groupId + ' paintings' || 'Chat'}</h1>
        <MessageCircle className="h-6 w-6" />
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-2 ${
                message.isSent ? 'bg-indigo-100 text-gray-800' : 'bg-white text-gray-800'
              }`}
            >
              {!message.isSent && (
                <p className="font-semibold text-indigo-600 mb-1">{message.user}</p>
              )}
              <p>{message.text}</p>
              <p className="text-xs text-gray-500 mt-1 text-right">{message.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className=" p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-1 p-3 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition-colors duration-200"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatUI
