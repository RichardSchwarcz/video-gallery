const puppeteer = require("puppeteer");

async function scrapeTitle(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const [el] = await page.$x('//*[@id="container"]/h1/yt-formatted-string');
  const txt = await el.getProperty("textContent");
  const rawTxt = await txt.jsonValue();

  console.log({ rawTxt });

  browser.close();
}

scrapeTitle("https://www.youtube.com/watch?v=TzZ3YOUhCxo&ab_channel=AaronJack");
