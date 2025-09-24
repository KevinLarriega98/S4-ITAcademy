import { createDefaultPreset } from 'ts-jest';
import type { Config } from 'jest';

const tsJestTransformCfg = createDefaultPreset().transform;

const config: Config = {
  testEnvironment: 'jsdom',
  transform: {
    ...tsJestTransformCfg,
  },
  setupFilesAfterEnv: ['<rootDir>/src/test/jest.setup.ts'],
  testMatch: ['**/src/test/**/*.test.ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

export default config;