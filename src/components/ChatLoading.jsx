import React from 'react';

function ChatLoading() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin" />
      <span className="text-sm font-medium">Connecting...</span>
    </div>
  );
}

export default ChatLoading;