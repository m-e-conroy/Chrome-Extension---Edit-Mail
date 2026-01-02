# CKEditor MJML Email Editor Chrome Extension

## 🎨 NEW: Drag-and-Drop Visual Builder!

This extension now includes a powerful **visual drag-and-drop builder** for creating MJML email templates without writing code!

### Visual Builder Features:
- **🖱️ Drag & Drop**: Intuitive component assembly
- **🎯 Component Library**: Browse and search MJML components by category
- **⚙️ Property Editor**: Visual editing of component properties
- **🔄 Multi-Mode**: Switch between Visual, Code, and Split views
- **💾 Smart Templates**: Save visual state with templates
- **✓ Validation**: Real-time structure validation

**Quick Start**: [Visual Builder Guide](../docs/quick-start-visual-builder.md)  
**Full Documentation**: [Visual Builder Documentation](../docs/visual-builder-guide.md)

---

## Packaging and Installation Guide

### 1. Build and Package the Extension
1. Ensure your extension directory contains:
   - `manifest.json`
   - `background.js`
   - `content.js`
   - `mjmlEditor.js`
   - `mjmlComponents.js` *(NEW)*
   - `mjmlTreeUtils.js` *(NEW)*
   - `mjmlVisualBuilder.js` *(NEW)*
   - `icons/` (with icon PNGs)
   - Any other required files (e.g., `libs/` if needed)
2. (Optional) Zip the entire `extension` folder for distribution:
   - Select all files and folders inside `extension/`
   - Right-click and choose "Send to > Compressed (zipped) folder"
   - Name the zip file (e.g., `ckeditor-mjml-extension.zip`)

### 2. Load the Extension in Chrome
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in the top right)
3. Click "Load unpacked"
4. Select the `extension` directory (not the zip file)
5. The extension should now appear in your extensions list

### 3. Using the Extension

#### Traditional Code Editor
1. Navigate to a web page with CKEditor 4 loaded
2. The extension will automatically inject an "MJ" button into the CKEditor toolbar
3. Click the "MJ" button to open the MJML Email Editor modal
4. In the modal, you can:
   - Write or paste MJML code in the **Code** mode (default)
   - See a live HTML preview
   - Save, save as, or delete templates
   - View MJML tag documentation
   - Use keyboard shortcuts (Ctrl+S to save, Ctrl+D for docs, Esc to close)
5. When you click "✅ Save", the MJML is converted to HTML and inserted into the CKEditor source view

#### NEW: Visual Drag-and-Drop Builder
1. In the MJML editor modal, click the **"Visual"** button at the top
2. You'll see three panels:
   - **Left Panel**: Component library organized by category
   - **Center Canvas**: Drag components here to build your email
   - **Right Panel**: Property editor for selected components
3. **Building an Email**:
   - Drag a **Section** from the Layout category to the canvas
   - Drag a **Column** into the section
   - Drag content components (Text, Image, Button) into the column
   - Click any component to select it and edit properties
   - Use the search box to quickly find components
4. **Editing Properties**:
   - Select a component by clicking it
   - Edit properties in the right panel (colors, fonts, padding, etc.)
   - Changes update immediately in the preview
5. **Split Mode**:
   - Click **"Split"** for side-by-side visual and code editing
   - Great for learning MJML or fine-tuning generated code

#### Template Management
- Templates are stored locally and persist across browser sessions
- Templates now remember which mode (Code/Visual/Split) you were using
- Visual builder state is saved with templates

### 4. Troubleshooting
- If the button does not appear, ensure CKEditor 4 is present and the extension is enabled
- For conversion errors, check your MJML syntax and review error messages in the modal
- Use the browser console for additional logs (see `window.logFeatureStatus()` and `window.logAcceptanceCriteria()`)

### 5. Uninstalling or Updating
- To update, remove the old version from `chrome://extensions/` and reload the new one
- To uninstall, click the Remove (trash) icon in the extensions list

### 6. Chrome Web Store Submission (Optional)
- Zip the `extension` folder
- Go to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
- Click "Add new item" and upload your zip file
- Fill out the listing details, upload screenshots/icons, and submit for review

---

For more help, see the README or contact the project maintainer.
