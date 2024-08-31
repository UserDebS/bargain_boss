const express = require('express'),
    app = express(),
    body_parser = require('body-parser'),
    puppeteer = require('puppeteer'),
    cors = require('cors');

app.use(body_parser.urlencoded({ extended: true }));
app.use(cors());


app.get('/products/:prod', async(req, res) => {
    const product = req.params.prod;
    console.log('Called for', product);
    const browser = await puppeteer.launch({
        headless: true
    });
    try {
        const page = await browser.newPage();
        page.setDefaultTimeout(30 * 1000);
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
                    image: image.getAttribute('src')
                } :  null
            }).filter(data => data !== null);
            return res;
        });
        result.sort((a, b) => a.price - b.price);
        console.log('Ended');
        res.status(200).json(result);
    } catch (error) {
        console.log('Error');
        console.log(error);
        res.sendStatus(400)
    } 
    browser.close();
});

app.listen(5500, () => console.log('Server started'));