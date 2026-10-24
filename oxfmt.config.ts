import { defineConfig } from "oxfmt";

// oxlint-disable-next-line import/no-default-export
export default defineConfig({
    printWidth: 120,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: false,
    trailingComma: "none",
    sortTailwindcss: true,
    arrowParens: "always",
    endOfLine: "lf",
    insertFinalNewline: true,
    sortImports: {
        internalPattern: ["@/**", "~/**"],
        customGroups: [
            {
                groupName: "tsx-type",
                elementNamePattern: ["**/*.tsx", "*.tsx"],
                selector: "import",
                modifiers: ["type"]
            },
            {
                groupName: "tsx-value",
                elementNamePattern: ["**/*.tsx", "*.tsx"],
                selector: "import",
                modifiers: ["value"]
            },
            {
                groupName: "ts-type",
                elementNamePattern: ["**/*.ts", "*.ts"],
                selector: "import",
                modifiers: ["type"]
            },
            {
                groupName: "ts-value",
                elementNamePattern: ["**/*.ts", "*.ts"],
                selector: "import",
                modifiers: ["value"]
            }
        ],
        groups: [
            "type-external",
            { newlinesBetween: true },

            ["value-builtin", "value-external"],
            { newlinesBetween: true },

            "tsx-type",
            { newlinesBetween: true },

            "tsx-value",
            { newlinesBetween: true },

            "ts-type",
            { newlinesBetween: true },

            "ts-value",
            { newlinesBetween: true },

            "unknown"
        ]
    },
    sortPackageJson: {
        sortScripts: false
    }
});
