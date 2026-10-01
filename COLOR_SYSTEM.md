# MKT Shanthi Nivas — Color System Guide

This document preserves the complete color history and token architectures for the **MKT Shanthi Nivas** website. 
All colors are centralized in:
📁 [`src/styles/design-tokens.css`](file:///g:/Godivatech/MKT%20Hotel%20Rameswaram/src/styles/design-tokens.css)

---

## 🎨 Version 2 (Active): Deep Temple Maroon & Sacred Gold
Designed around the client's brand primary color **`#401912`** (Deep Royal Mahogany / Temple Maroon) found in the official MKT logo. As a graphic designer, all complementary, secondary, and neutral shades have been harmonized to eliminate clashing and create a regal South Indian temple aesthetic.

```css
:root {
  /* Brand Primary Palette (Deep Royal Mahogany / Temple Maroon) */
  --primary: #401912;
  --primary-dark: #2B100B;
  --primary-light: #5E261C;
  --primary-rgb: 64, 25, 18;
  --primary-dark-rgb: 43, 16, 11;

  /* Harmonized Secondary Palette (Warm Terracotta / Rust) */
  --secondary: #8B3A2B;
  --secondary-dark: #6E2C20;
  --secondary-light: #AB4E3C;
  --secondary-rgb: 139, 58, 43;

  /* Luxury Accent Palette (Warm Temple Gold & Brass) */
  --accent: #DA9B5A;
  --accent-hover: #C68846;
  --accent-light: #FBF4EC;
  --accent-rgb: 218, 155, 90;

  /* Dark Contrast & Typography */
  --dark: #231613;
  --dark-rgb: 35, 22, 19;
  --text: #3D2D29;
  --text-dark: #1E1210;
  --text-muted: #73615C;
  --text-light: #A3938E;
  --text-white: #FFFFFF;

  /* Warm Temple Stone Backgrounds & Surfaces */
  --background: #FAF7F2;
  --background-alt: #F3ECE1;
  --surface: #FFFFFF;
  --surface-alt: #F7F1E7;

  /* Dividers & Borders */
  --border: #E8E0D5;
  --border-dark: #D4C9BC;
  --border-gold: rgba(218, 155, 90, 0.4);
}
```

### Aesthetic Harmony Notes (V2)
- **Deep Maroon (`#401912`) + Gold (`#DA9B5A`)**: The classic South Indian traditional luxury combination (seen in Kanchipuram silk, temple carvings, and brass lamps).
- **Secondary (`#8B3A2B`)**: Replaces cold teal with a warm terracotta that sits naturally beside the deep maroon without overpowering it.
- **Backgrounds (`#FAF7F2`)**: Warmer ivory stone tones complement the maroon better than cool gray.

---

## 🏛️ Version 1 (Archived): Sacred Temple Teal & Sand Gold
The original launch color system inspired by the coastal waters of Rameswaram and the Ramanathaswamy Temple corridors.

```css
:root {
  /* Brand Primary Palette (Deep Sacred Teal) */
  --primary: #006D6F;
  --primary-dark: #005052;
  --primary-light: #00878A;
  --primary-rgb: 0, 109, 111;

  /* Secondary Palette (Coastal Turquoise) */
  --secondary: #00A3A8;
  --secondary-dark: #008488;
  --secondary-light: #33B5BA;
  --secondary-rgb: 0, 163, 168;

  /* Accent Palette (Temple Sand Gold) */
  --accent: #DA9B5A;
  --accent-hover: #C68846;
  --accent-light: #FBF4EC;
  --accent-rgb: 218, 155, 90;

  /* Dark Contrast & Typography */
  --dark: #1F2937;
  --dark-rgb: 31, 41, 55;
  --text: #374151;
  --text-dark: #111827;
  --text-muted: #6B7280;
  --text-light: #9CA3AF;
  --text-white: #FFFFFF;

  /* Backgrounds & Surfaces */
  --background: #FAF8F3;
  --background-alt: #F4EFE6;
  --surface: #FFFFFF;
  --surface-alt: #F7F5EE;

  /* Dividers & Borders */
  --border: #E5E7EB;
  --border-dark: #D1D5DB;
  --border-gold: rgba(218, 155, 90, 0.4);
}
```

---

## 🔄 How to Switch Between Color Versions in the Future

1. Open [`src/styles/design-tokens.css`](file:///g:/Godivatech/MKT%20Hotel%20Rameswaram/src/styles/design-tokens.css).
2. Copy either the **Version 1** or **Version 2** block above.
3. Paste it inside `:root { ... }`.
4. Save the file. The entire website (all buttons, headers, cards, badges, and hovers) updates instantly!
