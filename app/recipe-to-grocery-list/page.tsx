"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const categoryMap: Record<string, string> = {
  /* ---------- PRODUCE ---------- */
  apple: "Produce",
  apples: "Produce",
  banana: "Produce",
  bananas: "Produce",
  onion: "Produce",
  onions: "Produce",
  garlic: "Produce",
  lettuce: "Produce",
  spinach: "Produce",
  kale: "Produce",
  tomato: "Produce",
  tomatoes: "Produce",
  potato: "Produce",
  potatoes: "Produce",
  carrot: "Produce",
  carrots: "Produce",
  celery: "Produce",
  broccoli: "Produce",
  cauliflower: "Produce",
  cucumber: "Produce",
  zucchini: "Produce",
  "bell pepper": "Produce",
  "green pepper": "Produce",
  "red pepper": "Produce",
  "yellow pepper": "Produce",
  "orange pepper": "Produce",
  "purple pepper": "Produce",
  "pink pepper": "Produce",
  "brown pepper": "Produce",
  "black pepper": "Produce",
  "white pepper": "Produce",
  avocado: "Produce",
  avocados: "Produce",
  lime: "Produce",
  lemon: "Produce",
  lemons: "Produce",
  strawberry: "Produce",
  strawberries: "Produce",
  blueberry: "Produce",
  blueberries: "Produce",
  mushroom: "Produce",
  mushrooms: "Produce",
  corn: "Produce",
  cabbage: "Produce",

  /* ---------- MEAT & SEAFOOD ---------- */
  chicken: "Meat & Seafood",
  beef: "Meat & Seafood",
  pork: "Meat & Seafood",
  bacon: "Meat & Seafood",
  sausage: "Meat & Seafood",
  salmon: "Meat & Seafood",
  shrimp: "Meat & Seafood",
  turkey: "Meat & Seafood",
  steak: "Meat & Seafood",
  hamburger: "Meat & Seafood",
  bologna: "Meat & Seafood",
  ham: "Meat & Seafood",
  tuna: "Meat & Seafood",
  fish: "Meat & Seafood",
  "ground beef": "Meat & Seafood",
  "ground turkey": "Meat & Seafood",
  "chicken breast": "Meat & Seafood",
  "chicken thighs": "Meat & Seafood",
  ribs: "Meat & Seafood",
  brisket: "Meat & Seafood",
  tilapia: "Meat & Seafood",

  /* ---------- DAIRY & EGGS ---------- */
  milk: "Dairy & Eggs",
  butter: "Dairy & Eggs",
  cheese: "Dairy & Eggs",
  cream: "Dairy & Eggs",
  yogurt: "Dairy & Eggs",
  egg: "Dairy & Eggs",
  eggs: "Dairy & Eggs",
  "half and half": "Dairy & Eggs",
  "heavy cream": "Dairy & Eggs",
  "sour cream": "Dairy & Eggs",
  mozzarella: "Dairy & Eggs",
  cheddar: "Dairy & Eggs",
  parmesan: "Dairy & Eggs",
  feta: "Dairy & Eggs",
  ricotta: "Dairy & Eggs",

  /* ---------- PANTRY ---------- */
  flour: "Pantry",
  sugar: "Pantry",
  salt: "Pantry",
  pepper: "Pantry",
  rice: "Pantry",
  pasta: "Pantry",
  noodles: "Pantry",
  "olive oil": "Pantry",
  vinegar: "Pantry",
  "chicken broth": "Pantry",
  "beef broth": "Pantry",
  "vegetable broth": "Pantry",
  "mushroom broth": "Pantry",
  beans: "Pantry",
  lentils: "Pantry",
  quinoa: "Pantry",
  oats: "Pantry",
  oatmeal: "Pantry",
  cereal: "Pantry",
  jello: "Pantry",
  syrup: "Pantry",
  honey: "Pantry",
  "peanut butter": "Pantry",
  "grape jelly": "Pantry",
  jam: "Pantry",
  mustard: "Pantry",
  ketchup: "Pantry",
  mayo: "Pantry",
  mayonnaise: "Pantry",
  "hot sauce": "Pantry",
  "soy sauce": "Pantry",
  seasoning: "Pantry",
  spice: "Pantry",
  "tortilla chips": "Pantry",

  /* ---------- BAKERY ---------- */
  bread: "Bakery",
  buns: "Bakery",
  bagel: "Bakery",
  bagels: "Bakery",
  pita: "Bakery",
  croissant: "Bakery",

  /* ---------- SNACKS ---------- */
  cookies: "Snacks",
  chips: "Snacks",
  crackers: "Snacks",
  pretzels: "Snacks",
  popcorn: "Snacks",
  chocolate: "Snacks",
  candy: "Snacks",
  granola: "Snacks",
  bar: "Snacks",

  /* ---------- FROZEN ---------- */
  "ice cream": "Frozen",
  frozen: "Frozen",
  pizza: "Frozen",
  nuggets: "Frozen",

  /* ---------- PET ---------- */
  "dog food": "Pet",
  "cat food": "Pet",
  litter: "Pet",
};

type GroceryGroups = Record<string, string[]>;

