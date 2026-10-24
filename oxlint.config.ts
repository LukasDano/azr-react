import { defineConfig } from "oxlint";

// oxlint-disable-next-line import/no-default-export
export default defineConfig({
    plugins: ["typescript", "import", "jsx-a11y", "react", "unicorn"],
    options: {
        typeAware: true
    },
    categories: {
        correctness: "error",
        suspicious: "warn",
        pedantic: "off"
    },
    rules: {
        // default
        "no-unsafe-type-assertion": "off",
        "no-unassigned-import": "off",
        "no-shadow": "off",
        "no-underscore-dangle": "off",
        "no-unnecessary-type-arguments": "off",
        "react/react-in-jsx-scope": "off",
        "prefer-const": "error",
        "no-default-export": "error",
        "no-non-null-assertion": "off",
        yoda: "error",
        "max-params": ["error", { max: 5 }],
        "consistent-type-imports": ["error", { fixStyle: "separate-type-imports" }],
        "consistent-type-specifier-style": ["error", "prefer-top-level"],
        "no-unused-vars": [
            "warn",
            {
                ignoreRestSiblings: true,
                caughtErrors: "none",
                args: "none",
                varsIgnorePattern: "^_",
                argsIgnorePattern: "^_"
            }
        ],

        // import
        "import/no-default-export": "error",
        "import/no-cycle": "error",
        "import/no-duplicates": "error",

        // ts
        "typescript/explicit-function-return-type": "error",
        "typescript/no-deprecated": "error",
        "typescript/dot-notation": "error",
        "typescript/no-floating-promises": "off",

        // jsx
        "jsx-a11y/alt-text": "error",
        "jsx-a11y/no-static-element-interactions": "off",
        "jsx-a11y/control-has-associated-label": "off",

        // react
        "react/jsx-boolean-value": ["error", "always"],
        "react/jsx-curly-brace-presence": ["error", "always"],
        "react/jsx-pascal-case": "error",
        "react/jsx-no-target-blank": "error",
        "react/prefer-function-component": "error",
        "react/set-state-in-effect": "off",
        "react/exhaustive-effect-dependencies": "off",
        "react/no-unstable-nested-components": [
            "error",
            {
                allowAsProps: true
            }
        ],

        // unicorn
        "unicorn/prefer-array-find": "error",
        "unicorn/prefer-add-event-listener": "off"
    }
});
