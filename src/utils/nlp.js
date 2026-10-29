import { legalKnowledge } from '../data/legalKnowledge.js';

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'i', 'me', 'my', 'we', 'you',
  'your', 'how', 'what', 'where', 'when', 'can', 'could', 'should', 'do', 'does',
  'did', 'to', 'for', 'of', 'in', 'on', 'at', 'and', 'or', 'if', 'about', 'please',
  'tell', 'explain', 'help', 'with', 'it', 'this', 'that', 'be', 'get'
]);

export function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word && !STOP_WORDS.has(word));
}

export function findLegalAnswer(question) {
  const normalized = question.toLowerCase().trim();
  if (!normalized) {
    return {
      title: 'Ask a legal information question',
      answer: 'Please type a question about a legal topic, such as online fraud, consumer rights, rent disputes, workplace issues, or legal aid.',
      confidence: 0
    };
  }

  const tokens = new Set(tokenize(normalized));
  let best = null;
  let bestScore = 0;

  for (const entry of legalKnowledge) {
    let score = 0;
    for (const keyword of entry.keywords) {
      const key = keyword.toLowerCase();
      if (normalized.includes(key)) {
        score += key.includes(' ') ? 4 : 3;
      } else if (tokens.has(key)) {
        score += 2;
      } else {
        const keywordTokens = tokenize(key);
        for (const token of keywordTokens) {
          if (tokens.has(token)) score += 1;
        }
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  if (!best || bestScore < 2) {
    return {
      title: 'Let’s narrow down your question',
      answer: `I could not confidently match that question to the topics in my demo knowledge base. Try asking about filing a police complaint, online fraud, consumer rights, rent or tenant issues, workplace rights, contracts, divorce, or free legal aid. For a specific case, contact a qualified lawyer or legal aid service.`,
      confidence: 0
    };
  }

  return {
    title: best.title,
    answer: best.answer,
    confidence: Math.min(0.98, 0.55 + bestScore * 0.06)
  };
}
