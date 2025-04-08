'use client'

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

interface Message {
  text: string;
  isUser: boolean;
  timestamp: string;
}

export default function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [username] = useState(`کاربر ${Math.random().toString(36).slice(2, 6)}`);

  useEffect(() => {
    // Connect to Socket.IO server
    socket.connect();

    // Set up event listeners
    socket.on('connect', () => {
      setIsConnected(true);
      // Identify as a user with a username
      socket.emit('user-connect', username);
    });

    socket.on('message', (message: string) => {
      const newMessage: Message = {
        text: message,
        isUser: false,
        timestamp: new Date().toLocaleTimeString('fa-IR')
      };
      setMessages(prev => [...prev, newMessage]);
    });

    // Cleanup on unmount
    return () => {
      socket.off('connect');
      socket.off('message');
      socket.disconnect();
    };
  }, [username]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const timestamp = new Date().toLocaleTimeString('fa-IR');
      
      // Send message to server
      socket.emit('message', message.trim());
      
      // Add message to local state
      const newMessage: Message = {
        text: message.trim(),
        isUser: true,
        timestamp
      };
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold">گفتگو با پشتیبانی</h2>
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
          {isConnected ? 'در حال گفتگو' : 'قطع ارتباط'}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {/* Welcome Message */}
        <div className="flex justify-start">
          <div className="bg-gray-100 text-gray-800 rounded-lg rounded-br-none p-3 max-w-[80%]">
            <p>سلام {username} عزیز، به گفتگوی آنلاین همسفر خوش آمدید. چطور می‌توانم کمکتان کنم؟</p>
            <span className="text-xs text-gray-500">
              {new Date().toLocaleTimeString('fa-IR')}
            </span>
          </div>
        </div>

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.isUser
                  ? 'bg-primary text-white rounded-bl-none'
                  : 'bg-gray-100 text-gray-800 rounded-br-none'
              }`}
            >
              <p>{msg.text}</p>
              <span className={`text-xs ${msg.isUser ? 'text-white/80' : 'text-gray-500'}`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="پیام خود را بنویسید..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            ارسال
          </button>
        </div>
      </form>
    </div>
  );
} 