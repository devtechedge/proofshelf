import { expect, test } from "@playwright/test";

const verdictLabels = {
  supported: "Well supported",
  mixed: "Mixed evidence",
  preliminary: "Early evidence",
  unsupported: "Not supported",
} as const;

test("daily round saves authoritative score and survives reload", async ({ page, request }) => {
  test.setTimeout(90_000);
  const roundResponse = await request.get("/api/round?mode=daily");
  expect(roundResponse.ok()).toBe(true);
  const round = (await roundResponse.json()) as { mode: "daily"; seed: string; cards: Array<{ id: string }> };
  expect(round.cards).toHaveLength(5);
  await page.goto("/play");
  await expect(page.getByRole("button", { name: /Lock answer and reveal/ })).toBeVisible();

  const answers: Array<{ cardId: string; selectedVerdict: keyof typeof verdictLabels; confidence: 3 }> = [];
  for (const [index, card] of round.cards.entries()) {
    const detailResponse = await request.get(`/api/cards/${card.id}`);
    expect(detailResponse.ok()).toBe(true);
    const detail = (await detailResponse.json()) as { card: { verdict: keyof typeof verdictLabels } };
    const verdict = detail.card.verdict;
    answers.push({ cardId: card.id, selectedVerdict: verdict, confidence: 3 });

    await page.getByRole("button", { name: new RegExp(`^${verdictLabels[verdict]}`) }).click();
    await page.getByRole("button", { name: /^Certain/ }).click();
    await page.getByRole("button", { name: /Lock answer and reveal/ }).click();
    await expect(page.getByText(/The evidence verdict is/i)).toBeVisible();
    await page.getByRole("button", { name: index === 4 ? /Finish and save round/ : /Next claim/ }).click();
  }

  await expect(page.getByRole("heading", { name: "Here is your read." })).toBeVisible();
  await expect(page.getByText("500", { exact: true })).toBeVisible();
  await expect(page.getByText("5 practiced", { exact: true })).toBeVisible();

  const replay = await page.request.post("/api/rounds", { data: { mode: round.mode, seed: round.seed, answers } });
  expect(replay.status()).toBe(409);

  await page.reload();
  await expect(page.getByText("5 practiced", { exact: true })).toBeVisible();
  await page.goto("/play?mode=review");
  await expect(page.getByRole("heading", { name: "Review what tripped you up." })).toBeVisible();
  await expect(page.locator("article h2")).toBeVisible();
});
