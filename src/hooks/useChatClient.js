import { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { useAuth } from '../features/auth/AuthProvider';

/**
 * Hook to manage chat client state.
 * @returns {Object} Chat client state and actions.
 */
const useChatClient = () => {
  const { user } = useAuth();
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);

  /**
   * Connects to the chat service.
   */
  const connectChat = async () => {
    try {
      const userEmail = user?.email;
      if (!userEmail) {
        console.error('No user session available for chat connection.');
        return;
      }
      const response = await fetch('/api/customerSupport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail }),
      });
      if (!response.ok) {
        console.error('Failed to fetch chat token');
        return;
      }
      const { token, channelId, userId, VITE_PUBLIC_STREAM_KEY } = await response.json();
      const streamClient = StreamChat.getInstance(VITE_PUBLIC_STREAM_KEY);
      await streamClient.connectUser({ id: userId, name: userEmail }, token);
      const streamChannel = streamClient.channel('messaging', channelId);
      await streamChannel.watch();
      setClient(streamClient);
      setChannel(streamChannel);
    } catch (error) {
      console.error('Error connecting chat:', error);
    }
  };

  /**
   * Disconnects from the chat service.
   */
  const disconnectChat = async () => {
    if (client) {
      await client.disconnectUser();
      setClient(null);
      setChannel(null);
    }
  };

  return { client, channel, connectChat, disconnectChat };
};

export default useChatClient;