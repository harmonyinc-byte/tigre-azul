import type { NextConfig } from "next";

/**
 * Rutas base:
 * - BASE_PATH vacío en local (http://localhost:3000)
 * - "/tigre-azul" en GitHub Pages (https://usuario.github.io/tigre-azul)
 *
 * El .trim() es importante: en cmd.exe y en GitHub Actions las
 * variables de entorno pueden traer espacios sobrantes.
 */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").trim();

const nextConfig: NextConfig = {
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
