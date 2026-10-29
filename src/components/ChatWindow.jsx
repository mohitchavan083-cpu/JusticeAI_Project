import { ArrowUp, Paperclip, Sparkles } from 'lucide-react';
import ChatMessage from './ChatMessage.jsx';

export default function ChatWindow({ messages, input, setInput, onSubmit, onSelectQuestion, questions }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <main className="chat-main">
      <div className="chat-heading">
        <div>
          <div className="eyebrow"><span className="status-dot" /> AVAILABLE TO HELP</div>
          <h1>Your legal information <span>assistant.</span></h1>
          <p>Ask in everyday language. Get a clearer starting point for your next step.</p>
        </div>
        <div className="heading-mark"><ScaleMark /></div>
      </div>

      <div className="chat-panel">
        <div className="chat-scroll">
          {messages.map((message) => <ChatMessage key={message.id} message={message} />)}
          {messages.length === 1 && (
            <div className="welcome-suggestions">
              <div className="suggestion-heading"><Sparkles size={15} /> START WITH A TOPIC</div>
              <div className="quick-grid">
                {questions.map((question) => (
                  <button key={question} onClick={() => onSelectQuestion(question)}>{question}<span>↗</span></button>
                ))}
              </div>
            </div>
          )}
        </div>
        <form className="composer" onSubmit={handleSubmit}>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                onSubmit();
              }
            }}
            placeholder="Describe your legal question..."
            rows="1"
            aria-label="Your legal question"
          />
          <div className="composer-bottom">
            <div className="composer-hint"><Paperclip size={14} /> Do not include passwords or sensitive personal information.</div>
            <button className="send-button" type="submit" disabled={!input.trim()} aria-label="Send question"><ArrowUp size={19} /></button>
          </div>
        </form>
      </div>
      <div className="below-chat"><span>✦</span> Clear information. More confident next steps.</div>
    </main>
  );
}

function ScaleMark() {
  return <span className="scale-mark">⚖</span>;
}
