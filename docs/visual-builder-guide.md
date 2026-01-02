# MJML Drag-and-Drop Visual Builder

## Overview

The MJML Editor now includes a powerful drag-and-drop visual builder that allows users to create email templates visually without writing code. This feature provides an intuitive interface for assembling MJML components while maintaining full access to the code editor for advanced customization.

## Features

### 🎨 Visual Component Assembly
- **Drag-and-Drop Interface**: Drag components from the library and drop them onto the canvas
- **Component Library**: Organized by category (Layout, Content, Formatting, Interactive, Advanced)
- **Live Canvas**: Real-time visual representation of your email structure
- **Nested Components**: Support for complex hierarchical layouts

### ⚙️ Property Editor
- **Dynamic Properties**: Component-specific property panels
- **Input Types**: Text inputs, color pickers, dropdowns, and more
- **Real-time Updates**: Changes reflect immediately in the preview
- **Content Editing**: Inline content editing for text, buttons, and tables

### 🔄 Multi-Mode Editor
- **Code Mode**: Traditional Monaco code editor
- **Visual Mode**: Full drag-and-drop builder
- **Split Mode**: Side-by-side visual builder and code editor
- **Seamless Switching**: Sync between modes automatically

### 💾 Enhanced Templates
- **Component Tree Storage**: Save visual builder state with templates
- **Mode Persistence**: Remember which mode was used for each template
- **Backward Compatible**: Works with existing code-only templates

## Architecture

### Core Files

1. **mjmlComponents.js** - Component Registry
   - Defines all MJML components with metadata
   - Property schemas for each component
   - Parent-child relationship validation
   - Icons and descriptions

2. **mjmlTreeUtils.js** - Tree Management
   - Component tree data structure
   - CRUD operations (create, read, update, delete)
   - MJML serialization/deserialization
   - Tree validation utilities

3. **mjmlVisualBuilder.js** - Visual Interface
   - Drag-and-drop UI implementation
   - Canvas rendering
   - Property editor panel
   - Component library panel

4. **mjmlEditor.js** - Main Editor (Updated)
   - Mode switching logic
   - Editor integration
   - Template save/load with component trees
   - Dependency loading

## Component Library

### Layout Components
- **Section** (mj-section): Horizontal container for columns
- **Column** (mj-column): Vertical container for content
- **Group** (mj-group): Group columns for responsive behavior
- **Wrapper** (mj-wrapper): Wrap sections with shared styling

### Content Components
- **Text** (mj-text): Text content with formatting
- **Image** (mj-image): Images with links and styling
- **Button** (mj-button): Clickable call-to-action buttons
- **Table** (mj-table): Data tables

### Formatting Components
- **Divider** (mj-divider): Horizontal separator lines
- **Spacer** (mj-spacer): Vertical spacing

### Interactive Components
- **Social Icons** (mj-social): Social media icon blocks
- **Navigation Bar** (mj-navbar): Navigation menus

### Advanced Components
- **Hero** (mj-hero): Hero sections with background images
- **Carousel** (mj-carousel): Image carousels
- **Accordion** (mj-accordion): Expandable content sections

## Usage

### Basic Workflow

1. **Open the MJML Editor**
   - Click the "Edit MJML" button in CKEditor

2. **Choose Your Mode**
   - Click "Visual" button to use the drag-and-drop builder
   - Or stay in "Code" mode for traditional editing
   - Use "Split" mode for both simultaneously

3. **Build Your Email (Visual Mode)**
   - Browse components in the left panel
   - Drag a Section component to the canvas
   - Drag Columns into the Section
   - Add content components (Text, Image, Button) into Columns
   - Click components to select and edit properties

4. **Customize Properties**
   - Select any component on the canvas
   - Edit properties in the right panel
   - Modify colors, padding, fonts, etc.
   - Edit text content directly

5. **Save and Use**
   - Save as a template with "💾" button
   - Click "✅" to insert into CKEditor
   - Templates remember which mode you used

### Keyboard Shortcuts

- **Search Components**: Type in the search box to filter
- **Delete Component**: Click the × button on any component
- **Clear Canvas**: Click "Clear" button in toolbar
- **Validate**: Click "✓ Validate" to check structure

### Component Validation

The system validates:
- Parent-child relationships (e.g., Columns must be in Sections)
- Component hierarchy depth
- Required properties
- Invalid component combinations

Use the "Validate" button to check your email structure.

## Data Structure

### Component Tree Format

```json
{
  "id": "comp-1",
  "type": "mj-section",
  "properties": {
    "background-color": "#ffffff",
    "padding": "20px"
  },
  "children": [
    {
      "id": "comp-2",
      "type": "mj-column",
      "properties": {
        "width": "50%"
      },
      "children": [
        {
          "id": "comp-3",
          "type": "mj-text",
          "properties": {
            "font-size": "16px",
            "color": "#000000"
          },
          "content": "Hello World",
          "children": []
        }
      ]
    }
  ]
}
```

### Template Storage Schema

