const puppeteer = require('puppeteer');

async function runPuppeteerScript() {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await page.goto('https://www.google.com');

        // Wait for the search results to load
        await page.waitForSelector('.byrV5b');

        const citeTexts = await page.evaluate(() => {
            const containers = document.querySelectorAll('.byrV5b'); // Select all containers
            const citeTexts = [];

            for (const container of containers) {
                const citeElement = container.querySelector('cite'); // Select the cite element within the container
                if (citeElement) {
                    citeTexts.push(citeElement.textContent.trim()); // Extract and store text content
                }
            }

            return citeTexts;
        });

        console.log('Cite Texts:', citeTexts);

        // Continue with your Puppeteer script as needed
        // ...

    } catch (error) {
        console.error('Error:', error);
    }
}

runPuppeteerScript();

