// Placeholder for background logic (template storage, messaging)
chrome.runtime.onInstalled.addListener(() => {
  // Initialization logic here
});

chrome.action.onClicked.addListener((tab) => {
  // Step 1: Inject the MJML editor script URL as a global variable
  const mjmlEditorUrl = chrome.runtime.getURL("mjmlEditor.js");
  chrome.scripting
    .executeScript({
      target: { tabId: tab.id, frameIds: [0] },
      world: "MAIN",
      func: (scriptUrl) => {
        window.MJML_INJECT_URL = scriptUrl;
      },
      args: [mjmlEditorUrl],
    })
    .then(() => {
      // Step 2: Inject the actual MJML button logic
      chrome.scripting.executeScript({
        target: { tabId: tab.id, frameIds: [0] },
        world: "MAIN",
        files: ["inject-mjml.js"],
      });
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "RENDER_MJML") {
    // Replace with your real credentials from https://mjml.io/api
    const APP_ID = 'c8fa9410-8706-4451-a446-1f193e6964f7'; 
    const SECRET_KEY = '36a1fd08-38a5-4748-974d-c107223773a1';

    fetch("https://api.mjml.io/v1/render", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(`${APP_ID}:${SECRET_KEY}`)
      },
      body: JSON.stringify({ mjml: request.mjml }),
    })
    .then(res => res.json())
    .then(data => sendResponse(data))
    .catch(err => sendResponse({ error: err.message }));
    
    return true; // Keep message channel open for async fetch
  }
});
