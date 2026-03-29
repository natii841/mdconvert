import { defineConfig } from 'tsup';
 
export default defineConfig({
    format: ['cjs'],
    entry: ['./src/index.ts'],
    dts: false,
    shims: true,
    skipNodeModulesBundle: true,
    clean: true,
});