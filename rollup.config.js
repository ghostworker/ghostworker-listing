// Rollup plugins
import babel from 'rollup-plugin-babel';

export default {
    entry: 'lib/ghostworker-listing.js',
    dest: 'dist/ghostworker-listing.js',
    format: 'umd',
    moduleName: 'GhostWorkerListing',
    sourceMap: true,
    plugins: [
        babel({
            exclude: 'node_modules/**',
        }),
    ]
}