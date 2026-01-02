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

  function getTemplateByUrl(url, callback) {
    getTemplates(function (templates) {
      const template = templates.find(t => t.url === url);
      callback(template);
    });
  }

  window.createMJMLModal = createMJMLModal;

  // Premade MJML templates (embedded)
  const MJML_PREMADE_TEMPLATES = [
    {
      name: "UB Basic",
      mjml: `<mjml>\n  <mj-body>\n    <mj-section padding=\"0\" background-color=\"#005bbb\">\n      <mj-column>\n        <mj-image src=\"https://ubconnect.buffalo.edu/www/images/UB-Brand-Bar-1200x179.jpg\" padding=\"0\" />\n      </mj-column>\n    </mj-section>\n    <mj-section padding=\"0\">\n      <mj-column>\n        <mj-image src=\"https://placehold.co/600x250\" padding=\"0\" />\n      </mj-column>\n    </mj-section>\n    <mj-section padding=\"16px 14px\">\n      <mj-column>\n        <mj-text font-family=\"Sofia, Arial, sans-serif\" font-size=\"16px\" line-height=\"24px\" color=\"#666\">\n          Dear {{Preferred}},\n          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquet quis nisl id bibendum. Mauris quam lacus, mattis vitae cursus id, consequat at nisl. Nam scelerisque ligula in iaculis tincidunt. Nam efficitur molestie bibendum. Nulla eget efficitur sem. Etiam est tellus, lacinia at dui sit amet, luctus bibendum orci. Integer gravida mi et nulla blandit, eget tempus eros dignissim. Nulla posuere ipsum vel magna auctor tempus. Donec eget neque leo.</p>\n          <p>Ut nec ipsum sit amet lacus elementum mollis. Nulla nunc tellus, vulputate molestie convallis eu, fringilla ut arcu. Maecenas sit amet ante nulla. Quisque sed lacus porttitor, eleifend nulla eu, condimentum tortor. Curabitur eu quam diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur, nisi sit amet condimentum porttitor, elit mauris gravida ex, non tincidunt ex urna in orci. Morbi eget faucibus lectus. Nunc sed augue a est sodales scelerisque. Vivamus sagittis, sem quis imperdiet accumsan, erat elit ornare augue, a laoreet eros dolor quis risus. Mauris vulputate, magna vel tempus fermentum, purus ex tempor massa, vel egestas nisi mauris in ligula. Proin interdum congue lorem nec commodo. Curabitur id scelerisque tellus.</p>\n          <p>Warmest regards,</p>\n          <p><i>The University at Buffalo</i></p>\n        </mj-text>\n      </mj-column>\n    </mj-section>\n    <mj-section padding=\"0\">\n      <mj-column>\n        <mj-image src=\"https://placehold.co/600x150\" padding=\"0\" />\n      </mj-column>\n    </mj-section>\n    <mj-section padding=\"0\">\n      <mj-column>\n        <mj-image src=\"https://ubconnect.buffalo.edu/www/images/EmailTemplate_YieldEmails_footer_03.png\" padding=\"0\" />\n      </mj-column>\n    </mj-section>\n  </mj-body>\n</mjml>`
    },
    {
      name: "Simple Welcome",
      mjml: `<mjml>\n  <mj-body>\n    <mj-section>\n      <mj-column>\n        <mj-text font-size=\"20px\" color=\"#e56a54\">Welcome to our newsletter!</mj-text>\n        <mj-button background-color=\"#e56a54\" color=\"#fff\" href=\"https://example.com\">Learn More</mj-button>\n      </mj-column>\n    </mj-section>\n  </mj-body>\n</mjml>`,
    },
    {
      name: "Product Promo",
      mjml: `<mjml>\n  <mj-body>\n    <mj-section background-color="#f4f4f4">\n      <mj-column>\n        <mj-image src="https://placehold.co/300x100" alt="Product" />\n        <mj-text font-size="18px">Check out our new product!</mj-text>\n        <mj-button background-color="#007bff" color="#fff" href="https://example.com/product">Shop Now</mj-button>\n      </mj-column>\n    </mj-section>\n  </mj-body>\n</mjml>`,
    },
    {
      name: "Event Invitation",
      mjml: `<mjml>\n  <mj-body>\n    <mj-section>\n      <mj-column>\n        <mj-text font-size=\"22px\" color=\"#333\">You're Invited!</mj-text>\n        <mj-text font-size=\"16px\">Join us for our annual event on January 15th.</mj-text>\n        <mj-button background-color=\"#28a745\" color=\"#fff\" href=\"https://example.com/event\">RSVP</mj-button>\n      </mj-column>\n    </mj-section>\n  </mj-body>\n</mjml>`,
    },
    {
      name: "Newsletter Layout",
      mjml: `<mjml>\n  <mj-body>\n    <mj-section>\n      <mj-column width=\"60%\">\n        <mj-text font-size=\"20px\">Latest News</mj-text>\n        <mj-text>Here's what's new this month...</mj-text>\n      </mj-column>\n      <mj-column width=\"40%\">\n        <mj-image src=\"https://placehold.co/120\" alt=\"News\" />\n      </mj-column>\n    </mj-section>\n    <mj-section>\n      <mj-column>\n        <mj-divider border-color=\"#e56a54\" />\n        <mj-text font-size=\"14px\" color=\"#888\">You received this email because you subscribed to our newsletter.</mj-text>\n      </mj-column>\n    </mj-section>\n  </mj-body>\n</mjml>`,
    }
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
    { tag: "mj-raw", desc: "Insert raw HTML (use with caution)", props: [] }
  ];

  function createMJMLModal() {
    if (document.getElementById("mjml-editor-modal")) return;
    buildModalUI();
  }

  // Global state for editor mode
  let currentEditorMode = 'code'; // 'visual', 'code', 'split'
  let visualBuilderAPI = null;

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
    .mjml-header-left {
      display: flex; align-items: center; gap: 16px;
    }
    .mode-toggle-group {
      display: flex; background: #1e1e1e; border-radius: 4px; padding: 3px;
      border: 1px solid #444;
    }
    .mode-toggle-btn {
      padding: 6px 14px; background: transparent; border: none;
      color: #888; cursor: pointer; font-size: 12px; font-weight: 500;
      border-radius: 3px; transition: all 0.2s;
    }
    .mode-toggle-btn:hover { color: #d4d4d4; }
    .mode-toggle-btn.active {
      background: #e56a54; color: white;
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
    
    #visual-builder-container {
      flex: 1; display: none; width: 100%; height: 100%;
    }
    #visual-builder-container.active {
      display: flex;
    }
    
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
        <div class="mjml-header-left">
          <div style="font-weight:bold; letter-spacing: 1px; color:#e56a54;">MJML POWER EDITOR</div>
          <div class="mode-toggle-group">
            <button class="mode-toggle-btn active" data-mode="code">Code</button>
            <button class="mode-toggle-btn" data-mode="visual">Visual</button>
          </div>
        </div>
        <div style="display:flex; flex-direction:row; align-items:center; gap:12px;">
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
        <!-- Code Editor View -->
        <div class="editor-container" id="code-editor-container">
          <div id="monaco-editor-instance"></div>
        </div>
        
        <!-- Visual Builder View -->
        <div id="visual-builder-container"></div>
        
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
          
          // Get component tree if in visual mode
          let componentTree = null;
          if (visualBuilderAPI && currentEditorMode === 'visual') {
            componentTree = visualBuilderAPI.getComponentTree();
          }
          
          saveTemplate({ 
            name, 
            mjml,
            componentTree,
            mode: currentEditorMode,
            url: window.location.href
          }, function () {
            refreshTemplateDropdown(name);
            alert("Template saved and linked to this URL!");
          });
        };
      }

      if (dropdown) {
        dropdown.onchange = function (e) {
          const name = decodeURIComponent(e.target.value);
          if (!name) return;
          getTemplates(function (templates) {
            const t = templates.find((tt) => tt.name === name);
            if (t) {
              const mjml = t.mjml;
              
              // Always update the main code editor (source of truth)
              if (window.monacoEditor) {
                window.monacoEditor.setValue(mjml);
              }
              
              // Update based on current mode
              if (currentEditorMode === 'visual' && visualBuilderAPI) {
                // In visual mode, update the visual builder
                if (t.componentTree) {
                  visualBuilderAPI.setComponentTree(t.componentTree);
                } else {
                  visualBuilderAPI.setMJML(mjml);
                }
              }
              
              // Force preview update
              updateLivePreview(mjml);
              
              // Restore mode if saved (do this last so the content is already loaded)
              if (t.mode && t.mode !== currentEditorMode) {
                const modeBtn = document.querySelector(`[data-mode="${t.mode}"]`);
                if (modeBtn) {
                  modeBtn.click();
                }
              }
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

    // Load required scripts for visual builder
    loadVisualBuilderDependencies(() => {
      initializeMonaco();
      setupModeToggle();
    });
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
          
          const mjml = MJML_PREMADE_TEMPLATES[idx].mjml;
          
          // Update code editor
          if (window.monacoEditor) {
            window.monacoEditor.setValue(mjml);
          }
          
          // Update visual builder if exists
          if (visualBuilderAPI) {
            visualBuilderAPI.setMJML(mjml);
          }
          
          // Force preview update
          updateLivePreview(mjml);
        };
      }
    }, 200);

    const closeEditor = () => {
      const visualStyles = document.getElementById("mjml-visual-builder-styles");
      modal.remove();
      style.remove();
      if (visualStyles) visualStyles.remove();
    };
    document.getElementById("mjml-close-x").onclick = closeEditor;
    modal.querySelector(".mjml-modal-backdrop").onclick = closeEditor;

    // Inside buildModalUI in mjmlEditor.js
    document.getElementById("mjml-save-btn").onclick = function () {
      let mjmlCode;
      
      // Get MJML from the appropriate editor based on current mode
      if (currentEditorMode === 'visual' && visualBuilderAPI) {
        mjmlCode = visualBuilderAPI.getMJML();
      } else {
        mjmlCode = window.monacoEditor.getValue();
      }

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
          const visualStyles = document.getElementById("mjml-visual-builder-styles");
          if (modal) modal.remove();
          if (style) style.remove();
          if (visualStyles) visualStyles.remove();
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

      // Auto-load template if URL matches
      getTemplateByUrl(window.location.href, function(template) {
        if (template) {
          window.monacoEditor.setValue(template.mjml);
          
          // Switch to saved mode if different
          if (template.mode && template.mode !== currentEditorMode) {
            setTimeout(() => {
              const modeBtn = document.querySelector(`[data-mode="${template.mode}"]`);
              if (modeBtn) {
                modeBtn.click();
              }
            }, 100);
          } else if (template.mode === 'visual' && visualBuilderAPI) {
            // If already in visual mode, just update the builder
            if (template.componentTree) {
              visualBuilderAPI.setComponentTree(template.componentTree);
            } else {
              visualBuilderAPI.setMJML(template.mjml);
            }
          }
        }
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
  
  /**
   * Load visual builder dependencies
   */
  function loadVisualBuilderDependencies(callback) {
    // Get dependency URLs from data attribute (set by content script)
    const dependencyUrlsJson = document.documentElement.getAttribute('data-mjml-dependencies');
    if (!dependencyUrlsJson) {
      console.error('[MJML] Dependency URLs not found. Extension may not be loaded correctly.');
      return;
    }
    
    const dependencyUrls = JSON.parse(dependencyUrlsJson);
    
    let loadedCount = 0;
    
    dependencyUrls.forEach(url => {
      // Extract filename for checking if already loaded
      const filename = url.split('/').pop();
      
      // Check if already loaded
      if (document.querySelector(`script[src*="${filename}"]`)) {
        loadedCount++;
        if (loadedCount === dependencyUrls.length && callback) {
          callback();
        }
        return;
      }
      
      const script = document.createElement('script');
      script.src = url;
      script.onload = () => {
        loadedCount++;
        if (loadedCount === dependencyUrls.length && callback) {
          callback();
        }
      };
      script.onerror = () => {
        console.error(`Failed to load ${file}`);
        loadedCount++;
        if (loadedCount === dependencies.length && callback) {
          callback();
        }
      };
      document.head.appendChild(script);
    });
  }
  
  /**
   * Setup mode toggle functionality
   */
  function setupModeToggle() {
    const modeButtons = document.querySelectorAll('.mode-toggle-btn');
    
    modeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const newMode = btn.dataset.mode;
        switchEditorMode(newMode);
        
        // Update button states
        modeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }
  
  /**
   * Switch between editor modes
   */
  function switchEditorMode(mode) {
    currentEditorMode = mode;
    
    const codeContainer = document.getElementById('code-editor-container');
    const visualContainer = document.getElementById('visual-builder-container');
    
    // Hide all containers
    if (codeContainer) codeContainer.style.display = 'none';
    if (visualContainer) visualContainer.classList.remove('active');
    
    if (mode === 'code') {
      // Show code editor
      if (codeContainer) codeContainer.style.display = 'flex';
      
      // Sync from visual if it exists
      if (visualBuilderAPI) {
        const mjml = visualBuilderAPI.getMJML();
        if (window.monacoEditor && mjml) {
          window.monacoEditor.setValue(mjml);
        }
      }
    } else if (mode === 'visual') {
      // Show visual builder
      if (visualContainer) {
        visualContainer.classList.add('active');
        
        // Initialize visual builder if not already done
        if (!visualBuilderAPI) {
          const mjml = window.monacoEditor ? window.monacoEditor.getValue() : '';
          visualBuilderAPI = window.initVisualBuilder(visualContainer, {
            initialMJML: mjml,
            onTreeChange: (tree) => {
              // Sync to code editor (for when user switches modes)
              if (window.monacoEditor) {
                const mjml = window.wrapWithMjmlDocument(tree);
                window.monacoEditor.setValue(mjml);
              }
              // Update preview
              const mjml = window.wrapWithMjmlDocument(tree);
              updateLivePreview(mjml);
            }
          });
        } else {
          // Sync from code editor
          const mjml = window.monacoEditor ? window.monacoEditor.getValue() : '';
          if (mjml) {
            visualBuilderAPI.setMJML(mjml);
          }
        }
      }
    }
  }
})();
