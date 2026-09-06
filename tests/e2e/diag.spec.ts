import { test } from '@playwright/test';

test('diag: dump public news content from live test site', async ({ browser }) => {
  const context = await browser.newContext({ baseURL: 'https://test.libertyrunningclub.com' });
  const page = await context.newPage();
  const resp = await page.goto('/news');
  console.log('NEWS URL:', page.url(), 'STATUS:', resp && resp.status());
  const body = await page.locator('body').innerText();
  console.log('NEWS BODY START:', body.slice(0, 700).replace(/\n/g, ' | '));
  await context.close();
});
