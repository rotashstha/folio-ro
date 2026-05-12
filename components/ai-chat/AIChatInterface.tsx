"use client";

import { useState } from "react";

export interface AIChatInterfaceProps {
  heading?: string;
  subhead?: string;
  placeholder?: string;
  disclaimer?: string;
}

const SUGGESTED = [
  "How do you approach design systems?",
  "What's your take on AI in design?",
  "How do you align design with business goals?",
];

export function AIChatInterface({
  heading = "Pick my brain!",
  subhead = "Ask anything about product, design, or vibe coding. You'll get an instant answer based on my notes, talks, and real work.",
  placeholder = "Ask me about product strategy, interaction design, UX or AI workflows",
  disclaimer = "AI powered answers, trained on my knowledge base. It can be wrong sometimes.",
}: AIChatInterfaceProps) {
  const [draft, setDraft] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(question: string) {
    const q = question.trim();
    if (!q || loading) return;

    setLoading(true);
    setAnswer(null);

    try {
      const res = await fetch("/api/brain", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json() as { answer: string };
      setAnswer(data.answer);
      setDraft("");
    } catch {
      setAnswer("Something went wrong — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="ai"
      data-theme="light"
      aria-label="Pick my brain — AI chat"
      className="bg-paper text-ink pt-16 pb-24 md:pt-20 md:pb-[140px]"
    >
      <div className="mx-auto flex w-full max-w-[1035px] flex-col items-center gap-5 px-6 text-center">
        <h2 className="font-sans text-3xl font-semibold md:text-[32px]">
          {heading}
        </h2>
        <p className="font-sans max-w-[881px] text-lg md:text-[24px] md:leading-normal">
          {subhead}
        </p>

        {/* Static gradient pill border — purple → magenta, mirrors the
            portfolio's accent ramp. A 2px painted wrapper sits behind the
            white form; the inner form's rounded-full mask leaves only the
            edge visible as the gradient ring. */}
        <div
          className="relative mt-4 w-full max-w-[798px] rounded-full p-[2px]"
          style={{
            background:
              "linear-gradient(90deg, #8615cc 0%, #c80aa7 100%)",
          }}
        >
          <form
            aria-label="Ask a question"
            className="relative flex items-center rounded-full bg-white py-[10px] pr-[10px] pl-[24px]"
            onSubmit={(e) => {
              e.preventDefault();
              submit(draft);
            }}
          >
            <label htmlFor="ai-chat-input" className="sr-only">
              Your question
            </label>
            <input
              id="ai-chat-input"
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={placeholder}
              disabled={loading}
              className="w-full bg-transparent font-sans text-sm tracking-[-0.01em] text-ink outline-none placeholder:text-[#8e8e93] disabled:opacity-60 md:text-[14px]"
            />
            <button
              type="submit"
              disabled={loading || !draft.trim()}
              className="ml-3 shrink-0 rounded-full bg-[#8615cc] px-5 py-3 text-xs font-bold tracking-wide text-white transition-colors hover:bg-[#6e10a8] disabled:cursor-not-allowed disabled:bg-[#d1d7e3]"
            >
              {loading ? "Thinking…" : "Send"}
            </button>
          </form>
        </div>

        {/* Suggested questions */}
        {!answer && (
          <ul className="mt-1 flex flex-wrap justify-center gap-2" aria-label="Suggested questions">
            {SUGGESTED.map((q) => (
              <li key={q}>
                <button
                  type="button"
                  onClick={() => submit(q)}
                  disabled={loading}
                  className="rounded-full border border-[#d1d7e3] px-4 py-2 font-sans text-xs text-[#555] transition-colors hover:border-[#8615cc] hover:text-[#8615cc] disabled:opacity-40"
                >
                  {q}
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Answer bubble */}
        {answer && (
          <div className="mt-2 w-full max-w-[798px] rounded-2xl border border-[#e5e7eb] bg-white px-7 py-5 text-left shadow-sm">
            <p className="font-sans text-sm leading-relaxed text-ink md:text-[15px]">
              {answer}
            </p>
            <button
              type="button"
              onClick={() => setAnswer(null)}
              className="mt-4 font-sans text-xs text-[#8615cc] hover:underline"
            >
              Ask another question
            </button>
          </div>
        )}

        <p className="mt-2 max-w-[881px] font-sans text-xs text-[#d1d7e3] md:text-[14px]">
          {disclaimer}
        </p>
      </div>
    </section>
  );
}
