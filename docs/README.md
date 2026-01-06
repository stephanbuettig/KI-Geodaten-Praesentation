# KI-Geodaten-Praesentation

> **Interaktive Web-Präsentation: KI Geoinformation - Trends und Entwicklungen**

[![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)]()
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)]()
[![Status](https://img.shields.io/badge/Status-Production-green.svg)]()

## 📋 Inhaltsverzeichnis

- [Überblick](#überblick)
- [Features](#features)
- [Schnellstart](#schnellstart)
- [Projektstruktur](#projektstruktur)
- [Dokumentation](#dokumentation)
- [Browser-Kompatibilität](#browser-kompatibilität)
- [Autoren](#autoren)

## 🎯 Überblick

Diese Präsentation demonstriert die Potenziale von Künstlicher Intelligenz für die Geoinformation. Sie wurde für das **GeoSN** (Staatsbetrieb Geobasisinformation und Vermessung Sachsen) entwickelt und präsentiert aktuelle KI-Tools und -Technologien im GIS-Bereich.

### Kernthemen

| Folie | Thema | Beschreibung |
|-------|-------|--------------|
| 1 | Titelfolie | Einführung und Kontext |
| 2 | Agenda | Interaktive D3.js-Themenübersicht |
| 3 | KI-Berührungspunkte | 8 KI-Anwendungsbereiche im Karussell |
| 4 | Erdbeobachtung | GeoDeep, GeoVision Labeler |
| 5 | QGIS & KI | AI Vectorizer, Deepness, QGISMCP |
| 6 | LLMs für GIS | Mundi.ai WebGIS |
| 7 | Satelliten-Embeddings | AlphaEarth Foundations |

## ✨ Features

### Interaktivität
- 🎨 **Theme-Wechsel** (Light/Dark Mode)
- 🎨 **Dynamische Akzentfarbe** (Color Picker)
- 🖼️ **Hintergrund-Opazität** (Slider-Steuerung)
- 📊 **Interaktiver D3.js-Graph** (Drag & Zoom)
- 🎠 **Medien-Karussells** mit Auto-Rotation

### Navigation
- ⌨️ **Tastatursteuerung** (Pfeiltasten, PageUp/Down, Space)
- 🔘 **Dot-Navigation** (Seitenleiste)
- 📜 **Scroll-Snap** für flüssige Übergänge
- 🎯 **Präsentationsmodus** mit Step-by-Step-Reveal

### Ausgabe
- 🖨️ **PDF-Export** (A4 Landscape, optimiert)
- 🏢 **Corporate Design Toggle** (Sachsen-Branding)
- 📱 **Offline-Fähigkeit** (lokale Fallback-Medien)

## 🚀 Schnellstart

```bash
# Repository klonen
git clone https://github.com/stephanbuettig/KI-Geodaten-Praesentation.git

# In das Verzeichnis wechseln
cd KI-Geodaten-Praesentation

# Mit einem lokalen Server starten (empfohlen)
python -m http.server 8000
# oder
npx serve .

# Im Browser öffnen
open http://localhost:8000
```

> ⚠️ **Wichtig**: Für volle Funktionalität (CORS, lokale Medien) einen lokalen Server verwenden!

## 📁 Projektstruktur

```
KI-Geodaten-Praesentation/
├── 📄 index.html          # Haupt-Präsentationsdatei (Single-File-App)
├── 📄 .gitignore          # Git-Konfiguration (ignoriert große GIFs)
├── 📁 data/               # Medien-Assets
│   ├── 1-0.png           # Hintergrundbilder (Folie-Index.png)
│   ├── 1-1.svg           # Content-Bilder
│   ├── 3-1.jpg - 3-5.jpg # KI-Beispielbilder
│   └── avatar.jpg        # Autor-Profilbild
├── 📁 lib/                # Externe Bibliotheken
│   ├── d3.min.js         # D3.js v7 (Visualisierung)
│   └── fonts/            # Lokale Schriftarten
│       ├── inter-300.ttf
│       └── inter-400.ttf
└── 📁 Vortrag/            # Präsentations-Screenshots
    └── *.png
```

## 📚 Dokumentation

| Dokument | Beschreibung |
|----------|--------------|
| [ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Technische Architektur & Code-Struktur |
| [STYLE-GUIDE.md](./docs/STYLE-GUIDE.md) | CSS-Design-System & Konventionen |
| [COMPONENTS.md](./docs/COMPONENTS.md) | Komponenten-Dokumentation |
| [BEST-PRACTICES.md](./docs/BEST-PRACTICES.md) | Empfehlungen & Verbesserungsvorschläge |
| [CODE-REVIEW.md](./docs/CODE-REVIEW.md) | Detaillierte Code-Analyse |
| [CHANGELOG.md](./CHANGELOG.md) | Versionshistorie |

## 🌐 Browser-Kompatibilität

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Vollständig |
| Firefox | 88+ | ✅ Vollständig |
| Safari | 14+ | ✅ Vollständig |
| Edge | 90+ | ✅ Vollständig |
| IE 11 | - | ❌ Nicht unterstützt |

### Erforderliche Features
- CSS Custom Properties
- CSS Scroll Snap
- Intersection Observer API
- ES6+ JavaScript
- CSS Backdrop Filter

## 👥 Autoren

- **Stephan Büttig** - *Hauptentwickler* - [LinkedIn](https://www.linkedin.com/in/stephan-buettig/)
- **Thomas Schindler** - *Co-Autor*

**Organisation**: [Digitalagentur Sachsen](https://www.digitalagentur.sachsen.de/)

---

📅 **Präsentationsdatum**: 04.09.2025  
🎯 **Zielgruppe**: GeoSN (Staatsbetrieb Geobasisinformation und Vermessung Sachsen)
