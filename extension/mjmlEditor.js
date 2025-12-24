// mjmlEditor.js - Handles MJML Editor Modal UI
(function () {
    // --- MJML Template CRUD using window.postMessage ---
    function getTemplates(callback) {
      window.postMessage({ type: 'GET_MJML_TEMPLATES' }, '*');
      function handler(event) {
        if (event.data.type === 'MJML_TEMPLATES_RESULT') {
          window.removeEventListener('message', handler);
          callback(event.data.templates || []);
        }
      }
      window.addEventListener('message', handler);
    }

    function saveTemplate(template, callback) {
      window.postMessage({ type: 'SAVE_MJML_TEMPLATE', template }, '*');
      function handler(event) {
        if (event.data.type === 'SAVE_MJML_TEMPLATE_RESULT') {
          window.removeEventListener('message', handler);
          callback && callback();
        }
      }
      window.addEventListener('message', handler);
    }

    function deleteTemplate(name, callback) {
      window.postMessage({ type: 'DELETE_MJML_TEMPLATE', name }, '*');
      function handler(event) {
        if (event.data.type === 'DELETE_MJML_TEMPLATE_RESULT') {
          window.removeEventListener('message', handler);
          callback && callback();
        }
      }
      window.addEventListener('message', handler);
    }
  window.createMJMLModal = createMJMLModal;

  const MJML_TAGS = [
    { tag: "mjml", desc: "Root tag for MJML document" },
    { tag: "mj-head", desc: "Container for head elements (styles, fonts, etc.)" },
    { tag: "mj-title", desc: "Email title (used in browser preview)" },
    { tag: "mj-preview", desc: "Preview text shown in inbox preview" },
    { tag: "mj-attributes", desc: "Set default attributes for MJML tags" },
    { tag: "mj-style", desc: "Add custom CSS styles" },
    { tag: "mj-font", desc: "Import web fonts" },
    { tag: "mj-breakpoint", desc: "Set responsive breakpoint" },
    { tag: "mj-body", desc: "Main body container for the email" },
    { tag: "mj-section", desc: "Defines a section in the email" },
    { tag: "mj-wrapper", desc: "Wrap multiple sections with shared styles" },
    { tag: "mj-group", desc: "Group columns for responsive layouts" },
    { tag: "mj-column", desc: "Defines a column within a section" },
    { tag: "mj-text", desc: "Adds text content" },
    { tag: "mj-image", desc: "Adds an image" },
    { tag: "mj-button", desc: "Adds a button" },
    { tag: "mj-divider", desc: "Horizontal divider line" },
    { tag: "mj-spacer", desc: "Add vertical space" },
    { tag: "mj-table", desc: "Insert a table" },
    { tag: "mj-social", desc: "Social media icons block" },
    { tag: "mj-social-element", desc: "Individual social icon/link" },
    { tag: "mj-navbar", desc: "Navigation bar" },
    { tag: "mj-navbar-link", desc: "Link inside navigation bar" },
    { tag: "mj-carousel", desc: "Image carousel/slideshow" },
    { tag: "mj-carousel-image", desc: "Image inside carousel" },
    { tag: "mj-hero", desc: "Hero section with background image" },
    { tag: "mj-raw", desc: "Insert raw HTML (use with caution)" },
  ];

  function createMJMLModal() {
    if (document.getElementById("mjml-editor-modal")) return;
    buildModalUI();
  }

  function buildModalUI() {
    const modal = document.createElement("div");
    modal.id = "mjml-editor-modal";

    const style = document.createElement("style");
    style.id = "mjml-modern-styles";
    style.textContent = `
    #mjml-editor-modal {
      position: fixed; inset: 0; z-index: 2147483647; 
      display: flex; align-items: center; justify-content: center;
      font-family: 'Segoe UI', Tahoma, sans-serif;
    }
    .mjml-modal-backdrop {
      position: absolute; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(8px);
    }
    .mjml-modal-content {
      position: relative; width: 98vw; height: 96vh;
      background: #1e1e1e; color: #d4d4d4; border-radius: 8px;
      display: flex; flex-direction: column; box-shadow: 0 0 80px rgba(0,0,0,0.7);
      overflow: hidden;
    }
    .mjml-header {
      padding: 12px 20px; background: #252526; border-bottom: 1px solid #333;
      display: flex; justify-content: space-between; align-items: center;
    }
    .mjml-main-layout { display: flex; flex: 1; overflow: hidden; height: 100%; }
    
    /* Sidebar styling */
    .mjml-sidebar-docs {
      width: 260px; background: #252526; border-right: 1px solid #333;
      padding: 15px; overflow-y: auto; display: flex; flex-direction: column;
    }
    .doc-tag-card {
      background: #2d2d2d; padding: 10px; border-radius: 4px; margin-bottom: 10px;
      border-left: 3px solid #e56a54; font-size: 13px;
    }
    .doc-tag-card b { color: #e56a54; display: block; margin-bottom: 3px; }

    /* Editor and Preview Layout */
    .editor-container { 
      flex: 1; display: flex; flex-direction: column; border-right: 1px solid #333; 
      min-width: 0; /* Prevents flex items from overflowing */
    }
    #monaco-editor-instance { flex: 1; width: 100%; height: 100%; }
    
    .preview-container { flex: 1; background: #f4f4f4; display: flex; flex-direction: column; }
    iframe#mjml-preview-frame { width: 100%; height: 100%; border: none; background: white; }

    /* Button and UI Element Styling */
    .mjml-btn {
      padding: 8px 20px; border-radius: 4px; border: none; cursor: pointer;
      font-weight: bold; background: #e56a54; color: white; transition: background 0.2s;
    }
    .mjml-btn:hover { background: #cf5a45; }
    .close-icon { font-size: 28px; cursor: pointer; color: #888; line-height: 1; }
    .close-icon:hover { color: #ff5f56; }
  `;
    document.head.appendChild(style);

    modal.innerHTML = `
    <div class="mjml-modal-backdrop"></div>
    <div class="mjml-modal-content">
      <div class="mjml-header">
        <div style="font-weight:bold; letter-spacing: 1px; color:#e56a54;">MJML POWER EDITOR</div>
        <div style="display:flex; align-items:center; gap:12px;">
          <select id="mjml-template-dropdown" style="padding:6px 10px; border-radius:4px; background:#252526; color:#fff; border:1px solid #444;">
            <option value="">Load template...</option>
          </select>
          <button id="mjml-save-template-btn" class="mjml-btn" style="background:#17a2b8;">Save as Template</button>
          <button id="mjml-delete-template-btn" class="mjml-btn" style="background:#dc3545;">Delete Template</button>
          <button id="mjml-save-btn" class="mjml-btn">UPDATE CKEDITOR</button>
          <span class="close-icon" id="mjml-close-x">&times;</span>
        </div>
      </div>
      <div class="mjml-main-layout">
        <div class="mjml-sidebar-docs">
          <h3 style="margin: 0 0 15px 0; font-size: 16px; color: #eee;">Documentation</h3>
          ${MJML_TAGS.map(
            (tag) => `
            <div class="doc-tag-card">
              <b>&lt;${tag.tag}&gt;</b>
              <span style="color:#aaa;">${tag.desc}</span>
            </div>
          `
          ).join("")}
        </div>
        <div class="editor-container">
          <div id="monaco-editor-instance"></div>
        </div>
        <div class="preview-container">
          <iframe id="mjml-preview-frame"></iframe>
        </div>
      </div>
    </div>
  `;
        // --- Template Dropdown Logic ---
        function refreshTemplateDropdown(selectedName) {
          getTemplates(function (templates) {
            const dropdown = document.getElementById('mjml-template-dropdown');
            if (!dropdown) return;
            dropdown.innerHTML = '<option value="">Load template...</option>' +
              templates.map(t => `<option value="${encodeURIComponent(t.name)}"${selectedName && t.name === selectedName ? ' selected' : ''}>${t.name}</option>`).join('');
          });
        }

        // Defer event handler attachment to ensure DOM is ready
        setTimeout(function () {
          refreshTemplateDropdown();

          var saveBtn = document.getElementById('mjml-save-template-btn');
          var dropdown = document.getElementById('mjml-template-dropdown');
          var deleteBtn = document.getElementById('mjml-delete-template-btn');

          if (saveBtn) {
            saveBtn.onclick = function () {
              const mjml = window.monacoEditor.getValue();
              let name = prompt('Template name:');
              if (!name) return;
              saveTemplate({ name, mjml }, function () {
                refreshTemplateDropdown(name);
                alert('Template saved!');
              });
            };
          }

          if (dropdown) {
            dropdown.onchange = function (e) {
              const name = decodeURIComponent(e.target.value);
              if (!name) return;
              getTemplates(function (templates) {
                const t = templates.find(tt => tt.name === name);
                if (t && window.monacoEditor) {
                  window.monacoEditor.setValue(t.mjml);
                }
              });
            };
          }

          if (deleteBtn) {
            deleteBtn.onclick = function () {
              const dropdown = document.getElementById('mjml-template-dropdown');
              const name = decodeURIComponent(dropdown.value);
              if (!name) {
                alert('Select a template to delete.');
                return;
              }
              if (confirm('Delete template "' + name + '"?')) {
                deleteTemplate(name, function () {
                  refreshTemplateDropdown();
                  alert('Template deleted.');
                });
              }
            };
          }
        }, 100);
    document.body.appendChild(modal);

    const closeEditor = () => {
      modal.remove();
      style.remove();
    };
    document.getElementById("mjml-close-x").onclick = closeEditor;
    modal.querySelector(".mjml-modal-backdrop").onclick = closeEditor;

    // Inside buildModalUI in mjmlEditor.js
    document.getElementById("mjml-save-btn").onclick = function () {
      const mjmlCode = window.monacoEditor.getValue();

      // First, convert MJML to HTML via the API
      window.convertMJMLWithAPI(mjmlCode, (result) => {
        if (result.html) {
          // Send the resulting HTML to the content script for insertion
          window.postMessage(
            {
              type: "INSERT_MJML_HTML",
              html: result.html,
            },
            "*"
          );

          // Close the modal
          const modal = document.getElementById("mjml-editor-modal");
          const style = document.getElementById("mjml-modern-styles");
          if (modal) modal.remove();
          if (style) style.remove();
        } else {
          alert("Could not save: MJML conversion failed.");
        }
      });
    };

    initializeMonaco();
  }

  // Inside mjmlEditor.js
  function initializeMonaco() {
    const container = document.getElementById("monaco-editor-instance");
    if (!container) return;

    // If Monaco is already loaded, just create the editor
    if (window.monaco && window.monaco.editor) {
      createEditorInstance();
      return;
    }

    // Otherwise, load the script
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs/loader.min.js";
    script.onload = () => {
      require.config({
        paths: {
          vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs",
        },
      });
      require(["vs/editor/editor.main"], createEditorInstance);
    };
    document.head.appendChild(script);

    function createEditorInstance() {
      window.monacoEditor = monaco.editor.create(container, {
        value: `<mjml>\n  <mj-body>\n    <mj-section>\n      <mj-column>\n        <mj-text font-size="20px" color="#e56a54">Hello World</mj-text>\n      </mj-column>\n    </mj-section>\n  </mj-body>\n</mjml>`,
        language: "xml",
        theme: "vs-dark",
        automaticLayout: true,
        minimap: { enabled: false },
      });

      // Ensure the preview renders immediately
      updateLivePreview(window.monacoEditor.getValue());

      window.monacoEditor.onDidChangeModelContent(() => {
        updateLivePreview(window.monacoEditor.getValue());
      });
    }
  }

  function updateLivePreview(mjml) {
    const previewFrame = document.getElementById("mjml-preview-frame");
    if (!previewFrame) return;

    window.convertMJMLWithAPI(mjml, (result) => {
      if (result.html) {
        const doc =
          previewFrame.contentDocument || previewFrame.contentWindow.document;
        doc.open();
        doc.write(result.html);
        doc.close();
      }
    });
  }

  window.convertMJMLWithAPI = function (mjml, callback) {
    window.postMessage({ type: "MJML_API_REQUEST", mjml: mjml }, "*");
    const responseHandler = (event) => {
      if (event.data.type === "MJML_API_RESPONSE") {
        window.removeEventListener("message", responseHandler);
        const data = event.data.response;
        callback({ html: data?.html || "", errors: data?.errors || [] });
      }
    };
    window.addEventListener("message", responseHandler);
  };
})();