```json
{
  "name": "Welcome Email",
  "mjml": "<mjml>...</mjml>",
  "componentTree": [...],
  "mode": "visual",
  "created": "2026-01-02T10:00:00Z",
  "lastEdited": "2026-01-02T10:05:00Z"
}
```

## API Reference

### Window Functions

#### Component Registry

```javascript
// Get metadata for a component
window.getComponentMetadata('mj-text')

// Get all components by category
window.getComponentsByCategory('content')

// Get all categories
window.getCategories()

// Validate drop
window.isValidDrop('mj-section', 'mj-column') // true

// Check if component can have child
window.canHaveChild('mj-column', 'mj-text') // true
```

#### Tree Operations

```javascript
// Create a component
window.createComponent('mj-section', { padding: '20px' })

// Convert tree to MJML
window.componentTreeToMJML(tree)

// Parse MJML to tree
window.mjmlToComponentTree(mjmlString)

// Find component by ID
window.findComponentById(tree, 'comp-1')

// Update properties
window.updateComponentProperties(tree, 'comp-1', { padding: '30px' })

// Update content
window.updateComponentContent(tree, 'comp-1', 'New text')

// Insert component
window.insertComponent(tree, 'parent-id', newComponent)

// Remove component
window.removeComponent(tree, 'comp-1')

// Move component
window.moveComponent(tree, 'comp-1', 'new-parent-id')

// Validate tree
window.validateComponentTree(tree)
```

#### Visual Builder

```javascript
// Initialize visual builder
const api = window.initVisualBuilder(container, {
  initialMJML: '<mjml>...</mjml>',
  onTreeChange: (tree) => { /* handle change */ }
})

// Get component tree
api.getComponentTree()

// Set component tree
api.setComponentTree(tree)

// Get MJML
api.getMJML()

// Set MJML
api.setMJML(mjmlString)

// Get selected component
api.getSelectedComponent()

// Select component
api.selectComponent('comp-id')
```

## Styling

### Custom Styles

The visual builder uses a dark theme consistent with the code editor. Styles are injected via `mjml-visual-builder-styles` and can be customized.

### CSS Classes

- `.mjml-visual-builder` - Main container
- `.component-library-panel` - Left sidebar
- `.canvas-area` - Center canvas
- `.property-editor-panel` - Right sidebar
- `.canvas-component` - Individual components on canvas
- `.canvas-component.selected` - Selected component
- `.canvas-drop-zone` - Drop zones
- `.drag-over` - Active drop zone

## Error Handling

### Invalid Drops

When dragging a component to an invalid location:
- Drop zone won't highlight
- Drop is prevented
- Error alert shows valid parent types

### Sync Conflicts

When switching modes:
- Visual → Code: MJML is generated from tree
- Code → Visual: MJML is parsed to tree
- Malformed MJML shows error and stays in code mode

### Validation Errors

Clicking "Validate" shows:
- Parent-child relationship errors
- Missing required components
- Invalid property values
- Structural issues

## Best Practices

1. **Start with Sections**: Always begin with mj-section components
2. **Use Columns**: Add mj-column inside sections before content
3. **Save Often**: Save templates frequently as you build
4. **Validate Regularly**: Use the validate button to catch issues early
5. **Preview**: Always check the preview before inserting
6. **Mode Switching**: Switch to code mode for fine-tuning
7. **Component Search**: Use search to quickly find components

## Troubleshooting

### Components Not Draggable

- Ensure the extension is properly loaded
- Check browser console for JavaScript errors
- Reload the page

### Property Changes Not Saving

- Click outside the input to blur
- Verify component is selected (highlighted border)
- Check console for errors

### Mode Switch Not Working

- Ensure dependencies are loaded (check console)
- Try refreshing the page
- Clear browser cache

### Visual Builder Not Appearing

- Check that all JavaScript files are loaded
- Verify manifest.json includes all files
- Look for errors in browser console
- Ensure Chrome extension permissions are granted

## Performance Considerations

- Component tree limited to reasonable depth (recommended max 5 levels)
- Large templates (>100 components) may slow down
- Debouncing on property changes (300ms)
- Virtual scrolling for large component lists

## Browser Compatibility

- Chrome 88+
- Edge 88+
- Other Chromium-based browsers

## Future Enhancements

Planned features:
- [ ] Undo/Redo stack
- [ ] Copy/Paste components
- [ ] Duplicate component
- [ ] Component templates/snippets
- [ ] Keyboard shortcuts for actions
- [ ] Component grouping
- [ ] Import/Export JSON
- [ ] Collaborative editing
- [ ] AI-assisted component suggestions
- [ ] Responsive preview modes
- [ ] A/B testing variants

## Contributing

When adding new components:
1. Add metadata to `mjmlComponents.js`
2. Include icon, description, and property schema
3. Define allowed parents and children
4. Add default properties
5. Test drag-and-drop behavior
6. Update documentation

## License

Same as the main extension project.

## Support

For issues or questions:
- Check the browser console for errors
- Review this documentation
- Check the MJML official documentation
- File an issue in the project repository
