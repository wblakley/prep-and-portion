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

Rules:
- Keep meals simple and family-friendly
- No fancy chef wording
- Make them realistic for a weeknight
- Use 3 to 6 ingredients per meal when possible
- Use 3 to 5 short steps per meal
- Return only the requested structured data
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
            role: "system",
            content:
              "You are a meal generator that returns structured recipe data only.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "dinner_meals",
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                meals: {
                  type: "array",
                  minItems: 3,
                  maxItems: 3,
                  items: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                      title: { type: "string" },
                      cookTime: { type: "string" },
                      description: { type: "string" },
                      ingredients: {
                        type: "array",
                        items: { type: "string" },
                      },
                      steps: {
                        type: "array",
                        items: { type: "string" },
                      },
                    },
                    required: [
                      "title",
                      "cookTime",
                      "description",
                      "ingredients",
                      "steps",
                    ],
                  },
                },
              },
              required: ["meals"],
            },
          },
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI API error:", data);
      return NextResponse.json(
        { error: "AI request failed. Please try again." },
        { status: 500 }
      );
    }

    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
      console.error("No content returned from OpenAI:", data);
      return NextResponse.json(
        { error: "No response from AI." },
        { status: 500 }
      );
    }

    let parsed;

    try {
      parsed = JSON.parse(content);
    } catch (error) {
      console.error("Invalid JSON from AI:", content, error);
      return NextResponse.json(
        { error: "Hmm... something went wrong. Please try again." },
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