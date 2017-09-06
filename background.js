chrome.runtime.onMessage.addListener(
  function (message) {
    chrome.tabs.create({ url: message.url });
  }
);

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(tab.id, {
    file: 'highlight.js'
  });
});
