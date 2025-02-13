import path from 'path'

import { defineConfig, UserConfig } from 'vite'

import { buildViteConfig } from './config/build/buildViteConfig'
import { BuildPaths } from './config/build/types/config'

export default defineConfig(({ mode }) => {
    const PORT = Number(process.env.port) || 3000
    const isDev = mode === 'development'

    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'build'),
        src: path.resolve(__dirname, 'src'),
        html: path.resolve(__dirname, 'index.html'),
    }

    const config: UserConfig = buildViteConfig({
        mode,
        paths,
        isDev,
        port: PORT,
    })

    return config
})
