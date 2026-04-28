# Best Web Developer Corporate Theme

A premium corporate WordPress theme for **bestwebdeveloper.org** focused on website design, WordPress development, SEO pages, branding, UI/UX, landing pages, and website enhancement.

## Features
- Responsive corporate design system with gradient/glassmorphism style
- Dynamic homepage hero and business contact CTAs
- Complete WordPress template structure (front page, blog, archives, search, 404)
- Page templates: Contact, Services, About, Landing, SEO Services, Email Marketing, Portfolio
- Customizer controls for phone/WhatsApp, hero content, footer content, and brand colors
- Header and footer menus, widget areas, post thumbnails, title-tag, HTML5 support
- Accessibility enhancements: skip link, keyboard focus states, semantic headings, mobile nav toggle
- SEO-ready template hierarchy and structured service content
- Security-conscious output escaping and setting sanitization

## Installation
1. Copy the folder `bestwebdeveloper-corporate` into `/wp-content/themes/`.
2. In WordPress Admin, go to **Appearance → Themes**.
3. Activate **Best Web Developer Corporate**.
4. (Optional) Set a static homepage in **Settings → Reading**.

## Theme Activation Setup
1. Create pages: Home, About, Services, Contact, SEO Services, Email Marketing, Portfolio, Blog.
2. Assign templates from Page Attributes:
   - Contact Page → `Contact Page`
   - Services Page → `Services Page`
   - About Page → `About Page`
   - Landing Page → `Landing Page`
   - SEO Page → `SEO Services Page`
   - Email Page → `Email Marketing Landing`
   - Portfolio → `Portfolio Page`
3. Set homepage and posts page in **Settings → Reading**.
4. Build menus in **Appearance → Menus** and assign:
   - `Primary Menu`
   - `Footer Menu`

## Customizing Phone Number and Hero Content
Go to **Appearance → Customize**:
- **Business Contact**
  - Phone Number (default: `+966510451995`)
  - WhatsApp Number (default: `+966510451995`)
  - Contact Intro Text
- **Homepage Hero**
  - Hero Title/Subtitles
  - Primary/Secondary CTA text and URLs
- **Footer Content**
  - Footer Description
  - Footer Copyright
- **Brand Colors**
  - Primary Color
  - Accent Color

## Recommended Pages
- Home (front page)
- Services
- SEO Services
- Email Marketing Landing
- About
- Portfolio
- Contact
- Blog

## Development Notes
- Main CSS: `assets/css/main.css`
- Main JS: `assets/js/main.js`
- Customizer options: `inc/customizer.php`
- Template helpers: `inc/template-tags.php`
- Theme setup: `inc/theme-setup.php`

## File Structure
- `style.css`
- `functions.php`
- `header.php`, `footer.php`, `front-page.php`, `index.php`, `home.php`
- `page.php`, `single.php`, `archive.php`, `search.php`, `404.php`
- `comments.php`, `sidebar.php`
- `template-*.php` files for custom pages
- `template-parts/`
- `assets/css/`, `assets/js/`, `assets/images/`
- `inc/`

## Accessibility
- Semantic landmarks and heading flow
- Keyboard reachable menus/buttons
- Focus-visible states and skip link
- Reduced motion media query support

## SEO
- Proper title-tag support
- Service-oriented copy structure and internal links
- Archive/search/single templates with readable metadata

## Security
- Escaped outputs (`esc_html`, `esc_url`, etc.)
- Sanitized customizer settings
- No unsafe form processing in theme templates

## Support
- Website: **bestwebdeveloper.org**
- Phone/WhatsApp: **+966510451995**
