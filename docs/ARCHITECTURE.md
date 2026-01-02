# Architecture Diagram

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Chrome Extension                             │
│                    CKEditor MJML Email Editor                        │
└─────────────────────────────────────────────────────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
        ▼                           ▼                           ▼
┌──────────────┐          ┌──────────────────┐        ┌──────────────┐
│  background  │          │   content.js     │        │inject-mjml.js│
│     .js      │◄────────►│  (Messaging)     │◄──────►│  (CKEditor)  │
│ (MJML API)   │          │                  │        │  Integration │
└──────────────┘          └──────────────────┘        └──────────────┘
                                    │
                                    ▼
                          ┌──────────────────┐
                          │  mjmlEditor.js   │
                          │  (Main Modal &   │
                          │  Orchestration)  │
                          └──────────────────┘
                                    │
            ┌───────────────────────┼───────────────────────┐
            │                       │                       │
            ▼                       ▼                       ▼
    ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
    │  Monaco      │      │   Visual     │      │  Component   │
    │  Editor      │      │   Builder    │      │   Registry   │
    │  (Code)      │      │  (Visual)    │      │  (Metadata)  │
    └──────────────┘      └──────────────┘      └──────────────┘
                                    │
                          ┌─────────┴─────────┐
                          │                   │
                          ▼                   ▼
                ┌──────────────┐    ┌──────────────┐
                │ mjmlTree     │    │ mjmlComponents│
                │ Utils.js     │    │    .js        │
                │ (Tree Ops)   │    │ (25+ Comps)   │
                └──────────────┘    └──────────────┘
```

---

## Component Relationships

```
┌────────────────────────────────────────────────────────────────────┐
│                        Visual Builder UI                           │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌──────────────┐  ┌─────────────────┐  ┌──────────────────────┐ │
│  │  Component   │  │     Canvas      │  │   Property Editor    │ │
│  │   Library    │  │    (Center)     │  │     (Right)          │ │
│  │   (Left)     │  │                 │  │                      │ │
│  │              │  │  Drop Zones     │  │  Dynamic Forms       │ │
│  │  Categories  │  │  Components     │  │  Color Pickers       │ │
│  │  Search      │  │  Hierarchy      │  │  Text Inputs         │ │
│  │  Drag Start  │  │  Selection      │  │  Dropdowns           │ │
│  └──────┬───────┘  └────────┬────────┘  └──────────┬───────────┘ │
│         │                   │                      │             │
│         └───────────────────┼──────────────────────┘             │
│                             │                                    │
└─────────────────────────────┼────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Component Tree   │
                    │   State Store    │
                    │                  │
                    │ currentTree[]    │
                    │ selectedId       │
                    │ currentMode      │
                    └──────────────────┘
```

---

## Data Flow: Adding a Component

```
User Action: Drag "Button" from Library
        │
        ▼
┌────────────────────────────────────┐
│ 1. dragstart Event                 │
│    - Store component type          │
│    - Visual feedback (opacity)     │
└────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────┐
│ 2. dragover Canvas                 │
│    - Validate drop location        │
│    - Highlight valid drop zones    │
└────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────┐
│ 3. drop Event                      │
│    - Get parent from drop zone     │
│    - Validate parent-child         │
└────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────┐
│ 4. createComponent()               │
│    - Get metadata from registry    │
│    - Apply default properties      │
│    - Generate unique ID            │
└────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────┐
│ 5. insertComponent()               │
│    - Add to component tree         │
│    - Update parent's children[]    │
└────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────┐
│ 6. refreshCanvas()                 │
│    - Render component tree         │
│    - Update UI display             │
└────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────┐
│ 7. updatePreview()                 │
│    - Generate MJML                 │
│    - Convert to HTML               │
│    - Render in iframe              │
└────────────────────────────────────┘
```

---

## Data Flow: Editing Properties

```
User Action: Change button color
        │
        ▼
┌────────────────────────────────────┐
│ 1. Select Component                │
│    - Click on canvas               │
│    - Set selectedComponentId       │
└────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────┐
│ 2. refreshPropertyPanel()          │
│    - Get component by ID           │
│    - Get metadata                  │
│    - Render property form          │
└────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────┐
│ 3. User Edits Color Picker         │
│    - Select new color              │
│    - 'change' event fires          │
└────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────┐
│ 4. Property Change Handler         │
│    - Get property name             │
│    - Get new value                 │
└────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────┐
│ 5. updateComponentProperties()     │
│    - Find component in tree        │
│    - Update properties object      │
└────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────┐
│ 6. (Optional) refreshCanvas()      │
│    - Update visual display         │
└────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────┐
│ 7. updatePreview()                 │
│    - Regenerate MJML               │
│    - Show updated preview          │
└────────────────────────────────────┘
```

---

## Mode Switching Flow

```
User Clicks "Visual" Button
        │
        ▼
