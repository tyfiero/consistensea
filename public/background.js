/*global chrome*/

chrome.action.onClicked.addListener(function (tab) {
  console.log("clicked on extension icon");
  chrome.tabs.create({
    url: chrome.runtime.getURL("index.html"),
  });
});
