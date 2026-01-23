# HostFolio Premium Portfolio Template

A next-level, animated personal portfolio website built with pure HTML, CSS, and JavaScript, powered by GSAP animations. This template is framework-less, performance-first, and creates an award-winning web experience.

## 🚀 Features

### Core Architecture
- **Data-Driven**: Entire website powered by `data.json` - no hardcoded content
- **Conditional Rendering**: Sections only appear if data exists
- **Dynamic Navigation**: Auto-generated from available sections
- **Framework-less**: Pure HTML5, CSS3, Vanilla JavaScript
- **Performance Optimized**: 60fps animations, lazy loading, efficient code

### Design & UX
- **Glassmorphism**: Modern glass effects with backdrop blur
- **Soft Gradients**: Beautiful color transitions throughout
- **OS-level Polish**: Premium desktop application feel
- **Fully Responsive**: Desktop, tablet, and mobile optimized
- **Micro-interactions**: Hover effects, transitions, and details

### Animations
- **GSAP + ScrollTrigger**: Professional motion design
- **Page Load Intro**: Smooth entrance animations
- **Scroll-based Reveals**: Content appears as you scroll
- **Text Split Animations**: Character-by-character effects
- **Parallax Effects**: Depth and movement
- **60fps Performance**: Smooth, hardware-accelerated

## 📁 Project Structure

```
hostfolio_template_14/
├── data.json              # All portfolio data (REQUIRED)
├── index.html             # Main HTML structure
├── css/
│   └── style.css          # Complete styling with glassmorphism
├── js/
│   ├── data-loader.js     # Dynamic content loading & rendering
│   ├── animations.js      # GSAP animations & ScrollTrigger
│   └── main.js            # App controller & navigation
├── assets/                # Additional assets
├── images/                # Portfolio images
└── README.md              # This file
```

## 🎯 Sections (Conditional)

The portfolio automatically renders sections based on `data.json`:

- **Hero** - Always shown if personal data exists
- **About** - Shown if `about` data exists
- **Experience** - Shown if `experience` array has items
- **Projects** - Shown if `projects` array has items
- **Contact** - Shown if `contact` data exists
- **Footer** - Always shown if personal data exists

## 🛠️ Setup & Usage

### 1. Configure Your Data

Edit `data.json` with your information:

```json
{
  "personal": {
    "name": "Your Name",
    "title": "Your Title",
    "email": "your@email.com",
    "phone": "+1 (555) 123-4567",
    "location": "Your Location",
    "website": "https://yourwebsite.com",
    "linkedin": "https://linkedin.com/in/yourprofile",
    "github": "https://github.com/yourusername",
    "bio": "Your professional bio..."
  },
  "hero": {
    "greeting": "Hi, I'm",
    "description": "Your hero description...",
    "primaryButton": {
      "text": "View My Work",
      "link": "#projects"
    },
    "secondaryButton": {
      "text": "Get In Touch",
      "link": "#contact"
    }
  }
  // ... more sections
}
```

### 2. Add/Remove Sections

**To add a section**: Simply add the corresponding data to `data.json`

**To remove a section**: Delete or nullify the section data in `data.json`

Examples:

```json
// Remove About section
"about": null

// Remove Experience section
"experience": []

// Remove Projects section
"projects": null
```

### 3. Customize Styling

All styling is in `css/style.css` with CSS variables for easy customization:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --accent-color: #f093fb;
  // ... more variables
}
```

### 4. Add Images

Place your images in the `images/` folder and reference them in `data.json`:

```json
"image": "/images/your-project-image.jpg"
```

## 🎨 Customization Guide

### Colors & Theme
Edit the CSS variables in `:root`:

```css
:root {
  --primary-color: #your-color;
  --gradient-primary: linear-gradient(135deg, #color1 0%, #color2 100%);
  // ... more
}
```

### Typography
Change fonts by updating the `--font-family` variable and adding Google Fonts if needed.

### Animations
Animation settings are in `js/animations.js`:
- Adjust timing, easing, and effects
- Add new ScrollTrigger animations
- Modify micro-interactions

### Layout
Grid and flexbox layouts are responsive by default. Adjust breakpoints in the media queries.

## 📱 Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 481px - 768px  
- **Mobile**: < 481px

## 🚀 Performance Features

- **Lazy Loading**: Images and content load as needed
- **Hardware Acceleration**: GPU-accelerated animations
- **Optimized Animations**: 60fps with GSAP
- **Minimal Dependencies**: Only GSAP + Font Awesome
- **Efficient Code**: Clean, maintainable architecture

## 🌐 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📄 License

This template is free to use for personal and commercial projects. Attribution is appreciated but not required.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📞 Support

For questions and support, please refer to the code comments and documentation within each file.

---

**Built with ❤️ using pure web technologies**
