import ts from '@wessberg/rollup-plugin-ts';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';
const config = {
    input: './src/index.ts',
    output: [
        { file: pkg.main, name: 'horo', format: 'umd', sourcemap: true },
        { file: pkg.module, format: 'es', sourcemap: true },
    ],
    plugins: [
        ts(),
        terser()
    ]
};
export default config;
