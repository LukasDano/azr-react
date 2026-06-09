import { cpSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import path from 'node:path';

type PackageJson = {
    version: string;
};

function getVersionFolder(): string {
    const pkg = JSON.parse(readFileSync('package.json', 'utf-8')) as PackageJson;
    return `v${pkg.version.replace(/\./g, '_')}`;
}

const versionFolder = getVersionFolder();

const sourceDir = path.resolve('dist');
const targetDir = path.resolve('dist', '../versions', versionFolder);

// Zielordner vollständig löschen, falls vorhanden
rmSync(targetDir, {
    recursive: true,
    force: true,
});

// Zielordner neu anlegen
mkdirSync(targetDir, { recursive: true });

// dist → Versionsordner kopieren
cpSync(sourceDir, targetDir, {
    recursive: true,
});

console.log(`Deployed to: ${targetDir}`);
