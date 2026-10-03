import adapter from '@sveltejs/adapter-static'
import { enhancedImages } from '@sveltejs/enhanced-img'
import tailwindcss from '@tailwindcss/vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [
        tailwindcss(),
        // Build-time AVIF/WebP + srcset for <enhanced:img>; must precede sveltekit().
        enhancedImages(),
        sveltekit({
            compilerOptions: {
                // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
                runes: ({ filename }) =>
                    filename.split(/[/\\]/).includes('node_modules')
                        ? undefined
                        : true,
            },
            adapter: adapter({
                pages: 'build',
                assets: 'build',
                fallback: 'index.html', // use 'index.html' for SPA mode, or '404.html' for a custom 404
                precompress: false,
                strict: true,
            }),
        }),
    ],
})
