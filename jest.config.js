module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  // Configuration des transformations
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.jest.json",
      },
    ],
    "^.+\\.(js|jsx|mjs)$": [
      "babel-jest",
      {
        presets: ["next/babel"],
      },
    ],
  },

  // Mapping des modules
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/$1",
    "^lucide-react$": "<rootDir>/__mocks__/lucide-react.js",
    "^@clerk/nextjs$": "<rootDir>/__mocks__/clerk.js",
    "^@clerk/nextjs/server$": "<rootDir>/__mocks__/clerk.js",
    "^export-to-csv$": "<rootDir>/__mocks__/export-to-csv.js",
    "^@/components/datatable/FacetedFilters$":
      "<rootDir>/__mocks__/ui-components.js",
  },

  // Patterns de transformation
  transformIgnorePatterns: [
    "/node_modules/(?!(lucide-react|@clerk|export-to-csv))",
  ],

  // Configuration des tests
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  modulePaths: ["<rootDir>"],

  // Couverture de code
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/coverage/**",
    "!**/prisma/**",
    "!**/__mocks__/**",
    "!**/scripts/**",
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  coverageReporters: ["text", "lcov", "html", "json-summary"],

  // Reporters
  reporters: [
    "default",
    [
      "jest-html-reporter",
      {
        pageTitle: "Rapport de test - Jest",
        outputPath: "reports/jest-report.html",
        includeFailureMsg: true,
        includeConsoleLog: true,
      },
    ],
  ],

  // Timeouts
  testTimeout: 10000,

  // Variables d'environnement pour les tests
  setupFiles: ["<rootDir>/jest.env.js"],
};
