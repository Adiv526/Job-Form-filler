document.getElementById("fillFormBtn").addEventListener("click", () => {
  // Send a message to the content script running on the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "autofill" });
  });
});