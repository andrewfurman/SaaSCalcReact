# 8090 Style Guide

## Overview
This style guide defines the visual design system for 8090 applications, establishing consistent patterns for colors, typography, components, and interactions.

## Color Palette

### Primary Colors
- **Background**: `#000000` (Black) - Main application background
- **8090 Blue**: `#1E40AF` (blue-800) - Primary brand color for 8090 sections
- **Salesforce Blue**: `#00A1E0` - Official Salesforce brand color for competitor sections

### Semantic Colors
- **Success/Savings**: `#059669` (green-600) - For positive metrics and savings
- **Warning/Cost**: `#DC2626` (red-600) - For costs and negative metrics
- **White**: `#FFFFFF` - Card backgrounds and primary text on dark backgrounds
- **Text Primary**: `#000000` (Black) - Main text on light backgrounds
- **Text Secondary**: `#6B7280` (gray-500) - Supporting text
- **Text Muted**: `#9CA3AF` (gray-400) - Subtle text and labels

### Background Colors
- **Card Background**: `#FFFFFF` (White) - Standard card background
- **Neutral Background**: `#F3F4F6` (gray-100) - Result boxes and neutral areas
- **Border**: `#E5E7EB` (gray-200) - Standard borders
- **Blue Border**: `#93C5FD` (blue-300) - Borders for blue-themed elements

## Typography

### Headings
- **H1**: `text-3xl font-bold` (48px) - Main page titles
- **H2**: `text-2xl font-bold` (32px) - Section titles
- **H3**: `text-xl font-bold` (24px) - Subsection titles
- **H4**: `text-lg font-bold` (20px) - Component titles

### Body Text
- **Large Body**: `text-2xl font-bold` - Emphasis numbers and key metrics
- **Regular Body**: `text-base` (16px) - Standard body text
- **Small Body**: `text-sm` (14px) - Supporting text and labels
- **Extra Small**: `text-xs` (12px) - Fine print and annotations

### Font Weights
- **Bold**: `font-bold` - Headings and emphasis
- **Semibold**: `font-semibold` - Important labels
- **Medium**: `font-medium` - Standard labels
- **Regular**: `font-normal` - Body text

## Component Patterns

### Cards
Standard card structure with consistent spacing and shadows:
```jsx
<div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
  {/* Card content */}
</div>
```

### Branded Total Sections
For summary/total sections, use brand-appropriate colors:

**8090 Totals:**
```jsx
<div className="bg-blue-800 rounded-2xl p-6 shadow-xl border border-blue-600">
  <h3 className="text-xl font-bold text-white mb-2">Total Annual Cost</h3>
  <div className="text-sm text-blue-200">Description</div>
</div>
```

**Salesforce Totals:**
```jsx
<div className="rounded-2xl p-6 shadow-xl border border-blue-300" style={{backgroundColor: '#00A1E0'}}>
  <h3 className="text-xl font-bold text-black mb-2">Total Annual Cost</h3>
  <div className="text-sm text-gray-800">Description</div>
</div>
```

### Navigation Tabs
Chevron-style tabs with hover states:
```jsx
<button
  className={`relative w-48 py-3 font-semibold transition-all duration-200 text-center ${
    isActive
      ? 'bg-white text-black shadow-lg z-10'
      : 'text-gray-300 hover:text-white hover:bg-gray-700 bg-gray-800'
  }`}
  style={{
    clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)'
  }}
>
  {/* Tab content */}
</button>
```

### Form Controls
Range sliders with consistent styling:
```jsx
<input
  type="range"
  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
  // ... other props
/>
```

Number inputs:
```jsx
<input
  type="number"
  className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-center"
  // ... other props
/>
```

### Result Boxes
Standard result display boxes:
```jsx
<div className="bg-gray-100 p-4 rounded-lg border border-gray-300 w-40 h-20 flex flex-col justify-center">
  <div className="text-lg font-bold text-black text-center">{value}</div>
  <div className="text-xs text-gray-600 mt-1 text-center">label</div>
</div>
```

Branded result boxes (use brand colors as background):
```jsx
<div className="p-3 rounded-lg border border-blue-300" style={{backgroundColor: '#00A1E0'}}>
  <div className="text-2xl font-bold text-black text-center">{value}</div>
  <div className="text-xs text-gray-800 text-center">label</div>
</div>
```

## Layout Patterns

### Grid System
Use CSS Grid for complex layouts:
```jsx
<div className="grid grid-cols-1 lg:grid-cols-6 gap-6 items-center">
  {/* Grid items */}
</div>
```

### Spacing
- **Component spacing**: `space-y-6` between major sections
- **Card padding**: `p-6` for standard cards
- **Small padding**: `p-4` for compact cards
- **Element spacing**: `mb-4` for headings, `mb-2` for labels

### Responsive Design
- Use `lg:` prefixes for desktop layouts
- Stack components vertically on mobile
- Ensure touch-friendly sizing (minimum 44px tap targets)

## Icons and Emojis
Use emojis for visual hierarchy and brand personality:
- 📖 Introduction/Documentation
- ☁️ Salesforce/Cloud solutions
- 🔵 8090/Company branding
- ↔️ Comparison/Analysis
- 💰 Financial/Savings
- ⬇️ Reduction/Savings
- ⬆️ Increase/Cost

## Accessibility

### Color Contrast
- Ensure sufficient contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Use `text-black` on light backgrounds
- Use `text-white` on dark backgrounds
- Avoid color-only information conveyance

### Focus States
- Include focus rings: `focus:ring-2 focus:ring-gray-500 focus:border-transparent`
- Ensure keyboard navigation works properly
- Use semantic HTML elements

## Animation and Transitions
- Use `transition-all duration-200` for smooth interactions
- Hover states should be subtle and informative
- Loading states should be clear and non-intrusive

## Best Practices

### Development
1. **Consistency**: Use established patterns before creating new ones
2. **Modularity**: Create reusable components
3. **Accessibility**: Test with keyboard navigation and screen readers
4. **Performance**: Optimize for fast loading and smooth interactions

### Design
1. **White Space**: Use generous spacing for readability
2. **Hierarchy**: Establish clear visual hierarchy with typography and color
3. **Branding**: Maintain brand consistency across all applications
4. **User Experience**: Prioritize clarity and ease of use

### Content
1. **Currency Formatting**: Use `Intl.NumberFormat` for consistent currency display
2. **Labels**: Use clear, descriptive labels for all inputs and outputs
3. **Error States**: Provide helpful error messages and recovery options
4. **Loading States**: Show progress indicators for async operations

## Implementation Examples

### Cost Calculator Row
```jsx
<div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
  <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 items-center">
    <div className="lg:col-span-2">
      <h3 className="text-xl font-bold text-black mb-4">Section Title</h3>
      {/* Form controls */}
    </div>
    <div className="lg:col-span-1 flex flex-col items-center justify-center">
      <div className="text-2xl font-bold text-black">×</div>
      <div className="text-sm text-gray-600 mt-1">multiply</div>
    </div>
    {/* Additional columns */}
    <div className="lg:col-span-1 flex items-center justify-center gap-3">
      <div className="text-2xl font-bold text-black">=</div>
      <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 w-40 h-20 flex flex-col justify-center">
        <div className="text-lg font-bold text-black text-center">{result}</div>
        <div className="text-xs text-gray-600 mt-1 text-center">annual</div>
      </div>
    </div>
  </div>
</div>
```

This style guide ensures consistency across all 8090 applications while maintaining the brand identity and user experience standards.