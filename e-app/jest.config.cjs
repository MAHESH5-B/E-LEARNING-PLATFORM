module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  testMatch: ["<rootDir>/tests/**/*.test.{js,jsx}"],
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
};
