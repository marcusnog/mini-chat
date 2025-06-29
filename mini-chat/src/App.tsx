import React, { useState, useEffect, useRef } from 'react';
import Chat from './components/Chat';

const App: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('username');
    if (saved) setUsername(saved);
    const pic = localStorage.getItem('profilePic');
    if (pic) setProfilePic(pic);
  }, []);

  const handleEnter = () => {
    if (input.trim()) {
      setUsername(input);
      localStorage.setItem('username', input);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('profilePic');
    setUsername(null);
    setProfilePic(null);
    setInput('');
    setMenuOpen(false);
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setProfilePic(reader.result);
          localStorage.setItem('profilePic', reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
    setMenuOpen(false);
  };

  const handleNameClick = () => {
    setMenuOpen((open) => !open);
  };

  // Fecha o menu se clicar fora
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      const menu = document.getElementById('user-menu');
      if (menu && !menu.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  if (!username) {
    return (
      <div style={{ minHeight: '100vh', minWidth: '100vw', background: '#111b21', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 360, width: '100%', padding: 32, borderRadius: 12, background: '#202c33', textAlign: 'center', boxShadow: '0 4px 24px #0006' }}>
          <h2 style={{ color: '#25d366', marginBottom: 24 }}>Bem-vindo ao Mini Chat</h2>
          <input
            type="text"
            placeholder="Digite seu nome..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleEnter()}
            style={{ padding: 12, borderRadius: 6, border: '1px solid #333', width: '80%', marginBottom: 20, background: '#111b21', color: '#fff' }}
          />
          <br />
          <button onClick={handleEnter} style={{ padding: '10px 32px', borderRadius: 6, border: 'none', background: '#25d366', color: '#111b21', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', minWidth: '100vw', width: '100vw', height: '100vh', background: '#111b21' }}>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          background: '#202c33',
          borderRadius: 0,
          boxShadow: '0 4px 24px #0006',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div style={{ background: '#202c33', borderBottom: '1px solid #222', padding: '18px 24px', color: '#fff', fontWeight: 700, fontSize: 20, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'space-between', position: 'relative' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: '#25d366', fontSize: 26 }}>●</span> Mini Chat
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', position: 'relative' }} onClick={handleNameClick}>
            {profilePic ? (
              <img src={profilePic} alt="Perfil" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '2px solid #25d366' }} />
            ) : (
              <span style={{ width: 32, height: 32, borderRadius: '50%', background: '#111b21', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#25d366', fontWeight: 700, fontSize: 18, border: '2px solid #25d366' }}>{username[0].toUpperCase()}</span>
            )}
            <span style={{ color: '#8696a0', fontWeight: 400, fontSize: 15, fontStyle: 'italic', userSelect: 'none' }}>{username}</span>
            {menuOpen && (
              <div id="user-menu" style={{ position: 'absolute', top: 40, right: 0, background: '#222d34', borderRadius: 8, boxShadow: '0 2px 8px #0007', zIndex: 10, minWidth: 180, padding: 8 }}>
                <div style={{ padding: '10px 16px', cursor: 'pointer', color: '#fff', borderRadius: 6, fontSize: 15 }} onClick={() => fileInputRef.current?.click()}>
                  Trocar foto de perfil
                </div>
                <div style={{ padding: '10px 16px', cursor: 'pointer', color: '#fff', borderRadius: 6, fontSize: 15 }} onClick={handleLogout}>
                  Trocar de usuário
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleProfilePicChange} />
              </div>
            )}
          </span>
        </div>
        <Chat username={username} />
      </div>
    </div>
  );
};

export default App; 