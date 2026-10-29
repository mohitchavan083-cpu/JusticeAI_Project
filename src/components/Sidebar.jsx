import { BookOpen, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';

export default function Sidebar({ onSelectQuestion, questions }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-label">YOUR ASSISTANT</div>
      <div className="side-link active"><MessageCircle size={17} /> Legal assistant</div>
      <div className="side-link"><BookOpen size={17} /> Topic library <span className="coming-soon">DEMO</span></div>
      <div className="sidebar-divider" />
      <div className="sidebar-label">TRY ASKING</div>
      <div className="suggestion-list">
        {questions.map((question) => (
          <button className="suggestion" key={question} onClick={() => onSelectQuestion(question)}>
            <Sparkles size={14} /> <span>{question}</span>
          </button>
        ))}
      </div>
      <div className="sidebar-note">
        <ShieldCheck size={17} />
        <div><strong>Your questions matter</strong><p>This demo processes messages in your browser and does not send them to an AI server.</p></div>
      </div>
    </aside>
  );
}
