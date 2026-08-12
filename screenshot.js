const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: '/tmp/index-screenshot.png', fullPage: true });
  console.log('Screenshot saved to /tmp/index-screenshot.png');
  await browser.close();
})();
