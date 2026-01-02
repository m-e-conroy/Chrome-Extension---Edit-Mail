# Visual Builder Testing Guide

## Test Plan for Drag-and-Drop MJML Builder

### Prerequisites
1. Chrome browser with Developer mode enabled
2. Extension loaded (unpacked) from `extension/` directory
3. Test page with CKEditor 4 instance
4. Browser console open (F12) for debugging

---

## 1. Installation & Loading Tests

### Test 1.1: Extension Files Present
**Steps:**
1. Navigate to `chrome://extensions/`
2. Find "CKEditor MJML Email Editor"
3. Click "Details"
4. Check "Inspect views: service worker"

**Expected:**
- Extension appears in list
- No errors in service worker console
- All files listed in manifest are present

### Test 1.2: Scripts Injected
**Steps:**
1. Open a page with CKEditor
2. Open browser console
3. Type: `typeof window.initVisualBuilder`
4. Type: `typeof window.MJML_COMPONENT_REGISTRY`

**Expected:**
- Both should return "function" and "object" respectively
- No script loading errors in console

---

## 2. UI Component Tests

### Test 2.1: Modal Opens
**Steps:**
1. Click "MJ" button in CKEditor toolbar
2. MJML editor modal appears

**Expected:**
- Modal fills most of viewport
- Dark theme applied
- Header shows "MJML POWER EDITOR"
- Three mode buttons visible: Code, Visual, Split

### Test 2.2: Mode Toggle Buttons
**Steps:**
1. Open modal
2. Click "Visual" button
3. Click "Code" button
4. Click "Split" button

**Expected:**
- Clicked button highlights in orange
- Previous button de-highlights
- UI switches to corresponding view
- No console errors

---

## 3. Component Library Tests

### Test 3.1: Library Displays
**Steps:**
1. Open modal in Visual mode
2. Check left panel

**Expected:**
- Component categories visible (Layout, Content, etc.)
- Components show icon, name, and description
- Search box at top
- Scrollable list

### Test 3.2: Component Search
**Steps:**
1. In Visual mode, type "text" in search box
2. Type "button"
3. Clear search

**Expected:**
- Only matching components shown
- Non-matching hidden
- Clearing search shows all components

### Test 3.3: Drag Initiation
**Steps:**
1. Click and hold a component item
2. Drag slightly

**Expected:**
- Cursor changes to grabbing
- Component becomes slightly transparent
- Can drag around screen

---

## 4. Canvas Tests

### Test 4.1: Empty Canvas
**Steps:**
1. Open Visual mode
2. Observe center canvas area

**Expected:**
- Gray dashed border
- "Drag components here" message
- Large canvas icon (🎨)

### Test 4.2: First Component Drop
**Steps:**
1. Drag "Section" component from library
2. Hover over canvas
3. Release

**Expected:**
- Drop zone highlights (orange border) on hover
- Component appears on canvas after drop
- Empty message disappears
- Component shows type, icon, and actions

### Test 4.3: Invalid Drop Prevention
**Steps:**
1. Drag "Text" component (not Section)
2. Try to drop on root canvas

**Expected:**
- Drop zone does NOT highlight
- Drop is prevented
- Alert shows error message
- Component returns to library

### Test 4.4: Nested Component Drop
**Steps:**
1. Add Section to canvas
2. Drag "Column" component
3. Drop inside the section

**Expected:**
- Section's drop zone highlights
- Column appears inside section (indented)
- Proper parent-child relationship

### Test 4.5: Multiple Components
**Steps:**
1. Add Section
2. Add Column inside Section
3. Add Text inside Column
4. Add Button inside Column (below Text)

**Expected:**
- All components properly nested
- Visual hierarchy clear (indentation)
- Each selectable independently

---

## 5. Property Editor Tests

### Test 5.1: No Selection State
**Steps:**
1. Open Visual mode (no components selected)

**Expected:**
- Right panel shows "Select a component to edit properties"
- No property fields visible

### Test 5.2: Component Selection
**Steps:**
1. Add a Section to canvas
2. Click on it

**Expected:**
- Component highlighted with orange border
- Right panel shows "Section Properties"
- Property fields appear
- Component ID displayed at top

