export type Message = {
  id: number;
  author: string;
  text: string;
};

let messages: Message[] = [
  { id: 1, author: 'João', text: 'Olá, pessoal!' },
  { id: 2, author: 'Maria', text: 'Oi, João! Tudo bem?' },
  { id: 3, author: 'João', text: 'Tudo ótimo! E com você?' },
];

let nextId = 4;

export function getMessages(): Promise<Message[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...messages]), 300);
  });
}

export function sendMessage({ author, text }: { author: string; text: string }): Promise<Message> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newMsg = { id: nextId++, author, text };
      messages.push(newMsg);
      resolve(newMsg);
    }, 300);
  });
} 