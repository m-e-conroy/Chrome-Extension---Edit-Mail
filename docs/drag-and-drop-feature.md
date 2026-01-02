# Drag-and-Drop MJML Component Builder

## Overview
This document specifies the addition of a visual drag-and-drop interface for MJML component assembly alongside the existing code editor. Users can build email templates by dragging pre-configured MJML components onto a canvas, while maintaining access to the code editor for advanced customization.

---

## 1. Feature Requirements

### 1.1 Core Functionality
- Visual canvas for drag-and-drop MJML component assembly
- Component library panel with common MJML elements
- Live preview of MJML output
- Bidirectional sync between drag-and-drop UI and code editor
- Component property editor for customization
- Ability to switch between visual and code modes seamlessly

### 1.2 User Experience Goals
- Intuitive visual email building for non-technical users
- Maintain code editor access for advanced users
- Real-time preview of changes
- Persistent component configurations

---

## 2. Architecture Changes

### 2.1 New UI Components
```
MJML Editor Modal
├── Mode Toggle (Visual/Code/Split)
├── Component Library Panel (left sidebar)
├── Canvas Area (center)
│   ├── Drop zones
│   ├── Component instances
│   └── Visual hierarchy indicators
├── Property Panel (right sidebar)
├── Code Editor (bottom/side panel)
└── Live Preview (optional tab)
```

### 2.2 Data Structure
```json
{
  "componentTree": [
    {
      "id": "comp-1",
      "type": "mj-section",
      "properties": {
        "backgroundColor": "#ffffff",
        "padding": "20px"
      },
      "children": [
        {
          "id": "comp-2",
          "type": "mj-column",
          "properties": {},
          "children": []
        }
      ]
    }
  ]
}
```

---

## 3. Component Library

### 3.1 Available Components
- **Layout**: mj-section, mj-column, mj-group
- **Content**: mj-text, mj-image, mj-button
- **Interactive**: mj-social, mj-navbar
- **Formatting**: mj-divider, mj-spacer
- **Advanced**: mj-hero, mj-carousel, mj-accordion

### 3.2 Component Metadata
Each component includes:
- Display name and icon
- Default properties
- Allowed parent/child relationships
- Property schema for editing

---

## 4. Drag-and-Drop Implementation

### 4.1 Libraries
- **HTML5 Drag and Drop API** (native)
- Alternative: **SortableJS** or **react-beautiful-dnd** (if using framework)

### 4.2 Drop Zone Logic
```javascript
// Pseudocode
onDrop(event, targetZone) {
  const componentType = event.dataTransfer.getData('componentType');
  const newComponent = createComponent(componentType);
  
  if (isValidDrop(targetZone, componentType)) {
    insertComponent(targetZone, newComponent);
    updateMJML();
    syncCodeEditor();
  }
}
```

### 4.3 Visual Feedback
- Highlight valid drop zones on drag
- Show insertion indicator (line/box)
- Disable invalid drop targets
- Provide drag handles for reordering

---

## 5. MJML Synchronization

### 5.1 Component Tree to MJML
```javascript
function componentTreeToMJML(tree) {
  return tree.map(component => {
    const attributes = Object.entries(component.properties)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');
    
    const children = component.children 
      ? componentTreeToMJML(component.children) 
      : '';
    
    return `<${component.type} ${attributes}>${children}</${component.type}>`;
  }).join('\n');
}
```

### 5.2 MJML to Component Tree (Parser)
- Parse MJML string using DOM parser or MJML parser
- Build component tree structure
- Maintain IDs for component tracking
- Handle invalid MJML gracefully

### 5.3 Sync Strategy
- **Visual → Code**: Update code editor on component changes (debounced)
- **Code → Visual**: Parse MJML on code editor blur/save
- Show sync status indicator
- Handle conflicts with user confirmation

---

## 6. Property Editor

### 6.1 Dynamic Property Panel
- Display properties based on selected component type
- Input types: text, color picker, number, select dropdown
- Live preview of property changes
- Reset to default button

### 6.2 Common Properties
- **Styling**: padding, background-color, border, font-family
- **Layout**: width, align, vertical-align
- **Content**: text, src (images), href (links)
- **Responsive**: css-class, fluid-on-mobile

---

## 7. Implementation Plan

### Phase 1: Foundation (Week 1-2)
1. **Design UI Layout**
   - Create mockups for split view interface
   - Design component library icons and styling
   - Plan responsive behavior

2. **Component Library Setup**
   - Define component metadata JSON
   - Create component registry
   - Build library panel UI with search/filter