### Test 5.3: Property Editing - Text Input
**Steps:**
1. Select a Section
2. Find "Padding" field
3. Change value to "40px"
4. Click outside field

**Expected:**
- Value updates in component data
- Preview reflects change (if visible)
- No errors

### Test 5.4: Property Editing - Color Picker
**Steps:**
1. Select Section
2. Click "Background Color" color input
3. Choose a color
4. Close color picker

**Expected:**
- Color picker opens
- Color applies to component
- Visual feedback in canvas (background changes)

### Test 5.5: Property Editing - Dropdown
**Steps:**
1. Select a Text component
2. Find "Align" dropdown
3. Change from "left" to "center"

**Expected:**
- Dropdown shows options
- Selection updates
- Property saved

### Test 5.6: Content Editing
**Steps:**
1. Select a Text component
2. Find "Content" textarea
3. Type "Hello World"

**Expected:**
- Text appears in textarea
- Content preview updates in canvas
- Changes persist

---

## 6. Component Actions Tests

### Test 6.1: Component Selection via Click
**Steps:**
1. Add multiple components
2. Click different components on canvas

**Expected:**
- Clicked component gets orange border
- Property panel updates
- Previous selection de-selected

### Test 6.2: Delete via Action Button
**Steps:**
1. Select a component
2. Hover over it
3. Click "× Delete" button
4. Confirm deletion

**Expected:**
- Actions appear on hover
- Confirmation dialog appears
- Component removed after confirm
- Selection cleared

### Test 6.3: Delete via Property Panel
**Steps:**
1. Select a component
2. Scroll to bottom of properties
3. Click "Delete Component" button

**Expected:**
- Same deletion behavior
- Component removed
- Canvas updates

---

## 7. Tree Operations Tests

### Test 7.1: Component Tree Structure
**Steps:**
1. Build a tree: Section > Column > Text
2. Open browser console
3. Type: `visualBuilderAPI.getComponentTree()`

**Expected:**
- Returns array of components
- Proper nesting structure
- All properties present
- Unique IDs for each component

### Test 7.2: MJML Generation
**Steps:**
1. Build a simple email
2. In console: `visualBuilderAPI.getMJML()`

**Expected:**
- Returns valid MJML string
- Proper indentation
- All components included
- Wraps in `<mjml>` and `<mj-body>`

---

## 8. Mode Switching Tests

### Test 8.1: Visual to Code Sync
**Steps:**
1. Build email in Visual mode
2. Switch to Code mode

**Expected:**
- Monaco editor shows MJML code
- Code matches visual structure
- Proper formatting
- Preview updates

### Test 8.2: Code to Visual Sync
**Steps:**
1. In Code mode, paste valid MJML
2. Switch to Visual mode

**Expected:**
- MJML parses to component tree
- Components appear on canvas
- Structure preserved
- Properties loaded correctly

### Test 8.3: Split Mode
**Steps:**
1. Click "Split" button

**Expected:**
- Left side shows visual builder
- Right side shows code editor
- Both display same email
- Can edit both simultaneously

### Test 8.4: Split Mode Sync
**Steps:**
1. In Split mode, add component visually
2. Observe code editor

**Expected:**
- Code updates automatically
- Proper MJML syntax
- Formatting preserved

---

## 9. Template Management Tests

### Test 9.1: Save Template (Visual Mode)
**Steps:**
1. Build email in Visual mode
2. Click "💾 Save Template"
3. Enter name "Test Visual"
4. Click OK

**Expected:**
- Template saved
- Appears in dropdown
- Alert confirms save
- Both MJML and component tree saved

### Test 9.2: Load Template (Visual Mode)
**Steps:**
1. Save a template in Visual mode
2. Clear canvas
3. Select template from "Load template..." dropdown

**Expected:**
- Template loads
- Switches to Visual mode (if saved in Visual)
- Component tree restored
- Canvas shows components

### Test 9.3: Template Mode Persistence
**Steps:**
1. Save template in Code mode
2. Save another in Visual mode
3. Load each template

**Expected:**
- Code template opens in Code mode
- Visual template opens in Visual mode
- Mode indicator updates

### Test 9.4: Delete Template
**Steps:**
1. Select a template
2. Click "🗑️ Delete" button
3. Confirm deletion

