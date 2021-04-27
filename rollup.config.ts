import ts from '@wessberg/rollup-plugin-ts';
import pkg from './package.json';
const config = {
    input: './src/horo.ts',
    output: [
        { file: pkg.main, name: 'horo', format: 'umd', sourcemap: true },
        { file: pkg.module, format: 'es', sourcemap: true },
    ],
    plugins: [
        ts()
    ]
};
export default config;
