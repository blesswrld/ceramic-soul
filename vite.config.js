import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import viteImagemin from "vite-plugin-imagemin";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                catalog: resolve(__dirname, "catalog.html"),
                blog: resolve(__dirname, "blog.html"),
                about: resolve(__dirname, "about.html"),
            },
        },
    },
    plugins: [
        viteImagemin({
            gifsicle: {
                optimizationLevel: 5,
                interlaced: false,
            },
            optipng: {
                optimizationLevel: 5,
            },
            mozjpeg: {
                quality: 70,
            },
            pngquant: {
                quality: [0.8, 0.9],
                speed: 4,
            },
        }),
    ],
});
