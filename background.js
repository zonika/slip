chrome.runtime.onMessage.addListener(
  function (message) {
    if (message.url) {
      const cmptUrl = new URL(message.url);

      if (cmptUrl.host.indexOf('localhost') > -1) {
        cmptUrl.port = 3001;
      }

      chrome.tabs.create({ url: cmptUrl.href });
    }
  }
);

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(tab.id, {
    file: 'highlight.js'
  });
});
