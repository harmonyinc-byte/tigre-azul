/**
 * Helper para rutas de estáticos que respetan el basePath
 * (necesario en GitHub Pages, donde la app vive en /tigre-azul).
 *
 * Limpia espacios y comillas que cmd.exe/GitHub Actions pueden
 * colar en las variables de entorno.
 */
export const BASE_PATH = (
  process.env.NEXT_PUBLIC_BASE_PATH ?? ""
).trim();

export function asset(ruta: string): string {
  if (!ruta.startsWith("/")) return ruta;
  if (!BASE_PATH) return ruta;
  return `${BASE_PATH}${ruta}`;
}
