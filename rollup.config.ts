import ts from '@wessberg/rollup-plugin-ts';
import { RollupOptions } from 'rollup';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';
const config: RollupOptions = {
    input: [
        './src/index.ts',
        './src/utils/index.ts',
        './src/module.ts'
    ],
    output: [
        { dir: pkg['modules.root'], format: 'esm', sourcemap: true, esModule: true, preserveModules: true },
    ],
    plugins: [
        ts(),
        terser()
    ]
};
export default config;
