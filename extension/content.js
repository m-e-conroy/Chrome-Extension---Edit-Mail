// content.js
(function () {
  const editorUrl = chrome.runtime.getURL("mjmlEditor.js");
  document.documentElement.setAttribute("data-mjml-url", editorUrl);

  // Robust bridge for API requests and save commands
  window.addEventListener("message", (event) => {
    // 1. Forward MJML Render requests to background.js
    if (event.data.type === "MJML_API_REQUEST") {
      chrome.runtime.sendMessage(
        { type: "RENDER_MJML", mjml: event.data.mjml },
        (response) => {
          window.postMessage(
            { type: "MJML_API_RESPONSE", response: response },
            "*"
          );
        }
      );
    }

    // 2. Forward Save command to inject-mjml.js
    if (event.data.type === "INSERT_MJML_HTML") {
      window.dispatchEvent(
        new CustomEvent("mjml-insert-to-ckeditor", {
          detail: { html: event.data.html },
        })
      );
    }
  });

  const runScript = document.createElement("script");
  runScript.src = chrome.runtime.getURL("inject-mjml.js");
  (document.head || document.documentElement).appendChild(runScript);
})();
