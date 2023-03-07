import type {Config} from '@jest/types';
const config: Config.InitialOptions  = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest-setup.ts'],
  verbose: true
};
export default config;
