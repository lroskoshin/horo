import { RollupOptions } from 'rollup';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';
import typescript from '@rollup/plugin-typescript';
const config: RollupOptions = {
    input: [
        './src/index.ts',
        './src/module.ts'
    ],
    output: [
        { dir: pkg['modules.root'], format: 'esm', sourcemap: true, esModule: true, preserveModules: true },
    ],
    plugins: [
        typescript(),
        terser()
    ]
};
export default config;
