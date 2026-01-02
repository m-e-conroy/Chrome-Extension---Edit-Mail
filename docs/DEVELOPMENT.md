# Development Guide

## For Contributors: Extending the Visual Builder

### Project Structure

```
extension/
├── manifest.json              # Extension configuration
├── background.js              # Service worker (MJML API)
├── content.js                 # Content script (messaging bridge)
├── inject-mjml.js             # CKEditor integration
├── mjmlEditor.js              # Main modal UI & orchestration
├── mjmlComponents.js          # Component registry (NEW)
├── mjmlTreeUtils.js           # Tree data structure (NEW)
├── mjmlVisualBuilder.js       # Drag-and-drop UI (NEW)
├── mjmlTemplates.js           # Premade templates
├── icons/                     # Extension icons
└── README.md

docs/
├── design.md                  # Original design doc
├── tech.md                    # Technical specifications
├── drag-and-drop-feature.md   # Feature specification
├── visual-builder-guide.md    # User documentation
├── quick-start-visual-builder.md  # Quick start
├── testing-guide.md           # Test plan
└── DEVELOPMENT.md             # This file
```

---

## Architecture Overview

### Data Flow

```
User Interaction
    ↓
Visual Builder UI (mjmlVisualBuilder.js)
    ↓
Component Tree (mjmlTreeUtils.js)
    ↓
MJML String (componentTreeToMJML)
    ↓
Monaco Editor OR Background API
    ↓
HTML Output → CKEditor
```

### Component System

```
MJML_COMPONENT_REGISTRY (mjmlComponents.js)
    ↓
Component Metadata
    - displayName, icon, description
    - category, defaultProps
    - allowedParents, allowedChildren
    - propertySchema
    ↓
Visual Builder uses metadata to:
    - Render component library
    - Validate drops
    - Generate property forms
    - Create component instances
```

### State Management

```javascript
// Global state in mjmlVisualBuilder.js
let currentComponentTree = [];  // Array of root components
let selectedComponentId = null;  // Currently selected component
let currentMode = 'visual';      // 'visual', 'code', 'split'
let draggedComponentType = null; // Type being dragged
```

---

## Adding a New Component

### 1. Add to Registry

Edit `mjmlComponents.js`:

```javascript
'mj-your-component': {
  displayName: 'Your Component',
  category: 'content',  // layout, content, formatting, interactive, advanced
  icon: '🎨',           // Emoji or icon
  description: 'Description of what it does',
  defaultProps: {
    'property-name': 'default-value'
  },
  defaultContent: 'Optional default text content',
  allowedParents: ['mj-column', 'mj-hero'],  // Where it can be dropped
  allowedChildren: [],  // What it can contain (empty if none)
  propertySchema: [
    {
      name: 'property-name',
      type: 'text',  // 'text', 'color', 'select'
      label: 'Property Name',
      default: 'default-value',
      options: ['opt1', 'opt2']  // Only for 'select' type
    }
  ]
}
```

### 2. Test the Component

1. Reload extension
2. Open Visual mode
3. Component should appear in library
4. Test dragging to valid parent
5. Test property editing
6. Validate MJML output

### 3. Update Documentation

Add to `visual-builder-guide.md` component library section.

---

## Adding a New Property Input Type

Edit `mjmlVisualBuilder.js`, in `refreshPropertyPanel()`:

```javascript
// Inside the property schema loop
if (prop.type === 'your-new-type') {
  html += `
    <input type="your-input-type" 
           class="property-input" 
           data-property="${prop.name}" 
           value="${escapeHtml(currentValue)}" />
  `;
}
```

Then in `attachPropertyHandlers()`, handle the input event.

---

## Extending Tree Operations

Edit `mjmlTreeUtils.js`:

### Add a New Utility Function

```javascript
/**
 * Your new tree operation
 */
function yourNewOperation(tree, params) {
  // Implement logic
  // Return result
}

// Export to window
if (typeof window !== 'undefined') {
  window.yourNewOperation = yourNewOperation;
}
```

### Common Patterns

```javascript
// Recursive tree traversal
function traverse(node, callback) {
  callback(node);
  if (node.children) {
    node.children.forEach(child => traverse(child, callback));
  }
}

// Find with predicate
function findWhere(tree, predicate) {
  for (let node of tree) {
    if (predicate(node)) return node;
    if (node.children) {
      const found = findWhere(node.children, predicate);
      if (found) return found;
    }
  }
  return null;
}

// Map tree
function mapTree(tree, transform) {
  return tree.map(node => ({
    ...transform(node),
    children: node.children ? mapTree(node.children, transform) : []
  }));
}
```

---

## Styling Guidelines

### Color Palette

```css
/* Background colors */
--bg-primary: #1e1e1e;
--bg-secondary: #252526;
--bg-tertiary: #2d2d2d;

/* Accent */
--accent: #e56a54;
--accent-hover: #cf5a45;

/* Text */
--text-primary: #d4d4d4;
--text-secondary: #888;

/* Borders */
--border: #333;
--border-hover: #444;
```

### Component Naming

```css
/* Use BEM-like naming */
.component-library-panel { }
.component-library-panel__header { }
.component-library-panel__item { }
.component-library-panel__item--active { }
```

### Responsive Sizing

```css
/* Use relative units */
.panel {
  width: 260px;      /* Fixed for panels */
  padding: 12px;     /* Spacing */
  font-size: 13px;   /* Text */
}

.canvas {
  flex: 1;           /* Flexible for canvas */
  min-width: 0;      /* Prevent overflow */
}
```

---

## Testing Your Changes

### Manual Testing

1. **Load Extension**:
   ```bash
   chrome://extensions/
   Developer mode ON
   Load unpacked → select extension/
   ```

