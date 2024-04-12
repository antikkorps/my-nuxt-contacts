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

test("should load the add contact page", async () => {
  const browser = await chromium.launch();

  const page = await browser.newPage();

  await page.goto("http://localhost:3000/add-contact");

  const form = await page.$("form");
  expect(form).toBeTruthy();

  await browser.close();
});

//TODO CORRECT THE NEXT TEST WHICH IS FAILED
test("should add a new contact", async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const email = await page.$("input[type=email]");
  const password = await page.$("input[type=password]");
  const submit = await page.$("button[type=submit]");
  await page.goto("http://localhost:3000/login");

  await page.fill(`${email}`, "testuser@example.com");
  await page.fill(`${password}`, "password");
  await page.click(`${submit}`);
  await page.goto("http://localhost:3000/add-contact");

  await page.waitForLoadState("networkidle");
  console.log(`Current URL after login: ${page.url()}`);

  await page.goto("http://localhost:3000/add-contact");
  await page.fill("#firstName", "John");
  await page.fill("#lastName", "Zetest");
  await page.fill("#email", "john.zetest@test.com");
  await page.click('button[type="submit"]');

  await page.goto("http://localhost:3000/mycontacts");
  await browser.close();
});