┌────────────────────────────────────┐
│ switchEditorMode('visual')         │
└────────────────────────────────────┘
        │
        ├─── Hide Code Container
        │
        ├─── Show Visual Container
        │        │
        │        ▼
        │   ┌────────────────────────┐
        │   │ Get MJML from Monaco   │
        │   └────────────────────────┘
        │        │
        │        ▼
        │   ┌────────────────────────┐
        │   │ mjmlToComponentTree()  │
        │   │  - Parse XML           │
        │   │  - Build tree          │
        │   └────────────────────────┘
        │        │
        │        ▼
        │   ┌────────────────────────┐
        │   │ setComponentTree()     │
        │   │  - Update state        │
        │   │  - Refresh canvas      │
        │   └────────────────────────┘
        │
        └─── Update mode buttons
```

---

## Template Save/Load Flow

```
Save Template
        │
        ▼
┌────────────────────────────────────┐
│ Collect Data:                      │
│  - MJML (from Monaco or tree)      │
│  - Component Tree (if visual)      │
│  - Mode (code/visual/split)        │
│  - Template name                   │
└────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────┐
│ Send to content.js                 │
│  type: "SAVE_MJML_TEMPLATE"        │
└────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────┐
│ content.js Processes:              │
│  - Get existing templates          │
│  - Update or add new               │
│  - Save to chrome.storage.local    │
└────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────┐
│ Confirm & Update UI                │
│  - Show success message            │
│  - Refresh template dropdown       │
└────────────────────────────────────┘

Load Template
        │
        ▼
┌────────────────────────────────────┐
│ User Selects from Dropdown         │
└────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────┐
│ Fetch from chrome.storage.local    │
└────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────┐
│ Restore State:                     │
│  - Set Monaco value (MJML)         │
│  - Switch to saved mode            │
│  - Restore component tree          │
└────────────────────────────────────┘
```

---

## Component Tree Structure

```javascript
Component Tree (In Memory)
[
  {
    id: "comp-1",
    type: "mj-section",
    properties: {
      "background-color": "#ffffff",
      "padding": "20px"
    },
    children: [
      {
        id: "comp-2",
        type: "mj-column",
        properties: {
          "width": "50%"
        },
        children: [
          {
            id: "comp-3",
            type: "mj-text",
            properties: {
              "font-size": "16px",
              "color": "#000000"
            },
            content: "Hello World",
            children: []
          }
        ]
      }
    ]
  }
]
```

**Converts To:**

```xml
<mjml>
  <mj-body>
    <mj-section background-color="#ffffff" padding="20px">
      <mj-column width="50%">
        <mj-text font-size="16px" color="#000000">
          Hello World
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
```

---

## Event Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Interactions                        │
└─────────────────────────────────────────────────────────────────┘
    │           │           │           │           │
    │Drag       │Drop       │Select     │Edit       │Save
    │           │           │           │Property   │Template
    │           │           │           │           │
    ▼           ▼           ▼           ▼           ▼
┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐
│dragstart│  │ drop   │  │ click  │  │change  │  │ click  │
│ event  │  │ event  │  │ event  │  │ event  │  │ event  │
└────┬───┘  └────┬───┘  └────┬───┘  └────┬───┘  └────┬───┘
     │           │           │           │           │
     │           ▼           │           │           │
     │     ┌──────────┐      │           │           │
     │     │validate  │      │           │           │
     │     │Drop()    │      │           │           │
     │     └────┬─────┘      │           │           │
     │          │            │           │           │
     │          ▼            │           │           │
     │     ┌──────────┐      │           │           │
     │     │create    │      │           │           │
     │     │Component │      │           │           │
     │     └────┬─────┘      │           │           │
     │          │            │           │           │
     └──────────┴────────────┴───────────┴───────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  Component Tree │
                    │     Update      │
                    └─────────────────┘
                             │
                    ┌────────┼────────┐
                    ▼        ▼        ▼
              ┌─────────┐ ┌──────┐ ┌────────┐
              │Refresh  │ │Update│ │Update  │
              │Canvas   │ │Props │ │Preview │
              └─────────┘ └──────┘ └────────┘
```

