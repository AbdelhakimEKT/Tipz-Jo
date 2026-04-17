# SPÉCIFICATIONS TECHNIQUES - TIPZ & JO (ORLÉANS)

## 1. STACK & ASSETS
- **Stack :** React, Tailwind CSS, Framer Motion.
- **Assets :** Images locales dans `/public/assets/`.
  - Fichiers : `hero-tender.webp`, `tenders.webp`, `wings.webp`, `wrap.webp`, `tacos.webp`, `burger.webp`, `fries.webp`.
- **Typo :** Titres "Bubbly" (Fredoka/Nunito), Corps "Modern Sans" (Plus Jakarta Sans).

## 2. DESIGN SYSTEM (2026 PREMIUM)
- **Palette :** - Background: `#FDFBF7` (Crème)
  - Accents: `#D9534F` (Terracotta), `#EAB308` (Jaune), `#F97316` (Orange)
- **UI :** Bordures `rounded-2xl`, ombres douces, hiérarchie visuelle aérée, boutons magnétiques.

## 3. MOTION : L'EFFET "JUICY POP" (PRIORITÉ)
- **Physics :** `type: "spring", stiffness: 260, damping: 20`.
- **Animations :** - Staggered reveal sur les cartes du menu.
  - Floating motion sur le Hero (`hero-tender.webp`).
  - Entrance: Scale (0.8 -> 1) avec bounce.
  - Hover: `scale: 1.05`, `rotate: 1` sur les cartes.

## 4. STRUCTURE DE LA PAGE
1. **Hero :** "On débarque à Orléans.", CTA "Commander".
2. **Marquee :** "CRISPY 🔥 JUICY 🍔 ADDICTIF 🍗 LA STREETFOOD D'ORLÉANS".
3. **Concept :** Focus 100% Maison & Marinades 24h.
4. **Menu Grid (Items + Prix + Badge "100% MAISON") :**
   - Tenders & Cheddar Drop (9,90€)
   - Wings Signature (10,90€)
   - The Fresh Crunch (8,90€)
   - Le Tacos Signature (9,50€) - *Sans frites à l'intérieur*
   - The Banger Burger (12,90€)
   - Nos Sides (4,50€) - *Frites ondulées*
5. **Livraison :** Cartes stylisées UberEats & Deliveroo.
6. **Footer :** Adresse (Orléans), Horaires, Réseaux (IG, TikTok, Snap).