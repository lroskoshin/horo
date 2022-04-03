import typescript from '@rollup/plugin-typescript';
import { RollupOptions } from 'rollup';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';
const config: RollupOptions = {
    input: [
        './src/index.umd.ts',
    ],
    output: [
        { file: pkg.main, name: 'horo', format: 'umd', sourcemap: true },
    ],
    plugins: [
        typescript(),
        terser()
    ]
};
export default config;
