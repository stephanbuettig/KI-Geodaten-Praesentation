# 🏗️ ARCHITECTURE.md - Technische Architektur

> Detaillierte Dokumentation der Code-Struktur und Architekturentscheidungen

## 📋 Inhaltsverzeichnis

- [Architektur-Überblick](#architektur-überblick)
- [Single-File-Architektur](#single-file-architektur)
- [JavaScript-Architektur](#javascript-architektur)
- [CSS-Architektur](#css-architektur)
- [HTML-Struktur](#html-struktur)
- [Datenfluss](#datenfluss)
- [Abhängigkeiten](#abhängigkeiten)

---

## 🎯 Architektur-Überblick

```
┌─────────────────────────────────────────────────────────────────┐
│                        index.html                                │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                      <style>                               │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │  │
│  │  │ CSS Custom  │  │ Component   │  │ Print & Media   │   │  │
│  │  │ Properties  │  │ Styles      │  │ Queries         │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘   │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                      <body>                                │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │  │
│  │  │ Loading     │  │ Background  │  │ Story Cards     │   │  │
│  │  │ Screen      │  │ Container   │  │ (7 Folien)      │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘   │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │  │
│  │  │ Settings    │  │ Navigation  │  │ Modal Overlays  │   │  │
│  │  │ Panel       │  │ Dots        │  │ (Karussells)    │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘   │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                     <script>                               │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │              Presentation Object                     │  │  │
│  │  │  ┌──────────┐ ┌──────────┐ ┌──────────────────────┐ │  │  │
│  │  │  │ State    │ │ Methods  │ │ Event Handlers       │ │  │  │
│  │  │  │ (nodes,  │ │ (init,   │ │ (keyboard, scroll,   │ │  │  │
│  │  │  │ config)  │ │ render)  │ │ click, resize)       │ │  │  │
│  │  │  └──────────┘ └──────────┘ └──────────────────────┘ │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📦 Single-File-Architektur

### Entscheidungsgründe

| Aspekt | Begründung |
|--------|------------|
| **Portabilität** | Einfache Weitergabe als einzelne Datei |
| **Offline-Fähigkeit** | Keine Build-Tools erforderlich |
| **Deployment** | Direktes Hosting ohne Bundling |
| **Wartung** | Alles an einem Ort |

### Struktur der index.html

```html
<!DOCTYPE html>
<html lang="de" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KI-Potenziale im GeoSN</title>
    
    <!-- Lokale Fonts -->
    <style>
        @font-face { font-family: 'Inter'; ... }
    </style>
    
    <!-- Lucide Icons (CDN) -->
    <script src="https://unpkg.com/lucide@latest"></script>
    
    <!-- Haupt-Styles (~800 Zeilen) -->
    <style>
        /* 1. Setup, Themes & Core Variables */
        /* 2. Base Layout & Scroll Behavior */
        /* 3. Story Card & Content Layout */
        /* 4. Background Effects & Corporate Design */
        /* 5. Navigation & Scroll Indicator */
        /* 6. Settings Panel */
        /* 7. UI Components: Modals & Carousel */
        /* 8. Card-Specific Layouts */
        /* 9. Print-Specific Styles */
    </style>
</head>
<body class="loading">
    <!-- Loading Screen -->
    <!-- Background Container -->
    <!-- Story Cards (1-7) -->
    <!-- Print Back Cover -->
    <!-- Settings Panel -->
    <!-- Navigation Dots -->
    <!-- Modal Overlays -->
    
    <!-- D3.js (lokal) -->
    <script src="lib/d3.min.js"></script>
    
    <!-- Haupt-JavaScript (~600 Zeilen) -->
    <script>
        const Presentation = { ... };
        document.addEventListener('DOMContentLoaded', () => Presentation.init());
    </script>
</body>
</html>
```

---

## 🔧 JavaScript-Architektur

### Das Presentation-Objekt

```javascript
const Presentation = {
    // ═══════════════════════════════════════════════════════════
    // STATE MANAGEMENT
    // ═══════════════════════════════════════════════════════════
    nodes: {},                    // DOM-Referenzen (gecached)
    interactiveElements: {},      // Karussell-Instanzen
    presentationSequence: [],     // Step-by-Step Navigation
    currentStepIndex: 0,          // Aktueller Präsentationsschritt
    isProgrammaticScroll: false,  // Scroll-Lock für programmatische Navigation
    collapseTimer: null,          // Timer für Settings-Panel
    
    // ═══════════════════════════════════════════════════════════
    // MEDIA CONFIGURATION (Offline-Fallback)
    // ═══════════════════════════════════════════════════════════
    localMediaConfig: {
        // Format: "key": [onlineSrc, localSrc]
        "1-0": ["https://...", "data/1-0.png"],
        "2-0": ["https://...", "data/2-0.png"],
        // ... weitere Medien
    },
    
    // ═══════════════════════════════════════════════════════════
    // LIFECYCLE METHODS
    // ═══════════════════════════════════════════════════════════
    init() { ... },               // Hauptinitialisierung
    cacheDomNodes() { ... },      // DOM-Caching
    initSettings() { ... },       // Theme/Farbe aus localStorage
    initEventListeners() { ... }, // Event-Binding
    setupCards() { ... },         // Karten-Observer
    
    // ═══════════════════════════════════════════════════════════
    // NAVIGATION METHODS
    // ═══════════════════════════════════════════════════════════
    handleStepNav(direction) { ... },     // Step-Navigation
    handleFastNav(direction) { ... },     // Karten-Navigation
    executeStep(index) { ... },           // Step ausführen
    buildPresentationSequenceForCard() { ... }, // Sequenz aufbauen
    
    // ═══════════════════════════════════════════════════════════
    // THEME & STYLING METHODS
    // ═══════════════════════════════════════════════════════════
    setTheme(theme) { ... },              // Light/Dark
    applyAccentColor(color) { ... },      // Akzentfarbe
    applyOpacity(value) { ... },          // Hintergrund-Opazität
    setCorporateDesign(isActive) { ... }, // CD-Toggle
    shadeColor(color, percent) { ... },   // Farbberechnung
    
    // ═══════════════════════════════════════════════════════════
    // MEDIA METHODS
    // ═══════════════════════════════════════════════════════════
    testAndSetSource() { ... },           // Online/Offline-Fallback
    initDynamicBackgrounds() { ... },     // CSS-Variablen für Bilder
    applyMediaFallbacks() { ... },        // Alle Medien prüfen
    
    // ═══════════════════════════════════════════════════════════
    // COMPONENT METHODS
    // ═══════════════════════════════════════════════════════════
    initCarousel(triggerEl) { ... },      // Karussell initialisieren
    handleVisibleCard(cardEl) { ... },    // Karten-Sichtbarkeit
    initializeD3Graph(container) { ... }, // D3.js Graph
    
    // ═══════════════════════════════════════════════════════════
    // OUTPUT METHODS
    // ═══════════════════════════════════════════════════════════
    prepareAndPrint() { ... },            // PDF-Export
};
```

### Event-Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    DOMContentLoaded                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Presentation.init()                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ cacheDom    │→ │ initSettings│→ │ initDynamicBg       │  │
│  │ Nodes()     │  │ ()          │  │ ()                  │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ applyMedia  │→ │ setupCards  │→ │ initEvent           │  │
│  │ Fallbacks() │  │ ()          │  │ Listeners()         │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Event Listeners                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Keyboard    │  │ Scroll      │  │ Click               │  │
│  │ (keydown)   │  │ (Intersect) │  │ (Settings, Nav)     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Tastatur-Navigation

| Taste | Aktion | Methode |
|-------|--------|---------|
| `↑` / `PageUp` | Vorherige Karte | `handleFastNav(-1)` |
| `↓` / `Space` | Nächste Karte | `handleFastNav(1)` |
| `←` | Vorheriger Step | `handleStepNav(-1)` |
| `→` / `PageDown` | Nächster Step | `handleStepNav(1)` |

---

## 🎨 CSS-Architektur

### Struktur (9 Sektionen)

```css
/* --- 1. Setup, Themes & Core Variables --- */
:root { ... }
html[data-theme='light'] { ... }
html[data-theme='dark'] { ... }

/* --- 2. Base Layout & Scroll Behavior --- */
html { scroll-snap-type: y mandatory; }
body { ... }

/* --- 3. Story Card & Content Layout --- */
.story-card { scroll-snap-align: start; }
.card-content { ... }

/* --- 4. Background Effects & Corporate Design --- */
#background-container { ... }
.parallax-bg { ... }
html.corporate-design-active .parallax-bg { ... }

/* --- 5. Navigation & Scroll Indicator --- */
.chapter-nav { ... }
.scroll-indicator { ... }

/* --- 6. Settings Panel --- */
.settings-container { ... }

/* --- 7. UI Components: Modals & Carousel --- */
.carousel-overlay { ... }

/* --- 8. Card-Specific Layouts --- */
/* 8.1. Reveal Items */
/* 8.2. Interactive D3 Graph */
/* 8.3. AI Carousel (Card 3) */
/* 8.4. Typographic Adjustments */

/* --- 9. Print-Specific Styles --- */
@media print { ... }
```

### CSS Custom Properties

```css
:root {
    /* Akzentfarbe (dynamisch änderbar) */
    --accent-color: #0672A2;
    --accent-rgb: 6, 114, 162;
    --accent-text-color: #38bdf8;
    
    /* Hintergrund-Opazität (Slider-gesteuert) */
    --bg-image-opacity: 0.15;
    
    /* Transitions (konsistent) */
    --transition-fast: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-medium: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-slow: 0.8s cubic-bezier(0.25, 1, 0.5, 1);
}
```

---

## 📄 HTML-Struktur

### Semantische Gliederung

```html
<body class="loading">
    <!-- 1. Loading Screen -->
    <div id="loading-screen">...</div>
    
    <!-- 2. Parallax Backgrounds -->
    <div id="background-container">
        <div class="parallax-bg" data-media-key="1-0"></div>
        <!-- ... weitere Hintergründe -->
    </div>
    
    <!-- 3. Story Cards (Hauptinhalt) -->
    <section id="card-1" class="story-card">
        <div class="card-content">...</div>
        <div class="print-bg print-only"></div>
        <span class="print-page-indicator print-only"></span>
    </section>
    <!-- ... Karten 2-7 -->
    
    <!-- 4. Print Back Cover -->
    <section id="print-back-cover" class="story-card print-only">...</section>
    
    <!-- 5. Settings Panel (Fixed) -->
    <div class="settings-container">...</div>
    
    <!-- 6. Navigation Dots (Fixed) -->
    <nav class="chapter-nav" aria-label="Kapitelnavigation"></nav>
    
    <!-- 7. Scroll Indicator -->
    <div class="scroll-indicator">...</div>
    
    <!-- 8. Modal Overlays -->
    <div id="carousel-geodeep" class="carousel-overlay">...</div>
    <!-- ... weitere Modals -->
</body>
```

---

## 🔄 Datenfluss

### Media-Fallback-System

```
┌─────────────────────────────────────────────────────────────┐
│                   localMediaConfig                           │
│  { "1-0": [onlineSrc, localSrc], ... }                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  testAndSetSource()                          │
│  1. Prüfe Element-Typ (IMG, VIDEO, IFRAME, DIV)             │
│  2. Für Bilder: Teste lokale Quelle mit Image()             │
│  3. Bei Erfolg: Verwende lokal                              │
│  4. Bei Fehler: Fallback auf Online-Quelle                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   DOM-Element                                │
│  <img src="data/1-0.png"> oder                              │
│  <img src="https://...">                                    │
└─────────────────────────────────────────────────────────────┘
```

### Präsentations-Sequenz

```
┌─────────────────────────────────────────────────────────────┐
│              buildPresentationSequenceForCard()              │
│  Für jede Karte:                                            │
│  1. Füge Karte als Step hinzu                               │
│  2. Finde alle .reveal-item Elemente                        │
│  3. Füge jeden Reveal als separaten Step hinzu              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 presentationSequence[]                       │
│  [                                                          │
│    { type: 'card', targetId: 'card-1' },                    │
│    { type: 'card', targetId: 'card-2' },                    │
│    { type: 'reveal', cardId: 'card-4', element: <div> },    │
│    { type: 'reveal', cardId: 'card-4', element: <div> },    │
│    ...                                                      │
│  ]                                                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Abhängigkeiten

### Externe Bibliotheken

| Bibliothek | Version | Einbindung | Zweck |
|------------|---------|------------|-------|
| **D3.js** | v7 | Lokal (`lib/d3.min.js`) | Interaktiver Graph |
| **Lucide Icons** | Latest | CDN | Icon-System |
| **Inter Font** | - | Lokal (`lib/fonts/`) | Typografie |

### CDN-Abhängigkeiten

```html
<!-- Lucide Icons (einzige CDN-Abhängigkeit) -->
<script src="https://unpkg.com/lucide@latest"></script>
```

> ⚠️ **Empfehlung**: Lucide lokal einbinden für vollständige Offline-Fähigkeit.

---

## 🔒 Sicherheitsaspekte

### Content Security Policy (empfohlen)

```html
<meta http-equiv="Content-Security-Policy" content="
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://unpkg.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    frame-src https:;
">
```

### Externe Ressourcen

| Ressource | Domain | Risiko |
|-----------|--------|--------|
| Lucide Icons | unpkg.com | Niedrig |
| Canva Embeds | canva.com | Mittel |
| YouTube Embeds | youtube.com | Mittel |
| Unsplash Images | unsplash.com | Niedrig |

---

*Letzte Aktualisierung: Januar 2026*
