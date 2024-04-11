// @vitest-environment node
import { test, expect, vi } from "vitest";
import { chromium } from "playwright-core";

test("should load the main page", async () => {
  const browser = await chromium.launch();

  const page = await browser.newPage();

  await page.goto("http://localhost:3000");

  const title = await page.title();
  expect(title).toBe("Accueil du site myContacts");

  await browser.close();
});

test("should load the login page", async () => {
  const browser = await chromium.launch();

  const page = await browser.newPage();

  await page.goto("http://localhost:3000/login");

  const emailInput = await page.$("input[type=email]");
  const passwordInput = await page.$("input[type=password]");
  const loginButton = await page.$("button[type=submit]");

  expect(emailInput).toBeTruthy();
  expect(passwordInput).toBeTruthy();
  expect(loginButton).toBeTruthy();

  await browser.close();
});

test("should login", async () => {
  const browser = await chromium.launch();

  const page = await browser.newPage();

  await page.goto("http://localhost:3000/login");

  await page.fill("input[type=email]", "testuser@example.com");
  await page.fill("input[type=password]", "password");
  await page.click("button[type=submit]");
  // expect redirect to /mycontacts
  await page.goto("http://localhost:3000/mycontacts");

  await browser.close();
});

test("should go to profile page", async () => {
  const browser = await chromium.launch();

  const page = await browser.newPage();

  await page.goto("http://localhost:3000/login");

  await page.fill("input[type=email]", "testuser@example.com");
  await page.fill("input[type=password]", "password");
  await page.click("button[type=submit]");
  // expect redirect to /profile
  await page.goto("http://localhost:3000/profile");

  await browser.close();
});
