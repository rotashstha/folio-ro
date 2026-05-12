import { NextRequest, NextResponse } from "next/server";
import { BRAIN_SYSTEM_PROMPT } from "@/lib/brain-prompt";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  let question: string;
  try {
    const body = await req.json();
    question = (body.question ?? "").trim();
  } catch {
    return NextResponse.json({ answer: "Invalid request." }, { status: 400 });
  }

  if (!question) {
    return NextResponse.json({ answer: "Please ask a question!" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { answer: "AI isn't configured yet — check back soon." },
      { status: 503 }
    );
  }

  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 280,
        system: BRAIN_SYSTEM_PROMPT,
        messages: [{ role: "user", content: question }],
      }),
    });

    const data = await upstream.json() as {
      content?: Array<{ text: string }>;
      error?: { message: string };
    };

    if (!upstream.ok) {
      console.error("Anthropic error:", data.error?.message);
      throw new Error("upstream_error");
    }

    const answer = data.content?.[0]?.text ?? "Sorry, I couldn't answer that right now.";
    return NextResponse.json({ answer });
  } catch {
    return NextResponse.json(
      { answer: "Something went wrong on my end — try asking again!" },
      { status: 500 }
    );
  }
}
