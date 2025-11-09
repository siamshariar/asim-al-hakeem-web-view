# Layout System Updates - Uniform Spacing & Responsive Design

## Overview
Implemented a comprehensive layout system to ensure uniform padding, margin, and gap across all pages and sections, matching reference websites (abdullahjahangir.com & monzureelahi.com).

## Core Changes

### 1. New Layout System (`styles/_layout-system.scss`)
Created a centralized layout system with CSS variables:

**CSS Variables:**
- `--max-content-width: 1260px` - Maximum content width for all containers
- `--gutter-mobile: 1rem` - Mobile horizontal padding
- `--gutter-tablet: 1.5rem` - Tablet horizontal padding  
- `--gutter-desktop: 2rem` - Desktop horizontal padding
- `--section-padding-y: clamp(3rem, 8vw, 6rem)` - Responsive vertical spacing
- `--grid-gap-sm: 1rem` - Small grid gap
- `--grid-gap-md: 1.5rem` - Medium grid gap
- `--grid-gap-lg: 2rem` - Large grid gap

**Key Classes:**
- `.page-container` - Main container with max-width 1260px and responsive horizontal padding
- `.section-wrapper` - Adds consistent vertical spacing between sections
- `.full-bleed` - For edge-to-edge backgrounds while keeping content constrained
- `.grid-layout` utilities - Responsive grid with consistent gaps

### 2. Integration Files

**`styles/style.scss`**
- Added `@use "layout-system"` import after reset, before base styles

**`styles/globals.css`**
- Added `@layer components` with Tailwind utilities:
  - `.page-container` - Responsive padding using Tailwind classes
  - `.section-spacing` - Consistent vertical padding across breakpoints

## Updated Components

### Header Component
**File:** `components/header1.js`
- Line 118: Changed `container mx-auto` → `page-container`
- Desktop nav: Updated positioning to respect max-width constraint using CSS variable

### Home Page Sections

1. **Banner1** (`components/home/banner1.js`)
   - Applied `page-container` and `section-spacing`
   - Removed inconsistent `py-20 xl:pt-12 xl:pb-0`

2. **Banner2** (`components/home/banner2.js`)
   - Applied `page-container` and `section-spacing`
   - Removed `py-12 px-6 xl:pt-12 xl:pb-0` and `py-8 lg:py-10`

3. **Recent Lectures** (`components/home/recent-lectures.js`)
   - Applied `page-container` to header section
   - Applied `page-container` and `section-spacing` to grid section
   - Removed `max-w-[1466px] mx-4` and `mx-4 lg:mx-0`
   - Updated grid gap to use consistent `gap-4`

4. **Books** (`components/home/books.js`)
   - Applied `page-container` and `section-spacing`
   - Removed `max-w-[1260px] mx-auto` and `mx-4 lg:mx-0`

5. **Questions/FAQ** (`components/home/question.js`)
   - Applied `page-container` and `section-spacing`
   - Removed `container mx-auto px-4 md:px:0 lg:px-0 pb-12`
   - Removed `pt-12` from title (now handled by `section-spacing`)

6. **Ask Question & Counselling** (`components/home/askquestion-counselling.js`)
   - Applied `page-container` and `section-spacing`
   - Removed `mx-auto p-6 pb-6 py-12 sm:py-12`
   - Removed `container max-w-[1260px] pb-6`

7. **Appointment** (`components/home/appoinment.js`)
   - Applied `page-container` and `section-spacing`
   - Removed `px-4 pt-12 sm:pb-8` and `container mx-auto`

8. **Verses/Testimonials** (`components/verce.js`)
   - Applied `page-container` and `section-spacing`
   - Removed `py-12` and `container mx-auto`

9. **Articles** (`components/home/articles.js`)
   - Applied `page-container` and `section-spacing`
   - Wrapped content in `page-container`

## Updated Pages

1. **Lectures Page** (`pages/lectures/[pid].js`)
   - Applied `page-container` and `section-spacing`
   - Removed `container2 mx-auto w-sm-0 px-0 py-0 lg:py-8`
   - Removed `sm:mx-4 md:mx-4 sm:mx-4 lg:mx-0`
   - Updated grid gap from `gap-0` to `gap-4`
   - Removed inline margins (`ml-4 sm:ml-4 lg:ml-0`, `mx-2 lg:mx-0`)

2. **Contact Page** (`pages/contact.js`)
   - Applied `page-container` and `section-spacing`
   - Removed `container max-w-[1260px] mx-auto py-6 lg:py-12`
   - Removed `mx-4 lg:mx-0`

3. **Counselling Page** (`pages/counselling.js`)
   - Applied `page-container` and `section-spacing`
   - Removed `container max-w-[1260px] mx-auto py-6 lg:py-12`
   - Removed `px-4 lg:px-0`

4. **Ask Question Page** (`pages/ask-question.js`)
   - Applied `page-container` and `section-spacing`
   - Removed `container max-w-[1260px] mx-auto pb-10`
   - Removed `mx-4 lg:mx-0`

## Responsive Breakpoints

The layout system uses mobile-first responsive design:

- **Mobile** (< 768px): 1rem (16px) horizontal padding
- **Tablet** (768px - 1024px): 1.5rem (24px) horizontal padding
- **Desktop** (1024px+): 2rem (32px) horizontal padding
- **XL** (1360px+): 0 padding (content reaches max-width 1260px)

**Vertical Spacing:**
- Responsive using `clamp(3rem, 8vw, 6rem)` - scales from 48px to 96px

## Benefits

✅ **Uniform Layout** - All pages use the same max-width (1260px) and padding
✅ **Consistent Spacing** - Section padding/margin is uniform across the site
✅ **Responsive** - Adapts smoothly across all screen sizes
✅ **Maintainable** - Centralized CSS variables make updates easy
✅ **Reference Parity** - Matches the layout patterns of abdullahjahangir.com & monzureelahi.com

## Testing Checklist

- [ ] Home page sections have consistent spacing
- [ ] Header width matches content width
- [ ] Lectures page grid has proper gaps
- [ ] Contact, Counselling, Ask Question pages are properly contained
- [ ] Mobile view (375px - 767px) - proper padding
- [ ] Tablet view (768px - 1023px) - proper padding
- [ ] Desktop view (1024px - 1359px) - proper padding
- [ ] XL view (1360px+) - content centered at 1260px max-width
- [ ] No horizontal scrolling on any breakpoint
- [ ] Navigation bar respects same container width

## Next Steps (Optional Enhancements)

1. Apply to remaining pages (books/*, articles/*, questions/*, verse-details/*)
2. Update any custom components still using old container classes
3. Test on various devices and browsers
4. Consider adding grid gap utilities to more sections
5. Review and update footer if needed