3. **Canvas Structure**
   - Implement empty canvas area
   - Create drop zone detection system
   - Add visual hierarchy (nested containers)

### Phase 2: Drag-and-Drop (Week 2-3)
4. **Implement Drag Functionality**
   - Add drag handlers to library components
   - Implement HTML5 drag events
   - Create ghost element styling

5. **Drop Zone Logic**
   - Validate parent-child relationships
   - Handle nested component drops
   - Implement reordering within containers

6. **Visual Feedback**
   - Highlight drop zones
   - Show insertion indicators
   - Add component selection states

### Phase 3: Synchronization (Week 3-4)
7. **Component Tree Management**
   - Build tree data structure
   - Implement CRUD operations
   - Add undo/redo stack

8. **MJML Conversion**
   - Create tree-to-MJML serializer
   - Build MJML-to-tree parser
   - Handle edge cases and errors

9. **Editor Sync**
   - Implement bidirectional sync
   - Add debouncing/throttling
   - Show sync status

### Phase 4: Property Editing (Week 4-5)
10. **Property Panel**
    - Build dynamic form generator
    - Add input validation
    - Implement live preview

11. **Component Customization**
    - Wire property changes to tree
    - Update MJML on property change
    - Add preset/template system

### Phase 5: Polish & Integration (Week 5-6)
12. **Mode Switching**
    - Add visual/code/split view toggle
    - Preserve state between modes
    - Handle layout changes

13. **Testing & Refinement**
    - Cross-browser testing
    - Accessibility improvements
    - Performance optimization

14. **Documentation**
    - User guide for drag-and-drop
    - Component reference
    - Update existing docs

---

## 8. Technical Considerations

### 8.1 Performance
- Virtualize component library for large collections
- Debounce MJML regeneration (300ms)
- Use React.memo or similar for component rendering
- Lazy-load preview iframe

### 8.2 State Management
- Consider Redux/Zustand for complex state
- Maintain single source of truth (component tree)
- Implement efficient change detection

### 8.3 Accessibility
- Keyboard navigation for component selection
- ARIA labels for drag-and-drop
- Screen reader announcements
- Focus management in modal

---

## 9. Storage Updates

### 9.1 Extended Template Schema
```json
{
  "templates": [
    {
      "name": "Welcome Email",
      "mjml": "<mjml>...</mjml>",
      "componentTree": [...],
      "mode": "visual",
      "created": "2025-12-23T10:00:00Z",
      "lastEdited": "2025-12-23T10:05:00Z"
    }
  ]
}
```

---

## 10. User Workflow

### 10.1 Building an Email
1. Click "Edit MJML" button in CKEditor
2. Choose "Visual" mode
3. Drag components from library to canvas
4. Click component to edit properties
5. Preview changes in real-time
6. Switch to "Code" mode for fine-tuning
7. Save template with name

### 10.2 Editing Existing Template
1. Load template from storage
2. Parse MJML into component tree
3. Display in visual editor
4. Make changes via drag-and-drop or code
5. Save updates

---

## 11. Error Handling

### 11.1 Invalid Drops
- Prevent invalid parent-child combinations
- Show tooltip explaining why drop failed
- Suggest valid locations

### 11.2 Sync Conflicts
- Detect manual code changes that break structure
- Prompt user to choose: keep visual or keep code
- Offer "Resolve Conflicts" mode

### 11.3 Malformed MJML
- Highlight syntax errors in code editor
- Disable visual mode until resolved
- Provide error messages with line numbers

---

## 12. Future Enhancements

- **Custom Components**: Allow users to save component groups as reusable blocks
- **Templates Gallery**: Pre-built email templates
- **AI Assistance**: Suggest components based on content
- **Collaborative Editing**: Share templates across team
- **Version History**: Track template changes over time
- **Import/Export**: Support MJML file uploads

---

## 13. Acceptance Criteria

- [ ] Component library displays all MJML elements with icons
- [ ] Drag-and-drop successfully adds components to canvas
- [ ] Component tree accurately represents MJML structure
- [ ] Properties panel updates selected component
- [ ] Visual and code modes stay synchronized
- [ ] Templates save with component tree data
- [ ] Invalid drops are prevented with clear feedback
- [ ] Performance remains smooth with 50+ components
- [ ] Accessibility standards met (WCAG 2.1 AA)

---

## 14. References

- MJML Component Documentation: https://mjml.io/documentation/
- HTML5 Drag and Drop API: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
- SortableJS: https://sortablejs.github.io/Sortable/
- Web Accessibility: https://www.w3.org/WAI/WCAG21/quickref/
