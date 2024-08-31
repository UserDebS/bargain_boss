import 'server-only';
import puppeteer, { type Browser } from 'puppeteer';

export const getProducts = async (searchParam: string) => {
    console.log('Scraping started')
    let browser: Browser;
    try {
        browser = await puppeteer.launch({
            headless: true
        });
        const page = await browser.newPage();
        page.setDefaultTimeout(10 * 1000);
        await page.goto('https://www.amazon.in');
        await page.waitForSelector('#twotabsearchtextbox');
        await page.click('#twotabsearchtextbox');
        await page.type('#twotabsearchtextbox', searchParam);
        await page.click('#nav-search-submit-button');
        await page.waitForSelector('div.s-desktop-content div.s-result-item h2.s-line-clamp-3 span', { visible: true });
        console.log('Started');
        const result = await page.evaluate(() => {
            const res = Array.from(document.querySelectorAll('div.s-desktop-content div.s-result-item')).map(data => {
                const name = data.querySelector('h2.s-line-clamp-3 span');
                const price = data.querySelector('span.a-price-whole');
                const link = data.querySelector('a.a-link-normal');
                const image = data.querySelector('img.s-image');
                return (name !== null && price !== null && link !== null && image !== null) ? {
                    name: name.innerHTML,
                    price: price.innerHTML,
                    link: `https://amazon.in/${link.getAttribute('href')}`,
                    image: image.getAttribute('src')
                } : null
            }).filter(data => data !== null);
            return res;
        })
        console.log('Ended');
        console.log(result);
        return result;
    } catch (error) {
        console.log('Error');
        console.log(error);
    } finally {
        browser!.close();
    }
    return [];
}

