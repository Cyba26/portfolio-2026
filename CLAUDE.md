# Portfolio Arthur Jeunechamp — Site Perso 2026

## Contexte
Portfolio d'un Product Designer (Arthur Jeunechamp / Cyba26). Le designer fournit les maquettes Figma, l'assistant implémente le code.
Déployé sur Vercel avec auto-deploy GitHub depuis `main`.

## Stack technique
- **Framework** : Astro (static site generator) — PAS de Tailwind
- **Styling** : CSS custom properties (design tokens dans `src/styles/tokens.css`)
- **Convention CSS** : BEM (`.bloc-project__chips`, `.menu-home__logo--dark`)
- **Figma** : Fichier clé `u6bteqVxd4DtqFO1Pfipo2` — utiliser les outils MCP Figma pour récupérer les designs

## Commandes
- **Build** : `npm run build` (toujours préfixer avec `export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"`)
- **Dev** : `npm run dev`

## Structure du projet
```
src/
  layouts/
    Layout.astro          — Layout de base (<html>, <head>, fonts, tokens)
    ProjectLayout.astro   — Layout des pages projet (header parallax, chips, slots)
  components/
    MenuHome.astro        — Menu fixe en haut à gauche (logo AJ, hover swap)
    Chip.astro            — Pill chip (blue-500, 4px 12px, regular)
    ButtonRound.astro     — Bouton rond avec flèche (cream, 56px, radius-full)
    BlocProject.astro     — Bloc projet sur la homepage (bg image + overlay + mockup + infos)
    ProjectThumbnail.astro — Carte miniature en bas des pages projet
    SectionTitle.astro    — Titre de section (H1 bold + glow)
    BlocSkills.astro      — Bloc compétence (titre + desc + image)
    BlocLink.astro        — Lien avec icône (LinkedIn, Mail, CV)
    PhotoTitle.astro      — Photo ronde + titre "Je suis / Curieux et créatif"
    Footer.astro          — Footer avec motif
  pages/
    index.astro           — Page d'accueil
    styleguide.astro      — Design system / styleguide
    projets/
      bouygues.astro      — bgColor="#faf5eb" textColor="#464b47"
      fdj.astro           — bgColor="#0b1740" textColor="#e7edff"
      thales.astro        — bgColor="#00111d" textColor="#f1f5ff"
      colas.astro         — bgColor="#dfd8c0" textColor="#333"
  styles/
    tokens.css            — Design tokens (couleurs, typo, spacing, radius)
    global.css            — Styles globaux (reset, typo classes)
public/
  images/
    projects/{Bouygues,FDJ,Thales,Colas}/  — Assets par projet
    logo/                 — Logos AJ (Dark = pour fonds sombres, Light = pour fonds clairs)
    hero/                 — Motif hero
    skills/               — Images compétences
    icons/                — Icônes contact
    footer/               — Motif footer
```

## Pages projet — Structure
Chaque page projet utilise `ProjectLayout.astro` avec :
- **3 images header en parallax** (`slot="header"`, class `parallax-layer`) — scroll à vitesse `index * 0.08`
- **Contenu unique** par page (textes + images + vidéos en séquence spécifique)
- **Thumbnails** en bas (`slot="thumbnails"`) vers 2 autres projets

### Nommage des images
- Header : `Mockup [Nom] 1/2/3.png` (sauf Colas qui a des noms custom)
- Fond homepage : `Background.png` ou `Background.jpg`
- Mockup homepage : `Mockup_Home.png`
- Contenu : numérotées `1_xxx.png`, `2_xxx.png`, etc.
- Vidéos : `Showreel_Client_xxx.mp4`

## Chips par projet
- **Bouygues** : UI Design, UX Design, Design System, BTP & Construction
- **FDJ** : UI Design, UX Design, Événementiel & Salon, Jeux d'argent
- **Thales** : UI Design, UX Design, Design System, Écologie, Parking & Transport
- **Colas** : UI Design, UX Design, Charte Graphique, BTP & Construction

## Conventions importantes
- Le logo "Icon 180px - Dark.png" = logo clair (pour fonds sombres) — nommage Figma inversé
- Toujours vérifier que les noms de fichiers images correspondent aux fichiers réels dans `public/`
- Les composants doivent être cohérents entre toutes les pages (même Chip partout)
- Vidéos : `<video autoplay muted loop playsinline>` dans un `<div class="project-image">`
