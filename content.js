function scrapeTrophiesDatesAndTimes() {
    const rows = document.querySelectorAll('tr.completed');
    const results = Array.from(rows).map(row => {
      const trophyName = row.querySelector('.title').textContent.trim();
      const dateElement = row.querySelector('.typo-top-date nobr');
      const timeElement = row.querySelector('.typo-bottom-date nobr');
      const dateText = dateElement.innerHTML.replace(/<sup>.*?<\/sup>/g, ' ').trim();
      const timeText = timeElement.textContent.trim();
  
      return {
        trophyName,
        date: `${dateText} ${timeText}`,
        // Convert to Date object for sorting purposes
        dateObject: new Date(`${dateText} ${timeText}`)
      };
    });
  
    // Sort by dateObject
    results.sort((a, b) => a.dateObject - b.dateObject);
  
    // Print sorted results
    results.forEach(result => {
      console.log(`Trophy: ${result.trophyName}, Date: ${result.date}`);
    });
  
    return results;
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "scrapeTrophiesDatesAndTimes") {
      sendResponse({ trophies: scrapeTrophiesDatesAndTimes() });
    }
  });  