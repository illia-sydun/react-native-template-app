// https://docs.expo.dev/guides/using-eslint/
module.exports = {
    env: {
        es6: true,
    },
    root: true,
    plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    extends: [
        'expo',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
        'airbnb',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'prettier',
    ],
    rules: {
        'prettier/prettier': 'error',
        'no-case-declarations': 'off',
        'no-unused-expressions': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-uses-react': 'off',
        'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
    },
};
