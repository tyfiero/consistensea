/*global chrome*/


chrome.runtime.onMessage.addListener((data) => {
  if (data.type === "notification") {
    chrome.notifications.create("", data.options);
  }
});

chrome.runtime.onInstalled.addListener(() => {
  console.log("Thanks for installing!");
  // console.log("Default background color set to %cgreen", `color: #ffffff`);
});
