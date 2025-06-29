import React from 'react';
import { Message as MessageType } from '../api/mockApi';
import Message from './Message';

type MessageListProps = {
  messages: MessageType[];
};

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div style={{ padding: '16px', minHeight: '300px', background: '#f5f5f5' }}>
      {messages.map((msg) => (
        <Message key={msg.id} message={msg} />
      ))}
    </div>
  );
};

export default MessageList; 