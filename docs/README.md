# Documentation Index

Complete documentation for the CKEditor MJML Email Editor Chrome Extension with Drag-and-Drop Visual Builder.

---

## 📚 Quick Links

### For Users
- **[Quick Start Guide](quick-start-visual-builder.md)** - Get started in 5 minutes
- **[Visual Builder Guide](visual-builder-guide.md)** - Complete feature documentation
- **[Original Design](design.md)** - Original project vision

### For Developers
- **[Development Guide](DEVELOPMENT.md)** - Contributing and extending
- **[Architecture](ARCHITECTURE.md)** - System design and data flow
- **[Testing Guide](testing-guide.md)** - Comprehensive test plan
- **[Technical Specs](tech.md)** - Technical implementation details

### Project Management
- **[Implementation Summary](IMPLEMENTATION_SUMMARY.md)** - What was built
- **[Drag-and-Drop Feature Spec](drag-and-drop-feature.md)** - Original feature specification
- **[Changelog](../CHANGELOG.md)** - Version history

---

## 📖 Documentation Overview

### User Documentation

#### Quick Start Guide
**File**: `quick-start-visual-builder.md`  
**Audience**: End users  
**Purpose**: Get up and running quickly  
**Contents**:
- 5-minute tutorial
- Common patterns
- Tips & tricks
- Example workflows
- Troubleshooting

#### Visual Builder Guide
**File**: `visual-builder-guide.md`  
**Audience**: End users & power users  
**Purpose**: Comprehensive feature reference  
**Contents**:
- Feature overview
- Component library
- Property editing
- API reference
- Best practices
- Troubleshooting

---

### Developer Documentation

#### Development Guide
**File**: `DEVELOPMENT.md`  
**Audience**: Contributors & developers  
**Purpose**: How to extend and contribute  
**Contents**:
- Project structure
- Adding components
- Code style guide
- Git workflow
- Common issues
- Future enhancements

#### Architecture
**File**: `ARCHITECTURE.md`  
**Audience**: Developers & architects  
**Purpose**: System design understanding  
**Contents**:
- System diagrams
- Data flow charts
- Component relationships
- API surface
- Performance considerations
- Error handling

#### Testing Guide
**File**: `testing-guide.md`  
**Audience**: QA & developers  
**Purpose**: Comprehensive test coverage  
**Contents**:
- 15 test categories
- 45+ test cases
- Bug reporting template
- Success criteria
- Known limitations

---

### Technical Documentation

#### Technical Specifications
**File**: `tech.md`  
**Audience**: Technical team  
**Purpose**: Technical implementation details  
**Contents**:
- Technology stack
- API integrations
- Security considerations
- Performance benchmarks

#### Drag-and-Drop Feature Spec
**File**: `drag-and-drop-feature.md`  
**Audience**: Product & engineering  
**Purpose**: Feature requirements  
**Contents**:
- Feature requirements
- Architecture changes
- Implementation plan
- Acceptance criteria
- Future enhancements

---

### Design Documentation

#### Original Design
**File**: `design.md`  
**Audience**: Product & design  
**Purpose**: Original vision  
**Contents**:
- Project goals
- User stories
- UI/UX considerations
- Feature roadmap

---

## 🎯 Documentation by Use Case

