// mjmlEditor.js - Handles MJML Editor Modal UI
(function () {
  // --- MJML Template CRUD using window.postMessage ---
  function getTemplates(callback) {
    window.postMessage({ type: "GET_MJML_TEMPLATES" }, "*");
    function handler(event) {
      if (event.data.type === "MJML_TEMPLATES_RESULT") {
        window.removeEventListener("message", handler);
        callback(event.data.templates || []);
      }
    }
    window.addEventListener("message", handler);
  }

  function saveTemplate(template, callback) {
    window.postMessage({ type: "SAVE_MJML_TEMPLATE", template }, "*");
    function handler(event) {
      if (event.data.type === "SAVE_MJML_TEMPLATE_RESULT") {
        window.removeEventListener("message", handler);
        callback && callback();
      }
    }
    window.addEventListener("message", handler);
  }

  function deleteTemplate(name, callback) {
    window.postMessage({ type: "DELETE_MJML_TEMPLATE", name }, "*");
    function handler(event) {
      if (event.data.type === "DELETE_MJML_TEMPLATE_RESULT") {
        window.removeEventListener("message", handler);
        callback && callback();
      }
    }
    window.addEventListener("message", handler);
  }
  window.createMJMLModal = createMJMLModal;

  // Premade MJML templates (embedded)
  const MJML_PREMADE_TEMPLATES = [
    {
      name: "Simple Welcome",
      mjml: `<mjml>\n  <mj-body>\n    <mj-section>\n      <mj-column>\n        <mj-text font-size=\"20px\" color=\"#e56a54\">Welcome to our newsletter!</mj-text>\n        <mj-button background-color=\"#e56a54\" color=\"#fff\" href=\"https://example.com\">Learn More</mj-button>\n      </mj-column>\n    </mj-section>\n  </mj-body>\n</mjml>`,
    },
    {
      name: "Product Promo",
      mjml: `<mjml>\n  <mj-body>\n    <mj-section background-color=\"#f4f4f4\">\n      <mj-column>\n        <mj-image src=\"https://via.placeholder.com/300x100\" alt=\"Product\" />\n        <mj-text font-size=\"18px\">Check out our new product!</mj-text>\n        <mj-button background-color=\"#007bff\" color=\"#fff\" href=\"https://example.com/product\">Shop Now</mj-button>\n      </mj-column>\n    </mj-section>\n  </mj-body>\n</mjml>`,
    },
    {
      name: "Event Invitation",
      mjml: `<mjml>\n  <mj-body>\n    <mj-section>\n      <mj-column>\n        <mj-text font-size=\"22px\" color=\"#333\">You're Invited!</mj-text>\n        <mj-text font-size=\"16px\">Join us for our annual event on January 15th.</mj-text>\n        <mj-button background-color=\"#28a745\" color=\"#fff\" href=\"https://example.com/event\">RSVP</mj-button>\n      </mj-column>\n    </mj-section>\n  </mj-body>\n</mjml>`,
    },
    {
      name: "Newsletter Layout",
      mjml: `<mjml>\n  <mj-body>\n    <mj-section>\n      <mj-column width=\"60%\">\n        <mj-text font-size=\"20px\">Latest News</mj-text>\n        <mj-text>Here's what's new this month...</mj-text>\n      </mj-column>\n      <mj-column width=\"40%\">\n        <mj-image src=\"https://via.placeholder.com/120\" alt=\"News\" />\n      </mj-column>\n    </mj-section>\n    <mj-section>\n      <mj-column>\n        <mj-divider border-color=\"#e56a54\" />\n        <mj-text font-size=\"14px\" color=\"#888\">You received this email because you subscribed to our newsletter.</mj-text>\n      </mj-column>\n    </mj-section>\n  </mj-body>\n</mjml>`,
    },
  ];
  
  const MJML_TAGS = [
    { tag: "mjml", desc: "Root tag for MJML document", props: [] },
    {
      tag: "mj-head",
      desc: "Container for head elements (styles, fonts, etc.)",
      props: [],
    },
    {
      tag: "mj-title",
      desc: "Email title (used in browser preview)",
      props: [],
    },
    {
      tag: "mj-preview",
      desc: "Preview text shown in inbox preview",
      props: [],
    },
    {
      tag: "mj-attributes",
      desc: "Set default attributes for MJML tags",
      props: [{ name: "mj-class", desc: "Define reusable class attributes" }],
    },
    {
      tag: "mj-style",
      desc: "Add custom CSS styles",
      props: [{ name: "inline", desc: "Inline the style" }],
    },
    {
      tag: "mj-font",
      desc: "Import web fonts",
      props: [
        { name: "name", desc: "Font name" },
        { name: "href", desc: "Font URL" },
      ],
    },
    {
      tag: "mj-breakpoint",
      desc: "Set responsive breakpoint",
      props: [{ name: "width", desc: "Breakpoint width" }],
    },
    {
      tag: "mj-body",
      desc: "Main body container for the email",
      props: [
        { name: "width", desc: "Body width" },
        { name: "background-color", desc: "Body background color" },
      ],
    },
    {
      tag: "mj-section",
      desc: "Defines a section in the email",
      props: [
        { name: "background-color", desc: "Section background color" },
        { name: "padding", desc: "Section padding" },
      ],
    },
    {
      tag: "mj-wrapper",
      desc: "Wrap multiple sections with shared styles",
      props: [{ name: "background-color", desc: "Wrapper background color" }],
    },
    {
      tag: "mj-group",
      desc: "Group columns for responsive layouts",
      props: [],
    },
    {
      tag: "mj-column",
      desc: "Defines a column within a section",
      props: [{ name: "width", desc: "Column width" }],
    },
    {
      tag: "mj-text",
      desc: "Adds text content",
      props: [
        { name: "color", desc: "Text color" },
        { name: "font-size", desc: "Font size" },
        { name: "align", desc: "Text alignment" },
      ],
    },
    {
      tag: "mj-image",
      desc: "Adds an image",
      props: [
        { name: "src", desc: "Image URL" },
        { name: "alt", desc: "Alt text" },
        { name: "width", desc: "Image width" },
      ],
    },
    {
      tag: "mj-button",
      desc: "Adds a button",
      props: [
        { name: "href", desc: "Button link" },
        { name: "background-color", desc: "Button background color" },
        { name: "color", desc: "Button text color" },
      ],
    },
    {
      tag: "mj-divider",
      desc: "Horizontal divider line",
      props: [
        { name: "border-color", desc: "Divider color" },
        { name: "border-width", desc: "Divider width" },
      ],
    },
    {
      tag: "mj-spacer",
      desc: "Add vertical space",
      props: [{ name: "height", desc: "Spacer height" }],
    },
    {
      tag: "mj-table",
      desc: "Insert a table",
      props: [
        { name: "color", desc: "Table text color" },
        { name: "font-size", desc: "Table font size" },
      ],
    },
    {
      tag: "mj-social",
      desc: "Social media icons block",
      props: [
        { name: "mode", desc: "Layout mode" },
        { name: "icon-size", desc: "Icon size" },
      ],
    },
    {
      tag: "mj-social-element",
      desc: "Individual social icon/link",
      props: [
        { name: "name", desc: "Social network name" },
        { name: "href", desc: "Link URL" },
      ],
    },
    {
      tag: "mj-navbar",
      desc: "Navigation bar",
      props: [{ name: "base-url", desc: "Base URL for links" }],
    },
    {
      tag: "mj-navbar-link",
      desc: "Link inside navigation bar",
      props: [
        { name: "href", desc: "Link URL" },
        { name: "color", desc: "Link color" },
      ],
    },
    {
      tag: "mj-carousel",
      desc: "Image carousel/slideshow",
      props: [
        { name: "background-color", desc: "Carousel background" },
        { name: "tb-width", desc: "Thumbnails width" },
      ],
    },
    {
      tag: "mj-carousel-image",
      desc: "Image inside carousel",
      props: [
        { name: "src", desc: "Image URL" },
        { name: "alt", desc: "Alt text" },
      ],
    },
    {
      tag: "mj-hero",
      desc: "Hero section with background image",
      props: [
        { name: "background-url", desc: "Background image URL" },
        { name: "height", desc: "Hero height" },
      ],
    },
    { tag: "mj-raw", desc: "Insert raw HTML (use with caution)", props: [] },
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
        <div style="display:flex; flex-direction:row; align-items:center; gap:12px; margin-left:24px;">
          <select id="mjml-template-dropdown" style="padding:6px 10px; border-radius:4px; background:#252526; color:#fff; border:1px solid #444;">
            <option value="">Load template...</option>
          </select>
          <select id="mjml-premade-dropdown" style="padding:6px 10px; border-radius:4px; background:#252526; color:#fff; border:1px solid #444;">
            <option value="">Premade templates...</option>
          </select>
          <button id="mjml-save-template-btn" class="mjml-btn" style="background:#17a2b8;" aria-label="Save as Template" title="Save as Template">💾</button>
          <button id="mjml-delete-template-btn" class="mjml-btn" style="background:#dc3545;" aria-label="Delete Template" title="Delete Template">🗑️</button>
          <button id="mjml-docs-btn" class="mjml-btn" style="background:#444;" aria-label="MJML Docs" title="MJML Docs">📖</button>
          <button id="mjml-save-btn" class="mjml-btn" aria-label="Update CKEditor" title="Update CKEditor">✅</button>
          <span class="close-icon" id="mjml-close-x" aria-label="Close" title="Close">&times;</span>
        </div>
      </div>
      <div class="mjml-main-layout">
        <div class="editor-container">
          <div id="monaco-editor-instance"></div>
        </div>
        <div class="preview-container">
          <iframe id="mjml-preview-frame"></iframe>
        </div>
      </div>
      <div id="mjml-docs-modal" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; z-index:2147483648; background:rgba(30,30,30,0.98);">
        <div style="position:absolute; top:40px; left:50%; transform:translateX(-50%); width:600px; max-width:95vw; background:#222; color:#eee; border-radius:8px; box-shadow:0 0 32px #000; padding:32px 24px 24px 24px; overflow-y:auto; max-height:80vh;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
            <span style="font-size:1.3rem; font-weight:bold; color:#e56a54;">MJML Tag Reference</span>
            <button id="mjml-docs-close" class="mjml-btn" style="background:#444;">Close</button>
          </div>
          <div style="max-height:60vh; overflow-y:auto;">
            ${MJML_TAGS.map(
              (tag) => `
              <div style="margin-bottom:18px; padding-bottom:12px; border-bottom:1px solid #333;">
                <div style="font-size:1.1rem; font-weight:bold; color:#e56a54;">&lt;${
                  tag.tag
                }&gt;</div>
                <div style="margin:4px 0 8px 0; color:#ccc;">${tag.desc}</div>
                ${
                  tag.props && tag.props.length > 0
                    ? `<ul style='margin:0 0 0 16px; padding:0; color:#b3e5fc;'>${tag.props
                        .map((p) => `<li><b>${p.name}</b>: ${p.desc}</li>`)
                        .join("")}</ul>`
                    : `<div style='color:#888; font-size:13px;'>No properties</div>`
                }
              </div>
            `
            ).join("")}
          </div>
        </div>
      </div>
    </div>
  `;
    // Docs button logic
    setTimeout(function () {
      var docsBtn = document.getElementById("mjml-docs-btn");
      var docsModal = document.getElementById("mjml-docs-modal");
      var docsClose = document.getElementById("mjml-docs-close");
      if (docsBtn && docsModal && docsClose) {
        docsBtn.onclick = function () {
          docsModal.style.display = "block";
        };
        docsClose.onclick = function () {
          docsModal.style.display = "none";
        };
      }
    }, 200);
    // --- Template Dropdown Logic ---
    function refreshTemplateDropdown(selectedName) {
      getTemplates(function (templates) {
        const dropdown = document.getElementById("mjml-template-dropdown");
        if (!dropdown) return;
        dropdown.innerHTML =
          '<option value="">Load template...</option>' +
          templates
            .map(
              (t) =>
                `<option value="${encodeURIComponent(t.name)}"${
                  selectedName && t.name === selectedName ? " selected" : ""
                }>${t.name}</option>`
            )
            .join("");
      });
    }

    // Defer event handler attachment to ensure DOM is ready
    setTimeout(function () {
      refreshTemplateDropdown();

      var saveBtn = document.getElementById("mjml-save-template-btn");
      var dropdown = document.getElementById("mjml-template-dropdown");
      var deleteBtn = document.getElementById("mjml-delete-template-btn");

      if (saveBtn) {
        saveBtn.onclick = function () {
          const mjml = window.monacoEditor.getValue();
          let name = prompt("Template name:");
          if (!name) return;
          saveTemplate({ name, mjml }, function () {
            refreshTemplateDropdown(name);
            alert("Template saved!");
          });
        };
      }

      if (dropdown) {
        dropdown.onchange = function (e) {
          const name = decodeURIComponent(e.target.value);
          if (!name) return;
          getTemplates(function (templates) {
            const t = templates.find((tt) => tt.name === name);
            if (t && window.monacoEditor) {
              window.monacoEditor.setValue(t.mjml);
            }
          });
        };
      }

      if (deleteBtn) {
        deleteBtn.onclick = function () {
          const dropdown = document.getElementById("mjml-template-dropdown");
          const name = decodeURIComponent(dropdown.value);
          if (!name) {
            alert("Select a template to delete.");
            return;
          }
          if (confirm('Delete template "' + name + '"?')) {
            deleteTemplate(name, function () {
              refreshTemplateDropdown();
              alert("Template deleted.");
            });
          }
        };
      }
    }, 100);
    document.body.appendChild(modal);

    // Populate premade templates dropdown immediately
    setTimeout(function () {
      var premadeDropdown = document.getElementById("mjml-premade-dropdown");
      if (premadeDropdown) {
        premadeDropdown.innerHTML =
          '<option value="">Premade templates...</option>' +
          MJML_PREMADE_TEMPLATES.map(
            (t, i) => `<option value="${i}">${t.name}</option>`
          ).join("");
        premadeDropdown.onchange = function (e) {
          var idx = e.target.value;
          if (idx === "" || !MJML_PREMADE_TEMPLATES[idx]) return;
          if (window.monacoEditor) {
            window.monacoEditor.setValue(MJML_PREMADE_TEMPLATES[idx].mjml);
          }
        };
      }
    }, 200);

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
