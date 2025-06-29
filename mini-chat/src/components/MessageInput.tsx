import React, { useState } from 'react';

type MessageInputProps = {
  onSend: (text: string) => void;
};

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div style={{ display: 'flex', padding: '8px', background: '#fff' }}>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Digite sua mensagem..."
        style={{ flex: 1, marginRight: 8, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
      />
      <button onClick={handleSend} style={{ padding: '8px 16px', borderRadius: 4, border: 'none', background: '#1976d2', color: '#fff' }}>
        Enviar
      </button>
    </div>
  );
};

export default MessageInput; 