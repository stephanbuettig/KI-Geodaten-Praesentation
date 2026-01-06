# 🎨 STYLE-GUIDE.md - CSS Design System

> Vollständige Dokumentation des visuellen Design-Systems und CSS-Konventionen

## 📋 Inhaltsverzeichnis

- [Design-Tokens](#design-tokens)
- [Farbsystem](#farbsystem)
- [Typografie](#typografie)
- [Spacing & Layout](#spacing--layout)
- [Komponenten-Stile](#komponenten-stile)
- [Animationen](#animationen)
- [Responsive Design](#responsive-design)
- [Print-Styles](#print-styles)

---

## 🎯 Design-Tokens

### CSS Custom Properties (Variablen)

```css
:root {
    /* ═══════════════════════════════════════════════════════════
       AKZENTFARBE (dynamisch änderbar via Color Picker)
       ═══════════════════════════════════════════════════════════ */
    --accent-color: #0672A2;        /* Hauptakzent */
    --accent-rgb: 6, 114, 162;      /* RGB für rgba() */
    --accent-text-color: #38bdf8;   /* Heller Akzent für Text */
    
    /* ═══════════════════════════════════════════════════════════
       HINTERGRUND-OPAZITÄT (Slider-gesteuert: 0-1)
       ═══════════════════════════════════════════════════════════ */
    --bg-image-opacity: 0.15;
    
    /* ═══════════════════════════════════════════════════════════
       TRANSITIONS (konsistente Timing-Funktionen)
       ═══════════════════════════════════════════════════════════ */
    --transition-fast: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-medium: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-slow: 0.8s cubic-bezier(0.25, 1, 0.5, 1);
}
```

---

## 🌈 Farbsystem

### Theme: Dark Mode (Standard)

```css
html[data-theme='dark'] {
    /* Hintergrund */
    --bg-color: #0f172a;           /* Slate 900 */
    
    /* Text */
    --text-color: #f1f5f9;         /* Slate 100 */
    --text-light: #94a3b8;         /* Slate 400 */
    
    /* Karten */
    --card-bg: rgba(30, 41, 59, 0.7);      /* Slate 800 @ 70% */
    --card-border: rgba(71, 85, 105, 0.5); /* Slate 600 @ 50% */
    
    /* Navigation */
    --nav-dot-bg: #334155;         /* Slate 700 */
    --nav-dot-text: #1e293b;       /* Slate 800 */
    
    /* D3.js Graph */
    --d3-bg: #1e293b;              /* Slate 800 */
    --d3-text: #334155;            /* Slate 700 */
    --d3-link: #475569;            /* Slate 600 */
}
```

### Theme: Light Mode

```css
html[data-theme='light'] {
    /* Hintergrund */
    --bg-color: #f8fafc;           /* Slate 50 */
    
    /* Text */
    --text-color: #1e293b;         /* Slate 800 */
    --text-light: #64748b;         /* Slate 500 */
    
    /* Karten */
    --card-bg: rgba(255, 255, 255, 0.7);   /* White @ 70% */
    --card-border: rgba(0, 0, 0, 0.1);     /* Black @ 10% */
    
    /* Navigation */
    --nav-dot-bg: #e2e8f0;         /* Slate 200 */
    --nav-dot-text: #f1f5f9;       /* Slate 100 */
    
    /* D3.js Graph */
    --d3-bg: #f1f5f9;              /* Slate 100 */
    --d3-text: #334155;            /* Slate 700 */
    --d3-link: #cbd5e1;            /* Slate 300 */
}
```

### Farbpalette (Tailwind-basiert)

| Farbe | Hex | Verwendung |
|-------|-----|------------|
| Slate 50 | `#f8fafc` | Light BG |
| Slate 100 | `#f1f5f9` | Light Card BG |
| Slate 200 | `#e2e8f0` | Light Borders |
| Slate 400 | `#94a3b8` | Muted Text |
| Slate 500 | `#64748b` | Secondary Text |
| Slate 600 | `#475569` | Borders |
| Slate 700 | `#334155` | Dark Elements |
| Slate 800 | `#1e293b` | Dark Card BG |
| Slate 900 | `#0f172a` | Dark BG |
| Sky 400 | `#38bdf8` | Accent Text |
| Sky 600 | `#0672A2` | Primary Accent |
| Green 500 | `#22c55e` | Success/Check |

### Akzentfarben-Berechnung

```javascript
// Dynamische Berechnung von RGB-Werten
applyAccentColor(color) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    
    document.documentElement.style.setProperty('--accent-color', color);
    document.documentElement.style.setProperty('--accent-rgb', `${r}, ${g}, ${b}`);
    document.documentElement.style.setProperty('--accent-text-color', 
        this.shadeColor(color, 40)); // 40% heller
}
```

---

## 📝 Typografie

### Schriftart: Inter

```css
@font-face {
    font-family: 'Inter';
    src: url('lib/fonts/inter-300.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Inter';
    src: url('lib/fonts/inter-400.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 
                 'Segoe UI', Roboto, sans-serif;
}
```

### Typografie-Skala

| Element | Größe | Gewicht | Zeilenhöhe |
|---------|-------|---------|------------|
| H1 (Titel) | `3rem` | 700 | 1.2 |
| H2 (Untertitel) | `1.5rem` | 600 | 1.3 |
| H3 (Kachel-Titel) | `1.125rem` | 600 | 1.4 |
| Body | `1rem` | 400 | 1.6 |
| Body Large | `1.125rem` | 400 | 1.75rem |
| Small | `0.875rem` | 400 | 1.5 |
| Caption | `0.75rem` | 400 | 1.4 |

### Lesbarkeits-Anpassungen

```css
/* Optimierte Schriftgrößen für Info-Kacheln */
.info-kachel h3 {
    font-size: 1.125rem !important;
}

.info-kachel p,
.nutzen-box p,
#card-6 ul li {
    font-size: 1.125rem !important;
    line-height: 1.75rem !important;
}
```

---

## 📐 Spacing & Layout

### Spacing-System (8px-Basis)

| Token | Wert | Verwendung |
|-------|------|------------|
| `0.25rem` | 4px | Micro-Spacing |
| `0.5rem` | 8px | Tight |
| `1rem` | 16px | Standard |
| `1.5rem` | 24px | Comfortable |
| `2rem` | 32px | Spacious |
| `3rem` | 48px | Section |
| `4rem` | 64px | Large Section |

### Card-Layout

```css
.card-content {
    width: 100%;
    max-width: 1000px;
    height: 650px;
    padding: 2rem;
    border-radius: 1.5rem;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

/* Spezialfall: Titelkarte */
#card-1 .card-content {
    height: auto;
    min-height: auto;
    padding: 2rem;
}
```

### Grid-Layouts

```css
/* 2-Spalten Grid (Card 4, 5) */
.grid-cols-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
}

/* 3-Spalten Grid (Card 6) */
.grid-cols-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

/* 4-Spalten Grid (Card 3 Carousel) */
.grid-cols-4 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
}
```

---

## 🧩 Komponenten-Stile

### Story Card

```css
.story-card {
    scroll-snap-align: start;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
}
```

### Info-Kachel

```css
.info-kachel {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 1rem;
    padding: 1.5rem;
    backdrop-filter: blur(10px);
    transition: transform 0.3s, box-shadow 0.3s;
}

.info-kachel:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 40px -10px rgba(var(--accent-rgb), 0.2);
}

/* Klickbare Kacheln */
.info-kachel[data-modal-id] {
    cursor: pointer;
}
```

### Reveal Items (Animierte Elemente)

```css
.reveal-item {
    opacity: 0.4;
    transform: scale(0.98);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.reveal-item.revealed {
    opacity: 1;
    transform: scale(1.03);
    box-shadow: 0 8px 25px -5px rgba(var(--accent-rgb), 0.15);
}
```

### Checklist Items

```css
.checklist-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: var(--card-bg);
    border-radius: 0.75rem;
}

.checklist-item .original-icon,
.checklist-item .checked-icon {
    transition: all 0.8s ease-in-out;
}

.checklist-item.checked .original-icon {
    opacity: 0;
    transform: scale(0.5);
}

.checklist-item.checked .checked-icon {
    opacity: 1;
    transform: scale(1);
    color: #22c55e;
}
```

### Navigation Dots

```css
.chapter-nav {
    position: fixed;
    right: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.chapter-nav a {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--nav-dot-bg);
    transition: all 0.3s;
}

.chapter-nav a.active {
    background-color: var(--accent-color);
    transform: scale(1.3);
}
```

### Settings Panel

```css
.settings-container {
    position: fixed;
    top: 1.5rem;
    right: 1.5rem;
    z-index: 100;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem;
    background: var(--card-bg);
    backdrop-filter: blur(10px);
    border-radius: 9999px;
    border: 1px solid var(--card-border);
    overflow: hidden;
    max-width: 42px;
    transition: max-width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.settings-container.expanded {
    max-width: 400px;
}
```

### Carousel Overlay

```css
.carousel-overlay {
    position: fixed;
    inset: 0;
    z-index: 200;
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-overlay.visible {
    opacity: 1;
    pointer-events: auto;
}
```

---

## ✨ Animationen

### Transition-Timing

```css
/* Schnelle Interaktionen (Hover, Focus) */
--transition-fast: 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Mittlere Übergänge (Theme-Wechsel) */
--transition-medium: 0.5s cubic-bezier(0.4, 0, 0.2, 1);

/* Langsame Animationen (Karten-Einblendung) */
--transition-slow: 0.8s cubic-bezier(0.25, 1, 0.5, 1);
```

### Keyframe-Animationen

```css
/* Loading Spinner */
@keyframes rotation {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Slide-In (AI Carousel) */
@keyframes slidein {
    0% { top: -100%; opacity: 0; }
    100% { top: 0px; opacity: 1; }
}

/* Slide-Out (AI Carousel) */
@keyframes slideout {
    0% { top: 0; opacity: 1; }
    100% { top: -100%; opacity: 0; }
}

/* Scroll Indicator Bounce */
@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(8px); }
}
```

### Karten-Einblendung

```css
.card-content {
    transform: translateY(20px);
    opacity: 0;
    transition: transform var(--transition-slow), 
                opacity var(--transition-slow);
    will-change: transform, opacity;
}

.story-card.is-visible .card-content {
    transform: translateY(0);
    opacity: 1;
}
```

---

## 📱 Responsive Design

### Breakpoints

| Breakpoint | Wert | Verwendung |
|------------|------|------------|
| Mobile | `< 768px` | Smartphones |
| Tablet | `768px - 1024px` | Tablets |
| Desktop | `> 1024px` | Desktop (Standard) |

### Responsive Anpassungen

```css
/* Derzeit keine expliziten Media Queries implementiert */
/* Die Präsentation ist für Desktop-Ansicht optimiert */

/* Empfohlene Ergänzungen: */
@media (max-width: 768px) {
    .card-content {
        max-width: 95%;
        height: auto;
        min-height: 80vh;
        padding: 1rem;
    }
    
    .grid-cols-2,
    .grid-cols-3,
    .grid-cols-4 {
        grid-template-columns: 1fr;
    }
    
    .settings-container {
        top: 0.5rem;
        right: 0.5rem;
    }
    
    .chapter-nav {
        right: 0.5rem;
    }
}
```

---

## 🖨️ Print-Styles

### Page Setup

```css
@media print {
    @page {
        size: A4 landscape;
        margin: 0;
    }
}
```

### Print-Optimierungen

```css
@media print {
    /* Theme auf Light erzwingen */
    html {
        --bg-color: #f8fafc !important;
        --text-color: #1e293b !important;
        --card-bg: rgba(255, 255, 255, 0.8) !important;
    }
    
    /* Jede Karte = eine Seite */
    .story-card {
        page-break-after: always;
        page-break-inside: avoid;
        height: 100vh !important;
        overflow: hidden !important;
    }
    
    /* UI-Elemente ausblenden */
    .settings-container,
    .chapter-nav,
    .scroll-indicator,
    .carousel-overlay,
    #loading-screen {
        display: none !important;
    }
    
    /* Print-Only Elemente einblenden */
    .print-only {
        display: block !important;
    }
    
    /* Animationen deaktivieren */
    .reveal-item {
        opacity: 1 !important;
        transform: scale(1) !important;
    }
}
```

### Print-Indikatoren

```css
.print-page-indicator,
.print-info-bubble {
    display: none; /* Nur im Print sichtbar */
}

@media print {
    .print-page-indicator,
    .print-info-bubble {
        display: inline-block;
        position: absolute;
        bottom: 1.5rem;
        background-color: rgba(255, 255, 255, 0.75);
        backdrop-filter: blur(4px);
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        font-size: 10pt;
    }
}
```

---

## 🏢 Corporate Design

### CD-Aktivierung

```css
html.corporate-design-active .parallax-bg {
    -webkit-mask-image: url("data:image/svg+xml;...");
    mask-image: url("data:image/svg+xml;...");
    -webkit-mask-size: cover;
    mask-size: cover;
    -webkit-mask-position: bottom right;
    mask-position: bottom right;
}
```

### CD-Farben (Sachsen)

| Element | Farbe | Verwendung |
|---------|-------|------------|
| Primary | `#0672A2` | Hauptakzent |
| Secondary | `#38bdf8` | Heller Akzent |
| Background | `#0f172a` | Dark Mode BG |

---

## ✅ Best Practices

### Do's ✓

- ✅ CSS Custom Properties für dynamische Werte verwenden
- ✅ Konsistente Transition-Timing-Funktionen
- ✅ `will-change` für animierte Elemente
- ✅ `backdrop-filter` für Glasmorphismus
- ✅ Semantische Farbvariablen (`--text-color` statt `#1e293b`)

### Don'ts ✗

- ❌ Hardcodierte Farbwerte in Komponenten
- ❌ Inkonsistente Border-Radii
- ❌ Fehlende Hover/Focus-States
- ❌ `!important` außerhalb von Print-Styles
- ❌ Inline-Styles für wiederverwendbare Stile

---

*Letzte Aktualisierung: Januar 2026*
