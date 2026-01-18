## Template 14: Advanced Pure Web Portfolio

### Features
- **Vanilla TypeScript**: Type-safe JavaScript without frameworks
- **Web Components**: Custom elements for reusability
- **Service Worker**: Offline functionality + PWA
- **Web Animations API**: Advanced JavaScript animations
- **IndexedDB**: Client-side database for offline storage
- **CSS Houdini**: Custom paint worklets
- **Lazy Loading**: Native loading="lazy" for images
- **Preload/Prefetch**: Resource hints for performance

### Tech Stack
- TypeScript (compiled to ES2020)
- Web Components API
- Service Worker API
- Web Animations API
- CSS Houdini
- esbuild (lightweight bundler)

### Features Breakdown

#### 1. Web Components
```typescript
// components/project-card.ts
class ProjectCard extends HTMLElement {
  connectedCallback() {
    const data = JSON.parse(this.getAttribute('data') || '{}');
    this.render(data);
  }
  
  render(project) {
    this.innerHTML = `
      <div class="card">
        <img src="${project.image}" alt="${project.title}" loading="lazy">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
    `;
  }
}

customElements.define('project-card', ProjectCard);
```

#### 2. Service Worker (PWA)
```javascript
// sw.js
const CACHE_NAME = 'portfolio-v1';
const urlsToCache = [
  '/',
  '/css/style.css',
  '/js/main.js',
  '/data/data.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

#### 3. Web Animations API
```typescript
// animations/scroll.ts
export function animateOnScroll(element: HTMLElement) {
  const animation = element.animate([
    { opacity: 0, transform: 'translateY(50px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ], {
    duration: 800,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    fill: 'forwards'
  });
  
  animation.pause();
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animation.play();
      }
    });
  });
  
  observer.observe(element);
}
```

### Installation
```bash
npm install -D esbuild typescript
npm run dev
```

### Build
```bash
npm run build  # Outputs to dist/
```

---


