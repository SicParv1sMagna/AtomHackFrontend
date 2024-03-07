module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    // quotes: ["error", "double"], // двойные кавычки
    "no-console": "error", // запрет использования console.log, чтобы не забыть удалить
    "no-debugger": "error", // запрет использования debugger, чтобы не забыть удалить
    "no-var": "error", // запрет использования var
    "no-unused-vars": "error", // можно в принципе отключить, так как используем TypeScript
    "react/jsx-uses-react": "error", // Ошибка, если библиотека React не используется
    "arrow-body-style": "error", // стрелочные функции должны использовать тело блока
    "no-unneeded-ternary": "error", // запрет использования ненужных тернарных операторов (борьба с ниндзя-кодом)
  },
};
