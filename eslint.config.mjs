
import globals from "globals";
import eslint from "@eslint/js";
import tseslint from 'typescript-eslint';

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	...tseslint.configs.strictTypeChecked,

	{
		ignores: [".prettierrc.mts", "eslint.config.mjs", "dist/*"],
	},

	{
		files: ["**/*.mjs", "**/*.mts"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			globals: {
				...globals.node
			}
		}
	},

	{
		files: ["**/*.mts"],
		languageOptions: {
			parserOptions: {
				project: "./tsconfig.json",
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
				ecmaVersion: "latest",
				sourceType: "module"
			}
		},

		rules: {
			//ts rules here
			"@typescript-eslint/adjacent-overload-signatures": "warn",
			"@typescript-eslint/no-misused-promises": "off",
			"@typescript-eslint/restrict-template-expressions": "off",
			"@typescript-eslint/no-invalid-void-type": "off",
			"@typescript-eslint/no-dynamic-delete": "off"
		}
	},

	{
		//off, warn, error
		rules: {
			"no-self-compare": "warn",
			"no-template-curly-in-string": "error",
			"no-unmodified-loop-condition": 'warn',
			"no-unreachable-loop": "error",
			"no-duplicate-imports": "warn",
			"semi": "error",
			"prefer-const": "error",
			"no-useless-assignment": "error",
			"camelcase": "error",
			"dot-notation": "error",
			"id-length": ["warn", { min: 0, max: 25 }],
			"max-depth": ["warn", { "max": 5 }],
			"max-nested-callbacks": ["warn", { "max": 4 }],
			"max-params": ["warn", { "max": 5 }],
			"no-alert": "error",
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
		}
	}
);