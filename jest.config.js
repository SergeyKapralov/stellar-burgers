const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  moduleNameMapper: {
    "^@pages(.*)$": "<rootDir>/src/pages$1",
    "^@components(.*)$": "<rootDir>/src/components$1",
    "^@ui(.*)$": "<rootDir>/src/components/ui$1",
    "^@ui-pages(.*)$": "<rootDir>/src/components/ui/pages$1",
    "^@utils-types(.*)$": "<rootDir>/src/utils/types$1",
    "^@api(.*)$": "<rootDir>/src/utils/burger-api.ts",
    "^@slices(.*)$": "<rootDir>/src/services/slices$1",
    "^@selectors(.*)$": "<rootDir>/src/services/selectors$1"
  }
};
