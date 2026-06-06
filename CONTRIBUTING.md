# Contribuer à la plateforme SANTANA FAMILY

Merci de votre intérêt pour le projet. Ce document décrit la procédure pour proposer des modifications.

## Prérequis

- Node.js 20+
- pnpm
- Une base PostgreSQL (Neon recommandé)

## Mise en place locale

```bash
git clone <repo>
cd santana-family
pnpm install
cp .env.example .env   # puis remplissez les variables
pnpm dev
```

## Conventions de code

- **TypeScript** strict, pas de `any` non justifié.
- **Composants** : un composant par fichier, nommage en `kebab-case` pour les fichiers.
- **Tailwind CSS** : utilisez les tokens de design définis dans `app/globals.css` (`bg-background`, `text-foreground`, etc.). N'utilisez pas de couleurs brutes.
- **Server Actions** : toute écriture en base passe par `app/actions/*`.
- **Sécurité** : aucune donnée sensible ne doit être committée. Les requêtes SQL doivent être paramétrées.

## Workflow Git

1. Créez une branche : `git checkout -b feat/ma-fonctionnalite`
2. Committez avec des messages clairs : `feat: ajoute X`, `fix: corrige Y`
3. Ouvrez une Pull Request vers `main` avec une description détaillée.

## Structure des branches

- `main` — production stable
- `feat/*` — nouvelles fonctionnalités
- `fix/*` — corrections de bugs

## Signaler un bug

Ouvrez une issue en précisant : étapes de reproduction, comportement attendu, comportement observé, captures d'écran si pertinent.

---

L'élite ne se rejoint pas. Elle se mérite.
