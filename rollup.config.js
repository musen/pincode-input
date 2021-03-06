import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'
import scss from 'rollup-plugin-scss'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/ts/index.ts',
  output: [
    {
      file: pkg.main,
      file: './dist/index.js',
      format: 'cjs'
    },
    {
      file: pkg.module,
      file: './dist/pincode-input.es.js',
      format: 'es'
    },
    {
      file: './dist/pincode-input.min.js',
      format: 'iife',
      name: 'PincodeInput',
      compact: true,
      plugins: [terser()]
    }
  ],
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    typescript({
      typescript: require('typescript')
    }),
    scss({
      output: './dist/pincode-input.min.css',
      outputStyle: 'compressed',
      failOnError: true
    })
  ]
}