---

## File Dependency Graph

```
mjmlEditor.js (Main)
    │
    ├─── Loads ──► mjmlComponents.js
    │                  │
    │                  └─── Exports: REGISTRY, getMetadata()
    │
    ├─── Loads ──► mjmlTreeUtils.js
    │                  │
    │                  └─── Exports: createComponent(), 
    │                                componentTreeToMJML(),
    │                                validateTree()
    │
    └─── Loads ──► mjmlVisualBuilder.js
                       │
                       ├─── Uses: REGISTRY (from Components)
                       ├─── Uses: Tree Utils (from TreeUtils)
                       └─── Exports: initVisualBuilder()

content.js
    │
    ├─── Injects ──► inject-mjml.js (to page)
    └─── Messages ◄──► background.js (MJML API)
```

---

## Storage Structure

```
chrome.storage.local
    │
    └─── templates: [
            {
                name: "Welcome Email",
                mjml: "<mjml>...</mjml>",
                componentTree: [...],     // NEW in v0.2.0
                mode: "visual",            // NEW in v0.2.0
                created: "2026-01-02...",
                lastEdited: "2026-01-02..."
            },
            {
                name: "Old Template",
                mjml: "<mjml>...</mjml>",
                // No componentTree (v0.1.0 template)
                // No mode (defaults to 'code')
                created: "2025-12-01...",
                lastEdited: "2025-12-01..."
            }
         ]
```

---

## API Surface

### Public Functions (Window Scope)

```javascript
// Component Registry
window.MJML_COMPONENT_REGISTRY
window.getComponentMetadata(tag)
window.getComponentsByCategory(category)
window.getCategories()
window.isValidDrop(parentTag, childTag)
window.canHaveChild(parentTag, childTag)

// Tree Utilities
window.generateComponentId()
window.createComponent(type, props, children, content)
window.componentTreeToMJML(tree, indentLevel)
window.mjmlToComponentTree(mjmlString)
window.findComponentById(tree, id)
window.updateComponentProperties(tree, id, newProps)
window.updateComponentContent(tree, id, newContent)
window.insertComponent(tree, parentId, newComponent, position)
window.removeComponent(tree, componentId)
window.moveComponent(tree, componentId, newParentId, position)
window.wrapWithMjmlDocument(componentTree)
window.validateComponentTree(tree)

// Visual Builder
window.initVisualBuilder(container, options)
    Returns API:
        .getComponentTree()
        .setComponentTree(tree)
        .getMJML()
        .setMJML(mjml)
        .getSelectedComponent()
        .selectComponent(id)

// MJML Conversion
window.convertMJMLWithAPI(mjml, callback)

// Modal
window.createMJMLModal()
```

---

## Performance Considerations

```
Operation               Target Time    Optimization
──────────────────────────────────────────────────────────
Component Drag          < 100ms        Direct DOM manipulation
Property Update         < 50ms         Debounced preview
Mode Switch             < 500ms        Lazy initialization
Canvas Render (50)      < 1s           Minimal re-renders
Template Save           < 200ms        Async storage
MJML Generation         < 300ms        Efficient traversal
Tree Validation         < 100ms        Early exit on error
```

---

## Error Handling Strategy

```
┌─────────────────────────────────────┐
│         User Action                 │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│      Try Operation                  │
│  ┌──────────────────────────────┐   │
│  │ Validate Input               │   │
│  │ Check Preconditions          │   │
│  │ Execute Operation            │   │
│  └──────────────────────────────┘   │
└──────────────┬──────────────────────┘
               │
       ┌───────┴────────┐
       │                │
       ▼                ▼
   Success          Failure
       │                │
       │                ▼
       │      ┌──────────────────┐
       │      │ Catch Error      │
       │      │ Log to Console   │
       │      │ Show User Message│
       │      │ Rollback State   │
       │      └──────────────────┘
       │
       ▼
┌──────────────────┐
│ Update UI        │
│ Provide Feedback │
└──────────────────┘
```

---

This architecture provides:
- ✅ Clear separation of concerns
- ✅ Modular, reusable components
- ✅ Unidirectional data flow
- ✅ Predictable state management
- ✅ Extensible design
- ✅ Robust error handling
