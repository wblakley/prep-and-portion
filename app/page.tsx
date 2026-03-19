"use client";

import Link from "next/link";
import { useState } from "react";

type Meal = {
  title: string;
  cookTime: string;
  description: string;
  ingredients: string[];
  steps: string[];
};

export default function HomePage() {
  const [input, setInput] = useState("");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateMeals = async () => {
    if (!input.trim()) {
      setError("Please enter ingredients or a mood.");
      return;
    }

    setLoading(true);
    setError("");
    setMeals([]);

    try {
      const res = await fetch("/api/dinner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      if (!data.meals || !Array.isArray(data.meals)) {
        setError("No meals were returned.");
        return;
      }

      setMeals(data.meals);
    } catch (err) {
      setError("Failed to generate meals.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-orange-50 px-6 py-10 text-gray-900">
      <div className="mx-auto max-w-4xl">
      <nav className="mb-8 flex flex-col gap-4 rounded-2xl border border-orange-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
  <div className="text-lg font-bold text-gray-900">Kitchen Cue</div>

  <div className="flex flex-wrap gap-3 text-sm font-medium">
    <Link
      href="/"
      className="rounded-full bg-orange-100 px-4 py-2 text-orange-700 transition hover:bg-orange-200"
    >
      Dinner Ideas
    </Link>

    <Link
      href="/recipe-to-grocery-list"
      className="rounded-full border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50"
    >
      Grocery List Tool
    </Link>
  </div>
</nav>
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
            Dinner Ideas In Seconds
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            What’s for dinner tonight?
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600 sm:text-lg">
            Enter a few ingredients or a mood like easy, cozy, quick, or healthy.
            Get simple dinner ideas you can actually make on a weeknight.
          </p>
        </div>

        <div className="rounded-2xl border border-orange-200 bg-white p-5 shadow-sm sm:p-6">
          <label htmlFor="dinner-input" className="mb-2 block text-sm font-medium">
            Ingredients or mood
          </label>

          <textarea
            id="dinner-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Example: chicken, broccoli, rice OR easy comfort food, soul food, quick, healthy, etc."
            className="min-h-[120px] w-full rounded-xl border border-gray-300 px-4 py-3 text-base outline-none transition focus:border-orange-400"
          />

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={generateMeals}
              disabled={loading}
              className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Figuring out dinner..." : "Generate Meals"}
            </button>

            <button
              onClick={() => {
                setInput("");
                setMeals([]);
                setError("");
              }}
              disabled={loading}
              className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Clear
            </button>
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}
        </div>

        {meals.length > 0 && (
          <section className="mt-8 grid gap-6">
            <h2 className="mb-4 text-xl font-semibold">
              Here are a few ideas for tonight 👇
            </h2>

            {meals.map((meal, index) => (
              <article
                key={`${meal.title}-${index}`}
                className="rounded-2xl border border-orange-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4">
                  <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-2xl font-bold">{meal.title}</h2>
                    <span className="inline-flex w-fit rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
                      {meal.cookTime}
                    </span>
                  </div>
                  <p className="text-gray-600">{meal.description}</p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">You’ll need:</h3>
                    <ul className="space-y-2 text-gray-700">
                      {meal.ingredients.map((ingredient, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="mt-[2px] text-orange-500">•</span>
                          <span>{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-semibold">Quick steps:</h3>
                    <ol className="space-y-2 text-gray-700">
                      {meal.steps.map((step, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="font-semibold text-orange-600">
                            {i + 1}.
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}

        <section className="mx-auto mt-16 max-w-3xl space-y-4 text-gray-700">
          <h2 className="text-2xl font-bold">
            Easy Dinner Ideas Without the Stress
          </h2>

          <p>
            Kitchen Cue helps you decide what to cook based on ingredients you already
            have or the kind of meal you’re in the mood for. Whether you want something
            quick, cozy, healthy, or budget-friendly, you’ll get simple dinner ideas in seconds.
          </p>

          <p>
            No more standing in the kitchen wondering what to make. Just type what you
            have, and Kitchen Cue gives you real meals you can actually cook on a weeknight.
          </p>
        </section>
      </div>
    </main>
  );
}