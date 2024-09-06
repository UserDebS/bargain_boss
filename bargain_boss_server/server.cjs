const express = require('express'),
    app = express(),
    body_parser = require('body-parser'),
    puppeteer = require('puppeteer'),
    cors = require('cors');

app.use(body_parser.urlencoded({ extended: true }));
app.use(cors());

const getFromAmazon = async (product) => {
    const browser = await puppeteer.launch({
        headless: true
    });
    try {
        const page = await browser.newPage();
        page.setDefaultTimeout(60 * 1000);
        await page.goto('https://www.amazon.in');
        await page.waitForSelector('#twotabsearchtextbox');
        await page.click('#twotabsearchtextbox');
        await page.type('#twotabsearchtextbox', product);
        await page.click('#nav-search-submit-button');
        await page.waitForSelector('div.s-desktop-content div.s-result-item h2.a-size-mini span', { visible: true });
        console.log('Started');
        const result = await page.evaluate(() => {
            const res = Array.from(document.querySelectorAll('div.s-desktop-content div.s-result-item')).map(data => {
                const name = data.querySelector('h2.a-size-mini span');
                const price = data.querySelector('span.a-price-whole');
                const link = data.querySelector('a.a-link-normal');
                const image = data.querySelector('img.s-image');
                return (name !== null && price !== null && link !== null && image !== null) ? {
                    name: name.innerHTML,
                    price: Number.parseInt(price.innerHTML.replace(',', '')),
                    link: `https://amazon.in/${link.getAttribute('href')}`,
                    image: image.getAttribute('src'),
                    from : 'amazon'
                } : null
            }).filter(data => data !== null);
            return res;
        });
        result.sort((a, b) => a.price - b.price);
        console.log('Ended');
        return result;
    } catch (error) {
        console.log('Error');
        console.log(error);
        return [];
    } finally {
        browser.close();
    }
}

const getFromFlipkart = async (product) => {
    const browser = await puppeteer.launch({
        headless: true
    });
    try {
        const page = await browser.newPage();
        page.setViewport({
            height: 1080,
            width: 1920
        })
        page.setDefaultTimeout(60 * 1000);
        await page.goto('https://www.flipkart.com');
        await page.waitForSelector('.Pke_EE');
        await page.click('input.Pke_EE');
        await page.type('input.Pke_EE', product);
        await page.click('button._2iLD__');
        await page.waitForSelector('img.DByuf4', { visible: true });
        console.log('Started');
        const result = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('div.cPHDOP')).map(data => {
                const price = data.querySelector('div.hl05eU > div.Nx9bqj');
                const link = data.querySelector('a');
                const image = data.querySelector('img.DByuf4');
                return (price !== null && link !== null && image !== null) ? {
                    name: image.getAttribute('alt'),
                    price: Number.parseInt(price.innerHTML.replace('₹', '').replace(',', '')),
                    link: 'https://www.flipkart.com' + link.getAttribute('href'),
                    image: image.getAttribute('src'),
                    from : 'flipkart'
                } : null;
            }).filter(data => data !== null);
        });
        result.sort((a, b) => a.price - b.price);
        console.log('Ended');
        return result;
    } catch (error) {
        console.log('Error');
        console.log(error);
        return [];
    } finally {
        browser.close();
    }
}


app.get('/products/:prod', async (req, res) => {
    const product = req.params.prod;
    console.log('Called for', product);
    const result1 = await getFromAmazon(product);
    const result2 = await getFromFlipkart(product);
    return res.status(200).json([...result1, ...result2].sort((a, b) => a.price - b.price));
});

app.listen(5500, () => console.log('Server started'));