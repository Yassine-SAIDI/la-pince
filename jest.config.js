module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
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
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/$1",
    // Mock des modules problématiques
    "^lucide-react$": "<rootDir>/__mocks__/lucide-react.js",
    "^@clerk/nextjs$": "<rootDir>/__mocks__/clerk.js",
    "^@clerk/nextjs/server$": "<rootDir>/__mocks__/clerk.js",
    // Mock pour export-to-csv
    "^export-to-csv$": "<rootDir>/__mocks__/export-to-csv.js",
    // Mock pour les components UI problématiques
    "^@/components/datatable/FacetedFilters$":
      "<rootDir>/__mocks__/ui-components.js",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(lucide-react|@clerk|export-to-csv))",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)"],
  modulePaths: ["<rootDir>"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  reporters: [
    "default",
    ["jest-html-reporter", {
      pageTitle: "Rapport de test - Jest",
      outputPath: "reports/jest-report.html",
      includeFailureMsg: true,
      includeConsoleLog: true
    }]
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/coverage/**"
  ],
  coverageReporters: ["text", "lcov", "html"],
};