2. **Test Page**:
   - Create HTML with CKEditor 4
   - Open console for debugging
   - Click "MJ" button

3. **Debug**:
   ```javascript
   // In browser console
   window.MJML_COMPONENT_REGISTRY  // Check registry
   visualBuilderAPI.getComponentTree()  // Check tree
   window.componentTreeToMJML(tree)  // Test conversion
   ```

### Console Commands

```javascript
// Get current state
visualBuilderAPI.getComponentTree()
visualBuilderAPI.getMJML()

// Programmatically create component
const section = window.createComponent('mj-section', { padding: '20px' })
const column = window.createComponent('mj-column')
const text = window.createComponent('mj-text', {}, [], 'Hello!')

// Build tree
section.children = [column]
column.children = [text]

// Set tree
visualBuilderAPI.setComponentTree([section])

// Validate
window.validateComponentTree([section])
```

---

## Performance Optimization

### Debouncing Updates

```javascript
let updateTimeout;
function debouncedUpdate() {
  clearTimeout(updateTimeout);
  updateTimeout = setTimeout(() => {
    updateLivePreview();
  }, 300);
}
```

### Efficient Rendering

```javascript
// Don't re-render entire canvas on small changes
// Instead, update specific elements

function updateComponentDisplay(componentId) {
  const element = document.querySelector(`[data-component-id="${componentId}"]`);
  if (element) {
    // Update only this element
    element.innerHTML = renderComponent(component);
  }
}
```

### Memory Management

```javascript
// Clean up event listeners
function cleanup() {
  document.removeEventListener('dragstart', handleDragStart);
  document.removeEventListener('drop', handleDrop);
  // etc.
}

// Call on modal close
```

---

## Common Issues & Solutions

### Issue: Component not draggable

**Solution**: Check:
1. `draggable="true"` attribute set
2. `dragstart` event handler attached
3. `dataTransfer.setData()` called

### Issue: Drop zone not highlighting

**Solution**: Check:
1. `dragover` event prevented (`e.preventDefault()`)
2. Drop zone has correct `data-parent-type`
3. `isValidDrop()` returns true

### Issue: Properties not saving

**Solution**: Check:
1. Input has `data-property` attribute
2. Event listener attached in `attachPropertyHandlers()`
3. Component selected (`selectedComponentId` set)

### Issue: MJML not parsing

**Solution**: Check:
1. MJML is valid XML
2. Parser errors in console
3. Component tree structure valid

---

## Code Style

### JavaScript

```javascript
// Use strict mode
'use strict';

// Use const/let, not var
const config = {};
let state = null;

// Descriptive names
function renderComponentTree(tree) { }  // Good
function rct(t) { }  // Bad

// Comments for complex logic
/**
 * Convert component tree to MJML string
 * @param {Array} tree - Component tree
 * @param {Number} indentLevel - Current indentation
 * @returns {String} MJML string
 */
function componentTreeToMJML(tree, indentLevel = 0) {
  // Implementation
}

// Error handling
try {
  const tree = parseTree(mjml);
} catch (error) {
  console.error('Parse error:', error);
  showError('Invalid MJML');
}
```

### HTML in JavaScript

```javascript
// Use template literals
const html = `
  <div class="component">
    <h3>${component.name}</h3>
    <p>${component.description}</p>
  </div>
`;

// Escape user input
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
```

### CSS

```css
/* Group related styles */
.component-item {
  padding: 10px;
  margin: 4px 0;
  background: #2d2d2d;
  border: 1px solid #333;
}

.component-item:hover {
  background: #3d3d3d;
  border-color: #e56a54;
}

/* Use transitions for smooth UI */
.component-item {
  transition: all 0.2s;
}
```

---

## Git Workflow

### Branch Naming

```bash
feature/add-new-component
fix/drag-drop-bug
docs/update-readme
refactor/tree-utils
```

### Commit Messages

```
feat: Add carousel component support
fix: Prevent invalid component drops
docs: Update visual builder guide
refactor: Improve tree traversal performance
test: Add unit tests for tree operations
```

### Before Committing

1. Test all affected features
2. Check console for errors
3. Update documentation
4. Run basic tests from testing-guide.md

---

## Release Checklist

### Pre-Release

- [ ] All tests pass (see testing-guide.md)
- [ ] No console errors
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version number bumped in manifest.json
- [ ] README.md reflects new features

### Release

- [ ] Create git tag (`v0.2.0`)
- [ ] Zip extension folder
- [ ] Test installation from zip
- [ ] Update Chrome Web Store (if published)
- [ ] Announce release

---

## Resources

### MJML Documentation
- Official Docs: https://mjml.io/documentation/
- Component Reference: https://mjml.io/components/
- Try It Live: https://mjml.io/try-it-live

### Chrome Extension APIs
- Manifest V3: https://developer.chrome.com/docs/extensions/mv3/
- Storage API: https://developer.chrome.com/docs/extensions/reference/storage/
- Content Scripts: https://developer.chrome.com/docs/extensions/mv3/content_scripts/

### Monaco Editor
- API: https://microsoft.github.io/monaco-editor/api/index.html
- Playground: https://microsoft.github.io/monaco-editor/playground.html

### Drag and Drop
- MDN Guide: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
- Examples: https://www.w3schools.com/html/html5_draganddrop.asp

---

## Contact & Support

For questions or contributions:
- File an issue in the repository
- Check existing documentation
- Review code comments
- Test with provided examples

---

## Future Development Ideas

### Short Term
- Add more component types
- Improve validation messages
- Enhance property editors
- Add keyboard shortcuts

### Medium Term
- Undo/redo functionality
- Component templates library
- Import/export features
- Better error handling

### Long Term
- Collaborative editing
- Cloud sync
- AI assistance
- Advanced animations
- Theme system

---

Happy coding! 🚀
