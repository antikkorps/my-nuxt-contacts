// @vitest-environment node
import { test, expect } from "vitest";
import { chromium } from "playwright-core";

test("should load the main page", async () => {
  const browser = await chromium.launch();

  const page = await browser.newPage();

  await page.goto("http://localhost:3000");

  const title = await page.title();
  expect(title).toBe("Accueil du site myContacts");

  await browser.close();
});
