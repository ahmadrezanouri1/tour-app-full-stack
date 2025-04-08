'use client'

import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

interface Message {
  id?: number;
  text: string;
  isAdmin: boolean;
  timestamp: string;
  userId?: string;
  isEdited?: boolean;
}

interface ChatSession {
  userId: string;
  username: string;
  messages: Message[];
  unread: number;
  lastMessage?: string;
  lastMessageTime?: string;
  isOnline?: boolean;
}

export default function AdminChat() {
  const [message, setMessage] = useState('');
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const processedMessages = useRef(new Set<string>());  // Track processed messages

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch chat history for a specific user
  const fetchUserMessages = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/messages/${userId}`);
      const messages = await response.json();
      return messages.map((msg: any) => ({
        id: msg.id,
        text: msg.text,
        isAdmin: msg.is_admin === 1,
        timestamp: new Date(msg.timestamp).toLocaleTimeString('fa-IR'),
        userId: msg.user_id
      }));
    } catch (error) {
      console.error('Error fetching user messages:', error);
      return [];
    }
  };

  // Initial load of active users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:3001/api/users');
        const users = await response.json();
        
        const initialSessions = users.map((user: any) => ({
          userId: user.id,
          username: user.username,
          messages: [],
          unread: 0,
          isOnline: false
        }));

        setSessions(initialSessions);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Load messages when switching active session
  useEffect(() => {
    if (activeSession) {
      const loadSessionMessages = async () => {
        const messages = await fetchUserMessages(activeSession);
        setSessions(prev => prev.map(session => 
          session.userId === activeSession
            ? {
                ...session,
                messages,
                unread: 0,
                lastMessage: messages[messages.length - 1]?.text,
                lastMessageTime: messages[messages.length - 1]?.timestamp
              }
            : session
        ));
        scrollToBottom();
      };

      loadSessionMessages();
    }
  }, [activeSession]);

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      setIsConnected(true);
      socket.emit('admin-connect');
    });

    socket.on('new-user', (userId: string, username: string) => {
      setSessions(prev => {
        const existingSession = prev.find(s => s.userId === userId);
        if (existingSession) {
          return prev.map(s => 
            s.userId === userId 
              ? { ...s, isOnline: true }
              : s
          );
        }
        return [...prev, {
          userId,
          username: username || `کاربر ${userId.slice(0, 4)}`,
          messages: [],
          unread: 0,
          isOnline: true
        }];
      });
    });

    socket.on('user-message', ({ userId, message, timestamp, messageId }) => {
      // Check if message has already been processed
      const messageKey = `${userId}-${messageId}-${timestamp}`;
      if (processedMessages.current.has(messageKey)) {
        return;
      }
      processedMessages.current.add(messageKey);

      setSessions(prev => prev.map(session => {
        if (session.userId === userId) {
          const newMessage = {
            id: messageId,
            text: message,
            isAdmin: false,
            timestamp,
            userId
          };
          return {
            ...session,
            messages: [...session.messages, newMessage],
            unread: session.userId !== activeSession ? session.unread + 1 : 0,
            lastMessage: message,
            lastMessageTime: timestamp
          };
        }
        return session;
      }));
      scrollToBottom();
    });

    socket.on('user-disconnect', (userId: string) => {
      setSessions(prev => prev.map(session => 
        session.userId === userId 
          ? { ...session, isOnline: false }
          : session
      ));
    });

    return () => {
      socket.off('connect');
      socket.off('new-user');
      socket.off('user-message');
      socket.off('user-disconnect');
      socket.disconnect();
      processedMessages.current.clear();
    };
  }, [activeSession]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && activeSession) {
      const timestamp = new Date().toLocaleTimeString('fa-IR');
      
      socket.emit('admin-message', {
        userId: activeSession,
        message: message.trim()
      });

      setSessions(prev => prev.map(session => {
        if (session.userId === activeSession) {
          const newMessage = {
            text: message.trim(),
            isAdmin: true,
            timestamp,
            userId: activeSession
          };
          return {
            ...session,
            messages: [...session.messages, newMessage],
            lastMessage: message.trim(),
            lastMessageTime: timestamp
          };
        }
        return session;
      }));

      setMessage('');
      scrollToBottom();
    }
  };

  const handleEditMessage = async (messageToEdit: Message) => {
    if (!messageToEdit.id) return;
    
    try {
      const response = await fetch(`http://localhost:3001/api/messages/${messageToEdit.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: message }),
      });

      if (response.ok) {
        setSessions(prev => prev.map(session => {
          if (session.userId === activeSession) {
            return {
              ...session,
              messages: session.messages.map(msg => 
                msg.id === messageToEdit.id 
                  ? { ...msg, text: message, isEdited: true }
                  : msg
              ),
            };
          }
          return session;
        }));
        setEditingMessage(null);
        setMessage('');
      }
    } catch (error) {
      console.error('Error editing message:', error);
    }
  };

  const handleDeleteMessage = async (messageId: number) => {
    if (!window.confirm('آیا از حذف این پیام اطمینان دارید؟')) return;

    try {
      const response = await fetch(`http://localhost:3001/api/messages/${messageId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSessions(prev => prev.map(session => {
          if (session.userId === activeSession) {
            const updatedMessages = session.messages.filter(msg => msg.id !== messageId);
            return {
              ...session,
              messages: updatedMessages,
              lastMessage: updatedMessages[updatedMessages.length - 1]?.text,
              lastMessageTime: updatedMessages[updatedMessages.length - 1]?.timestamp,
            };
          }
          return session;
        }));
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleDeleteChat = async (userId: string) => {
    if (!window.confirm('آیا از حذف کل گفتگو اطمینان دارید؟')) return;

    try {
      const response = await fetch(`http://localhost:3001/api/chats/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSessions(prev => prev.filter(session => session.userId !== userId));
        if (activeSession === userId) {
          setActiveSession(null);
        }
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  const sortedSessions = [...sessions].sort((a, b) => {
    if (a.isOnline !== b.isOnline) return (b.isOnline ? 1 : 0) - (a.isOnline ? 1 : 0);
    if (!a.lastMessageTime || !b.lastMessageTime) return 0;
    return new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime();
  });

  const activeChat = sessions.find(s => s.userId === activeSession);

  if (isLoading) {
    return (
      <div className="flex h-[600px] bg-white rounded-lg shadow-md items-center justify-center">
        <div className="text-gray-500">در حال بارگذاری...</div>
      </div>
    );
  }

  return (
    <div className="flex h-[600px] bg-white rounded-lg shadow-md">
      {/* Users List */}
      <div className="w-80 border-l border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">کاربران</h2>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
            {isConnected ? 'آنلاین' : 'آفلاین'}
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100%-73px)]">
          {sortedSessions.map((session) => (
            <div key={session.userId} className="relative group">
              <button
                onClick={() => {
                  setActiveSession(session.userId);
                  setEditingMessage(null);
                  setSessions(prev => prev.map(s => 
                    s.userId === session.userId ? { ...s, unread: 0 } : s
                  ));
                }}
                className={`w-full p-4 text-right border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  activeSession === session.userId ? 'bg-gray-50' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm text-gray-500">{session.lastMessageTime}</span>
                  <h3 className="font-bold">{session.username}</h3>
                </div>
                {session.lastMessage && (
                  <p className="text-sm text-gray-600 truncate">{session.lastMessage}</p>
                )}
                {session.unread > 0 && (
                  <span className="inline-block bg-primary text-white text-xs px-2 py-1 rounded-full mt-1">
                    {session.unread}
                  </span>
                )}
              </button>
              <button
                onClick={() => handleDeleteChat(session.userId)}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                title="حذف گفتگو"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">
            {activeChat ? activeChat.username : 'انتخاب کاربر'}
          </h2>
        </div>

        {activeChat ? (
          <>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {activeChat.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.isAdmin ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="group relative">
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.isAdmin
                          ? 'bg-primary text-white rounded-bl-none'
                          : 'bg-gray-100 text-gray-800 rounded-br-none'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs ${msg.isAdmin ? 'text-white/80' : 'text-gray-500'}`}>
                          {msg.timestamp}
                          {msg.isEdited && ' (ویرایش شده)'}
                        </span>
                      </div>
                    </div>
                    {msg.isAdmin && msg.id && (
                      <div className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-full px-2 flex gap-2">
                        <button
                          onClick={() => {
                            setEditingMessage(msg);
                            setMessage(msg.text);
                          }}
                          className="text-blue-500 hover:text-blue-600 p-1 rounded-full hover:bg-blue-50"
                          title="ویرایش پیام"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => msg.id && handleDeleteMessage(msg.id)}
                          className="text-red-500 hover:text-red-600 p-1 rounded-full hover:bg-red-50"
                          title="حذف پیام"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (editingMessage) {
                  handleEditMessage(editingMessage);
                } else {
                  sendMessage(e);
                }
              }} 
              className="p-4 border-t border-gray-200"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={editingMessage ? 'ویرایش پیام...' : 'پیام خود را بنویسید...'}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                />
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {editingMessage ? 'ویرایش' : 'ارسال'}
                </button>
                {editingMessage && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingMessage(null);
                      setMessage('');
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    انصراف
                  </button>
                )}
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            لطفاً یک کاربر را برای شروع گفتگو انتخاب کنید
          </div>
        )}
      </div>
    </div>
  );
} 