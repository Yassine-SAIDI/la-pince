#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

console.log("🧹 Nettoyage du projet...");

// Fichiers et dossiers à supprimer
const toDelete = [
  ".next",
  "node_modules/.cache",
  "tsconfig.tsbuildinfo",
  "coverage",
  "reports",
  "cypress/videos",
  "cypress/screenshots",
];

toDelete.forEach((item) => {
  const fullPath = path.join(process.cwd(), item);
  try {
    if (fs.existsSync(fullPath)) {
      fs.rmSync(fullPath, { recursive: true, force: true });
      console.log(`✅ Supprimé: ${item}`);
    }
  } catch (error) {
    console.error(
      `❌ Erreur lors de la suppression de ${item}:`,
      error.message
    );
  }
});

console.log("✨ Nettoyage terminé !");
