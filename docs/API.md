# 📚 Documentation API - La Pince

## Routes disponibles

### 🔐 Authentication

Toutes les routes API nécessitent une authentification via Clerk.

### 📊 Endpoints

#### `GET /api/health`

Vérifie l'état de l'application et de la base de données.

**Réponse :**

```json
{
  "status": "ok",
  "timestamp": "2025-01-14T10:00:00.000Z",
  "uptime": 3600
}
```

#### `GET /api/transactions-history`

Récupère l'historique des transactions.

**Paramètres :**

- `from` (string) : Date de début (ISO)
- `to` (string) : Date de fin (ISO)

#### `GET /api/categories`

Liste les catégories de l'utilisateur.

**Paramètres :**

- `type` (string) : "income" ou "expense"

#### `POST /api/categories`

Crée une nouvelle catégorie.

**Body :**

```json
{
  "name": "string",
  "icon": "string",
  "type": "income" | "expense"
}
```

#### `DELETE /api/categories`

Supprime une catégorie.

#### `GET /api/stats/balance`

Récupère le solde et les statistiques.

#### `GET /api/stats/categories`

Statistiques par catégorie.

#### `GET /api/history-data`

Données d'historique pour les graphiques.

#### `GET /api/history-periods`

Périodes disponibles dans l'historique.

#### `GET /api/user-settings`

Paramètres utilisateur (devise, etc.).

#### `POST /api/user-settings`

Met à jour les paramètres utilisateur.

## 🚨 Codes d'erreur

- `400` : Données invalides
- `401` : Non authentifié
- `403` : Non autorisé
- `404` : Ressource non trouvée
- `500` : Erreur serveur
- `503` : Service indisponible
