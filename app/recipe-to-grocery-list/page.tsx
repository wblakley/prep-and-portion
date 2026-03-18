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
    .replace(/\([^)]*\)/g, "") // remove parenthetical notes
    .replace(/\b\d+([\/.]\d+)?\b/g, "") // remove numbers like 1, 2, 1/2, 1.5
    .replace(
      /\b(cup|cups|tbsp|tablespoon|tablespoons|tsp|teaspoon|teaspoons|oz|ounce|ounces|lb|lbs|pound|pounds|clove|cloves|can|cans|package|packages|pkg|pkgs|bag|bags|slice|slices|stick|sticks)\b/g,
      ""
    )
    .replace(
      /\b(diced|chopped|minced|large|small|medium|fresh|boneless|skinless|ground|shredded|grated)\b/g,
      ""
    )
    .replace(/\s+/g, " ") // collapse extra spaces
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
    <main className="min-h-screen bg-[#f5eee4] text-[#3e2f23]">
      <section className="mx-auto max-w-6xl px-6 py-10 md:px-8 md:py-14">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 inline-block rounded-full border border-[#d8c3ad] bg-[#fffaf3] px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-[#8a5a32] shadow-sm">
              Prep &amp; Portion
            </p>

            <h1 className="text-4xl font-bold leading-tight text-[#2f241b] md:text-5xl">
              Recipe → Grocery List
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-[#5f5145] md:text-lg">
              Paste your ingredient list below and instantly sort it into a clean,
              organized grocery list.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center rounded-2xl border border-[#d8c3ad] bg-[#fffaf3] px-5 py-3 text-sm font-semibold text-[#6f4a2f] shadow-sm transition hover:bg-[#f8efe4]"
          >
            ← Back Home
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[32px] border border-[#dfcbb6] bg-[#fffaf3] p-6 shadow-[0_24px_70px_rgba(62,47,35,0.14)] md:p-8">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-2xl font-bold text-[#2f241b]">
                Paste Ingredients
              </h2>

              <span className="rounded-full bg-[#efe1cf] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a5a32]">
                Step 1
              </span>
            </div>

            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder={`2 chicken breasts
1 onion
2 cups rice
1 cup milk
1 tsp salt
2 carrots`}
              className="min-h-[340px] w-full rounded-[24px] border border-[#e1cfbc] bg-white p-5 text-base text-[#2f241b] outline-none placeholder:text-[#9a8a7a]"
            />

            <p className="mt-4 text-sm leading-6 text-[#7a6858]">
              Put one ingredient per line for the cleanest results.
            </p>
          </div>

          <div className="rounded-[32px] border border-[#e5d4c2] bg-[#fcf6ee] p-6 shadow-[0_18px_50px_rgba(62,47,35,0.09)] md:p-8">
          <div className="mb-5 flex items-center justify-between gap-3">
  <div className="flex items-center gap-3">
    <h2 className="text-2xl font-bold text-[#2f241b]">
      Organized Grocery List
    </h2>

    <span className="rounded-full bg-[#efe1cf] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a5a32]">
      Step 2
    </span>
  </div>

  {hasItems && (
  <div className="flex gap-2">
    <button
      onClick={copyList}
      className="rounded-xl bg-[#8b5e3c] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#744b2d]"
    >
      {copied ? "Copied!" : "Copy List"}
    </button>

    <button
      onClick={() => setIngredients("")}
      className="rounded-xl border border-[#d8c3ad] bg-white px-4 py-2 text-sm font-semibold text-[#6f4a2f] hover:bg-[#f5eee4]"
    >
      Clear Ingredients
    </button>
  </div>
)}
</div>

            {!hasItems ? (
              <div className="rounded-[24px] border border-dashed border-[#dbc7b0] bg-[#fffaf3] p-6 text-[#6c5a4b]">
                Your organized grocery list will appear here once you paste ingredients.
              </div>
            ) : (
              <div className="space-y-5">
                {Object.entries(groupedList).map(([category, items]) =>
                  items.length > 0 ? (
                    <div key={category}>
                      <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.14em] text-[#8a5a32]">
                        {category}
                      </h3>

                      <div className="space-y-2">
                        {items.map((item, index) => (
                          <label
                          key={`${category}-${index}`}
                          className="flex items-center gap-3 rounded-2xl border border-[#eadbc9] bg-white px-4 py-3 text-[15px] text-[#4b3a2d] shadow-sm"
                        >
                          <input
                            type="checkbox"
                            className="h-4 w-4 accent-[#8b5e3c]"
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
      </section>
    </main>
  );
}