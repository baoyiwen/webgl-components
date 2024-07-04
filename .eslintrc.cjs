module.exports = {
  root: true,
  env: {
    browser: true, // 启用浏览器全局变量
    es2021: true, // 启用 es 2021 语法
  },
  extends: [
    "plugin:react/recommended", // 使用 React 推荐规则
    "standard-with-typescript", // 使用 TypeScript 标准规则
    "plugin:@typescript-eslint/recommended", // 使用 TypeScript 推荐规则
    "prettier", // 使用 Prettier 格式化规则
    "eslint:recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser", // 使用 TypeScript 解析器
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // 支持 JSX 语法
    },
    ecmaVersion: "latest", // 使用最新的 ECMAScript 版本
    sourceType: "module", // 使用 ES 模块
    project: "./tsconfig.json", // 指定 TypeScript 配置文件
  },
  plugins: ["react-refresh", "react", "@typescript-eslint"], // 使用 React 和 TypeScript 插件
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  settings: {
    react: {
      version: "detect", // 自动检测 React 版本
    },
  },
};
