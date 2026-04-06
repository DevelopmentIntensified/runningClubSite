import { test, expect } from '@playwright/test';
import * as db from '../support/db';

test.describe('Admin Pages - Full Functionality with Auth', () => {
  test.describe('Leaders CRUD', () => {
    let testLeaderId: number;

    test('should view leaders list as admin', async ({ page }) => {
      await page.goto('/admin/leaders');
      await expect(page.locator('body')).toBeVisible();
    });

    test('should create leader as admin', async ({ page }) => {
      await page.goto('/admin/leaders/new');
      await page.waitForSelector('input#name', { timeout: 15000 });
      
      await page.locator('input#name').fill('Test Leader');
      await page.locator('input#position').fill('Test Position');
      await page.locator('textarea#bio').fill('Test bio');
      
      await page.click('button:has-text("Add Leader")');
      await page.waitForURL(/\/admin\/leaders/, { timeout: 10000 });
      
      const leaders = await db.query(`SELECT * FROM leaders WHERE name = $1`, ['Test Leader']);
      expect(leaders.rows.length).toBe(1);
      testLeaderId = leaders.rows[0].id;
    });

    test.afterEach(async () => {
      if (testLeaderId) {
        await db.deleteTestLeader(testLeaderId);
        testLeaderId = 0;
      }
    });

    test('should edit leader as admin', async ({ page }) => {
      const leader = await db.createTestLeader('Leader to Edit');
      testLeaderId = leader.id;
      
      await page.goto(`/admin/leaders/${leader.id}/edit`);
      await page.waitForSelector('input#name', { timeout: 15000 });
      
      await page.locator('input#name').fill('Updated Leader');
      
      await page.click('button:has-text("Update Leader")');
      await page.waitForURL(/\/admin\/leaders/, { timeout: 10000 });

      const updated = await db.getLeaderById(leader.id);
      expect(updated.name).toBe('Updated Leader');
    });
  });

  test.describe('News CRUD', () => {
    test('should view news list as admin', async ({ page }) => {
      await page.goto('/admin/news');
      await expect(page.locator('body')).toBeVisible();
    });

    test('should create news as admin', async ({ page }) => {
      await page.goto('/admin/news/new');
      await page.waitForSelector('input#title', { timeout: 15000 });
      
      await page.locator('input#title').fill('Test News');
      
      const editor = page.locator('.ql-editor');
      await editor.fill('Test content');
      
      await page.click('button:has-text("Add News")');
      await page.waitForURL(/\/admin\/news/, { timeout: 10000 });
      
      const news = await db.query(`SELECT * FROM news WHERE title = $1`, ['Test News']);
      expect(news.rows.length).toBe(1);
    });
  });

  test.describe('Slideshow CRUD', () => {
    test('should view slideshow list as admin', async ({ page }) => {
      await page.goto('/admin/slideshow');
      await expect(page.locator('body')).toBeVisible();
    });

    test('should create slideshow as admin', async ({ page }) => {
      await page.goto('/admin/slideshow/new');
      await page.waitForSelector('input#title', { timeout: 15000 });
      
      await page.locator('input#title').fill('Test Slide');
      await page.locator('input#order').fill('1');
      
      await page.click('button:has-text("Add Image")');
      await page.waitForURL(/\/admin\/slideshow/, { timeout: 10000 });
      
      const slide = await db.query(`SELECT * FROM "slideShowImages" WHERE title = $1`, ['Test Slide']);
      expect(slide.rows.length).toBe(1);
    });
  });

  test.describe('Alumni CRUD', () => {
    test('should view alumni list as admin', async ({ page }) => {
      await page.goto('/admin/alumni');
      await expect(page.locator('body')).toBeVisible();
    });

    test('should create alumni as admin', async ({ page }) => {
      await page.goto('/admin/alumni/new');
      await page.waitForSelector('input#name', { timeout: 15000 });
      
      await page.locator('input#name').fill('Test Alumnus');
      await page.locator('input#major').fill('Computer Science');
      await page.locator('input#graduationYear').fill('2024');
      
      await page.click('button:has-text("Add Alumnus")');
      await page.waitForURL(/\/admin\/alumni/, { timeout: 10000 });
      
      const alumnus = await db.query(`SELECT * FROM alumni WHERE name = $1`, ['Test Alumnus']);
      expect(alumnus.rows.length).toBe(1);
    });
  });

  test.describe('Page Images CRUD', () => {
    test('should view page images list as admin', async ({ page }) => {
      await page.goto('/admin/page-images');
      await expect(page.locator('body')).toBeVisible();
    });

    test('should create page image as admin', async ({ page }) => {
      await page.goto('/admin/page-images/new');
      await page.waitForSelector('select#locationName', { timeout: 15000 });
      
      await page.locator('select#locationName').selectOption('About');
      await page.locator('input#alt').fill('Test alt');
      
      await page.click('button:has-text("Upload Image")');
      await page.waitForURL(/\/admin\/page-images/, { timeout: 10000 });
      
      const pageImg = await db.query(`SELECT * FROM "pageImages" WHERE "locationName" = $1`, ['About']);
      expect(pageImg.rows.length).toBe(1);
    });
  });
});