// content.js
(function () {
  const editorUrl = chrome.runtime.getURL("mjmlEditor.js");
  document.documentElement.setAttribute("data-mjml-url", editorUrl);
  
  // Pass dependency URLs to page context
  const dependencies = [
    "mjmlComponents.js",
    "mjmlTreeUtils.js",
    "mjmlVisualBuilder.js"
  ];
  const dependencyUrls = dependencies.map(file => chrome.runtime.getURL(file));
  document.documentElement.setAttribute("data-mjml-dependencies", JSON.stringify(dependencyUrls));

  // Robust bridge for API requests and save commands
  window.addEventListener("message", (event) => {
    try {
      // 3. MJML Template CRUD (Save, Get, Delete)
      if (event.data.type === "GET_MJML_TEMPLATES") {
        chrome.storage.local.get(['templates'], function (result) {
          window.postMessage({ type: 'MJML_TEMPLATES_RESULT', templates: result.templates || [] }, '*');
        });
        return;
      }
      if (event.data.type === "SAVE_MJML_TEMPLATE") {
        chrome.storage.local.get(['templates'], function (result) {
          let templates = result.templates || [];
          const now = new Date().toISOString();
          let existing = templates.find(t => t.name === event.data.template.name);
          if (existing) {
            existing.mjml = event.data.template.mjml;
            existing.componentTree = event.data.template.componentTree || null;
            existing.mode = event.data.template.mode || 'code';
            existing.lastEdited = now;
          } else {
            let t = Object.assign({}, event.data.template);
            t.created = now;
            t.lastEdited = now;
            t.componentTree = t.componentTree || null;
            t.mode = t.mode || 'code';
            templates.push(t);
          }
          chrome.storage.local.set({ templates }, function () {
            window.postMessage({ type: 'SAVE_MJML_TEMPLATE_RESULT' }, '*');
          });
        });
        return;
      }
      if (event.data.type === "DELETE_MJML_TEMPLATE") {
        chrome.storage.local.get(['templates'], function (result) {
          let templates = (result.templates || []).filter(t => t.name !== event.data.name);
          chrome.storage.local.set({ templates }, function () {
            window.postMessage({ type: 'DELETE_MJML_TEMPLATE_RESULT' }, '*');
          });
        });
        return;
      }
      // 1. Forward MJML Render requests to background.js
      if (event.data.type === "MJML_API_REQUEST") {
        if (chrome && chrome.runtime && chrome.runtime.sendMessage) {
          chrome.runtime.sendMessage(
            { type: "RENDER_MJML", mjml: event.data.mjml },
            (response) => {
              window.postMessage(
                { type: "MJML_API_RESPONSE", response: response },
                "*"
              );
            }
          );
        } else {
          throw new Error("Extension context invalidated");
        }
      }

      // 2. Forward Save command to inject-mjml.js
      if (event.data.type === "INSERT_MJML_HTML") {
        window.dispatchEvent(
          new CustomEvent("mjml-insert-to-ckeditor", {
            detail: { html: event.data.html },
          })
        );
      }
    } catch (err) {
      if (err && err.message && err.message.includes("context invalidated")) {
        alert("The extension context was lost. Please reload the page to continue using the MJML editor.");
      } else {
        // Log other errors for debugging
        console.error("[MJML Extension] Content script error:", err);
      }
    }
  });

  const runScript = document.createElement("script");
  runScript.src = chrome.runtime.getURL("inject-mjml.js");
  (document.head || document.documentElement).appendChild(runScript);
})();
