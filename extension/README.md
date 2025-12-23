# CKEditor MJML Email Editor Chrome Extension

## Packaging and Installation Guide

### 1. Build and Package the Extension
1. Ensure your extension directory contains:
   - `manifest.json`
   - `background.js`
   - `content.js`
   - `mjmlEditor.js`
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
1. Navigate to a web page with CKEditor 4 loaded
2. The extension will automatically inject an "MJ" button into the CKEditor toolbar
3. Click the "MJ" button to open the MJML Email Editor modal
4. In the modal, you can:
   - Write or paste MJML code
   - See a live HTML preview
   - Save, save as, or delete templates
   - View MJML tag documentation
   - Use keyboard shortcuts (Ctrl+S to save, Ctrl+D for docs, Esc to close)
5. When you click "Save", the MJML is converted to HTML and inserted into the CKEditor source view
6. Templates are stored locally and persist across browser sessions

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
