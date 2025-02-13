import path from 'path'

import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer'
import { PluginOption } from 'vite'
import checker from 'vite-plugin-checker'
import imagemin from 'vite-plugin-imagemin'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

export function buildPlugins(): PluginOption[] {
    const plugins = [
        svgr({
            svgrOptions: {
                icon: true,
                svgoConfig: {
                    plugins: [
                        {
                            name: 'convertColors',
                            params: {
                                currentColor: true,
                            },
                        },
                    ],
                },
            },
        }),
        react(),
        tsconfigPaths({
            projects: [path.resolve(__dirname, '..', '..', 'tsconfig.json')],
        }),
        visualizer(),
        checker({
            typescript: true,
        }),
        imagemin({
            gifsicle: { optimizationLevel: 3 },
            mozjpeg: { quality: 75 },
            optipng: { optimizationLevel: 5 },
            svgo: { plugins: [{ removeViewBox: false }] },
        }),
    ]
    return plugins
}
