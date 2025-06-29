import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getMessages, sendMessage, Message } from '../api/mockApi';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const simulatedReceived = [
  { author: 'Ana', text: 'Que legal esse chat!' },
  { author: 'Carlos', text: 'Oi, pessoal!' },
  { author: 'Maria', text: 'Alguém vai ao evento amanhã?' },
];

type ChatProps = {
  username: string;
};

const Chat: React.FC<ChatProps> = ({ username }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [pendingReceived, setPendingReceived] = useState(simulatedReceived);
  const [typing, setTyping] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getMessages().then(setMessages);
  }, []);

  useEffect(() => {
    if (pendingReceived.length === 0) return;
    // Mostra o indicador 1s antes da mensagem chegar
    const typingTimeout = setTimeout(() => {
      setTyping(pendingReceived[0].author);
    }, 4000);
    // Envia a mensagem após 5s
    const msgTimeout = setTimeout(() => {
      sendMessage(pendingReceived[0]).then((msg) => setMessages((msgs) => [...msgs, msg]));
      setPendingReceived((prev) => prev.slice(1));
      setTyping(null);
    }, 5000);
    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(msgTimeout);
    };
  }, [pendingReceived]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const handleSend = useCallback((text: string) => {
    sendMessage({ author: username, text }).then((msg) =>
      setMessages((msgs) => [...msgs, msg])
    );
  }, [username]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, height: '100%' }}>
      <div style={{ flex: 1, overflowY: 'auto', background: '#0b141a', padding: '24px 16px 8px 16px', minHeight: 0 }}>
        <MessageList messages={messages} />
        {typing && (
          <div style={{ color: '#25d366', fontSize: 15, margin: '8px 0 8px 8px', fontStyle: 'italic' }}>
            {typing} está digitando...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ background: '#202c33', borderTop: '1px solid #222' }}>
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default Chat; 