**Expected:**
- Confirmation dialog
- Template removed from dropdown
- Dropdown updates
- Storage updated

---

## 10. Validation Tests

### Test 10.1: Manual Validation
**Steps:**
1. Build a valid email structure
2. Click "✓ Validate" button

**Expected:**
- Alert: "✓ Component tree is valid!"
- No errors listed

### Test 10.2: Invalid Structure Detection
**Steps:**
1. Manually create invalid structure (via console manipulation)
2. Click "✓ Validate"

**Expected:**
- Alert shows validation errors
- Each error listed with message
- Helpful error messages

---

## 11. Final Save Tests

### Test 11.1: Save to CKEditor (Code Mode)
**Steps:**
1. Write MJML in Code mode
2. Click "✅ Update CKEditor"

**Expected:**
- MJML converts to HTML
- HTML inserted into CKEditor
- Modal closes
- Preview updates in CKEditor

### Test 11.2: Save to CKEditor (Visual Mode)
**Steps:**
1. Build email in Visual mode
2. Click "✅ Update CKEditor"

**Expected:**
- Component tree converts to MJML
- MJML converts to HTML
- HTML inserted correctly
- All components rendered

### Test 11.3: Save to CKEditor (Split Mode)
**Steps:**
1. Edit in Split mode
2. Click "✅ Update CKEditor"

**Expected:**
- Uses current MJML from editor
- Converts and inserts
- Works same as Code mode

---

## 12. Performance Tests

### Test 12.1: Large Component Tree
**Steps:**
1. Add 50+ components to canvas
2. Try dragging, selecting, editing

**Expected:**
- Reasonable performance (< 1s response)
- No freezing or crashes
- Smooth interactions

### Test 12.2: Rapid Mode Switching
**Steps:**
1. Build an email
2. Rapidly click between modes

**Expected:**
- Modes switch without errors
- Sync works correctly
- No memory leaks

---

## 13. Error Handling Tests

### Test 13.1: Invalid MJML Parsing
**Steps:**
1. In Code mode, enter invalid MJML
2. Switch to Visual mode

**Expected:**
- Error message displayed
- Stays in Code mode OR
- Shows error and allows fix

### Test 13.2: Script Loading Failure
**Steps:**
1. Disable one dependency (via DevTools)
2. Try to open Visual mode

**Expected:**
- Graceful degradation
- Error message
- Code mode still works

---

## 14. Browser Compatibility Tests

### Test 14.1: Chrome Latest
**Steps:**
1. Run all tests in latest Chrome

**Expected:**
- All features work
- No console errors

### Test 14.2: Edge (Chromium)
**Steps:**
1. Load extension in Edge
2. Run basic tests

**Expected:**
- Extension loads
- Basic features work

---

## 15. Regression Tests

### Test 15.1: Original Code Editor Still Works
**Steps:**
1. Open modal in Code mode (don't switch)
2. Write MJML manually
3. Save

**Expected:**
- Works exactly as before v0.2.0
- No new bugs introduced
- All original features intact

### Test 15.2: Existing Templates Load
**Steps:**
1. Create template in v0.1.0 (code only)
2. Upgrade to v0.2.0
3. Load old template

**Expected:**
- Template loads in Code mode
- No data loss
- Backward compatible

---

## Bug Reporting Template

If you find a bug:

```markdown
**Bug**: [Short description]

**Steps to Reproduce**:
1. 
2. 
3. 

**Expected Behavior**:


**Actual Behavior**:


**Console Errors**:


**Environment**:
- Chrome Version: 
- Extension Version: 
- OS: 

**Screenshots**:
[Attach if applicable]
```

---

## Success Criteria

✅ All 15 test sections pass  
✅ No critical console errors  
✅ Performance acceptable (<1s for most operations)  
✅ UI responsive and intuitive  
✅ Data persists correctly  
✅ Backward compatible with v0.1.0  
✅ Works in Chrome and Edge  

---

## Known Limitations (Acceptable)

- Large trees (>100 components) may lag slightly
- Some advanced MJML features not visually editable
- Custom CSS requires code mode
- Split mode manual sync

---

## Next Steps After Testing

1. Fix critical bugs
2. Optimize performance issues
3. Enhance UX based on feedback
4. Add requested features
5. Update documentation
6. Prepare for release
