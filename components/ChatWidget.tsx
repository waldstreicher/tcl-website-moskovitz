'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { CRM_BASE_URL } from '@/lib/crm';

type Msg = { role: 'user' | 'assistant'; content: string };

const STORAGE_KEY = 'tuli-chat';
const GREETING =
  "Hi — I'm the TuLi Assistant, an automated helper. Ask me anything about the TuLi procedure, in English or Spanish. I don't give medical advice or pricing; for those, the team is a call away at (201) 225-1101.";

// Floating chat for prospective patients. Anonymous: no name or contact info
// is requested here. Conversation state lives in sessionStorage so it survives
// a refresh but not a new browser session.
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: 'assistant', content: GREETING }]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [ended, setEnded] = useState(false);
  const sessionRef = useRef<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { session_id: string | null; messages: Msg[] };
        if (saved.messages?.length) setMessages(saved.messages);
        sessionRef.current = saved.session_id;
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ session_id: sessionRef.current, messages }));
    } catch {
      /* ignore */
    }
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || sending || ended || !CRM_BASE_URL) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', content: text }]);
    setSending(true);
    try {
      const res = await fetch(`${CRM_BASE_URL}/api/public/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionRef.current, message: text, page: window.location.pathname }),
      });
      const data = await res.json().catch(() => ({}));
      if (data.session_id) sessionRef.current = data.session_id;
      const reply =
        data.reply ||
        (res.status === 400 && data.error) ||
        "I'm sorry — something went wrong. Please call (201) 225-1101 or use the Request Consultation button.";
      setMessages((m) => [...m, { role: 'assistant', content: reply }]);
      if (data.ended) setEnded(true);
    } catch {
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: "I'm sorry — I couldn't connect just now. Please try again in a moment, or call (201) 225-1101." },
      ]);
    } finally {
      setSending(false);
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  if (!CRM_BASE_URL) return null;

  return (
    <>
      {/* Launcher */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Chat with the TuLi Assistant"
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 pl-4 pr-5 py-3 rounded-full bg-tcl-dark text-white shadow-lg hover:bg-black transition-colors"
        >
          <MessageCircle size={20} className="text-tcl-gold" />
          <span className="text-sm font-medium">Questions?</span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="TuLi Assistant"
          className="fixed z-50 bottom-0 right-0 sm:bottom-5 sm:right-5 w-full sm:w-[380px] h-[85vh] sm:h-[560px] max-h-[100vh] flex flex-col bg-white sm:rounded-lg shadow-2xl border border-tcl-border overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-3 bg-tcl-dark text-white">
            <div>
              <p className="font-wordmark text-base leading-none">
                <span className="font-normal">Tu</span><span className="font-medium text-tcl-gold">Li</span>
                <span className="font-sans text-sm font-normal ml-2 opacity-90">Assistant</span>
              </p>
              <p className="text-[10px] tracking-[0.15em] uppercase text-white/60 mt-1">Automated · English / Español</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="p-1.5 rounded hover:bg-white/10">
              <X size={18} />
            </button>
          </div>

          <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-tcl-bg">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap rounded-lg ${
                    m.role === 'user' ? 'bg-tcl-gold text-white' : 'bg-white border border-tcl-border text-tcl-dark'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="px-3.5 py-2.5 text-sm rounded-lg bg-white border border-tcl-border text-tcl-gray">…</div>
              </div>
            )}
          </div>

          <div className="border-t border-tcl-border bg-white p-3">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, 1000))}
                onKeyDown={onKey}
                rows={1}
                disabled={ended}
                placeholder={ended ? 'This conversation has ended.' : 'Ask about the TuLi procedure…'}
                className="flex-1 resize-none px-3 py-2 text-sm border border-tcl-border rounded-sm focus:outline-none focus:border-tcl-gold bg-tcl-bg disabled:opacity-60 max-h-28"
              />
              <button
                type="button"
                onClick={send}
                disabled={!input.trim() || sending || ended}
                aria-label="Send"
                className="p-2.5 rounded-sm bg-tcl-gold text-white hover:bg-tcl-gold-dark transition-colors disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-[10px] text-tcl-gray mt-2 leading-snug">
              Not medical advice. Please don&apos;t share personal or health details here — use the consultation form instead.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
