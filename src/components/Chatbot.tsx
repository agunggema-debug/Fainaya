import { useState, useRef, useEffect } from 'react';
import { getBotResponse } from '../data/chatbotResponses';
import botAvatar from '../../img/28x28.png';

interface ChatbotProps {
  lang: string;
}

export default function Chatbot({ lang }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ type: 'user' | 'bot'; text: string }[]>([
    { type: 'bot', text: "Hello! 👋 Welcome to Fainaya Service & Art.\nHow can I help you today?" },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    setMessages(prev => [...prev, { type: 'user', text }]);
    setIsTyping(true);
    const delay = 800 + (crypto.getRandomValues(new Uint8Array(1))[0] % 600);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { type: 'bot', text: getBotResponse(text, lang) }]);
    }, delay);
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    sendMessage(text);
  };

  const handleQuickMessage = (text: string) => {
    sendMessage(text);
  };

  return (
    <div className="chatbot-container">
      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="flex items-center gap-2">
              <img src={botAvatar} alt="Fainaya" className="w-8 h-8 rounded-full" />
              <div>
                <span className="text-sm font-bold text-white">Fainaya Assistant</span>
                <span className="text-xs text-green-400 block">Online</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg ${msg.type}`}>
                <div className="chatbot-avatar">
                  {msg.type === 'bot' ? (
                    <img src={botAvatar} alt="Fainaya" className="w-4 h-4" />
                  ) : (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
                <div className="chatbot-bubble">
                  {msg.text.split('\n').map((line, j) => <p key={j}>{line}</p>)}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="chatbot-msg bot">
                <div className="chatbot-avatar">
                  <img src={botAvatar} alt="Fainaya" className="w-4 h-4" />
                </div>
                <div className="chatbot-typing"><span></span><span></span><span></span></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-quick-actions">
            {['IT Services', 'Creative Services', 'Pricing', 'Contact'].map((q) => (
              <button key={q} className="chatbot-quick-btn" onClick={() => handleQuickMessage(q)}>
                {q === 'IT Services' ? '💻 ' : q === 'Creative Services' ? '🎨 ' : q === 'Pricing' ? '💰 ' : '📞 '}{q}
              </button>
            ))}
          </div>
          <div className="chatbot-input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="chatbot-input"
            />
            <button className="chatbot-send" onClick={handleSend}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
          <div className="chatbot-footer">
            <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            <span className="text-xs text-slate-600">Powered by AI • Available on a Free plan</span>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chatbot-toggle"
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    </div>
  );
}