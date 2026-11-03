# PokeSphere Web Landing & Download Page

A modern, responsive landing and download web application for **PokeSphere** — the native Android mod for Pokémon GO built with LSPosed, React Native, Kotlin, and Unity IL2CPP C++ hooks.

Fully responsive across **Mobile**, **Tablet**, and **Desktop** screens.

---

## 🚀 Key Highlights & Pages

- **Dedicated Download Hub**: Direct APK download button (`v1.0.0-release`), file size, SHA-256 hash copy button, and mirror links.
- **Interactive Download Modal**: Animated download progress simulator with package verification and one-click direct APK generation.
- **Interactive Device Compatibility Checker**: Instant validation tool for Android versions (10–15), Root types (Magisk, KernelSU, APatch), and LSPosed module status.
- **In-Game Overlay Simulator**: Interactive live simulation showing PokeSphere's floating HUD, real-time IV inspection, and auto-spin PokéStop actions directly in browser.
- **Features Showcase**: 6 core module cards (IL2CPP Native Engine, Auto-Spin, IV & PvP Scanner, Fast Catch Assist, Inventory Filter, Stealth Sandbox).
- **Step-by-Step Installation Guide**: 4 interactive setup steps with copyable package names (`com.nianticlabs.pokemongo`) and LSPosed configuration rules.
- **FAQ Accordion**: Common questions covering rooting, safety, target versions, and uninstallation.
- **Mobile Responsive Drawer**: Fluid hamburger navigation menu with smooth scrolling on mobile and tablet screens.

---

## 🛠️ Tech Stack

- **React 19** + **TypeScript**
- **Vite 8** (lightning fast HMR and optimized production bundles)
- **Tailwind CSS v4** (cyber/gaming dark theme with responsive breakpoints)
- **Lucide React** (high quality iconography)

---

## 💻 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
```
Generates production-ready static assets in the `dist/` directory.

### 4. Preview Build
```bash
npm run preview
```
