// mjmlVisualBuilder.js - Drag-and-drop visual builder for MJML components

(function() {
  'use strict';
  
  // State management
  let currentComponentTree = [];
  let selectedComponentId = null;
  let currentMode = 'visual'; // 'visual', 'code', 'split'
  let draggedComponentType = null;
  let onTreeChangeCallback = null;
  
  /**
   * Initialize the visual builder
   */
  function initVisualBuilder(containerElement, options = {}) {
    const {
      initialMJML = '',
      onTreeChange = null,
      onModeChange = null
    } = options;
    
    // Store callbacks
    onTreeChangeCallback = onTreeChange;
    
    // Parse initial MJML if provided
    if (initialMJML) {
      const parsed = window.mjmlToComponentTree(initialMJML);
      if (parsed) {
        // Extract just the body children if it's a full document
        if (parsed.type === 'mjml') {
          const body = parsed.children?.find(c => c.type === 'mj-body');
          currentComponentTree = body ? body.children || [] : [];
        } else {
          currentComponentTree = [parsed];
        }
      }
    }
    
    // Render the visual builder UI
    renderVisualBuilder(containerElement);
    
    // Set up event listeners
    setupEventListeners();
    
    // Return API for external interaction
    return {
      getComponentTree: () => currentComponentTree,
      setComponentTree: (tree) => {
        currentComponentTree = tree;
        refreshCanvas();
      },
      getMJML: () => window.wrapWithMjmlDocument(currentComponentTree),
      setMJML: (mjml) => {
        const parsed = window.mjmlToComponentTree(mjml);
        if (parsed) {
          if (parsed.type === 'mjml') {
            const body = parsed.children?.find(c => c.type === 'mj-body');
            currentComponentTree = body ? body.children || [] : [];
          } else {
            currentComponentTree = [parsed];
          }
          refreshCanvas();
        }
      },
      getSelectedComponent: () => selectedComponentId,
      selectComponent: (id) => {
        selectedComponentId = id;
        refreshCanvas();
        refreshPropertyPanel();
      }
    };
  }
  
  /**
   * Render the complete visual builder UI
   */
  function renderVisualBuilder(container) {
    container.innerHTML = `
      <div class="mjml-visual-builder">
        <div class="visual-builder-layout">
          <!-- Component Library Sidebar -->
          <div class="component-library-panel">
            <div class="panel-header">Components</div>
            <div class="component-search">
              <input type="text" placeholder="Search components..." id="component-search-input" />
            </div>
            <div class="component-categories" id="component-categories"></div>
          </div>
          
          <!-- Canvas Area -->
          <div class="canvas-area">
            <div class="canvas-toolbar">
              <button id="canvas-clear-btn" class="toolbar-btn" title="Clear Canvas">
                <span>🗑️</span> Clear
              </button>
              <button id="canvas-undo-btn" class="toolbar-btn" title="Undo">
                <span>↶</span> Undo
              </button>
              <button id="canvas-validate-btn" class="toolbar-btn" title="Validate">
                <span>✓</span> Validate
              </button>
            </div>
            <div class="canvas-content" id="canvas-content">
              <div class="canvas-drop-zone" 
                   data-parent-id="root" 
                   data-parent-type="mj-body">
                <div class="empty-canvas-message">
                  <div class="empty-icon">🎨</div>
                  <p>Drag components here to start building</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Property Editor Sidebar -->
          <div class="property-editor-panel">
            <div class="panel-header">Properties</div>
            <div class="property-content" id="property-content">
              <div class="no-selection-message">
                <p>Select a component to edit properties</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Add styles
    injectVisualBuilderStyles();
    
    // Render component library
    renderComponentLibrary();
    
    // Initial canvas render
    refreshCanvas();
  }
  
  /**
   * Inject CSS styles for the visual builder
   */
  function injectVisualBuilderStyles() {
    if (document.getElementById('mjml-visual-builder-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'mjml-visual-builder-styles';
    style.textContent = `
      .mjml-visual-builder {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: #1e1e1e;
        color: #d4d4d4;
      }
      
      .visual-builder-layout {
        display: flex;
        flex: 1;
        overflow: hidden;
      }
      
      /* Component Library Panel */
      .component-library-panel {
        width: 260px;
        background: #252526;
        border-right: 1px solid #333;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      
      .panel-header {
        padding: 12px 16px;
        background: #2d2d2d;
        border-bottom: 1px solid #333;
        font-weight: bold;
        color: #e56a54;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .component-search {
        padding: 12px;
        border-bottom: 1px solid #333;
      }
      
      .component-search input {
        width: 100%;
        padding: 8px 12px;
        background: #1e1e1e;
        border: 1px solid #444;
        border-radius: 4px;
        color: #d4d4d4;
        font-size: 13px;
      }
      
      .component-search input:focus {
        outline: none;
        border-color: #e56a54;
      }
      
      .component-categories {
        flex: 1;
        overflow-y: auto;
        padding: 8px;
      }
      
      .component-category {
        margin-bottom: 16px;
      }
      
      .category-title {
        padding: 8px 8px 4px 8px;
        font-size: 11px;
        text-transform: uppercase;
        color: #888;
        font-weight: 600;
        letter-spacing: 0.5px;
      }
      
      .component-item {
        padding: 10px 12px;
        margin: 4px 0;
        background: #2d2d2d;
        border: 1px solid #333;
        border-radius: 4px;
        cursor: grab;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .component-item:hover {
        background: #3d3d3d;
        border-color: #e56a54;
        transform: translateX(2px);
      }
      
      .component-item:active {
        cursor: grabbing;
      }
      
      .component-icon {
        font-size: 18px;
        flex-shrink: 0;
      }
      
      .component-info {
        flex: 1;
        min-width: 0;
      }
      
      .component-name {
        font-size: 13px;
        font-weight: 500;
        color: #d4d4d4;
        margin-bottom: 2px;
      }
      
      .component-desc {
        font-size: 11px;
        color: #888;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      /* Canvas Area */
      .canvas-area {
        flex: 1;
        display: flex;
        flex-direction: column;
        background: #1a1a1a;
        min-width: 0;
      }
      
      .canvas-toolbar {
        padding: 8px 12px;
        background: #252526;
        border-bottom: 1px solid #333;
        display: flex;
        gap: 8px;
      }
      
      .toolbar-btn {
        padding: 6px 12px;
        background: #2d2d2d;
        border: 1px solid #444;
        border-radius: 4px;
        color: #d4d4d4;
        cursor: pointer;
        font-size: 12px;
        display: flex;
        align-items: center;
        gap: 6px;
        transition: all 0.2s;
      }
      
      .toolbar-btn:hover {
        background: #3d3d3d;
        border-color: #e56a54;
      }
      
      .canvas-content {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
      }
      
      .canvas-drop-zone {
        min-height: 100%;
        padding: 12px;
        border: 2px dashed #444;
        border-radius: 6px;
        transition: all 0.2s;
      }
      
      .canvas-drop-zone.drag-over {
        border-color: #e56a54;
        background: rgba(229, 106, 84, 0.05);
      }
      
      .empty-canvas-message {
        text-align: center;
        padding: 60px 20px;
        color: #666;
      }
      
      .empty-icon {
        font-size: 48px;
        margin-bottom: 16px;
      }
      
      .canvas-component {
        margin: 8px 0;
        padding: 12px;
        background: #252526;
        border: 2px solid #333;
        border-radius: 4px;
        position: relative;
        transition: all 0.2s;
      }
      
      .canvas-component:hover {
        border-color: #555;
      }
      
      .canvas-component.selected {
        border-color: #e56a54;
        box-shadow: 0 0 0 1px #e56a54;
      }
      
      .component-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
        padding-bottom: 8px;
        border-bottom: 1px solid #333;
      }
      
      .component-type {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        font-weight: 500;
        color: #e56a54;
      }
      
      .component-actions {
        display: flex;
        gap: 4px;
        opacity: 0;
        transition: opacity 0.2s;
      }
      
      .canvas-component:hover .component-actions {
        opacity: 1;
      }
      
      .component-action-btn {
        padding: 4px 8px;
        background: #2d2d2d;
        border: 1px solid #444;
        border-radius: 3px;
        color: #d4d4d4;
        cursor: pointer;
        font-size: 11px;
        transition: all 0.2s;
      }
      
      .component-action-btn:hover {
        background: #3d3d3d;
      }
      
      .component-action-btn.delete:hover {
        background: #dc3545;
        border-color: #dc3545;
      }
      
      .component-children {
        margin-left: 16px;
        padding-left: 12px;
        border-left: 2px solid #333;
      }
      
      .component-content-preview {
        padding: 8px;
        background: #1e1e1e;
        border-radius: 3px;
        font-size: 12px;
        color: #999;
        font-family: 'Courier New', monospace;
        max-height: 60px;
        overflow: hidden;
      }
      
      .nested-drop-zone {
        min-height: 40px;
        margin: 8px 0;
        padding: 8px;
        border: 1px dashed #444;
        border-radius: 4px;
        transition: all 0.2s;
      }
      
      .nested-drop-zone.drag-over {
        border-color: #e56a54;
        background: rgba(229, 106, 84, 0.05);
      }
      
      .nested-drop-zone-label {
        text-align: center;
        color: #666;
        font-size: 11px;
        padding: 8px;
      }
      
      /* Property Editor Panel */
      .property-editor-panel {
        width: 300px;
        background: #252526;
        border-left: 1px solid #333;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      
      .property-content {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
      }
      
      .no-selection-message {
        text-align: center;
        padding: 40px 20px;
        color: #666;
      }
      
      .property-group {
        margin-bottom: 20px;
      }
      
      .property-group-title {
        font-size: 11px;
        text-transform: uppercase;
        color: #888;
        margin-bottom: 12px;
        font-weight: 600;
        letter-spacing: 0.5px;
      }
      
      .property-field {
        margin-bottom: 14px;
      }
      
      .property-label {
        display: block;
        font-size: 12px;
        color: #d4d4d4;
        margin-bottom: 6px;
        font-weight: 500;
      }
      
      .property-input {
        width: 100%;
        padding: 8px 10px;
        background: #1e1e1e;
        border: 1px solid #444;
        border-radius: 4px;
        color: #d4d4d4;
        font-size: 13px;
        font-family: inherit;
      }
      
      .property-input:focus {
        outline: none;
        border-color: #e56a54;
      }
      
      .property-input[type="color"] {
        height: 36px;
        padding: 4px;
        cursor: pointer;
      }
      
      .property-textarea {
        min-height: 80px;
        resize: vertical;
        font-family: 'Courier New', monospace;
      }
      
      .property-select {
        width: 100%;
        padding: 8px 10px;
        background: #1e1e1e;
        border: 1px solid #444;
        border-radius: 4px;
        color: #d4d4d4;
        font-size: 13px;
        cursor: pointer;
      }
      
      .property-select:focus {
        outline: none;
        border-color: #e56a54;
      }
      
      .component-id-display {
        padding: 8px 12px;
        background: #1e1e1e;
        border: 1px solid #333;
        border-radius: 4px;
        font-size: 11px;
        color: #888;
        font-family: 'Courier New', monospace;
        margin-bottom: 16px;
      }
      
      .property-actions {
        margin-top: 20px;
        padding-top: 16px;
        border-top: 1px solid #333;
        display: flex;
        gap: 8px;
      }
      
      .property-action-btn {
        flex: 1;
        padding: 10px;
        background: #e56a54;
        border: none;
        border-radius: 4px;
        color: white;
        font-weight: 600;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.2s;
      }
      
      .property-action-btn:hover {
        background: #cf5a45;
      }
      
      .property-action-btn.secondary {
        background: #2d2d2d;
        border: 1px solid #444;
        color: #d4d4d4;
      }
      
      .property-action-btn.secondary:hover {
        background: #3d3d3d;
      }
      
      .property-action-btn.danger {
        background: #dc3545;
      }
      
      .property-action-btn.danger:hover {
        background: #c82333;
      }
      
      /* Scrollbar styling */
      .component-categories::-webkit-scrollbar,
      .canvas-content::-webkit-scrollbar,
      .property-content::-webkit-scrollbar {
        width: 8px;
      }
      
      .component-categories::-webkit-scrollbar-track,
      .canvas-content::-webkit-scrollbar-track,
      .property-content::-webkit-scrollbar-track {
        background: #1e1e1e;
      }
      
      .component-categories::-webkit-scrollbar-thumb,
      .canvas-content::-webkit-scrollbar-thumb,
      .property-content::-webkit-scrollbar-thumb {
        background: #444;
        border-radius: 4px;
      }
      
      .component-categories::-webkit-scrollbar-thumb:hover,
      .canvas-content::-webkit-scrollbar-thumb:hover,
      .property-content::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
    `;
    
    document.head.appendChild(style);
  }
  
  /**
   * Render the component library by categories
   */
  function renderComponentLibrary() {
    const categories = window.getCategories();
    const container = document.getElementById('component-categories');
    if (!container) return;
    
    let html = '';
    categories.forEach(category => {
      const components = window.getComponentsByCategory(category);
      
      html += `
        <div class="component-category">
          <div class="category-title">${category}</div>
          ${components.map(comp => `
            <div class="component-item" 
                 draggable="true" 
                 data-component-type="${comp.tag}">
              <div class="component-icon">${comp.icon}</div>
              <div class="component-info">
                <div class="component-name">${comp.displayName}</div>
                <div class="component-desc">${comp.description}</div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    });
    
    container.innerHTML = html;
  }
  
  /**
   * Setup event listeners for drag-and-drop and interactions
   */
  function setupEventListeners() {
    // Component library drag events
    document.addEventListener('dragstart', (e) => {
      if (e.target.classList.contains('component-item')) {
        draggedComponentType = e.target.dataset.componentType;
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('text/plain', draggedComponentType);
        e.target.style.opacity = '0.5';
      }
    });
    
    document.addEventListener('dragend', (e) => {
      if (e.target.classList.contains('component-item')) {
        e.target.style.opacity = '1';
        draggedComponentType = null;
      }
    });
    
    // Canvas drop zone events
    document.addEventListener('dragover', (e) => {
      const dropZone = e.target.closest('.canvas-drop-zone, .nested-drop-zone');
      if (dropZone && draggedComponentType) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
      }
    });
    
    document.addEventListener('dragenter', (e) => {
      const dropZone = e.target.closest('.canvas-drop-zone, .nested-drop-zone');
      if (dropZone && draggedComponentType) {
        const parentType = dropZone.dataset.parentType;
        if (window.isValidDrop(parentType, draggedComponentType)) {
          dropZone.classList.add('drag-over');
        }
      }
    });
    
    document.addEventListener('dragleave', (e) => {
      const dropZone = e.target.closest('.canvas-drop-zone, .nested-drop-zone');
      if (dropZone && !dropZone.contains(e.relatedTarget)) {
        dropZone.classList.remove('drag-over');
      }
    });
    
    document.addEventListener('drop', (e) => {
      e.preventDefault();
      const dropZone = e.target.closest('.canvas-drop-zone, .nested-drop-zone');
      if (dropZone && draggedComponentType) {
        dropZone.classList.remove('drag-over');
        
        const parentType = dropZone.dataset.parentType;
        const parentId = dropZone.dataset.parentId;
        
        if (window.isValidDrop(parentType, draggedComponentType)) {
          handleComponentDrop(draggedComponentType, parentId);
        } else {
          showError(`${draggedComponentType} cannot be added to ${parentType}`);
        }
      }
    });
    
    // Component search
    const searchInput = document.getElementById('component-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        filterComponents(e.target.value);
      });
    }
    
    // Canvas toolbar buttons
    const clearBtn = document.getElementById('canvas-clear-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('Clear all components from canvas?')) {
          currentComponentTree = [];
          selectedComponentId = null;
          refreshCanvas();
          refreshPropertyPanel();
        }
      });
    }
    
    const validateBtn = document.getElementById('canvas-validate-btn');
    if (validateBtn) {
      validateBtn.addEventListener('click', () => {
        const validation = window.validateComponentTree(currentComponentTree);
        if (validation.valid) {
          alert('✓ Component tree is valid!');
        } else {
          const errors = validation.errors.map(e => `• ${e.message}`).join('\n');
          alert('Validation Errors:\n\n' + errors);
        }
      });
    }
  }
  
  /**
   * Handle component drop onto canvas
   */
  function handleComponentDrop(componentType, parentId) {
    const newComponent = window.createComponent(componentType);
    
    if (window.insertComponent(currentComponentTree, parentId, newComponent)) {
      refreshCanvas();
      // Auto-select the newly added component
      selectedComponentId = newComponent.id;
      refreshPropertyPanel();
      if (onTreeChangeCallback) {
        onTreeChangeCallback(currentComponentTree);
      }
    }
  }
  
  /**
   * Refresh the canvas display
   */
  function refreshCanvas() {
    const canvasContent = document.getElementById('canvas-content');
    if (!canvasContent) return;
    
    if (currentComponentTree.length === 0) {
      canvasContent.innerHTML = `
        <div class="canvas-drop-zone" 
             data-parent-id="root" 
             data-parent-type="mj-body">
          <div class="empty-canvas-message">
            <div class="empty-icon">🎨</div>
            <p>Drag components here to start building</p>
          </div>
        </div>
      `;
    } else {
      canvasContent.innerHTML = `
        <div class="canvas-drop-zone" 
             data-parent-id="root" 
             data-parent-type="mj-body">
          ${renderComponentTree(currentComponentTree)}
        </div>
      `;
      
      // Attach click handlers for components
      attachComponentHandlers();
    }
  }
  
  /**
   * Render component tree recursively
   */
  function renderComponentTree(tree) {
    return tree.map(component => {
      const metadata = window.getComponentMetadata(component.type);
      const isSelected = component.id === selectedComponentId;
      
      let html = `
        <div class="canvas-component ${isSelected ? 'selected' : ''}" 
             data-component-id="${component.id}">
          <div class="component-header">
            <div class="component-type">
              <span>${metadata?.icon || '📦'}</span>
              <span>${component.type}</span>
            </div>
            <div class="component-actions">
              <button class="component-action-btn select" 
                      data-action="select" 
                      data-component-id="${component.id}">
                ✎ Edit
              </button>
              <button class="component-action-btn delete" 
                      data-action="delete" 
                      data-component-id="${component.id}">
                × Delete
              </button>
            </div>
          </div>
      `;
      
      // Show content preview if exists
      if (component.content) {
        html += `
          <div class="component-content-preview">
            ${escapeHtml(component.content.substring(0, 100))}${component.content.length > 100 ? '...' : ''}
          </div>
        `;
      }
      
      // Render children if component can have them
      if (metadata?.allowedChildren && metadata.allowedChildren.length > 0) {
        html += `<div class="component-children">`;
        
        // Render existing children
        if (component.children && component.children.length > 0) {
          html += renderComponentTree(component.children);
        }
        
        // Always show drop zone for adding more children
        html += `
          <div class="nested-drop-zone" 
               data-parent-id="${component.id}" 
               data-parent-type="${component.type}">
            <div class="nested-drop-zone-label">
              ${component.children && component.children.length > 0 ? '+' : 'Drop'} ${metadata.allowedChildren.join(', ')} here
            </div>
          </div>
        `;
        
        html += `</div>`;
      }
      
      html += '</div>';
      return html;
    }).join('');
  }
  
  /**
   * Attach click handlers to component action buttons
   */
  function attachComponentHandlers() {
    document.querySelectorAll('[data-action="select"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const componentId = e.target.dataset.componentId;
        selectedComponentId = componentId;
        refreshCanvas();
        refreshPropertyPanel();
      });
    });
    
    document.querySelectorAll('[data-action="delete"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const componentId = e.target.dataset.componentId;
        if (confirm('Delete this component?')) {
          window.removeComponent(currentComponentTree, componentId);
          if (selectedComponentId === componentId) {
            selectedComponentId = null;
          }
          refreshCanvas();
          refreshPropertyPanel();
          if (onTreeChangeCallback) {
            onTreeChangeCallback(currentComponentTree);
          }
        }
      });
    });
  }
  
  /**
   * Refresh the property editor panel
   */
  function refreshPropertyPanel() {
    const propertyContent = document.getElementById('property-content');
    if (!propertyContent) return;
    
    if (!selectedComponentId) {
      propertyContent.innerHTML = `
        <div class="no-selection-message">
          <p>Select a component to edit properties</p>
        </div>
      `;
      return;
    }
    
    const component = window.findComponentById(currentComponentTree, selectedComponentId);
    if (!component) {
      propertyContent.innerHTML = `
        <div class="no-selection-message">
          <p>Component not found</p>
        </div>
      `;
      return;
    }
    
    const metadata = window.getComponentMetadata(component.type);
    if (!metadata) return;
    
    let html = `
      <div class="component-id-display">ID: ${component.id}</div>
      <div class="property-group">
        <div class="property-group-title">${metadata.displayName} Properties</div>
    `;
    
    // Render property fields based on schema
    if (metadata.propertySchema) {
      metadata.propertySchema.forEach(prop => {
        const currentValue = component.properties[prop.name] || prop.default || '';
        
        html += `<div class="property-field">`;
        html += `<label class="property-label">${prop.label}</label>`;
        
        if (prop.type === 'select') {
          html += `
            <select class="property-select" 
                    data-property="${prop.name}">
              ${prop.options.map(opt => `
                <option value="${opt}" ${currentValue === opt ? 'selected' : ''}>
                  ${opt}
                </option>
              `).join('')}
            </select>
          `;
        } else if (prop.type === 'color') {
          html += `
            <input type="color" 
                   class="property-input" 
                   data-property="${prop.name}" 
                   value="${currentValue || '#000000'}" />
          `;
        } else {
          html += `
            <input type="text" 
                   class="property-input" 
                   data-property="${prop.name}" 
                   value="${escapeHtml(currentValue)}" 
                   placeholder="${prop.default || ''}" />
          `;
        }
        
        html += `</div>`;
      });
    }
    
    html += `</div>`;
    
    // Content editor if component supports it
    if (metadata.defaultContent !== undefined || component.content) {
      html += `
        <div class="property-group">
          <div class="property-group-title">Content</div>
          <div class="property-field">
            <label class="property-label">Text Content</label>
            <textarea class="property-input property-textarea" 
                      id="component-content-input">${escapeHtml(component.content || '')}</textarea>
          </div>
        </div>
      `;
    }
    
    // Action buttons
    html += `
      <div class="property-actions">
        <button class="property-action-btn danger" id="delete-component-btn">
          Delete Component
        </button>
      </div>
    `;
    
    propertyContent.innerHTML = html;
    
    // Attach property change handlers
    attachPropertyHandlers();
  }
  
  /**
   * Attach event handlers for property inputs
   */
  function attachPropertyHandlers() {
    // Property inputs
    document.querySelectorAll('.property-input, .property-select').forEach(input => {
      input.addEventListener('change', (e) => {
        const property = e.target.dataset.property;
        const value = e.target.value;
        
        if (selectedComponentId) {
          const component = window.findComponentById(currentComponentTree, selectedComponentId);
          if (component) {
            component.properties[property] = value;
            refreshCanvas();
            if (onTreeChangeCallback) {
              onTreeChangeCallback(currentComponentTree);
            }
          }
        }
      });
    });
    
    // Content textarea
    const contentInput = document.getElementById('component-content-input');
    if (contentInput) {
      contentInput.addEventListener('input', (e) => {
        if (selectedComponentId) {
          window.updateComponentContent(currentComponentTree, selectedComponentId, e.target.value);
          if (onTreeChangeCallback) {
            onTreeChangeCallback(currentComponentTree);
          }
        }
      });
    }
    
    // Delete button
    const deleteBtn = document.getElementById('delete-component-btn');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => {
        if (confirm('Delete this component?')) {
          window.removeComponent(currentComponentTree, selectedComponentId);
          selectedComponentId = null;
          refreshCanvas();
          refreshPropertyPanel();
          if (onTreeChangeCallback) {
            onTreeChangeCallback(currentComponentTree);
          }
        }
      });
    }
  }
  
  /**
   * Filter components in library
   */
  function filterComponents(searchTerm) {
    const term = searchTerm.toLowerCase();
    document.querySelectorAll('.component-item').forEach(item => {
      const name = item.querySelector('.component-name').textContent.toLowerCase();
      const desc = item.querySelector('.component-desc').textContent.toLowerCase();
      
      if (name.includes(term) || desc.includes(term)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }
  
  /**
   * Show error message
   */
  function showError(message) {
    // Simple alert for now; could be enhanced with a toast notification
    alert('Error: ' + message);
  }
  
  /**
   * Escape HTML for safe rendering
   */
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  // Export to window
  if (typeof window !== 'undefined') {
    window.initVisualBuilder = initVisualBuilder;
  }
  
})();
