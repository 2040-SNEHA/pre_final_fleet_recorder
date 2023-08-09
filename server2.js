const puppeteer = require('puppeteer');

// Function to handle messages from Puppeteer and display them in the front-end
function handlePuppeteerMessage(message) {
  // Call the function to print messages to the log container
  printToConsole(message);
}

// Function to append the JSON data as a list in the log container
function printToConsole(message) {
  const logContainer = document.getElementById('logContainer');
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  logContainer.appendChild(messageElement);
}

async function runPuppeteerScript() {
  try {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();

    // Function to handle redirect event
    await page.exposeFunction('redirectEvent', async (info) => {
      if (info.targetId === 'submit') {
        console.log(JSON.stringify(info)); // Log the message in Puppeteer context
        await page.evaluate((message) => {
          // Call the function on the front-end to display the message
          handlePuppeteerMessage(message);
        }, JSON.stringify(info));
      }
    });

    await page.evaluateOnNewDocument(() => {
      document.addEventListener('click', e => redirectEvent({
        targetId: e.target.getAttribute("id"),
      }), true /* capture */);
    });

    await page.exposeFunction('reportEvent', async (info) => {
      if (info.targetId == 'baba') {
        //console.log(info)
        console.log(JSON.stringify(info)); // Log the message in Puppeteer context
        await page.evaluate((message) => {
          // Call the function on the front-end to display the message
          displayMessages();
        }, JSON.stringify(info));
      }
    });


    await page.evaluateOnNewDocument(() => {
      document.addEventListener('click', f => reportEvent({
        targetId: f.target.getAttribute("id"),
      }), true /* capture */);
    });

    await page.exposeFunction('reportEvent1', async (info) => {
      if (1 == 1) {
        //console.log(info)
        console.log(JSON.stringify(info)); // Log the message in Puppeteer context
        await page.evaluate((message) => {
          // Call the function on the front-end to display the message
          printToConsole(message);
        }, JSON.stringify(info));
      }
    });
    await page.evaluateOnNewDocument(() => {
      document.addEventListener('click', e => reportEvent1({ targetName: e.target.baseURI, eventType: 'click' }), true /* capture */);
    });

    await page.exposeFunction('scrollEvent', async (info) => {
      if (1 == 1) {
        //console.log(info)
        console.log(JSON.stringify(info)); // Log the message in Puppeteer context
        await page.evaluate((message) => {
          // Call the function on the front-end to display the message
          printToConsole(message);
        }, JSON.stringify(info));
      }
    });
    await page.evaluateOnNewDocument(() => {
      window.addEventListener('scroll', () => {
        scrollEvent({
          eventType: 'scroll',
          scrollX: window.scrollX,
          scrollY: window.scrollY,
        });
      });
    });

    // Load the local HTML file directly using Puppeteer
    await page.goto('file:///Users/balamurug.palanisamy/Git_sneha/new_reco/index.html');

    // Close the browser when the script is done
    
  } catch (err) {
    console.error('Error executing Puppeteer script:', err);
  }
}

// Expose the runPuppeteerScript function to be called from the front-end
global.startPuppeteerScript = runPuppeteerScript;

// Call the Puppeteer script function
runPuppeteerScript();