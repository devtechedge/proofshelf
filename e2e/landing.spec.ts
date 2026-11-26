import { expect, test } from "@playwright/test";

test("landing demo is playable by keyboard and finishes at 3/3", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("The claim is easy.");
  await page.getByRole("heading", { name: "Three claims. No sign-up." }).scrollIntoViewIfNeeded();
  await expect(page.getByRole("button", { name: /Reveal the evidence/ })).toBeDisabled();
  await page.getByRole("button", { name: "Switch to dark mode" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

  await page.keyboard.press("1");
  await expect(page.getByRole("button", { name: /Reveal the evidence/ })).toBeEnabled();
  await page.keyboard.press("Enter");
  await expect(page.getByText(/correct read/i)).toBeVisible();
  await expect(page.getByRole("heading", { name: "SOURCES" })).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: /Collagen peptides improve skin elasticity/ })).toBeVisible();

  await page.keyboard.press("3");
  await expect(page.getByRole("button", { name: /Reveal the evidence/ })).toBeEnabled();
  await page.keyboard.press("Enter");
  await expect(page.getByText(/correct read/i)).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: /BCAAs build more muscle/ })).toBeVisible();

  await page.keyboard.press("4");
  await expect(page.getByRole("button", { name: /Reveal the evidence/ })).toBeEnabled();
  await page.keyboard.press("Enter");
  await expect(page.getByText(/correct read/i)).toBeVisible();
  await page.keyboard.press("Enter");

  await expect(page.getByRole("heading", { name: "You just tested three claims." })).toBeVisible();
  await expect(page.getByText("3/3", { exact: true })).toBeVisible();
  expect(consoleErrors).toEqual([]);

  const dimensions = await page.evaluate(() => ({ width: window.innerWidth, scrollWidth: document.documentElement.scrollWidth }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.width);
});

test("theme choice persists across reloads", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to dark mode" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});
