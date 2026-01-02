# Changelog

All notable changes to the CKEditor MJML Email Editor Chrome Extension.

## [0.2.0] - 2026-01-02

### 🎉 Major Feature: Drag-and-Drop Visual Builder

#### Added
- **Visual Builder Mode**: Complete drag-and-drop interface for building MJML emails
  - Component library panel with 25+ MJML components
  - Live canvas with real-time component assembly
  - Property editor panel for visual customization
  - Component search and filtering
  - Validation tools

- **Component Registry System** (`mjmlComponents.js`)
  - Comprehensive metadata for all MJML components
  - Icons, descriptions, and categories
  - Property schemas with input types
  - Parent-child relationship validation
  - 6 categories: Layout, Content, Formatting, Interactive, Advanced

- **Component Tree Management** (`mjmlTreeUtils.js`)
  - Tree-based data structure for components
  - CRUD operations (create, read, update, delete)
  - MJML serialization and deserialization
  - Component finder and selector utilities
  - Tree validation with detailed error reporting

- **Multi-Mode Editor**
  - **Code Mode**: Traditional Monaco editor (existing)
  - **Visual Mode**: Full drag-and-drop builder (new)
  - **Split Mode**: Side-by-side visual and code editing (new)
  - Seamless mode switching with automatic synchronization

- **Enhanced Template Storage**
  - Component tree storage alongside MJML code
  - Mode persistence (remembers which mode was used)
  - Backward compatible with existing code-only templates
  - Updated storage schema with `componentTree` and `mode` fields

- **Property Editing**
  - Dynamic property panels based on component type
  - Input types: text, color, number, select dropdown
  - Live content editing for text components
  - Real-time property updates

- **Drag-and-Drop Features**
  - HTML5 Drag and Drop API implementation
  - Visual drop zone highlighting
  - Invalid drop prevention with feedback
  - Nested component support
  - Drag handles for component reordering

#### Enhanced
- **Modal UI**: Updated header with mode toggle buttons
- **Template Management**: Save and load visual builder state
- **MJML Editor**: Integrated visual builder alongside code editor
- **Manifest**: Added new web-accessible resources

#### Documentation
- Created `docs/visual-builder-guide.md` - Comprehensive feature documentation
- Created `docs/quick-start-visual-builder.md` - User quick start guide
- Updated `extension/README.md` with visual builder information
- Existing `docs/drag-and-drop-feature.md` - Technical specification

#### Files Added
- `extension/mjmlComponents.js` - Component metadata registry
- `extension/mjmlTreeUtils.js` - Component tree utilities
- `extension/mjmlVisualBuilder.js` - Visual builder UI implementation
- `docs/visual-builder-guide.md` - Feature documentation
- `docs/quick-start-visual-builder.md` - Quick start guide

#### Files Modified
- `extension/mjmlEditor.js` - Integrated visual builder and mode switching
- `extension/content.js` - Updated storage schema for component trees
- `extension/manifest.json` - Added new web-accessible resources
- `extension/README.md` - Added visual builder documentation

### Technical Details

#### Architecture Changes
- Modular component system with registry pattern
- Tree-based data structure for email composition
- Event-driven synchronization between modes
- Lazy loading of visual builder dependencies

#### Performance Optimizations
- Debounced MJML regeneration (300ms)
- Efficient tree traversal algorithms
- Minimal re-renders on property changes
- Virtual scrolling for large component lists

#### Validation
- Real-time parent-child relationship validation
- Component structure validation
- Property schema validation
- User-friendly error messages

---

## [0.1.0] - 2025-12-XX

### Initial Release

#### Features
- MJML code editor with Monaco Editor
- Live HTML preview
- MJML to HTML conversion via API
- Template save/load functionality
- Local storage for templates
- MJML tag reference documentation
- Keyboard shortcuts
- Dark theme UI
- CKEditor 4 integration
- Chrome extension infrastructure

#### Files
- `manifest.json` - Extension configuration
- `background.js` - Service worker for MJML API
- `content.js` - Content script for messaging
- `mjmlEditor.js` - Main editor UI
- `inject-mjml.js` - CKEditor integration
- `icons/` - Extension icons

---

## Future Roadmap

### Planned Features (v0.3.0)
- [ ] Undo/Redo stack for visual builder
- [ ] Copy/Paste components
- [ ] Duplicate component action
- [ ] Component templates/snippets library
- [ ] Keyboard shortcuts for visual builder
- [ ] Component grouping/ungrouping
- [ ] Import/Export JSON component trees

### Planned Features (v0.4.0)
- [ ] Collaborative editing support
- [ ] AI-assisted component suggestions
- [ ] Responsive preview modes (mobile/tablet/desktop)
- [ ] A/B testing variants
- [ ] Advanced animation support
- [ ] Custom component builder
- [ ] Theme system for consistent branding

### Potential Enhancements
- [ ] Version history for templates
- [ ] Cloud sync for templates
- [ ] Team collaboration features
- [ ] Analytics integration
- [ ] Email testing tools
- [ ] Accessibility checker
- [ ] Performance profiler

---

## Migration Guide

### Upgrading from v0.1.0 to v0.2.0

**Existing Templates**: All existing templates will continue to work without any changes. They will open in Code mode by default.

**No Breaking Changes**: The update is fully backward compatible. Users can continue using the code editor as before.

**New Features Available**: Simply click the "Visual" button to try the new drag-and-drop builder.

**Storage**: No migration needed. The extension will automatically update the storage schema when you save templates in visual mode.

---

## Known Issues

### v0.2.0
- Large component trees (>100 components) may experience slight lag
- Split mode requires manual synchronization via button click
- Some MJML features (like mj-raw) don't have visual representation
- Custom CSS classes not editable in visual mode (use code mode)

### Workarounds
- For large emails, use Code mode for better performance
- Switch modes to sync changes between visual and code
- Use Split mode to access both visual and code features

---

## Credits

- MJML Framework: [https://mjml.io](https://mjml.io)
- Monaco Editor: [https://microsoft.github.io/monaco-editor/](https://microsoft.github.io/monaco-editor/)
- Chrome Extensions API: [https://developer.chrome.com/docs/extensions/](https://developer.chrome.com/docs/extensions/)

---

## License

See LICENSE file in project root.
