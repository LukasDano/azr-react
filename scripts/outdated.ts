import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

type PackageJson = {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
};

type OutdatedPackage = {
    current: string;
    wanted: string;
    latest: string;
};

const preservePrefix = (oldVersion: string, newVersion: string): string => {
    const match = oldVersion.match(/^([\^~])/);

    if (match) return `${match[1]}${newVersion}`;
    return newVersion;
};

try {
    let outdated: Record<string, OutdatedPackage> = {};

    try {
        const result = execSync('npm outdated --json', {
            encoding: 'utf8',
            stdio: ['ignore', 'pipe', 'ignore'],
        });

        outdated = result ? JSON.parse(result) : {};
    } catch (error: any) {
        if (error.stdout) outdated = JSON.parse(error.stdout.toString());
    }

    if (Object.keys(outdated).length === 0) {
        console.log('All dependencies up-to-date');
        process.exit(0);
    }

    const pkg = JSON.parse(readFileSync('package.json', 'utf8')) as PackageJson;

    let updatedCount = 0;

    for (const [name, info] of Object.entries(outdated)) {
        const isMajorUpgrade = info.wanted !== info.latest;

        if (isMajorUpgrade) {
            console.log(
                `[MAJOR AVAILABLE] ${name}: current=${info.current} wanted=${info.wanted} latest=${info.latest}`
            );
            continue;
        }

        if (pkg.dependencies?.[name]) {
            const oldVersion = pkg.dependencies[name];
            const newVersion = preservePrefix(oldVersion, info.wanted);

            pkg.dependencies[name] = newVersion;

            console.log(`[UPDATE] dependency ${name}: ${oldVersion} -> ${newVersion}`);

            updatedCount++;
        }

        if (pkg.devDependencies?.[name]) {
            const oldVersion = pkg.devDependencies[name];
            const newVersion = preservePrefix(oldVersion, info.wanted);

            pkg.devDependencies[name] = newVersion;

            console.log(`[UPDATE] devDependency ${name}: ${oldVersion} -> ${newVersion}`);

            updatedCount++;
        }
    }

    if (updatedCount === 0) {
        console.log('\n No major-updates found');
        process.exit(0);
    }

    writeFileSync('package.json', JSON.stringify(pkg, null, 2));

    console.log(`\n package.json updated (${updatedCount})`);
    console.log('npm [i]\n');

    execSync('npm i', { stdio: 'inherit' });

    console.log('\n done.');
} catch (err) {
    console.error('Error:', err);
    process.exit(1);
}
