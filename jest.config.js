


const nextJest = require('next/jest')
const createJestConfig = nextJest({
  dir: './',
})
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", 
    "lucide-react": "<rootDir>/__mocks__/lucide-react.js", 
  },
  transformIgnorePatterns: [
    'node_modules/(?!(lucide-react)/)', 
  ],
}

module.exports = createJestConfig(customJestConfig)