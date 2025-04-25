# La Pince

Application web de gestion de finances personnelles, développée avec [Next.js](https://nextjs.org), [Prisma](https://www.prisma.io/), [Clerk](https://clerk.com/), [PostgreSQL](https://www.postgresql.org/), [React Query](https://tanstack.com/query/latest), [Tailwind CSS](https://tailwindcss.com/) et Docker.

---

## Sommaire

- [Fonctionnalités](#fonctionnalités)
- [Prérequis](#prérequis)
- [Installation & Démarrage](#installation--démarrage)
- [Configuration des variables d'environnement](#configuration-des-variables-denvironnement)
- [Utilisation de Docker](#utilisation-de-docker)
- [Tests & Qualité](#tests--qualité)
- [CI/CD](#cicd)
- [Déploiement sur Vercel](#déploiement-sur-vercel)
- [Ressources utiles](#ressources-utiles)

---

## Fonctionnalités

- Authentification sécurisée avec Clerk
- Gestion des transactions (revenus, dépenses)
- Catégorisation, historique, statistiques et graphiques
- Interface responsive et thème sombre
- Export CSV, filtres avancés
- API REST sécurisée
- Dashboard utilisateur

---

## Prérequis

- Node.js 20+ et npm
- Docker & Docker Compose v2
- Un compte [Clerk](https://clerk.com/) (pour l'auth)
- Un compte [Vercel](https://vercel.com/) (pour le déploiement)
- Un accès à une base PostgreSQL (local ou cloud)

---

## Installation & Démarrage

### En local (hors Docker)

1. Clone le repo et installe les dépendances :

   ```bash
   git clone <repo-url>
   cd la-pince
   npm install
   ```

2. Copie le fichier `.env.exemple` en `.env` et configure les variables nécessaires.

3. Lance la base de données (PostgreSQL) si besoin.

4. Applique les migrations Prisma :

   ```bash
   npx prisma migrate deploy
   ```

5. Démarre le serveur Next.js :

   ```bash
   npm run dev
   ```

6. Accède à [http://localhost:3000](http://localhost:3000)

---

## Configuration des variables d'environnement

Exemple de `.env` :

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
DATABASE_URL=postgres://user:password@host:5432/dbname
```

- Les clés Clerk sont à récupérer sur [dashboard Clerk](https://dashboard.clerk.com/)
- `DATABASE_URL` doit pointer vers votre base PostgreSQL

---

## Utilisation de Docker

### Lancer l'application et la base PostgreSQL

```bash
docker compose up --build
```

- L'application sera accessible sur [http://localhost:3000](http://localhost:3000)
- La base PostgreSQL sur le port 5432

### Vérifier l'API de santé

```bash
curl -s http://localhost:3000/api/health
```

---

## Tests & Qualité

- **Lint** : `npm run lint`
- **Tests unitaires** : `npm run test:unit`
- **Tests d'intégration** : `npm run test:integration`
- **Tests de sécurité** : `npm run test:security`
- **Tests E2E (Cypress)** : `npm run test:e2e`
- **Audit de performance (Lighthouse)** : `npm run test:performance`

---

## CI/CD

Le projet utilise GitHub Actions pour :

- Lint, tests, build, et déploiement automatique sur Vercel
- Variables sensibles (Clerk, DB, Vercel) à configurer dans les **Secrets** du repo

Fichier de workflow : `.github/workflows/ci-cd.yml`

---

## Déploiement sur Vercel

Le déploiement est automatisé via GitHub Actions.  
Pour un déploiement manuel :

1. Connecte ton repo à Vercel
2. Configure les variables d'environnement dans le dashboard Vercel
3. Déploie via l'interface ou la CLI :

   ```bash
   vercel --prod
   ```

---

## Ressources utiles

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

## Licence

Projet sous licence MIT.
