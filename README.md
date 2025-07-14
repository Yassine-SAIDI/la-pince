# 💸 La Pince – Application de gestion de finances personnelles

**La Pince** est une application web fullstack qui aide les utilisateurs à suivre leurs revenus, leurs dépenses, et à mieux gérer leur budget au quotidien. Ce projet a été réalisé dans le cadre de ma formation CDA (Concepteur Développeur d'Applications) comme projet de fin d'études.

🔗 [Démo en ligne](https://la-pince.vercel.app)

---

## 📌 Contexte

Face à la multiplication des abonnements, paiements en ligne et dépenses quotidiennes, *La Pince* vise à offrir une interface simple, sécurisée et moderne pour aider chacun à garder le contrôle de son budget.

---

## 🎯 Objectifs

- Suivi des revenus et dépenses
- Création de catégories personnalisées
- Visualisation des données via des graphiques
- Export des données (CSV)
- Interface responsive et sécurisée

---

## 🔐 Fonctionnalités

- Authentification sécurisée avec Clerk
- Gestion des transactions (revenus, dépenses)
- Catégorisation, historique, statistiques et graphiques dynamiques
- Interface responsive et thème sombre
- Export CSV, filtres avancés
- API REST sécurisée
- Dashboard utilisateur personnalisé

---

## 🛠️ Stack technique

### Frontend
- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Query (TanStack)](https://tanstack.com/query/latest)
- [Radix UI](https://www.radix-ui.com/)
- [Zod](https://zod.dev/)
- [React Hook Form](https://react-hook-form.com/)

### Backend
- API Routes via Next.js
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/) (hébergé via Neon)
- Authentification via [Clerk](https://clerk.com/)

### DevOps
- [Docker](https://www.docker.com/) & Docker Compose
- [GitHub Actions](https://github.com/features/actions)
- Déploiement frontend via [Vercel](https://vercel.com)

---

## 👨‍💻 Mon rôle

- Conception des schémas MCD / MLD & base PostgreSQL
- Développement frontend (UI, formulaire, dashboard)
- Backend : API REST sécurisées, logique métier Prisma
- Sécurisation avec Zod, Clerk, gestion d'erreurs
- Déploiement CI/CD, conteneurisation Docker

---

## 🐳 Utilisation de Docker

```bash
docker compose up --build
```

- App disponible sur http://localhost:3000
- Base PostgreSQL sur le port 5432

---

## ⚙️ Installation & Démarrage manuel

```bash
git clone <repo-url>
cd la-pince
npm install
cp .env.example .env # puis remplir les variables
npx prisma migrate deploy
npm run dev
```

---

## 📁 Variables d’environnement

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
DATABASE_URL=postgres://user:password@host:5432/dbname
```

---

## ✅ Tests & Qualité

- `npm run lint` : Lint avec ESLint
- `npm run test:unit` : Tests unitaires (Jest + React Testing Library)
- `npm run test:e2e` : Tests E2E (Cypress)
- `npm run test:performance` : Audit (Lighthouse)

---

## 🔄 CI/CD

- Intégration continue avec GitHub Actions
- Build, lint, tests, déploiement automatique sur Vercel

---

## 🚀 Déploiement manuel sur Vercel

1. Connecter le repo GitHub à Vercel
2. Configurer les variables dans le dashboard
3. Lancer via interface ou CLI :

```bash
vercel --prod
```

---

## 🛣️ Améliorations futures

- Authentification 2FA
- PWA mobile
- API de recommandations financières
- Audit automatique de sécurité

---

## 📄 Licence

Projet librement réutilisable à des fins pédagogiques.
