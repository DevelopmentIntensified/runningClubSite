import { test } from '@playwright/test';

test('diag: inspect session handling on live test site', async ({ page }) => {
  const context = page.context();
  const cookies = await context.cookies('https://test.libertyrunningclub.com');
  console.log('COOKIES BEFORE:', JSON.stringify(cookies));

  const resp = await page.goto('https://test.libertyrunningclub.com/admin/alumni/new');
  console.log('FINAL URL:', page.url());
  console.log('STATUS:', resp && resp.status());

  const cookies2 = await context.cookies('https://test.libertyrunningclub.com');
  console.log('COOKIES AFTER:', JSON.stringify(cookies2));

  const body = await page.locator('body').innerText();
  console.log('BODY SAMPLE:', body.slice(0, 300).replace(/\n/g, ' | '));
});
