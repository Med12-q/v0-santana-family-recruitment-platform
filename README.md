# SANTANA FAMILY — Plateforme de Recrutement d'Élite

> **Les Démons de la Terreur**
> _"L'élite ne se rejoint pas. Elle se mérite."_

Plateforme web de recrutement futuriste et immersive pour la **SANTANA FAMILY**. Le recrutement ne se fait plus par messages privés : tout candidat passe par la plateforme officielle pour un processus structuré, professionnel et sécurisé.

---

## Sommaire

- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
- [Architecture](#architecture)
- [Installation](#installation)
- [Configuration (variables d'environnement)](#configuration)
- [Base de données](#base-de-données)
- [Fonctionnement de l'IA](#fonctionnement-de-lia-santana-ai)
- [Gestion des candidatures](#gestion-des-candidatures)
- [Administration](#administration)
- [Déploiement](#déploiement)
- [Sécurité](#sécurité)

---

## Fonctionnalités

- **Page d'accueil cinématique** : logo majestueux avec apparition animée, halo lumineux, animation flottante et particules.
- **Section Leader** : carte premium de Lord Santana avec effet machine à écrire.
- **SANTANA AI** : assistant IA intégré (chat flottant + page dédiée), disponible 24h/24.
- **Formulaire de recrutement** complet avec page de confirmation immersive et redirection vers le groupe d'évaluation.
- **Notification e-mail** automatique de chaque candidature à l'administration.
- **Espace administrateur sécurisé** : tableau de bord, statistiques, graphiques, recherche, gestion des statuts, suppression, export PDF & Excel.
- **Pages** : Accueil, Recrutement, À propos, Hiérarchie, Règlement, SANTANA AI, Contact, Administration.
- **Design** : noir absolu, rouge néon, blanc premium, animations avancées, 100% responsive.

---

## Technologies

| Couche          | Stack                                   |
| --------------- | --------------------------------------- |
| Frontend        | Next.js 16 (App Router), React, TypeScript |
| Styles          | Tailwind CSS v4, animations CSS          |
| Animations      | Framer Motion                            |
| Backend         | Next.js Server Actions / Route Handlers  |
| Base de données | PostgreSQL (Neon)                        |
| IA              | AI SDK + OpenAI                          |
| E-mail          | Resend                                   |
| Auth admin      | JWT (jose) + cookie httpOnly             |
| Graphiques      | Recharts                                 |
| Export          | jsPDF + CSV (Excel)                      |

---

## Architecture

\`\`\`
app/
  (site)/                  # Pages publiques (navbar, footer, fond animé, chat flottant)
    page.tsx               # Accueil
    recrutement/           # Formulaire de recrutement
    a-propos/              # À propos
    hierarchie/            # Grades
    reglement/             # Règlement
    santana-ai/            # Page IA
    contact/               # Contact
  administration/
    page.tsx               # Connexion admin
    dashboard/page.tsx     # Tableau de bord protégé
  api/chat/route.ts        # Endpoint streaming SANTANA AI
  actions/
    candidatures.ts        # Soumission de candidature
    admin.ts               # Login, CRUD candidatures
components/                # Navbar, footer, formulaires, dashboard, chat, FX
lib/
  db.ts                    # Client SQL Neon + types
  admin-auth.ts            # Sessions JWT admin
  email.ts                 # Envoi des notifications Resend
  santana-knowledge.ts     # Base de connaissance de l'IA
  rate-limit.ts            # Limitation des requêtes (anti-spam/bot)
  export.ts                # Export PDF / CSV
  site-config.ts           # Configuration, navigation, grades, règles
\`\`\`

---

## Installation

\`\`\`bash
# 1. Cloner le dépôt
git clone <url-du-repo>
cd santana-family

# 2. Installer les dépendances
pnpm install

# 3. Configurer l'environnement
cp .env.example .env.local
# puis renseignez les variables

# 4. Lancer en développement
pnpm dev
\`\`\`

Ouvrez [http://localhost:3000](http://localhost:3000).

---

## Configuration

Variables d'environnement (voir `.env.example`) :

| Variable          | Description                                                        |
| ----------------- | ------------------------------------------------------------------ |
| `DATABASE_URL`    | Chaîne de connexion PostgreSQL (fournie par Neon).                 |
| `OPENAI_API_KEY`  | Clé API OpenAI pour l'assistant SANTANA AI.                        |
| `RESEND_API_KEY`  | Clé API Resend pour l'envoi des e-mails de candidature.            |
| `ADMIN_PASSWORD`  | Mot de passe de l'espace administrateur.                           |
| `JWT_SECRET`      | Secret (≥32 caractères) pour signer les sessions admin.            |

---

## Base de données

Table `candidates` :

\`\`\`sql
CREATE TABLE IF NOT EXISTS candidates (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  pseudo TEXT NOT NULL,
  age INTEGER,
  country TEXT,
  technical_level TEXT,
  previous_clans TEXT,
  experience TEXT,
  years_active TEXT,
  motivation TEXT,
  availability TEXT,
  email TEXT NOT NULL,
  whatsapp TEXT,
  skills TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
\`\`\`

---

## Fonctionnement de l'IA (SANTANA AI)

- L'assistant utilise l'**AI SDK** avec le modèle OpenAI via `app/api/chat/route.ts`.
- Le contexte (identité du clan, leader, grades, règles, processus de recrutement) est défini dans `lib/santana-knowledge.ts` et injecté en tant que `system prompt`.
- Les réponses sont **streamées** en temps réel.
- Une limitation de débit protège l'endpoint contre les abus.
- Disponible via le **chat flottant** (toutes les pages) et la **page dédiée** `/santana-ai`.

---

## Gestion des candidatures

1. Le candidat remplit le formulaire `/recrutement`.
2. Validation côté serveur + honeypot anti-bot + rate limiting.
3. Enregistrement dans PostgreSQL.
4. Notification e-mail automatique à `santanafamille50@gmail.com`.
5. Page de confirmation immersive invitant à **rejoindre le groupe d'évaluation** (WhatsApp).
6. Après évaluation, les chefs valident ou refusent et transmettent le lien du QG aux élus.

---

## Administration

- Connexion : `/administration` (mot de passe `ADMIN_PASSWORD`).
- Tableau de bord : `/administration/dashboard`.
  - Statistiques : total, acceptés, refusés, candidatures du jour, taux d'acceptation.
  - Graphiques : évolution mensuelle, répartition par statut.
  - Recherche, filtres par statut.
  - Actions : voir le détail, accepter, refuser, supprimer.
  - Export **PDF** et **Excel (CSV)**.
- Session JWT signée, cookie `httpOnly`, expiration 7 jours.

---

## Déploiement

### Vercel (recommandé)

1. Importez le dépôt sur Vercel.
2. Ajoutez les variables d'environnement.
3. Connectez l'intégration Neon (ou ajoutez `DATABASE_URL`).
4. Déployez.

### Cloudflare Pages

- Framework : Next.js.
- Renseignez les variables d'environnement dans le tableau de bord Cloudflare.

---

## Sécurité

- CAPTCHA / honeypot anti-bot sur le formulaire.
- Limitation des requêtes (rate limiting) sur les endpoints sensibles.
- Validation et nettoyage des entrées.
- Requêtes paramétrées (protection anti-injection SQL).
- Sessions admin signées via JWT, cookies `httpOnly` / `secure`.
- Journalisation des tentatives de connexion échouées.

---

© SANTANA FAMILY — Les Démons de la Terreur.
