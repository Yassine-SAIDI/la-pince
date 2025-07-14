# 🤝 Guide de Contribution - La Pince

## Avant de commencer

1. **Installation**

   ```bash
   git clone <repo>
   cd la-pince
   npm install
   cp .env.example .env
   # Configurer les variables d'environnement
   ```

2. **Vérifications**
   ```bash
   npm run type-check
   npm run lint
   npm run test
   ```

## 📋 Conventions de code

### TypeScript

- Utiliser des types stricts
- Éviter `any`
- Documenter les interfaces complexes

### React

- Composants fonctionnels uniquement
- Hooks personnalisés pour la logique partagée
- Props interfaces pour les composants

### CSS/Styling

- TailwindCSS uniquement
- Pas de CSS custom sauf exceptions
- Variables CSS pour les couleurs personnalisées

### Commits

```
type(scope): description

feat(auth): ajout de l'authentification 2FA
fix(ui): correction du bug de navigation mobile
docs(api): mise à jour de la documentation
test(core): ajout des tests manquants
```

## 🧪 Tests

### Tests unitaires

```bash
npm run test:unit
```

### Tests d'intégration

```bash
npm run test:integration
```

### Tests E2E

```bash
npm run test:e2e
```

## 🚀 Déploiement

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
npm start
```

### Docker

```bash
docker compose up --build
```

## 📁 Architecture

```
├── app/                    # App Router (Next.js 13+)
│   ├── (auth)/            # Routes d'authentification
│   ├── api/               # API Routes
│   ├── dashboard/         # Dashboard principal
│   └── ...
├── components/            # Composants réutilisables
│   ├── ui/               # Composants UI de base
│   └── ...
├── hooks/                # Hooks personnalisés
├── lib/                  # Utilitaires et configuration
├── prisma/               # Schéma et migrations de BDD
├── schema/               # Schémas de validation Zod
└── types/                # Types TypeScript
```

## ⚡ Performance

- Lazy loading des composants lourds
- Optimisation des images avec Next.js
- Bundle analyzer pour surveiller la taille
- React Query pour la mise en cache

## 🔒 Sécurité

- Authentification via Clerk
- Validation côté serveur avec Zod
- Headers de sécurité configurés
- Variables d'environnement sécurisées
