import React from 'react';
import { Message as MessageType } from '../api/mockApi';
import styled from 'styled-components';

type MessageProps = {
  message: MessageType;
};

const MessageContainer = styled.div<{ isOwn: boolean }>`
  display: flex;
  justify-content: ${({ isOwn }) => (isOwn ? 'flex-end' : 'flex-start')};
  margin-bottom: 8px;
`;

const Bubble = styled.div<{ isOwn: boolean }>`
  background: ${({ isOwn }) => (isOwn ? '#25d366' : '#202c33')};
  color: ${({ isOwn }) => (isOwn ? '#111b21' : '#fff')};
  padding: 10px 16px;
  border-radius: 8px 8px ${({ isOwn }) => (isOwn ? '8px 2px' : '2px 8px')};
  max-width: 70%;
  font-size: 1rem;
  box-shadow: 0 1px 1.5px #0002;
  word-break: break-word;
`;

const Author = styled.div`
  font-size: 0.78rem;
  color: #8696a0;
  margin-bottom: 2px;
  margin-left: 2px;
`;

const Message: React.FC<MessageProps> = ({ message }) => {
  const isOwn = message.author === localStorage.getItem('username');
  return (
    <MessageContainer isOwn={isOwn}>
      <div>
        {!isOwn && <Author>{message.author}</Author>}
        <Bubble isOwn={isOwn}>{message.text}</Bubble>
      </div>
    </MessageContainer>
  );
};

export default Message; 