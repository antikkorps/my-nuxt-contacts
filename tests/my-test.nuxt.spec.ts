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

test("should add a new contact", async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3000/login");

  await page.waitForSelector("input[type=email]");
  await page.waitForSelector("input[type=password]");

  await page.fill("input[type=email]", "testuser@example.com");
  await page.fill("input[type=password]", "password");

  await page.click("button[type=submit]");
  await page.screenshot({ path: "screenshot.png", fullPage: true });
  // expect redirect to /mycontacts
  await page.goto("http://localhost:3000/mycontacts");

  await page.goto("http://localhost:3000/add-contact");

  await page.waitForSelector("#firstName");
  await page.waitForSelector("#lastName");
  await page.waitForSelector("#email");

  await page.fill("#firstName", "John");
  await page.fill("#lastName", "Zetest");
  await page.fill("#email", "john.zetest@test.com");

  await page.click('button[type="submit"]');

  await browser.close();
});

test("should delete a contact", async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3000/login");

  await page.waitForSelector("input[type=email]");
  await page.waitForSelector("input[type=password]");

  await page.fill("input[type=email]", "testuser@example.com");
  await page.fill("input[type=password]", "password");

  await page.click("button[type=submit]");

  await page.goto("http://localhost:3000/mycontacts");

  // select the card with text John Zetest

  const cards = await page.$$(".card");
  for (let card of cards) {
    await card.waitForSelector(".card-body .card-title");
    const title = await card.$eval(
      ".card-body .card-title",
      (el) => el.textContent,
    );
    if (title === "John Zetest") {
      const deleteButton = await card.$("> .deleteButton");
      if (deleteButton) {
        await deleteButton.waitForElementState("visible");
        await deleteButton.click();
        break;
      }
    }
  }

  // Check that the contact is deleted
  const deletedCards = await page.$$(".card");
  for (let card of deletedCards) {
    const title = await card.$eval(".card-title", (el) => el.textContent);
    if (title === "John Zetest") {
      throw new Error("Contact was not deleted");
    }
  }
  await browser.close();
});
