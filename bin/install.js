#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

// Parse arguments
const args = process.argv.slice(2);
const isGlobal = args.includes('--global') || args.includes('-g');
const isHelp = args.includes('--help') || args.includes('-h');

if (isHelp) {
  console.log(`
cc-ship - Architecture 3 couches pour Claude Code

Usage:
  npx cc-ship              Installe dans ./.claude/ (projet local)
  npx cc-ship --global     Installe dans ~/.claude/ (global)
  npx cc-ship --help       Affiche cette aide

Structure installée:
  commands/makit/        Commandes de workflow (/makit:xxx)
  agents/                Agents spécialisés
  skills/                Connaissances et techniques réutilisables
`);
  process.exit(0);
}

// Determine target directory
const targetDir = isGlobal
  ? path.join(os.homedir(), '.claude')
  : path.join(process.cwd(), '.claude');

// Source directory (where the package is installed)
const sourceDir = path.join(__dirname, '..');

console.log(`\n🚀 Installation de cc-ship...`);
console.log(`   Destination: ${targetDir}\n`);

// Directories to copy
const dirsToInstall = ['commands', 'agents', 'skills'];

// Ensure target directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log(`✓ Créé ${targetDir}`);
}

/**
 * Recursively copy a directory, preserving existing files
 */
function copyDir(src, dest, options = { preserveExisting: false }) {
  if (!fs.existsSync(src)) {
    console.log(`⚠ Source non trouvée: ${src}`);
    return;
  }

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, options);
    } else {
      // Check if file already exists
      if (fs.existsSync(destPath) && options.preserveExisting) {
        console.log(`  ○ Préservé: ${path.relative(targetDir, destPath)}`);
      } else {
        fs.copyFileSync(srcPath, destPath);
        console.log(`  ✓ Copié: ${path.relative(targetDir, destPath)}`);
      }
    }
  }
}

// Install each directory
for (const dir of dirsToInstall) {
  const srcDir = path.join(sourceDir, dir);
  const destDir = path.join(targetDir, dir);

  if (fs.existsSync(srcDir)) {
    console.log(`\n📁 Installation de ${dir}/`);
    // For agents, preserve existing files (like GSD)
    const preserveExisting = dir === 'agents';
    copyDir(srcDir, destDir, { preserveExisting });
  }
}

// Summary
console.log(`
✅ Installation terminée!

Commandes disponibles dans Claude Code:
  /makit:help         Liste des commandes makit
  /makit:brainstorm   Lance une session de brainstorming
  /makit:status       Affiche l'état du projet

Pour commencer:
  1. Ouvre Claude Code dans ce répertoire
  2. Tape /makit:help pour voir les commandes disponibles
`);
