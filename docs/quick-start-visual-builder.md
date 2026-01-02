# Quick Start: MJML Visual Builder

## 🚀 Getting Started in 5 Minutes

### Step 1: Open the Editor
1. Navigate to any page with CKEditor
2. Click the **"Edit MJML"** button (if added to the toolbar)
3. The MJML Power Editor modal opens

### Step 2: Switch to Visual Mode
1. Click the **"Visual"** button in the top toolbar
2. You'll see three panels:
   - **Left**: Component Library
   - **Center**: Canvas (drag components here)
   - **Right**: Property Editor

### Step 3: Build Your First Email

#### Add a Section
1. In the left panel, find "**Layout**" category
2. Drag **Section** (📦) to the canvas
3. Drop it in the gray drop zone

#### Add a Column
1. Drag **Column** (📋) from the Layout category
2. Drop it **inside** the section you just created
3. The section will show a drop zone for children

#### Add Content
1. Find "**Content**" category
2. Drag **Text** (📝) into the column
3. Click the text component to select it
4. In the right panel, edit:
   - Change text content in the textarea
   - Modify font size, color, etc.

#### Add a Button
1. Drag **Button** (🔘) below the text
2. Select it by clicking
3. Edit properties:
   - **Link URL**: Where clicking goes
   - **Background Color**: Click color picker
   - **Text Color**: White or contrasting color
4. Change button text in the content field

### Step 4: Customize Appearance
1. Click any component to select it
2. The right panel shows its properties
3. Common properties:
   - **Background Color**: Click the color box
   - **Padding**: e.g., "20px" or "10px 20px"
   - **Font Size**: e.g., "16px" or "1.2em"
   - **Align**: left, center, right

### Step 5: Preview & Save
1. Check the **Preview** on the right side
2. Click **💾 Save Template** to save for later
3. Click **✅ Update CKEditor** to insert into your email

---

## 📚 Common Patterns

### Two-Column Layout

```
1. Drag Section to canvas
2. Drag Column into section
3. Drag another Column into same section
4. In first column properties, set width: "50%"
5. In second column properties, set width: "50%"
6. Add content to each column
```

### Hero Section

```
1. Drag Hero component from Advanced category
2. Set background-url to your image URL
3. Set height (e.g., "400px")
4. Drag Text and Button inside the hero
5. Adjust vertical-align to position content
```

### Social Media Icons

```
1. Drag Social Icons from Interactive category
2. It contains Social Link children
3. Click the Social Icons component
4. Drag Social Link into it
5. Select each link, set:
   - Platform (facebook, twitter, etc.)
   - href to your social media URL
```

### Newsletter Header

```
1. Section (background-color: #005bbb)
   └── Column
       └── Image (your logo)
2. Section (background-color: #ffffff)
   └── Column
       ├── Text (headline)
       └── Text (subheadline)
```

---

## 🎯 Tips & Tricks

### Component Search
- Type in the search box to filter: "text", "button", "image"
- Faster than scrolling through categories

### Select Before Edit
- Always click a component on canvas to select it
- Selected components have orange border
- Properties panel updates automatically

### Delete Components
- Hover over component, click **× Delete** button
- Or select it, then click **Delete Component** in properties panel
- Confirm deletion in dialog

### Validate Structure
- Click **✓ Validate** in toolbar
- Shows errors like "mj-text cannot be child of mj-section"
- Fix by moving components to correct parents

### Switch to Code
- Click **"Code"** mode to see/edit MJML
- Changes sync automatically
- Useful for copy-pasting or fine-tuning

### Split View
- Click **"Split"** mode for best of both worlds
- Edit visually on left, see code on right
- Great for learning MJML syntax

---

## ⚠️ Common Mistakes

### ❌ Content Not in Column
**Problem**: Dragging Text directly into Section  
**Solution**: Always put content (Text, Image, Button) inside a Column

### ❌ Column Not in Section
**Problem**: Dragging Column to root level  
**Solution**: Columns must be inside Sections or Groups

### ❌ Properties Not Updating
**Problem**: Typing in property field but nothing changes  
**Solution**: Press Tab or click outside field to apply changes

### ❌ Can't Drop Component
**Problem**: Drop zone not highlighting, component won't drop  
**Solution**: Check parent-child rules (e.g., Hero only in mj-body/wrapper)

---

## 🎨 Example: Welcome Email

Follow these steps to create a complete welcome email:

```
1. Section (background-color: #e56a54, padding: 20px 0)
   └── Column
       └── Text (color: white, font-size: 24px, align: center)
           Content: "Welcome to Our Newsletter!"

2. Section (padding: 40px 20px)
   └── Column
       ├── Image (src: your-image-url, width: 400px, align: center)
       ├── Spacer (height: 20px)
       ├── Text (font-size: 16px, line-height: 1.6)
           Content: "Thanks for subscribing! We're excited..."
       ├── Spacer (height: 20px)
       └── Button (background-color: #e56a54, href: https://example.com)
           Content: "Get Started"

3. Section (background-color: #f4f4f4, padding: 20px)
   └── Column
       └── Text (color: #666, font-size: 12px, align: center)
           Content: "© 2026 Your Company. Unsubscribe"
```

---

## 🔄 Workflow Tips

### Starting from Template
1. Click **"Load template..."** dropdown
2. Select a saved template
3. It loads in the mode it was saved in
4. Modify and save again

### Starting from Scratch
1. Use **"Visual"** mode
2. Build structure first (sections, columns)
3. Add content last (text, images, buttons)
4. Customize colors and spacing
5. Save as template

### Converting Existing MJML
1. Paste MJML code in **"Code"** mode
2. Switch to **"Visual"** mode
3. Code auto-converts to visual components
4. Continue editing visually

---

## 📖 Next Steps

- Read [Visual Builder Guide](visual-builder-guide.md) for advanced features
- Check [drag-and-drop-feature.md](drag-and-drop-feature.md) for technical details
- Explore all components in the library
- Experiment with different layouts
- Save your favorite patterns as templates

---

## 🆘 Need Help?

- **Error messages**: Check browser console (F12)
- **Can't find component**: Use search box
- **Validation errors**: Click Validate button for details
- **Rendering issues**: Check Preview panel
- **Lost work**: Templates auto-save on save button

Happy email building! 🎉
