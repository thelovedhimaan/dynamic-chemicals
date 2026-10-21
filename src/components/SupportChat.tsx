"use client";

import { FormEvent, useState } from "react";

type ChatMessage = { role: "assistant" | "user"; text: string };

export function SupportChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", text: "Hi, I can help with products, custom orders, pricing steps, or order status." }]);
  async function submit(event: FormEvent) {
    event.preventDefault(); const message = input.trim(); if (!message || busy) return;
    setMessages((items) => [...items, { role: "user", text: message }]); setInput(""); setBusy(true);
    try { const response = await fetch("/api/support", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message }) }); const data = await response.json(); setMessages((items) => [...items, { role: "assistant", text: data.reply || data.error || "Support is temporarily unavailable." }]); }
    catch { setMessages((items) => [...items, { role: "assistant", text: "Support is temporarily unavailable. Please use the contact details below." }]); }
    finally { setBusy(false); }
  }
  return <div className={`support ${open ? "open" : ""}`}><button className="support-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Open customer support">{open ? "×" : "Support"}</button>{open && <section className="support-panel" aria-label="Customer support"><header><div><strong>Customer support</strong><small>Products and order status</small></div><span className="online-dot">Online</span></header><div className="chat-messages" aria-live="polite">{messages.map((message, index) => <p className={message.role} key={index}>{message.text}</p>)}{busy && <p className="assistant typing">Checking…</p>}</div><form onSubmit={submit}><label className="sr-only" htmlFor="support-message">Message</label><input id="support-message" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask or enter order ID" /><button type="submit" disabled={busy}>Send</button></form><small className="support-note">Technical and safety advice is reviewed by a person.</small></section>}</div>;
}
