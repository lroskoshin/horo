import { RollupOptions } from 'rollup';
import pkg from './package.json';
import typescript from '@rollup/plugin-typescript';
import { horoPlugin } from '@horo/rollup-plugin';
import nodeResolve from '@rollup/plugin-node-resolve';

const config: RollupOptions = {
    input: [
        './src/index.tsx',
    ],
    output: [
        { dir: './dist', format: 'esm', sourcemap: true, esModule: true, preserveModules: true },
    ],
    plugins: [
        horoPlugin(),
        typescript({jsx: 'preserve'}),
        nodeResolve({browser: true})
    ]
};
export default config;
