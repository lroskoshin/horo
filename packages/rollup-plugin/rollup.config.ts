import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { RollupOptions } from 'rollup';
import pkg from './package.json';
const config: RollupOptions = {
    input: [
        './src/index.ts',
    ],
    external: Object.keys(pkg.dependencies).concat('@babel/types'),
    output: [
        { file: pkg.main, format: 'umd', name: 'horoPlugin' },
    ],
    plugins: [
        typescript({tsconfig: './tsconfig.json'}),
        nodeResolve()
    ]
};
export default config;