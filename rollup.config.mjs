import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import polyfillNode from 'rollup-plugin-polyfill-node';

import htmlBundle from "rollup-plugin-html-bundle";

// export default {
//   input: 'src/main.ts',
//   output: {
//     file: 'dist/bundle.js',
//     format: 'iife',
//     globals: {
//       stream: 'stream$1',
//       events: 'events',
//       buffer: 'buffer',
//       util: 'util$6',
//     }
//   },
//   plugins: [typescript(),polyfillNode(), resolve({
//     preferBuiltins: true
//   }), commonjs({
//     include: 'node_modules/**',
//     namedExports: {
//       'node_modules/readable-stream/readable.js': ['Readable']
//     }
//   }), htmlBundle({
//     template: "src/ui.html",
//     target: "dist/index.html",
//     inline: true,
//   }),],
//   external: ['stream', 'events', 'buffer', 'util']
// };



export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'umd',
    globals: {
      stream: 'stream$1',
      events: 'events',
      buffer: 'buffer',
      util: 'util$6',
    }
  },
  plugins: [
    resolve(),
    commonjs(),
    polyfillNode({
      exclude: ['assert', 'fs', 'path'],
    }),
  ],
  onwarn: (warning, warn) => {
    if (warning.code === 'CIRCULAR_DEPENDENCY') return;
    warn(warning);
  },
  external: ['stream', 'events', 'buffer', 'util']
};