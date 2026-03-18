import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5eee4] text-[#3e2f23]">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <div className="absolute left-[-100px] top-[40px] h-[240px] w-[240px] rounded-full bg-[#ead8c2] blur-3xl" />
          <div className="absolute right-[-70px] top-[120px] h-[220px] w-[220px] rounded-full bg-[#efe1cf] blur-3xl" />
          <div className="absolute bottom-[-60px] left-[12%] h-[180px] w-[180px] rounded-full bg-[#e4cfb7] blur-3xl" />
        </div>

        <div className="mx-auto flex max-w-6xl flex-col justify-center px-6 py-10 md:px-8 md:py-14">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 inline-block rounded-full border border-[#d8c3ad] bg-[#fffaf3] px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-[#8a5a32] shadow-sm">
              Prep &amp; Portion
            </p>

            <h1 className="text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-[#2f241b] md:text-6xl">
              Simple kitchen tools for real-life cooking.
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#5f5145] md:text-lg">
              Turn recipes into grocery lists, scale servings, calculate costs,
              and make meal planning easier without the clutter.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <span className="rounded-full border border-[#e1cfbc] bg-[#f8efe4] px-4 py-2 text-sm font-medium text-[#6f4a2f]">
                Grocery Lists
              </span>
              <span className="rounded-full border border-[#e1cfbc] bg-[#f8efe4] px-4 py-2 text-sm font-medium text-[#6f4a2f]">
                Recipe Scaling
              </span>
              <span className="rounded-full border border-[#e1cfbc] bg-[#f8efe4] px-4 py-2 text-sm font-medium text-[#6f4a2f]">
                Cost Per Serving
              </span>
            </div>
          </div>

          <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-[1.25fr_0.85fr]">
            <div className="rounded-[32px] border border-[#dfcbb6] bg-[#fffaf3] p-6 shadow-[0_24px_70px_rgba(62,47,35,0.14)] md:p-8">
              <div className="mb-5 flex items-start justify-between gap-3">
                <div>
                  <p className="mb-2 inline-block rounded-full bg-[#efe1cf] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a5a32]">
                    Featured Tool
                  </p>
                  <h2 className="text-3xl font-bold text-[#2f241b]">
                    Recipe → Grocery List
                  </h2>
                </div>

                <div className="hidden rounded-2xl border border-[#eadbc9] bg-[#fcf6ee] px-4 py-3 text-right md:block">
                  <p className="text-xs uppercase tracking-[0.15em] text-[#9a7a5f]">
                    Best for
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#4a392d]">
                    Meal prep + shopping
                  </p>
                </div>
              </div>

              <p className="max-w-2xl text-base leading-7 text-[#5f5145] md:text-lg">
                Paste your ingredients and instantly turn them into a clean,
                organized grocery list for your next shopping trip.
              </p>

              <div className="mt-8 grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-[24px] border border-[#eadbc9] bg-white p-5 shadow-sm">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#8a5a32]">
                    Sample Ingredients
                  </p>

                  <div className="space-y-3 text-[15px] text-[#4b3a2d]">
                    <div className="rounded-xl bg-[#faf4ec] px-4 py-3">
                      2 chicken breasts
                    </div>
                    <div className="rounded-xl bg-[#faf4ec] px-4 py-3">1 onion</div>
                    <div className="rounded-xl bg-[#faf4ec] px-4 py-3">
                      2 cups rice
                    </div>
                    <div className="rounded-xl bg-[#faf4ec] px-4 py-3">1 cup milk</div>
                    <div className="rounded-xl bg-[#faf4ec] px-4 py-3">1 tsp salt</div>
                  </div>
                </div>

                <div className="rounded-[24px] border border-[#eadbc9] bg-[#fcf6ee] p-5 shadow-sm">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#8a5a32]">
                    Organized Output
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2 text-sm font-bold text-[#6f4a2f]">
                        Produce
                      </h3>
                      <div className="rounded-xl bg-white px-4 py-3 text-[15px] text-[#4b3a2d] shadow-sm">
                        1 onion
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-2 text-sm font-bold text-[#6f4a2f]">
                        Meat &amp; Seafood
                      </h3>
                      <div className="rounded-xl bg-white px-4 py-3 text-[15px] text-[#4b3a2d] shadow-sm">
                        2 chicken breasts
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-2 text-sm font-bold text-[#6f4a2f]">
                        Dairy &amp; Eggs
                      </h3>
                      <div className="rounded-xl bg-white px-4 py-3 text-[15px] text-[#4b3a2d] shadow-sm">
                        1 cup milk
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-2 text-sm font-bold text-[#6f4a2f]">
                        Pantry
                      </h3>
                      <div className="space-y-2">
                        <div className="rounded-xl bg-white px-4 py-3 text-[15px] text-[#4b3a2d] shadow-sm">
                          2 cups rice
                        </div>
                        <div className="rounded-xl bg-white px-4 py-3 text-[15px] text-[#4b3a2d] shadow-sm">
                          1 tsp salt
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/recipe-to-grocery-list"
                  className="inline-flex items-center rounded-2xl bg-[#8b5e3c] px-7 py-3.5 text-base font-semibold text-white shadow-[0_12px_28px_rgba(139,94,60,0.28)] transition hover:bg-[#744b2d]"
                >
                  Open Tool
                </Link>

                <p className="text-sm text-[#7a6858]">
                  Fast, simple, and built for real grocery runs.
                </p>
              </div>
            </div>

            <div className="rounded-[32px] border border-[#e5d4c2] bg-[#fcf6ee] p-6 shadow-[0_18px_50px_rgba(62,47,35,0.09)] md:p-8">
              <div className="mb-6">
                <p className="mb-2 inline-block rounded-full bg-[#efe1cf] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a5a32]">
                  Coming Soon
                </p>
                <h2 className="text-3xl font-bold text-[#2f241b]">
                  More kitchen helpers
                </h2>
                <p className="mt-3 text-base leading-7 text-[#5f5145]">
                  Prep &amp; Portion is growing into a full kitchen utility hub.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  "Recipe Cost Calculator",
                  "Recipe Scaler",
                  "Ingredient Converter",
                  "What’s In My Fridge?",
                ].map((tool) => (
                  <div
                    key={tool}
                    className="flex items-center justify-between rounded-2xl border border-[#eadbc9] bg-white px-4 py-4"
                  >
                    <span className="font-medium text-[#3f3127]">{tool}</span>
                    <span className="rounded-full bg-[#f5eadc] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#8a5a32]">
                      Planned
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-dashed border-[#dbc7b0] bg-[#fffaf3] p-4">
                <p className="text-sm leading-6 text-[#6c5a4b]">
                  One clean tool at a time. No clutter. No bloated meal-planning app.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}