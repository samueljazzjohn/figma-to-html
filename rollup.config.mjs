import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import polyfillNode from 'rollup-plugin-polyfill-node';
import { Buffer } from 'buffer';
import svelte from 'rollup-plugin-svelte';
import htmlBundle from "rollup-plugin-html-bundle";

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',
    globals: {
      stream: 'stream$1',
      events: 'events',
      buffer: 'buffer',
      util: 'util$6',
    }
  },
  plugins: [
    typescript(),
    polyfillNode({
      exclude: ['assert', 'fs', 'path'],
    }),
    resolve({
      preferBuiltins: false
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/readable-stream/readable.js': ['Readable']
      }
    }),
    svelte({
      // Configuration options
    }),
    htmlBundle({
      template: "src/ui.html",
      target: "dist/index.html",
      inline: true,
    })
  ],
  external: ['stream', 'events', 'buffer', 'util']
};
