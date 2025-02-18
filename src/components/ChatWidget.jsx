import React, { useState } from 'react';
import {
  Chat,
  Channel,
  Window,
  MessageList,
  MessageInput
} from 'stream-chat-react';
import useChatClient from '../hooks/useChatClient';
import 'stream-chat-react/dist/css/v2/index.css';
import ChatLoading from './ChatLoading';
import CustomChannelHeader from './CustomChannelHeader';

const ChatWidget = () => {
  const { user } = useChatClient();
  const { client, channel, connectChat, disconnectChat } = useChatClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);

  if (!user) {
    return null;
  }

  const toggleChat = async () => {
    if (!isOpen) {
      setIsChatLoading(true);
      try {
        await connectChat();
        setIsOpen(true);
      } catch (error) {
        console.error('Error connecting chat:', error);
      } finally {
        setIsChatLoading(false);
      }
    } else {
      setIsOpen(false);
      await disconnectChat();
    }
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: isChatLoading ? '8px' : '50%',
    padding: isChatLoading ? '8px 16px' : '0',
    width: isChatLoading ? 'auto' : '50px',
    height: '50px',
    fontSize: '24px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleChat}
        className="cursor-pointer"
        style={buttonStyle}
        disabled={isChatLoading}
      >
        {isChatLoading ? <ChatLoading /> : (isOpen ? '✕' : '💬')}
      </button>
      {isOpen && client && channel && (
        <div className="mt-4 w-80 h-96 bg-white shadow-lg rounded-md overflow-hidden">
          <Chat client={client}>
            <Channel channel={channel}>
              <Window>
                <CustomChannelHeader />
                <MessageList />
                <MessageInput placeholder="Type your message here..." />
              </Window>
            </Channel>
          </Chat>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;