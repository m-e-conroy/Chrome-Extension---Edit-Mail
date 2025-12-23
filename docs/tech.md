# Technical Specification: Chrome Extension for CKEditor MJML Email Editing

## Overview
This document specifies the architecture and implementation details for a Chrome extension that injects a custom button into CKEditor (v4) instances on web pages. The button launches a custom MJML editor for email creation. Users can save MJML templates locally, with metadata, and upon saving, the extension converts MJML to HTML and replaces the CKEditor source view content.

---

## 1. System Architecture

### 1.1 Components
- Content Script: Injects CKEditor button and handles UI integration.
- Background Script: Manages MJML template storage and metadata.
- MJML Editor UI: Custom modal/editor for MJML email creation.
- MJML Conversion Service: Converts MJML to HTML (local or remote API).
- Chrome Storage: Persists MJML templates, names, creation, and last edit dates.

### 1.2 Data Flow
1. Content script detects CKEditor instance and injects toolbar button.
2. User clicks button; MJML editor modal opens.
3. User creates/edits MJML template, names it, and saves.
4. MJML, name, and timestamps are stored locally.
5. MJML is converted to HTML.
6. HTML replaces CKEditor source view content.

---

## 2. Extension Manifest & Permissions
- Manifest v3
- Permissions:
  - activeTab (inject scripts)
  - storage (local MJML template management)
  - scripting (DOM manipulation)
  - Optional: webRequest if using remote MJML API

---

## 3. CKEditor Integration

### 3.1 Button Injection
- Detect CKEditor instance via CKEDITOR.instances.
- Add command and button using CKEditor API.
- Render button HTML and inject into .cke_toolbar.
- Re-initialize button listeners for functional UI.

### 3.2 Modal Launch
- On button click, open MJML editor modal (injected into page DOM).
- Modal includes MJML code editor, name field, and save/cancel actions.

---

## 4. MJML Template Management

### 4.1 Local Storage Schema
{
  "templates": [
    {
      "name": "Welcome Email",
      "mjml": "<mjml>...</mjml>",
      "created": "2025-12-23T10:00:00Z",
      "lastEdited": "2025-12-23T10:05:00Z"
    }
  ]
}
- Use chrome.storage.local for persistence.
- CRUD operations for templates (create, read, update, delete).

### 4.2 Metadata
- Store template name, creation date, last edit date.
- Display metadata in MJML editor UI for selection and management.

---

## 5. MJML Conversion

### 5.1 Conversion Options
- Local: Bundle MJML JS (if feasible in extension context).
- Remote: Call MJML API (requires network permission).

### 5.2 Error Handling
- Validate MJML before conversion.
- Display conversion errors in modal.
- Fallback to last valid HTML if conversion fails.

---

## 6. CKEditor Source Replacement
- After conversion, switch CKEditor to source view.
- Replace editor content with generated HTML.
- Optionally, switch back to WYSIWYG view.

---

## 7. Security Considerations
- Sanitize MJML/HTML before injection.
- Restrict extension to trusted domains if needed.
- Avoid exposing sensitive data in storage.

---

## 8. Cross-Platform Compatibility
- Test on Windows, macOS, Linux Chrome browsers.
- Ensure CKEditor v4 compatibility; document limitations for other versions.

---

## 9. Logging & Monitoring
- Log extension actions (button injection, MJML save, conversion errors) to console for debugging.
- Optionally, provide user-facing error messages in modal.

---

## 10. Acceptance Criteria
- CKEditor button is injected and functional on supported pages.
- MJML editor modal opens, saves, and lists templates with metadata.
- MJML is converted and replaces CKEditor source view content.
- Templates persist across browser sessions.
- All actions are robust against errors and edge cases.

---

## 11. Troubleshooting Guide
- Button not visible: Check CKEditor version and DOM structure.
- MJML conversion fails: Validate MJML syntax; check API connectivity.
- Templates not saving: Verify Chrome storage permissions.
- HTML not injected: Ensure source view is active and editor instance is correct.

---

## 12. References
- CKEditor 4 API Documentation: https://ckeditor.com/docs/ckeditor4/latest/api/
- MJML Documentation: https://mjml.io/documentation/
- Chrome Extension Manifest V3: https://developer.chrome.com/docs/extensions/mv3/intro/
