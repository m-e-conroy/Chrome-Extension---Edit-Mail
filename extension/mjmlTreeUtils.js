// mjmlTreeUtils.js - Component tree data structure and MJML conversion utilities

/**
 * Generate a unique component ID
 */
let componentIdCounter = 0;
function generateComponentId() {
  return `comp-${++componentIdCounter}`;
}

/**
 * Create a new component instance
 */
function createComponent(componentType, properties = {}, children = [], content = '') {
  const metadata = window.getComponentMetadata(componentType);
  if (!metadata) {
    console.error(`Unknown component type: ${componentType}`);
    return null;
  }
  
  // Merge default properties with provided properties
  const props = { ...metadata.defaultProps, ...properties };
  
  // Use default content if not provided
  const componentContent = content || metadata.defaultContent || '';
  
  return {
    id: generateComponentId(),
    type: componentType,
    properties: props,
    children: children,
    content: componentContent
  };
}

/**
 * Convert component tree to MJML string
 */
function componentTreeToMJML(tree, indentLevel = 0) {
  if (!Array.isArray(tree)) {
    tree = [tree];
  }
  
  const indent = '  '.repeat(indentLevel);
  
  return tree.map(component => {
    if (!component || !component.type) return '';
    
    // Build attributes string
    const attributes = Object.entries(component.properties || {})
      .filter(([key, value]) => value !== '' && value !== null && value !== undefined)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');
    
    const attrsString = attributes ? ' ' + attributes : '';
    
    // Handle children
    const hasChildren = component.children && component.children.length > 0;
    const hasContent = component.content && component.content.trim() !== '';
    
    if (!hasChildren && !hasContent) {
      // Self-closing tag
      return `${indent}<${component.type}${attrsString} />`;
    }
    
    // Opening tag
    let mjml = `${indent}<${component.type}${attrsString}>`;
    
    // Add content if present
    if (hasContent) {
      mjml += `\n${indent}  ${component.content}\n${indent}`;
    }
    
    // Add children if present
    if (hasChildren) {
      mjml += '\n' + componentTreeToMJML(component.children, indentLevel + 1) + '\n' + indent;
    }
    
    // Closing tag
    mjml += `</${component.type}>`;
    
    return mjml;
  }).join('\n');
}

/**
 * Parse MJML string to component tree
 */
function mjmlToComponentTree(mjmlString) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(mjmlString, 'text/xml');
    
    // Check for parsing errors
    const parserError = doc.querySelector('parsererror');
    if (parserError) {
      console.error('MJML parsing error:', parserError.textContent);
      return null;
    }
    
    // Find the root element (usually <mjml>)
    const root = doc.documentElement;
    
    if (root.nodeName.toLowerCase() === 'parsererror') {
      console.error('MJML parsing error');
      return null;
    }
    
    return parseElement(root);
  } catch (error) {
    console.error('Error parsing MJML:', error);
    return null;
  }
}

/**
 * Recursively parse an XML element into a component
 */
function parseElement(element) {
  const tagName = element.nodeName.toLowerCase();
  
  // Skip text nodes and comments
  if (element.nodeType !== 1) return null;
  
  // Extract attributes as properties
  const properties = {};
  for (let attr of element.attributes) {
    properties[attr.name] = attr.value;
  }
  
  // Extract text content (for components like mj-text, mj-button)
  let content = '';
  const directTextNodes = Array.from(element.childNodes).filter(node => 
    node.nodeType === 3 && node.textContent.trim() !== ''
  );
  
  if (directTextNodes.length > 0) {
    content = directTextNodes.map(node => node.textContent).join('').trim();
  }
  
  // Components that can contain HTML content (not MJML components)
  const htmlContentComponents = ['mj-table', 'mj-text', 'mj-button', 'mj-navbar-link'];
  
  // If it's an HTML-containing element, get innerHTML and skip parsing children
  if (htmlContentComponents.includes(tagName)) {
    const htmlContent = element.innerHTML.trim();
    if (htmlContent && !htmlContent.startsWith('<mj-')) {
      content = htmlContent;
    }
  }
  
  // Parse children (but skip for HTML content components)
  const children = [];
  if (!htmlContentComponents.includes(tagName)) {
    for (let child of element.children) {
      const parsed = parseElement(child);
      if (parsed) {
        children.push(parsed);
      }
    }
  }
  
  return createComponent(tagName, properties, children, content);
}

/**
 * Find a component in the tree by ID
 */
function findComponentById(tree, id) {
  if (!Array.isArray(tree)) {
    tree = [tree];
  }
  
  for (let component of tree) {
    if (component.id === id) {
      return component;
    }
    
    if (component.children && component.children.length > 0) {
      const found = findComponentById(component.children, id);
      if (found) return found;
    }
  }
  
  return null;
}

/**
 * Update a component's properties
 */
function updateComponentProperties(tree, componentId, newProperties) {
  const component = findComponentById(tree, componentId);
  if (component) {
    component.properties = { ...component.properties, ...newProperties };
    return true;
  }
  return false;
}

/**
 * Update a component's content
 */
function updateComponentContent(tree, componentId, newContent) {
  const component = findComponentById(tree, componentId);
  if (component) {
    component.content = newContent;
    return true;
  }
  return false;
}

/**
 * Insert a component into the tree
 */
