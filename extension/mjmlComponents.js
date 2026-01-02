// mjmlComponents.js - Component metadata registry for drag-and-drop builder

/**
 * MJML Component Registry
 * Defines all available MJML components with their metadata, properties, and validation rules
 */

const MJML_COMPONENT_REGISTRY = {
  // Root/Structural Components (not draggable, but needed for parsing)
  'mjml': {
    displayName: 'MJML Root',
    category: 'structural',
    icon: '📄',
    description: 'Root MJML element',
    defaultProps: {},
    allowedParents: [],
    allowedChildren: ['mj-head', 'mj-body'],
    propertySchema: []
  },
  
  'mj-head': {
    displayName: 'Head',
    category: 'structural',
    icon: '📋',
    description: 'MJML head section for metadata and styles',
    defaultProps: {},
    allowedParents: ['mjml'],
    allowedChildren: ['mj-attributes', 'mj-breakpoint', 'mj-font', 'mj-preview', 'mj-style', 'mj-title'],
    propertySchema: []
  },
  
  'mj-body': {
    displayName: 'Body',
    category: 'structural',
    icon: '📄',
    description: 'MJML body section containing email content',
    defaultProps: {
      'width': '600px',
      'background-color': '#ffffff'
    },
    allowedParents: ['mjml'],
    allowedChildren: ['mj-section', 'mj-wrapper', 'mj-hero', 'mj-raw'],
    propertySchema: [
      { name: 'width', type: 'text', label: 'Width', default: '600px' },
      { name: 'background-color', type: 'color', label: 'Background Color', default: '#ffffff' }
    ]
  },
  
  'mj-attributes': {
    displayName: 'Attributes',
    category: 'structural',
    icon: '⚙️',
    description: 'Define default attributes for components',
    defaultProps: {},
    allowedParents: ['mj-head'],
    allowedChildren: ['mj-all', 'mj-class'],
    propertySchema: []
  },
  
  'mj-breakpoint': {
    displayName: 'Breakpoint',
    category: 'structural',
    icon: '📱',
    description: 'Define mobile breakpoint',
    defaultProps: {
      'width': '480px'
    },
    allowedParents: ['mj-head'],
    allowedChildren: [],
    propertySchema: [
      { name: 'width', type: 'text', label: 'Breakpoint Width', default: '480px' }
    ]
  },
  
  'mj-font': {
    displayName: 'Font',
    category: 'structural',
    icon: '🔤',
    description: 'Import web fonts',
    defaultProps: {
      'name': '',
      'href': ''
    },
    allowedParents: ['mj-head'],
    allowedChildren: [],
    propertySchema: [
      { name: 'name', type: 'text', label: 'Font Name', default: '' },
      { name: 'href', type: 'text', label: 'Font URL', default: '' }
    ]
  },
  
  'mj-preview': {
    displayName: 'Preview',
    category: 'structural',
    icon: '👁️',
    description: 'Email preview text',
    defaultProps: {},
    defaultContent: 'Preview text here...',
    allowedParents: ['mj-head'],
    allowedChildren: [],
    propertySchema: []
  },
  
  'mj-style': {
    displayName: 'Style',
    category: 'structural',
    icon: '🎨',
    description: 'Add custom CSS',
    defaultProps: {},
    defaultContent: '/* Custom CSS here */',
    allowedParents: ['mj-head'],
    allowedChildren: [],
    propertySchema: [
      { name: 'inline', type: 'select', label: 'Inline', options: ['inline', ''], default: '' }
    ]
  },
  
  'mj-title': {
    displayName: 'Title',
    category: 'structural',
    icon: '📌',
    description: 'Email title (subject fallback)',
    defaultProps: {},
    defaultContent: 'Email Title',
    allowedParents: ['mj-head'],
    allowedChildren: [],
    propertySchema: []
  },
  
  'mj-raw': {
    displayName: 'Raw',
    category: 'structural',
    icon: '📝',
    description: 'Raw HTML content',
    defaultProps: {},
    defaultContent: '<!-- Raw HTML here -->',
    allowedParents: ['mj-body', 'mj-column'],
    allowedChildren: [],
    propertySchema: []
  },

  // Layout Components
  'mj-section': {
    displayName: 'Section',
    category: 'layout',
    icon: '📦',
    description: 'A horizontal section container',
    defaultProps: {
      'padding': '20px 0',
      'background-color': '#ffffff'
    },
    allowedParents: ['mj-body', 'mj-wrapper'],
    allowedChildren: ['mj-column', 'mj-group'],
    propertySchema: [
      { name: 'background-color', type: 'color', label: 'Background Color', default: '#ffffff' },
      { name: 'background-url', type: 'text', label: 'Background Image URL', default: '' },
      { name: 'padding', type: 'text', label: 'Padding', default: '20px 0' },
      { name: 'text-align', type: 'select', label: 'Text Align', options: ['left', 'center', 'right'], default: 'center' },
      { name: 'border', type: 'text', label: 'Border', default: '' },
      { name: 'border-radius', type: 'text', label: 'Border Radius', default: '0' }
    ]
  },
  
  'mj-column': {
    displayName: 'Column',
    category: 'layout',
    icon: '📋',
    description: 'A vertical column within a section',
    defaultProps: {
      'width': '100%'
    },
    allowedParents: ['mj-section', 'mj-group'],
    allowedChildren: ['mj-text', 'mj-image', 'mj-button', 'mj-divider', 'mj-spacer', 'mj-social', 'mj-table', 'mj-navbar'],
    propertySchema: [
      { name: 'width', type: 'text', label: 'Width', default: '100%' },
      { name: 'background-color', type: 'color', label: 'Background Color', default: '' },
      { name: 'padding', type: 'text', label: 'Padding', default: '0' },
      { name: 'border', type: 'text', label: 'Border', default: '' },
      { name: 'vertical-align', type: 'select', label: 'Vertical Align', options: ['top', 'middle', 'bottom'], default: 'top' }
    ]
  },
  
  'mj-group': {
    displayName: 'Group',
    category: 'layout',
    icon: '🗂️',
    description: 'Group columns for mobile responsive behavior',
    defaultProps: {},
    allowedParents: ['mj-section'],
    allowedChildren: ['mj-column'],
    propertySchema: [
      { name: 'width', type: 'text', label: 'Width', default: '100%' },
      { name: 'background-color', type: 'color', label: 'Background Color', default: '' },
      { name: 'vertical-align', type: 'select', label: 'Vertical Align', options: ['top', 'middle', 'bottom'], default: 'top' }
    ]
  },
  
  'mj-wrapper': {
    displayName: 'Wrapper',
    category: 'layout',
    icon: '📦',
    description: 'Wrap multiple sections with shared styling',
    defaultProps: {},
    allowedParents: ['mj-body'],
    allowedChildren: ['mj-section'],
    propertySchema: [
      { name: 'background-color', type: 'color', label: 'Background Color', default: '' },
      { name: 'padding', type: 'text', label: 'Padding', default: '0' },
      { name: 'border', type: 'text', label: 'Border', default: '' }
    ]
  },

  // Content Components
  'mj-text': {
    displayName: 'Text',
    category: 'content',
    icon: '📝',
    description: 'Add text content',
    defaultProps: {
      'font-size': '16px',
      'color': '#000000',
      'line-height': '1.5'
    },
    defaultContent: 'Enter your text here...',
    allowedParents: ['mj-column', 'mj-hero'],
    allowedChildren: [],
    propertySchema: [
      { name: 'color', type: 'color', label: 'Text Color', default: '#000000' },
      { name: 'font-family', type: 'text', label: 'Font Family', default: 'Arial, sans-serif' },
      { name: 'font-size', type: 'text', label: 'Font Size', default: '16px' },
      { name: 'font-weight', type: 'select', label: 'Font Weight', options: ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'], default: 'normal' },
      { name: 'line-height', type: 'text', label: 'Line Height', default: '1.5' },
      { name: 'align', type: 'select', label: 'Align', options: ['left', 'center', 'right', 'justify'], default: 'left' },
      { name: 'padding', type: 'text', label: 'Padding', default: '10px 25px' }
    ]
  },
  
  'mj-image': {
    displayName: 'Image',
    category: 'content',
    icon: '🖼️',
    description: 'Add an image',
    defaultProps: {
      'src': 'https://via.placeholder.com/600x200',
      'alt': 'Image description',
      'width': '600px'
    },
    allowedParents: ['mj-column', 'mj-hero'],
    allowedChildren: [],
    propertySchema: [
      { name: 'src', type: 'text', label: 'Image URL', default: 'https://via.placeholder.com/600x200' },
      { name: 'alt', type: 'text', label: 'Alt Text', default: 'Image description' },
      { name: 'width', type: 'text', label: 'Width', default: '600px' },
      { name: 'height', type: 'text', label: 'Height', default: 'auto' },
      { name: 'align', type: 'select', label: 'Align', options: ['left', 'center', 'right'], default: 'center' },
      { name: 'href', type: 'text', label: 'Link URL', default: '' },
      { name: 'padding', type: 'text', label: 'Padding', default: '10px 25px' },
      { name: 'border', type: 'text', label: 'Border', default: 'none' },
      { name: 'border-radius', type: 'text', label: 'Border Radius', default: '0' }
    ]
  },
  
  'mj-button': {
    displayName: 'Button',
    category: 'content',
    icon: '🔘',
    description: 'Add a clickable button',
    defaultProps: {
      'background-color': '#e56a54',
      'color': '#ffffff',
      'href': 'https://example.com'
    },
    defaultContent: 'Click Here',
    allowedParents: ['mj-column', 'mj-hero'],
    allowedChildren: [],
    propertySchema: [
      { name: 'href', type: 'text', label: 'Link URL', default: 'https://example.com' },
      { name: 'background-color', type: 'color', label: 'Background Color', default: '#e56a54' },
      { name: 'color', type: 'color', label: 'Text Color', default: '#ffffff' },
      { name: 'font-size', type: 'text', label: 'Font Size', default: '16px' },
      { name: 'font-weight', type: 'select', label: 'Font Weight', options: ['normal', 'bold'], default: 'bold' },
      { name: 'border-radius', type: 'text', label: 'Border Radius', default: '3px' },
      { name: 'padding', type: 'text', label: 'Padding', default: '10px 25px' },
      { name: 'width', type: 'text', label: 'Width', default: 'auto' },
      { name: 'align', type: 'select', label: 'Align', options: ['left', 'center', 'right'], default: 'center' }
    ]
  },

  // Formatting Components
  'mj-divider': {
    displayName: 'Divider',
    category: 'formatting',
    icon: '➖',
    description: 'Horizontal divider line',
    defaultProps: {
      'border-color': '#e0e0e0',
      'border-width': '1px'
    },
    allowedParents: ['mj-column'],
    allowedChildren: [],
    propertySchema: [
      { name: 'border-color', type: 'color', label: 'Border Color', default: '#e0e0e0' },
      { name: 'border-width', type: 'text', label: 'Border Width', default: '1px' },
      { name: 'border-style', type: 'select', label: 'Border Style', options: ['solid', 'dashed', 'dotted'], default: 'solid' },
      { name: 'width', type: 'text', label: 'Width', default: '100%' },
      { name: 'padding', type: 'text', label: 'Padding', default: '10px 25px' }
    ]
  },
  
  'mj-spacer': {
    displayName: 'Spacer',
    category: 'formatting',
    icon: '⬍',
    description: 'Add vertical spacing',
    defaultProps: {
      'height': '20px'
    },
    allowedParents: ['mj-column'],
    allowedChildren: [],
    propertySchema: [
      { name: 'height', type: 'text', label: 'Height', default: '20px' }
    ]
  },

  // Interactive Components
  'mj-social': {
    displayName: 'Social Icons',
    category: 'interactive',
    icon: '👥',
    description: 'Social media icons block',
    defaultProps: {
      'mode': 'horizontal',
      'icon-size': '20px'
    },
    allowedParents: ['mj-column'],
    allowedChildren: ['mj-social-element'],
    propertySchema: [
      { name: 'mode', type: 'select', label: 'Mode', options: ['horizontal', 'vertical'], default: 'horizontal' },
      { name: 'icon-size', type: 'text', label: 'Icon Size', default: '20px' },
      { name: 'align', type: 'select', label: 'Align', options: ['left', 'center', 'right'], default: 'center' },
      { name: 'padding', type: 'text', label: 'Padding', default: '10px 25px' }
    ]
  },
  
  'mj-social-element': {
    displayName: 'Social Link',
    category: 'interactive',
    icon: '🔗',
    description: 'Individual social media link',
    defaultProps: {
      'name': 'facebook',
      'href': 'https://facebook.com'
    },
    allowedParents: ['mj-social'],
    allowedChildren: [],
    propertySchema: [
      { name: 'name', type: 'select', label: 'Platform', options: ['facebook', 'twitter', 'google', 'instagram', 'linkedin', 'pinterest', 'youtube', 'snapchat', 'github', 'web'], default: 'facebook' },
      { name: 'href', type: 'text', label: 'Link URL', default: 'https://facebook.com' },
      { name: 'icon-size', type: 'text', label: 'Icon Size', default: '20px' },
      { name: 'background-color', type: 'color', label: 'Background Color', default: '' }
    ]
  },
  
  'mj-navbar': {
    displayName: 'Navigation Bar',
    category: 'interactive',
    icon: '🧭',
    description: 'Navigation menu',
    defaultProps: {},
    allowedParents: ['mj-column'],
    allowedChildren: ['mj-navbar-link'],
    propertySchema: [
      { name: 'base-url', type: 'text', label: 'Base URL', default: '' },
      { name: 'align', type: 'select', label: 'Align', options: ['left', 'center', 'right'], default: 'center' }
    ]
  },
  
  'mj-navbar-link': {
    displayName: 'Nav Link',
    category: 'interactive',
    icon: '🔗',
    description: 'Navigation link',
    defaultProps: {
      'href': '#',
      'color': '#000000'
    },
    defaultContent: 'Link',
    allowedParents: ['mj-navbar'],
    allowedChildren: [],
    propertySchema: [
      { name: 'href', type: 'text', label: 'Link URL', default: '#' },
      { name: 'color', type: 'color', label: 'Text Color', default: '#000000' },
      { name: 'font-size', type: 'text', label: 'Font Size', default: '13px' },
      { name: 'font-weight', type: 'select', label: 'Font Weight', options: ['normal', 'bold'], default: 'normal' }
    ]
  },

  // Advanced Components
  'mj-hero': {
    displayName: 'Hero',
    category: 'advanced',
    icon: '🎭',
    description: 'Hero section with background image',
    defaultProps: {
      'mode': 'fixed-height',
      'height': '400px',
      'background-url': 'https://via.placeholder.com/600x400'
    },
    allowedParents: ['mj-body', 'mj-wrapper'],
    allowedChildren: ['mj-text', 'mj-button', 'mj-image'],
    propertySchema: [
      { name: 'mode', type: 'select', label: 'Mode', options: ['fixed-height', 'fluid-height'], default: 'fixed-height' },
      { name: 'height', type: 'text', label: 'Height', default: '400px' },
      { name: 'background-url', type: 'text', label: 'Background Image', default: 'https://via.placeholder.com/600x400' },
      { name: 'background-color', type: 'color', label: 'Background Color', default: '#ffffff' },
      { name: 'background-position', type: 'text', label: 'Background Position', default: 'center center' },
      { name: 'vertical-align', type: 'select', label: 'Vertical Align', options: ['top', 'middle', 'bottom'], default: 'middle' }
    ]
  },
  
  'mj-carousel': {
    displayName: 'Carousel',
    category: 'advanced',
    icon: '🎠',
    description: 'Image carousel/slideshow',
    defaultProps: {
      'icon-width': '44px'
    },
    allowedParents: ['mj-column'],
    allowedChildren: ['mj-carousel-image'],
    propertySchema: [
      { name: 'icon-width', type: 'text', label: 'Icon Width', default: '44px' },
      { name: 'left-icon', type: 'text', label: 'Left Icon URL', default: '' },
      { name: 'right-icon', type: 'text', label: 'Right Icon URL', default: '' },
      { name: 'thumbnails', type: 'select', label: 'Show Thumbnails', options: ['visible', 'hidden'], default: 'visible' }
    ]
  },
  
  'mj-carousel-image': {
    displayName: 'Carousel Image',
    category: 'advanced',
    icon: '🖼️',
    description: 'Image in a carousel',
    defaultProps: {
      'src': 'https://via.placeholder.com/600x400'
    },
    allowedParents: ['mj-carousel'],
    allowedChildren: [],
    propertySchema: [
      { name: 'src', type: 'text', label: 'Image URL', default: 'https://via.placeholder.com/600x400' },
      { name: 'alt', type: 'text', label: 'Alt Text', default: '' },
      { name: 'href', type: 'text', label: 'Link URL', default: '' },
      { name: 'thumbnails-src', type: 'text', label: 'Thumbnail URL', default: '' }
    ]
  },
  
  'mj-accordion': {
    displayName: 'Accordion',
    category: 'advanced',
    icon: '📁',
    description: 'Expandable accordion',
    defaultProps: {},
    allowedParents: ['mj-column'],
    allowedChildren: ['mj-accordion-element'],
    propertySchema: [
      { name: 'icon-align', type: 'select', label: 'Icon Align', options: ['left', 'right'], default: 'right' },
      { name: 'icon-wrapped-url', type: 'text', label: 'Wrapped Icon URL', default: '' },
      { name: 'icon-unwrapped-url', type: 'text', label: 'Unwrapped Icon URL', default: '' },
      { name: 'border', type: 'text', label: 'Border', default: '2px solid black' }
    ]
  },
  
  'mj-accordion-element': {
    displayName: 'Accordion Item',
    category: 'advanced',
    icon: '📄',
    description: 'Accordion item',
    defaultProps: {},
    allowedParents: ['mj-accordion'],
    allowedChildren: ['mj-accordion-title', 'mj-accordion-text'],
    propertySchema: [
      { name: 'background-color', type: 'color', label: 'Background Color', default: '' },
      { name: 'icon-align', type: 'select', label: 'Icon Align', options: ['left', 'middle', 'right'], default: 'right' }
    ]
  },
  
  'mj-table': {
    displayName: 'Table',
    category: 'content',
    icon: '📊',
    description: 'Data table',
    defaultProps: {
      'width': '100%'
    },
    defaultContent: '<tr><td>Row 1, Col 1</td><td>Row 1, Col 2</td></tr><tr><td>Row 2, Col 1</td><td>Row 2, Col 2</td></tr>',
    allowedParents: ['mj-column'],
    allowedChildren: [],
    propertySchema: [
      { name: 'width', type: 'text', label: 'Width', default: '100%' },
      { name: 'color', type: 'color', label: 'Text Color', default: '#000000' },
      { name: 'font-size', type: 'text', label: 'Font Size', default: '13px' },
      { name: 'line-height', type: 'text', label: 'Line Height', default: '22px' },
      { name: 'padding', type: 'text', label: 'Padding', default: '10px 25px' }
    ]
  }
};

/**
 * Get component metadata by tag name
 */
function getComponentMetadata(tagName) {
  return MJML_COMPONENT_REGISTRY[tagName] || null;
}

/**
 * Get all components by category
 */
function getComponentsByCategory(category) {
  return Object.entries(MJML_COMPONENT_REGISTRY)
    .filter(([_, meta]) => meta.category === category)
    .map(([tag, meta]) => ({ tag, ...meta }));
}

/**
 * Get all categories
 */
function getCategories() {
  const categories = new Set();
  Object.values(MJML_COMPONENT_REGISTRY).forEach(meta => {
    categories.add(meta.category);
  });
  return Array.from(categories);
}

/**
 * Validate if a component can be dropped into a parent
 */
function isValidDrop(parentTag, childTag) {
  const childMeta = getComponentMetadata(childTag);
  if (!childMeta) return false;
  
  if (!childMeta.allowedParents || childMeta.allowedParents.length === 0) {
    return true; // No restrictions
  }
  
  return childMeta.allowedParents.includes(parentTag);
}

/**
 * Validate if a component can have specific children
 */
function canHaveChild(parentTag, childTag) {
  const parentMeta = getComponentMetadata(parentTag);
  if (!parentMeta) return false;
  
  if (!parentMeta.allowedChildren || parentMeta.allowedChildren.length === 0) {
    return false; // Cannot have children
  }
  
  return parentMeta.allowedChildren.includes(childTag);
}

// Export functions to window for global access
if (typeof window !== 'undefined') {
  window.MJML_COMPONENT_REGISTRY = MJML_COMPONENT_REGISTRY;
  window.getComponentMetadata = getComponentMetadata;
  window.getComponentsByCategory = getComponentsByCategory;
  window.getCategories = getCategories;
  window.isValidDrop = isValidDrop;
  window.canHaveChild = canHaveChild;
}
