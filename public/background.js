/*global chrome*/

const test = () => {
  console.log("test");
}
test()

chrome.runtime.onInstalled.addListener(() => {
  // chrome.storage.sync.set({ color });
  alert('Thanks for installing!');
  console.log("Default background color set to %cgreen", `color: ${#ffffff}`);
});
