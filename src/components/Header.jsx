import { Scale, ShieldCheck } from 'lucide-react';

export default function Header() {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-icon"><Scale size={22} strokeWidth={2.2} /></div>
        <div>
          <div className="brand-name">Justice<span>AI</span></div>
          <div className="brand-subtitle">Legal information, made clearer</div>
        </div>
      </div>
      <div className="privacy-pill"><ShieldCheck size={15} /> Educational demo</div>
    </header>
  );
}