function cleanIngredient(line: string) {
  return line
    .toLowerCase()
    .replace(/\([^)]*\)/g, "")
    .replace(/\b\d+([\/.]\d+)?\b/g, "")
    .replace(
      /\b(cup|cups|tbsp|tablespoon|tablespoons|tsp|teaspoon|teaspoons|oz|ounce|ounces|lb|lbs|pound|pounds|clove|cloves|can|cans|package|packages|pkg|pkgs|bag|bags|slice|slices|stick|sticks)\b/g,
      ""
    )
    .replace(
      /\b(diced|chopped|minced|large|small|medium|fresh|boneless|skinless|ground|shredded|grated)\b/g,
      ""
    )
    .replace(/\s+/g, " ")
    .trim();
}

export default function RecipeToGroceryListPage() {
  const [ingredients, setIngredients] = useState("");
  const [copied, setCopied] = useState(false);

  const groupedList = useMemo(() => {
    const lines = ingredients
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const groups: GroceryGroups = {
      Produce: [],
      "Meat & Seafood": [],
      "Dairy & Eggs": [],
      Pantry: [],
      Bakery: [],
      Snacks: [],
      Pet: [],
      Other: [],
      Frozen: [],
    };

    lines.forEach((line) => {
      const cleanedLine = cleanIngredient(line);
      let matchedCategory = "Other";

      for (const key in categoryMap) {
        if (cleanedLine.includes(key)) {
          matchedCategory = categoryMap[key];
          break;
        }
      }

      groups[matchedCategory].push(cleanedLine || line);
    });

    return groups;
  }, [ingredients]);

  const hasItems = Object.values(groupedList).some((items) => items.length > 0);

  const copyList = () => {
    let text = "";

    Object.entries(groupedList).forEach(([category, items]) => {
      if (items.length > 0) {
        text += category.toUpperCase() + "\n";
        items.forEach((item) => {
          text += "☐ " + item + "\n";
        });
        text += "\n";
      }
    });

    navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-orange-50 px-6 py-10 text-gray-900">
      <section className="mx-auto max-w-6xl">
        <nav className="mb-8 flex flex-col gap-4 rounded-2xl border border-orange-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="text-lg font-bold text-gray-900">Kitchen Cue</div>

          <div className="flex flex-wrap gap-3 text-sm font-medium">
            <Link
              href="/"
              className="rounded-full border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50"
            >
              Dinner Ideas
            </Link>

            <Link
              href="/recipe-to-grocery-list"
              className="rounded-full bg-orange-100 px-4 py-2 text-orange-700 transition hover:bg-orange-200"
            >
              Grocery List Tool
            </Link>
          </div>
        </nav>

        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
            Grocery list in seconds
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Recipe to Grocery List
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600 sm:text-lg">
            Paste your ingredient list and instantly sort it into a clean,
            organized grocery list you can actually use at the store.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-orange-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-2xl font-bold text-gray-900">
                Paste Ingredients
              </h2>

              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-orange-700">
                Step 1
              </span>
            </div>

            <textarea
              value={ingredients}
              onChange={async (e) => {
                setIngredients(e.target.value);
              
                await fetch('/api/track', {
                  method: 'POST',
                  body: JSON.stringify({
                    event: 'grocery_input_used',
                    page: 'recipe_to_grocery'
                  }),
                });
              }}
              placeholder={`2 chicken breasts
1 onion
2 cups rice
1 cup milk
1 tsp salt
2 carrots`}
              className="min-h-[340px] w-full rounded-xl border border-gray-300 bg-white p-5 text-base text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-400"
            />

            <p className="mt-4 text-sm text-gray-600">
              Put one ingredient per line for the cleanest results.
            </p>
          </div>

          <div className="rounded-2xl border border-orange-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-gray-900">
                  Organized Grocery List
                </h2>

                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-orange-700">
                  Step 2
                </span>
              </div>

              {hasItems && (
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={copyList}
                    className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
                  >
                    {copied ? "Copied!" : "Copy List"}
                  </button>

                  <button
                    onClick={() => setIngredients("")}
                    className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    Clear Ingredients
                  </button>
                </div>
              )}
            </div>

            {!hasItems ? (
              <div className="rounded-xl border border-dashed border-orange-200 bg-orange-50 p-6 text-gray-600">
                Your organized grocery list will appear here once you paste ingredients.
              </div>
            ) : (
              <div className="space-y-5">
                {Object.entries(groupedList).map(([category, items]) =>
                  items.length > 0 ? (
                    <div key={category}>
                      <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.14em] text-orange-700">
                        {category}
                      </h3>

                      <div className="space-y-2">
                        {items.map((item, index) => (
                          <label
                            key={`${category}-${index}`}
                            className="flex items-center gap-3 rounded-xl border border-orange-100 bg-orange-50 px-4 py-3 text-[15px] text-gray-800"
                          >
                            <input
                              type="checkbox"
                              className="h-4 w-4 accent-orange-500"
                            />
                            <span>{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            )}
          </div>
        </div>

        <section className="mx-auto mt-16 max-w-3xl space-y-4 text-gray-700">
          <h2 className="text-2xl font-bold">
            Turn Any Recipe Into a Cleaner Grocery List
          </h2>

          <p>
            Kitchen Cue helps you take a messy recipe ingredient list and organize
            it into grocery-store-friendly categories like produce, pantry, dairy,
            and meat. It saves time, cuts chaos, and makes shopping easier.
          </p>

          <p>
            Paste ingredients one per line, and your grocery list is grouped for
            you automatically. It is simple, fast, and perfect for busy weeknights,
            meal planning, and last-minute grocery runs.
          </p>
        </section>
      </section>
    </main>
  );
}