import { useState } from 'react';
import { RotateCcw, Info } from 'lucide-react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import ChatWindow from './components/ChatWindow.jsx';
import { findLegalAnswer } from './utils/nlp.js';
import { suggestedQuestions } from './data/legalKnowledge.js';

const initialMessage = {
  id: 'welcome',
  role: 'assistant',
  title: 'Welcome',
  content: 'Hi! I’m JusticeAI. I can help you explore general legal information and common next steps. What would you like to understand today?'
};

export default function App() {
  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState('');

  function submitQuestion(questionOverride) {
    const question = (questionOverride ?? input).trim();
    if (!question) return;

    const userMessage = {
      id: `${Date.now()}-user`,
      role: 'user',
      content: question
    };
    const result = findLegalAnswer(question);
    const assistantMessage = {
      id: `${Date.now()}-assistant`,
      role: 'assistant',
      title: result.title,
      content: result.answer
    };

    setMessages((current) => [...current, userMessage, assistantMessage]);
    setInput('');
  }

  function resetChat() {
    setMessages([initialMessage]);
    setInput('');
  }

  return (
    <div className="app-shell">
      <Header />
      <div className="workspace">
        <Sidebar onSelectQuestion={submitQuestion} questions={suggestedQuestions} />
        <div className="main-column">
          <div className="mobile-toolbar">
            <span>LEGAL ASSISTANT</span>
            <button onClick={resetChat}><RotateCcw size={14} /> New chat</button>
          </div>
          <ChatWindow
            messages={messages}
            input={input}
            setInput={setInput}
            onSubmit={() => submitQuestion()}
            onSelectQuestion={submitQuestion}
            questions={suggestedQuestions}
          />
          <footer className="disclaimer">
            <Info size={15} />
            <span><strong>Important:</strong> JusticeAI is a student/demo project, not a lawyer or legal service. Answers are general information, may be incomplete, and are not legal advice. Confirm important matters with a qualified professional.</span>
            <button onClick={resetChat} className="reset-button"><RotateCcw size={14} /> New chat</button>
          </footer>
        </div>
      </div>
    </div>
  );
}
