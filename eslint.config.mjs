import globals from "globals";
import eslint from "@eslint/js";
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
	eslint.configs.recommended,
	tseslint.configs.recommendedTypeChecked,
	tseslint.configs.strictTypeChecked,

	{
		ignores: ["dist/*"]
	},

	{
		files: ["**/*.mts"],
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
				ecmaVersion: "latest",
				sourceType: "module",
				globals: {
					...globals.node
				}
			}
		},

		rules: {
			//ts rules here
			"@typescript-eslint/no-non-null-assertion": "off",
			"@typescript-eslint/adjacent-overload-signatures": "warn",
			"@typescript-eslint/no-misused-promises": "off",
			"@typescript-eslint/restrict-template-expressions": "off",
			"@typescript-eslint/no-invalid-void-type": "off",
			"@typescript-eslint/no-dynamic-delete": "off",
			"@typescript-eslint/ban-ts-comment": "off",
			"@typescript-eslint/no-confusing-void-expression": "off",
			"@typescript-eslint/unbound-method": "off",
			"@typescript-eslint/no-unnecessary-type-parameters": "off"
		}
	},

	{
		rules: {
			"no-self-compare": "warn",
			"no-template-curly-in-string": "error",
			"no-unmodified-loop-condition": "warn",
			"no-unreachable-loop": "error",
			"no-duplicate-imports": "warn",
			"semi": "error",
			"prefer-const": "error",
			"no-useless-assignment": "error",
			"camelcase": "error",
			"dot-notation": "error",
			"id-length": ["warn", { min: 0, max: 30 }],
			"max-depth": ["warn", { max: 5 }],
			"max-nested-callbacks": ["warn", { max: 4 }],
			"max-params": ["warn", { max: 5 }],
			"no-alert": "off",
			"no-array-constructor": "error",
			"no-caller": "error",
			"no-eval": "error",
			"no-extra-label": "warn",
			"no-implied-eval": "error",
			"no-invalid-this": "error",
			"no-iterator": "error",
			"no-label-var": "error",
			"no-lonely-if": "error",
			"no-multi-str": "warn",
			"no-new-wrappers": "error",
			"no-return-assign": "error",
			"no-script-url": "error",
			"no-sequences": "error",
			"no-throw-literal": "error",
			"no-undef-init": "error",
			"no-underscore-dangle": "warn",
			"no-unneeded-ternary": "error",
			"no-unused-expressions": "warn",
			"no-useless-call": "error",
			"no-useless-return": "error",
			"no-useless-rename": "error",
			"no-var": "error",
			"operator-assignment": "error",
			"no-debugger": "off"
		}
	}
);