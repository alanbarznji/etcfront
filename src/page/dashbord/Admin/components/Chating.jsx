import React, { useState, useEffect, useRef, useMemo } from "react";

const Chatting = ({ messages, newMessage, setNewMessage, sendMessage, user, isAdmin,handleDelete }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Sort messages by timestamp (ascending order: oldest at the top, newest at the bottom)
  const sortedMessages = useMemo(() => {
    return [...messages].sort((a, b) => a.timestamp - b.timestamp);
  }, [messages]);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sortedMessages]);

  return (
    <div className="w-full h-screen flex justify-center overflow-y-hidden">
      <div className="bg-gray-100 h-full flex flex-col container">
        
        {/* Header */}
        <div className="bg-blue-500 p-4 text-white flex justify-between items-center">
          <span>Chat App</span>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="hover:bg-blue-400 rounded-md p-1 relative"
          >
            ☰
          </button>
          {dropdownOpen && (
            <div className="absolute right-5 top-12 w-48 bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-50">
              <button onClick={handleDelete} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Stop Session</button>
 
            </div>
          )}
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col space-y-2">
            {sortedMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "Admin" ? "justify-end" : ""}`}>
                <div className={`p-2 rounded-lg max-w-xs ${msg.role === "Admin" ? "bg-blue-200" : "bg-gray-300"} w-full break-words`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {/* Empty div for auto-scrolling to bottom */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message Input */}
        <div className="bg-white p-4 flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white rounded-full p-2 ml-2 hover:bg-blue-600 focus:outline-none"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chatting;
