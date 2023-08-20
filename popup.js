document.getElementById('scrape').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["content.js"]
      }, () => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "scrapeTrophiesDatesAndTimes" }, (response) => {
          console.log(response.trophies);
        });
      });
    });
  });
  