function insertComponent(tree, parentId, newComponent, position = 'end') {
  if (parentId === 'root') {
    // Insert at root level
    if (position === 'end') {
      tree.push(newComponent);
    } else if (typeof position === 'number') {
      tree.splice(position, 0, newComponent);
    } else {
      tree.unshift(newComponent);
    }
    return true;
  }
  
  const parent = findComponentById(tree, parentId);
  if (parent) {
    if (!parent.children) {
      parent.children = [];
    }
    
    if (position === 'end') {
      parent.children.push(newComponent);
    } else if (typeof position === 'number') {
      parent.children.splice(position, 0, newComponent);
    } else {
      parent.children.unshift(newComponent);
    }
    return true;
  }
  
  return false;
}

/**
 * Remove a component from the tree
 */
function removeComponent(tree, componentId) {
  if (!Array.isArray(tree)) {
    return false;
  }
  
  // Check if component is at root level
  const rootIndex = tree.findIndex(comp => comp.id === componentId);
  if (rootIndex !== -1) {
    tree.splice(rootIndex, 1);
    return true;
  }
  
  // Recursively search children
  for (let component of tree) {
    if (component.children && component.children.length > 0) {
      const childIndex = component.children.findIndex(child => child.id === componentId);
      if (childIndex !== -1) {
        component.children.splice(childIndex, 1);
        return true;
      }
      
      // Recursively search deeper
      if (removeComponent(component.children, componentId)) {
        return true;
      }
    }
  }
  
  return false;
}

/**
 * Move a component to a new position
 */
function moveComponent(tree, componentId, newParentId, position = 'end') {
  // Find the component and its current parent
  const component = findComponentById(tree, componentId);
  if (!component) return false;
  
  // Find component's current position
  let currentParentId = 'root';
  let currentIndex = -1;
  
  // Check if at root level
  currentIndex = tree.findIndex(c => c.id === componentId);
  
  // If not at root, find in nested structure
  if (currentIndex === -1) {
    function findParent(nodes, targetId, parentId = 'root') {
      for (let node of nodes) {
        if (node.children) {
          const childIndex = node.children.findIndex(c => c.id === targetId);
          if (childIndex !== -1) {
            return { parentId: node.id, index: childIndex };
          }
          const result = findParent(node.children, targetId, node.id);
          if (result) return result;
        }
      }
      return null;
    }
    const parentInfo = findParent(tree, componentId);
    if (parentInfo) {
      currentParentId = parentInfo.parentId;
      currentIndex = parentInfo.index;
    }
  }
  
  // Clone the component
  const clonedComponent = JSON.parse(JSON.stringify(component));
  
  // If moving within the same parent and position is a number, adjust for removal
  let adjustedPosition = position;
  if (currentParentId === newParentId && typeof position === 'number' && currentIndex !== -1) {
    // If current position is before target position, decrement target
    // because removal will shift everything down
    if (currentIndex < position) {
      adjustedPosition = position - 1;
    }
  }
  
  // Remove from old location
  if (!removeComponent(tree, componentId)) return false;
  
  // Insert at new location with adjusted position
  return insertComponent(tree, newParentId, clonedComponent, adjustedPosition);
}

/**
 * Wrap a complete MJML document around component tree
 */
function wrapWithMjmlDocument(componentTree) {
  // If tree already starts with mjml, return as is
  if (Array.isArray(componentTree) && componentTree.length > 0 && componentTree[0].type === 'mjml') {
    return componentTreeToMJML(componentTree);
  }
  
  // Otherwise, wrap in mjml > mj-body structure
  const mjmlDoc = createComponent('mjml', {}, [
    createComponent('mj-body', {}, Array.isArray(componentTree) ? componentTree : [componentTree])
  ]);
  
  return componentTreeToMJML(mjmlDoc);
}

/**
 * Validate component tree structure
 */
function validateComponentTree(tree) {
  const errors = [];
  
  function validateNode(node, parentType = null) {
    if (!node || !node.type) {
      errors.push({ component: node, message: 'Invalid component: missing type' });
      return;
    }
    
    const metadata = window.getComponentMetadata(node.type);
    if (!metadata) {
      errors.push({ component: node, message: `Unknown component type: ${node.type}` });
      return;
    }
    
    // Validate parent-child relationship
    if (parentType && metadata.allowedParents && metadata.allowedParents.length > 0) {
      if (!metadata.allowedParents.includes(parentType)) {
        errors.push({ 
          component: node, 
          message: `${node.type} cannot be a child of ${parentType}. Allowed parents: ${metadata.allowedParents.join(', ')}` 
        });
      }
    }
    
    // Validate children
    if (node.children && node.children.length > 0) {
      if (metadata.allowedChildren && metadata.allowedChildren.length === 0) {
        errors.push({ 
          component: node, 
          message: `${node.type} cannot have children` 
        });
      } else {
        node.children.forEach(child => {
          if (metadata.allowedChildren && !metadata.allowedChildren.includes(child.type)) {
            errors.push({ 
              component: child, 
              message: `${child.type} is not allowed as a child of ${node.type}. Allowed children: ${metadata.allowedChildren.join(', ')}` 
            });
          }
          validateNode(child, node.type);
        });
      }
    }
  }
  
  if (Array.isArray(tree)) {
    tree.forEach(node => validateNode(node));
  } else {
    validateNode(tree);
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

// Export to window for global access
if (typeof window !== 'undefined') {
  window.generateComponentId = generateComponentId;
  window.createComponent = createComponent;
  window.componentTreeToMJML = componentTreeToMJML;
  window.mjmlToComponentTree = mjmlToComponentTree;
  window.findComponentById = findComponentById;
  window.updateComponentProperties = updateComponentProperties;
  window.updateComponentContent = updateComponentContent;
  window.insertComponent = insertComponent;
  window.removeComponent = removeComponent;
  window.moveComponent = moveComponent;
  window.wrapWithMjmlDocument = wrapWithMjmlDocument;
  window.validateComponentTree = validateComponentTree;
}
