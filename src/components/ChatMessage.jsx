import { Bot, User, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function ChatMessage({ message }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  async function copyAnswer() {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={`message-row ${isUser ? 'user-row' : 'assistant-row'}`}>
      <div className={`avatar ${isUser ? 'user-avatar' : 'bot-avatar'}`}>
        {isUser ? <User size={17} /> : <Bot size={18} />}
      </div>
      <div className="message-content">
        <div className="message-meta">
          <strong>{isUser ? 'You' : 'JusticeAI'}</strong>
          {!isUser && message.title && <span className="answer-topic">{message.title}</span>}
        </div>
        <div className={`message-bubble ${isUser ? 'user-bubble' : 'bot-bubble'}`}>
          <p>{message.content}</p>
          {!isUser && <button className="copy-button" onClick={copyAnswer} aria-label="Copy answer">{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? 'Copied' : 'Copy'}</button>}
        </div>
      </div>
    </div>
  );
}
