import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { input } = await req.json();

    if (!input || typeof input !== "string") {
      return NextResponse.json(
        { error: "Input is required." },
        { status: 400 }
      );
    }

    const prompt = `
You are a helpful home cook assistant.

The user will give either:
- a few ingredients
- or a mood like easy, cozy, healthy, quick

User input: "${input}"

Generate exactly 3 realistic dinner ideas.

Return them as JSON in this format:
{
  "meals": [
    {
      "title": "Meal name",
      "cookTime": "30 minutes",
      "description": "Short, appealing one-sentence description.",
      "ingredients": ["item 1", "item 2", "item 3"],
      "steps": ["step 1", "step 2", "step 3"]
    }
  ]
}

Rules:
- Keep meals simple and family-friendly
- No fancy chef wording
- Make them realistic for a weeknight
- Use 3 to 6 ingredients per meal when possible
- Use 3 to 5 short steps per meal
- Return only valid JSON
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.8,
      }),
    });

    const data = await response.json();

    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "No response from AI." },
        { status: 500 }
      );
    }

    let parsed;

    try {
      parsed = JSON.parse(content);
    } catch {
      return NextResponse.json(
        { error: "AI returned invalid JSON.", raw: content },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Dinner API error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}