import ts from '@wessberg/rollup-plugin-ts';
import { RollupOptions } from 'rollup';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';
const config: RollupOptions = {
    input: './src/index.ts',
    output: [
        { file: pkg.main, name: 'horo', format: 'umd', sourcemap: true },
        { dir: 'dist', format: 'es', sourcemap: true },
    ],
    plugins: [
        ts(),
        terser()
    ]
};
export default config;
