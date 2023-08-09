
const runPuppeteerScript = require('./server.js');
const puppeteer = require('puppeteer');
//const {open, click, type, submit} = require('@puppeteer/recorder');
(async () => {
    // 1. Launch browser in headful mode so that we can click around and see how
    // script works.
    const browser = await puppeteer.launch({
      headless: false,
    });
    const recordingPage = await browser.newPage();
  
    const actions = [];
    await recordingPage.exposeFunction('viewjson', async (info) => {
      if (info.targetId == 'baba') {
        await recordingPage.evaluate(() => {
        //console.log(info);
        displayMessages()
        });
      } 
    });

    await recordingPage.exposeFunction('printToConsole', async (message) => {
      // Call the function on the front-end to display the message
      printToConsole(message);
    });
    
    // Add a click event listener to the "Stop Recording" button
    await recordingPage.evaluateOnNewDocument(() => {
      document.addEventListener('click', e => viewjson({
        targetId: e.target.id
      }), true /* capture */);
    });


    await recordingPage.exposeFunction('stopRecordingEvent', async (info) => {
      if (info.targetId == 'stopRecordingBtn') {
        console.log(info);
        await stopRecording(recordingPage);
      } 
    });
    
    // Add a click event listener to the "Stop Recording" button
    await recordingPage.evaluateOnNewDocument(() => {
      document.addEventListener('click', e => stopRecordingEvent({
        targetId: e.target.value
      }), true /* capture */);
    });
  
    // Function to handle redirect event
    await recordingPage.exposeFunction('redirectEvent3', async(info) => {
      if (info.targetId == 'Start Recording') {
          console.log(info);
          await runPuppeteerScript(recordingPage);
      }
    });
    await recordingPage.evaluateOnNewDocument(() => {
      document.addEventListener('click', e => redirectEvent3({
          targetId: e.target.value
      }), true /* capture */);
    });
    const path = require('path');

    const filePath = path.resolve(__dirname, '/puppeteer', 'index2.html');
    await recordingPage.goto(`file://${filePath}`);
  
    //await recordingPage.goto('file:///./index2.html');
    
  })();
  