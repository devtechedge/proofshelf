import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  { path: "/", name: "landing" },
  { path: "/play", name: "game" },
  { path: "/cards", name: "library" },
  { path: "/cards/ghk-cu-copper-tripeptide", name: "card detail" },
];

for (const route of routes) {
  test(`${route.name} has no detectable WCAG A or AA violations`, async ({ page }) => {
    await page.goto(route.path);
    if (route.path === "/play") {
      await expect(page.getByRole("button", { name: /Lock answer and reveal/ })).toBeVisible();
    }
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
