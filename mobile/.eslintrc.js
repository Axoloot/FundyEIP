module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
    browser: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "react-hooks",
  ],
  extends: [
    "airbnb-typescript",
    "eslint:recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  ignorePatterns: ['coverage',
    'scripts/*',
    '.eslintrc.js',
    'babel.config.js',
    'env/**/*',
    'public/**/*',
    'src/**/*.test.tsx',
    'metro.config.js',
    'index.js',
    'index.d.ts',
    'dist',
    'podFix.js'
  ],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module",
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    "import/extensions": ['.js', '.jsx', '.ts', '.tsx', '.png'],
    "import/resolver": {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }
    }
  },
  rules: {
    "no-console": "off",
    "no-restricted-syntax": [
      "error",
      {
        "selector": "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
        "message": "Unexpected property on console object was called"
      }
    ],
    "global-require": "off",
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "single"],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: false },
    ],
    "@typescript-eslint/explicit-function-return-type": "warn", // Consider using explicit annotations for object literals and function return types even when they can be inferred.
    "default-param-last": ["warn"],
    "no-empty": "warn",
    complexity: ["warn", 6],
    "max-depth": ["warn", 2],
    "max-nested-callbacks": ["warn", 3],
    "max-params": ["warn"],
    "max-statements": ["warn", 15, { "ignoreTopLevelFunctions": true }],
    "max-lines": ["error", {
      max: 200,
    }],
    "camelcase": ["warn"],
    "no-empty-function": ["warn"],
    "no-useless-catch": ["warn"],
    "no-useless-return": ["warn"],
    "max-lines-per-function": ["warn", 150],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "react/jsx-filename-extension": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    "react/jsx-no-bind": "off",
    "react/jsx-no-bind": "off",
    "react/no-array-index-key": "off",
    "react/jsx-no-bind": "off"
  },
};
