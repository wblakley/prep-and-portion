"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
  const resultsRef = useRef<HTMLElement | null>(null);

  const loadingMessages = [
    "Looking at what you have...",
    "Finding dinner ideas that actually sound good...",
    "Writing quick recipes...",
  ];

  const [loadingStep, setLoadingStep] = useState(0);

  useEffect(() => {
    if (!loading) {
      setLoadingStep(0);
      return;
    }

    const timers = [
      setTimeout(() => setLoadingStep(1), 2500),
      setTimeout(() => setLoadingStep(2), 5000),
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [loading]);

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

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);
    } catch (err) {
      setError("Failed to generate meals.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-orange-50 px-6 py-10 text-gray-900">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="flex flex-col items-center gap-4 rounded-2xl bg-white px-8 py-6 shadow-lg">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500"></div>

            <p className="text-sm font-medium text-gray-700">
              {loadingMessages[loadingStep]}
            </p>
          </div>
        </div>
      )}

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
            Dinner ideas in seconds
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Stop stressing about dinner.
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600 sm:text-lg">
            Type what you already have and get real meals you can actually cook
            tonight.
          </p>
        </div>

        <div className="rounded-2xl border border-orange-200 bg-white p-5 shadow-sm sm:p-6">
          <label
            htmlFor="dinner-input"
            className="mb-2 block text-sm font-medium"
          >
            What’s in your kitchen?
          </label>

          <p className="mb-3 text-sm text-gray-600">
            👇 Try it with what you already have
          </p>

          <textarea
            id="dinner-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="chicken, pasta, garlic... or easy & quick"
            className="min-h-[120px] w-full rounded-xl border border-gray-300 px-4 py-3 text-base outline-none transition focus:border-orange-400"
          />

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={generateMeals}
              disabled={loading}
              className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-orange-600 hover:shadow disabled:cursor-not-allowed disabled:opacity-60 motion-safe:animate-pulse"
            >
              {loading ? "Working on it..." : "Get Dinner Ideas 🍽️"}
            </button>

            
          </div>

          <p className="mt-3 text-sm text-gray-500">
            Takes a few seconds. No signup. Free.
          </p>

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}
        </div>

        {meals.length > 0 && (
          <section
            id="results"
            ref={resultsRef}
            className="mt-8 scroll-mt-24 grid gap-6"
          >
            <div className="rounded-2xl border border-orange-200 bg-orange-100 px-5 py-4 text-left shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">
                🍽️ Here are 3 dinner ideas you can make tonight
              </h2>
              <p className="mt-1 text-sm text-gray-700">
                Don’t like these? Tap the button again for 3 new ideas.
              </p>
            </div>

            {meals.map((meal, index) => (
              <article
                key={`${meal.title}-${index}`}
                className="rounded-2xl border border-orange-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4">
                  <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-2xl font-bold">{meal.title}</h3>
                    <span className="inline-flex w-fit rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
                      {meal.cookTime}
                    </span>
                  </div>
                  <p className="text-gray-600">{meal.description}</p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="mb-2 text-lg font-semibold">You’ll need:</h4>
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
                    <h4 className="mb-2 text-lg font-semibold">Quick steps:</h4>
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
            Kitchen Cue helps you decide what to cook based on ingredients you
            already have or the kind of meal you’re in the mood for. Whether
            you want something quick, cozy, healthy, or budget-friendly, you’ll
            get simple dinner ideas in seconds.
          </p>

          <p>
            No more standing in the kitchen wondering what to make. Just type
            what you have, and Kitchen Cue gives you real meals you can actually
            cook on a weeknight.
          </p>
        </section>
      </div>
    </main>
  );
}