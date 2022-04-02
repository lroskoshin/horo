import ts from 'rollup-plugin-ts';
import { RollupOptions } from 'rollup';
import { parser } from './parser';
const config: RollupOptions = {
    input: [
        './example.tsx',
    ],
    output: [
        { dir: './dist', format: 'esm', sourcemap: true, esModule: true, preserveModules: true },
    ],
    plugins: [
        parser(),
        ts({
            transpileOnly: true,
        }),
    ]
};
export default config;
