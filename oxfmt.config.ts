import { defineConfig } from 'oxfmt';

// oxlint-disable-next-line import/no-default-export
export default defineConfig({
    printWidth: 120,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: true,
    trailingComma: 'none',
    sortTailwindcss: true,
    arrowParens: 'always',
    endOfLine: 'lf',
    insertFinalNewline: true,
    sortImports: {
        internalPattern: ['@/**', '~/**'],
        groups: [
            'type-external',
            ['value-builtin', 'value-external'],

            { newlinesBetween: true },

            'type-internal',
            'value-internal',

            { newlinesBetween: true },

            ['type-parent', 'type-sibling', 'type-index'],
            ['value-parent', 'value-sibling', 'value-index'],

            'unknown'
        ]
    },
    sortPackageJson: {
        sortScripts: false
    }
});
