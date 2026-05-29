const { chromium } = require('playwright');

(async () => {
  const url = 'http://localhost:3001/?print-pdf';
  const out = __dirname + '/../brand-relaunch-deck.pdf';

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  // Let reveal lay out slides + fonts/images settle.
  await page.waitForTimeout(2500);

  await page.pdf({
    path: out,
    width: '1600px',
    height: '1000px',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize: true,
  });

  await browser.close();
  console.log('PDF written to', out);
})();
