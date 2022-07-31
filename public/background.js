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

// function showStayHydratedNotification() {
//   chrome.notifications.create({
//     type: "basic",
//     iconUrl: "icons/icon128.png.png",
//     title: "Test noti",
//     message: "Will it work?",
//     priority: 1,
//   });
// }
