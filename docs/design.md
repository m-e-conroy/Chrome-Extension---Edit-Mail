# Design Document: MJML Email Editor Chrome Extension

## 1. Purpose
Define the user interface and experience for the MJML email editor modal, integrated via a Chrome extension into CKEditor. This document covers layout, color scheme, UI components, and functional interactions.

---

## 2. User Interface Overview

### 2.1 Modal Layout
- **Header**: Title ("MJML Email Editor"), close button (X)
- **Template Metadata**: Name field (editable), creation date, last edit date (read-only)
- **MJML Code Editor**: Large text area or code editor (syntax highlighting, line numbers)
- **Preview Pane**: Live HTML preview (after MJML conversion)
- **Template List**: Dropdown or sidebar to select existing templates
- **Action Buttons**: Save, Save As, Delete, Cancel
- **Error/Status Bar**: Displays conversion errors, save status, or tips
- **MJML Documentation Button**: Opens an in-page modal or sidebar with a short list of MJML tags and explanations

---

## 3. Color Scheme & Visual Design

### 3.1 Colors
- **Background**: #f8f9fa (light gray)
- **Header**: #343a40 (dark gray), text #ffffff
- **Editor Area**: #ffffff (white), border #ced4da (light border)
- **Buttons**:
  - Primary: #007bff (blue), text #ffffff
  - Secondary: #6c757d (gray), text #ffffff
  - Danger: #dc3545 (red), text #ffffff
  - Documentation: #17a2b8 (teal), text #ffffff
- **Preview Pane**: #e9ecef (very light gray)
- **Error Bar**: #dc3545 (red), text #ffffff
- **Status Bar**: #17a2b8 (teal), text #ffffff
- **Documentation Modal/Sidebar**: #ffffff (white), border #ced4da

### 3.2 Typography
- **Font**: Segoe UI, Roboto, Arial, sans-serif
- **Editor**: Monospace font for MJML code area

---

## 4. UI Components & Interactions

### 4.1 Header
- Displays modal title and close button
- Close button dismisses modal without saving

### 4.2 Template Metadata
- **Name Field**: Editable text input for template name
- **Dates**: Creation and last edit date, displayed as small, muted text

### 4.3 MJML Code Editor
- Syntax highlighting for MJML/XML
- Line numbers, auto-indent, find/replace
- Resizable vertically
- Paste/drag MJML code
- **Tag Property Helper**: When user types or selects an MJML tag, show a contextual list of available properties and short explanations (e.g., for <mj-button>, show 'href', 'background-color', etc.)

### 4.4 Preview Pane
- Shows live HTML output after MJML conversion
- Refreshes on code change or save
- Scrollable, resizable

### 4.5 Template List
- Dropdown or sidebar listing saved templates by name
- Selecting a template loads its MJML and metadata
- Option to delete template (with confirmation)

### 4.6 Action Buttons
- **Save**: Saves current MJML and metadata, updates last edit date
- **Save As**: Prompts for new name, saves as new template
- **Delete**: Removes current template (confirmation required)
- **Cancel**: Closes modal, discards unsaved changes
- **MJML Documentation**: Opens a modal or sidebar with a short list of MJML tags and their explanations (e.g., <mj-section>, <mj-column>, <mj-text>, <mj-image>, <mj-button>, etc.)

### 4.7 Error/Status Bar
- Displays conversion errors, save status, or tips
- Color-coded for error (red) or info (teal)

### 4.8 MJML Documentation Modal/Sidebar
- Contains a concise list of common MJML tags:
  - <mj-section>: Defines a section in the email
  - <mj-column>: Defines a column within a section
  - <mj-text>: Adds text content
  - <mj-image>: Adds an image
  - <mj-button>: Adds a button
  - <mj-divider>: Adds a horizontal divider
- For each tag, show a brief description and a list of key properties with explanations
- Search/filter functionality for tags
- Close button to dismiss documentation

---

## 5. Functional Requirements
- Modal overlays CKEditor, centered, with backdrop
- Responsive design for desktop and tablet
- Keyboard navigation and accessibility (tab order, ARIA labels)
- All actions (save, delete, convert) provide immediate feedback
- MJML conversion errors are clearly shown
- Preview updates automatically after successful conversion
- Template CRUD operations are robust and user-friendly
- MJML documentation is accessible in-page, not via external link
- Tag property helper is context-sensitive and non-intrusive

---

## 6. Example UI Flow
1. User clicks CKEditor toolbar button
2. Modal opens with MJML editor
3. User edits MJML, sees live preview
4. User clicks MJML Documentation button to view tag list and explanations
5. While editing, tag property helper appears for selected MJML tag
6. User saves template (or Save As)
7. MJML is converted, HTML preview updates
8. On save, HTML is injected into CKEditor source view
9. User can select, edit, or delete templates
10. User closes modal when done

---

## 7. Accessibility & Usability
- High contrast for readability
- Keyboard shortcuts for save, close, documentation, and navigation
- Tooltips for buttons and fields
- Error messages are descriptive and actionable
- Documentation modal/sidebar is accessible via keyboard and screen readers

---

## 8. Design References
- Follows Chrome extension modal UI conventions
- Inspired by modern code editors (VS Code, CodeMirror)
- Consistent with CKEditor and MJML branding where appropriate

---

## 9. Acceptance Criteria
- Modal is visually appealing, intuitive, and responsive
- All UI components function as described
- MJML editing and preview are seamless
- Template management is robust and error-tolerant
- MJML documentation and tag property helper are accessible and useful
- Accessibility standards are met

---

## 10. Mockup Description
- Modal: 700px wide, 500px tall (responsive)
- Header: 50px tall, dark background
- Editor: Left 60%, Preview: Right 40%
- Template list: Top or left sidebar
- Action buttons: Bottom right
- Error/status bar: Bottom or below header
- MJML Documentation: Modal or sidebar, 350px wide, scrollable
- Tag property helper: Inline popup or sidebar within editor

---

## 11. Future Enhancements
- Drag-and-drop MJML blocks
- Export HTML/MJML
- Theme customization (dark mode)
- Integration with external MJML template libraries
- Expand documentation to include advanced tags and examples
