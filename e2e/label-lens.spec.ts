import { expect, test } from "@playwright/test";
import { CATALOG } from "../src/data/catalog";
import { buildLabelLensRound } from "../src/domain/label-lens";
import { dailySeed } from "../src/domain/game";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("Label Lens completes five sourced label matches", async ({ page }) => {
  const questions = buildLabelLensRound(CATALOG, dailySeed(), 5);
  await page.goto("/label-lens");
  await expect(page.getByRole("heading", { name: "Label Lens." })).toBeVisible();

  for (const [index, question] of questions.entries()) {
    await page.getByRole("button", { name: new RegExp(escapeRegExp(question.correctOption)) }).click();
    await page.getByRole("button", { name: /Check the label/ }).click();
    await expect(page.getByText("Correct match", { exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Open the full evidence card" })).toBeVisible();
    await page.getByRole("button", { name: index === questions.length - 1 ? /See result/ : /Next label/ }).click();
  }

  await expect(page.getByRole("heading", { name: "You read past the front label." })).toBeVisible();
  await expect(page.getByText("5/5", { exact: true })).toBeVisible();
});
