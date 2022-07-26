/*global chrome*/
chrome.notifications.create(
  "name-for-notification",
  {
    type: "basic",
    iconUrl: "image.jpeg",
    title: "This is a notification",
    message: "hello there!",
  },
  function () {}
);
const test = () => {
  console.log("test");
};
test();



chrome.runtime.onInstalled.addListener(() => {
  console.log("HELLOOOOOO");
  console.log("Default background color set to %cgreen", `color: #ffffff`);
});
