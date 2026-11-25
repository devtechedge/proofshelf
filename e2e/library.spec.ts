import { expect, test } from "@playwright/test";

test("library search filters to one card and opens its source trail", async ({ page }) => {
  await page.goto("/cards");
  const search = page.getByRole("searchbox", { name: "Search claim cards" });
  await search.fill("GHK");
  await expect(page.getByRole("link", { name: /GHK-Cu \(copper tripeptide\)/ })).toBeVisible();
  await expect(page.locator('a[href^="/cards/"]')).toHaveCount(1);

  await page.getByRole("link", { name: /GHK-Cu \(copper tripeptide\)/ }).click();
  await expect(page.getByRole("heading", { name: "Source trail" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Keep the boundary." })).toBeVisible();
  await expect(page.getByText("26 November 2026", { exact: true })).toBeVisible();

  const dimensions = await page.evaluate(() => ({ width: window.innerWidth, scrollWidth: document.documentElement.scrollWidth }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.width);
});

test("method and missing-card routes explain the product boundaries", async ({ page }) => {
  await page.goto("/method");
  await expect(page.getByRole("heading", { name: "Evidence labels, not health verdicts." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Anonymous, scoped, erasable." })).toBeVisible();

  await page.goto("/cards/not-a-card");
  await expect(page.getByRole("heading", { name: "This claim is not on the shelf." })).toBeVisible();
  await expect(page.getByRole("link", { name: /Search the library/ })).toBeVisible();
});
