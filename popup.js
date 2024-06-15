document.getElementById('scrape').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        files: ['content.js'],
      },
      () => {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: 'scrapeTrophiesDatesAndTimes' },
          (response) => {
            displayTrophies(response.trophies);
          }
        );
      }
    );
  });
});

function displayTrophies(trophies) {
  const trophyList = document.getElementById('trophy-list');
  trophyList.innerHTML = ''; // Clear any existing content

  trophies.forEach((trophy) => {
    const trophyItem = document.createElement('div');
    trophyItem.className = 'trophy-item';

    const trophyName = document.createElement('div');
    trophyName.className = 'trophy-name';
    trophyName.textContent = trophy.trophyName;

    const trophyDate = document.createElement('div');
    trophyDate.className = 'trophy-date';
    trophyDate.textContent = trophy.date;

    trophyItem.appendChild(trophyName);
    trophyItem.appendChild(trophyDate);
    trophyList.appendChild(trophyItem);
  });
}
