// Variables d'environnement pour les tests
process.env.NODE_ENV = "test";
process.env.NEXT_PUBLIC_APP_URL = "http://localhost:3000";
process.env.DATABASE_URL = "postgresql://test:test@localhost:5432/test_db";
process.env.CLERK_SECRET_KEY = "sk_test_fake_key";
process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = "pk_test_fake_key";
