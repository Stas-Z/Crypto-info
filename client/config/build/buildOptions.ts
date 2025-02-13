import { BuildEnvironmentOptions } from 'vite'

import { BuildOptions } from './types/config'

export function buildOptions(options: BuildOptions): BuildEnvironmentOptions {
    const { paths, isDev } = options
    return {
        outDir: paths.build,
        sourcemap: isDev ? 'inline' : false,
        minify: isDev ? false : 'terser',
        terserOptions: isDev
            ? undefined
            : {
                  compress: {
                      drop_console: true,
                      drop_debugger: true,
                  },
              },
        rollupOptions: {
            input: [paths.entry, paths.html],
            treeshake: true,
            output: {
                entryFileNames: 'assets/[name].[hash].js',
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash][extname]',
            },
        },
    }
}