### "I want to use the visual builder"
1. Start with [Quick Start Guide](quick-start-visual-builder.md)
2. Reference [Visual Builder Guide](visual-builder-guide.md) for details
3. Check [Troubleshooting](#troubleshooting) if issues arise

### "I want to add a new component"
1. Read [Development Guide](DEVELOPMENT.md) - "Adding a New Component"
2. Review [Architecture](ARCHITECTURE.md) - "Component System"
3. Test using [Testing Guide](testing-guide.md)

### "I want to understand the code"
1. Start with [Architecture](ARCHITECTURE.md)
2. Review [Development Guide](DEVELOPMENT.md)
3. Read inline code comments in source files

### "I want to contribute"
1. Read [Development Guide](DEVELOPMENT.md)
2. Review [Testing Guide](testing-guide.md)
3. Check [Changelog](../CHANGELOG.md) for current status
4. See Git workflow section

### "I want to report a bug"
1. Use template in [Testing Guide](testing-guide.md)
2. Check [Known Issues](#known-issues)
3. Include console errors and screenshots

---

## 📊 Documentation Statistics

| Category | Files | Lines | Topics |
|----------|-------|-------|--------|
| User Guides | 2 | ~700 | Quick start, Features |
| Developer Guides | 3 | ~1200 | Contributing, Architecture, Testing |
| Technical Specs | 2 | ~500 | Implementation, Feature spec |
| Project Docs | 2 | ~400 | Design, Summary |
| **Total** | **9** | **~2800** | **All aspects** |

---

## 🔍 Find Documentation By Topic

### Component System
- [Visual Builder Guide](visual-builder-guide.md) - Component Library section
- [Development Guide](DEVELOPMENT.md) - Adding Components
- [Architecture](ARCHITECTURE.md) - Component Registry
- Source: `extension/mjmlComponents.js`

### Drag-and-Drop
- [Quick Start](quick-start-visual-builder.md) - Usage
- [Feature Spec](drag-and-drop-feature.md) - Requirements
- [Architecture](ARCHITECTURE.md) - Event Flow
- Source: `extension/mjmlVisualBuilder.js`

### Component Tree
- [Visual Builder Guide](visual-builder-guide.md) - Data Structure
- [Development Guide](DEVELOPMENT.md) - Tree Operations
- [Architecture](ARCHITECTURE.md) - Tree Structure
- Source: `extension/mjmlTreeUtils.js`

### Property Editing
- [Quick Start](quick-start-visual-builder.md) - Customize Appearance
- [Visual Builder Guide](visual-builder-guide.md) - Property Editor
- [Development Guide](DEVELOPMENT.md) - Adding Property Types
- Source: `extension/mjmlVisualBuilder.js`

### Templates
- [Quick Start](quick-start-visual-builder.md) - Workflow
- [Visual Builder Guide](visual-builder-guide.md) - Template Storage
- [Architecture](ARCHITECTURE.md) - Storage Structure
- Source: `extension/mjmlEditor.js`, `extension/content.js`

### Mode Switching
- [Visual Builder Guide](visual-builder-guide.md) - Multi-Mode Editor
- [Architecture](ARCHITECTURE.md) - Mode Switching Flow
- Source: `extension/mjmlEditor.js`

---

## ❓ Troubleshooting

### Common Issues

**Issue**: Can't find documentation  
**Solution**: Use this index or search by topic above

**Issue**: Documentation outdated  
**Solution**: Check [Changelog](../CHANGELOG.md) for latest version

**Issue**: Missing information  
**Solution**: Check inline code comments or file an issue

**Issue**: Conflicting information  
**Solution**: [Implementation Summary](IMPLEMENTATION_SUMMARY.md) is most current

---

## 🔄 Documentation Updates

### When to Update Documentation

1. **Adding Features**: Update relevant guides + architecture
2. **Bug Fixes**: Update troubleshooting sections
3. **API Changes**: Update API reference + examples
4. **Breaking Changes**: Update migration guide

### Documentation Checklist

When making changes:
- [ ] Update relevant user guides
- [ ] Update developer documentation
- [ ] Update architecture diagrams if needed
- [ ] Add to changelog
- [ ] Update this index if adding files
- [ ] Review for accuracy

---

## 📝 Documentation Standards

### Writing Style
- Clear, concise language
- Active voice
- Examples for complex topics
- Code snippets with syntax highlighting
- Screenshots where helpful

### Markdown Format
- Headers for navigation
- Code blocks with language tags
- Tables for structured data
- Lists for step-by-step
- Links for cross-references

### File Naming
- Lowercase with hyphens
- Descriptive names
- `.md` extension
- Group by topic

---

## 🎓 Learning Path

### Beginner
1. [Quick Start Guide](quick-start-visual-builder.md)
2. [Visual Builder Guide](visual-builder-guide.md) - Basic sections
3. Try examples from guides

### Intermediate
1. [Visual Builder Guide](visual-builder-guide.md) - Advanced sections
2. [Development Guide](DEVELOPMENT.md) - Overview
3. [Architecture](ARCHITECTURE.md) - Data Flow

### Advanced
1. [Development Guide](DEVELOPMENT.md) - Complete
2. [Architecture](ARCHITECTURE.md) - Complete
3. [Testing Guide](testing-guide.md)
4. Source code review

---

## 📞 Getting Help

1. **Check documentation** - Most questions answered here
2. **Search issues** - Someone may have asked already
3. **File an issue** - Use bug template
4. **Code comments** - Inline documentation in source

---

## 🚀 Next Steps

### For Users
- Complete [Quick Start](quick-start-visual-builder.md)
- Build your first email template
- Save and share templates

### For Developers
- Review [Architecture](ARCHITECTURE.md)
- Set up development environment
- Run tests from [Testing Guide](testing-guide.md)
- Make your first contribution

---

## 📄 Document Versions

All documentation current as of **Version 0.2.0** (January 2, 2026)

See [Changelog](../CHANGELOG.md) for version history.

---

**Last Updated**: January 2, 2026  
**Documentation Version**: 0.2.0  
**Total Pages**: 9 major documents  
**Status**: ✅ Complete
