#!/usr/bin/env node

console.log('🚀 Démarrage du processus de build...');

const { execSync } = require('child_process');

try {
  // Étape 1: Générer le client Prisma
  console.log('📦 Génération du client Prisma...');
  execSync('prisma generate', { stdio: 'inherit' });

  // Étape 2: Tenter de déployer les migrations
  console.log('🗄️ Déploiement des migrations...');
  try {
    execSync('prisma migrate deploy', { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️ Migration deploy a échoué, tentative avec db push...');
    try {
      execSync('prisma db push --force-reset', { stdio: 'inherit' });
    } catch (pushError) {
      console.log('❌ Erreur lors de la configuration de la base de données:', pushError.message);
      process.exit(1);
    }
  }

  // Étape 3: Build Next.js
  console.log('🏗️ Construction de l\'application Next.js...');
  execSync('next build', { stdio: 'inherit' });

  console.log('✅ Build terminé avec succès !');
} catch (error) {
  console.error('❌ Erreur lors du build:', error.message);
  process.exit(1);
}
