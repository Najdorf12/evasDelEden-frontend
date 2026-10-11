import { useEffect, useState } from "react";

// Ajustalo a la duración de tu animación del spinner (en milisegundos)
export const LOADER_MIN_MS = 800;

/**
 * Devuelve true mientras el loader deba mostrarse:
 *  - mientras isLoading sea true (carga real de datos), O
 *  - hasta que pase el tiempo mínimo desde que se montó la página.
 *
 * Uso:
 *   const showLoader = usePageLoader(isLoading);        // carga real + mínimo
 *   const showLoader = usePageLoader(false, 2500);      // solo tiempo mínimo
 */
export default function usePageLoader(
  isLoading = false,
  minDuration = LOADER_MIN_MS,
) {
  const [minElapsed, setMinElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMinElapsed(true), minDuration);
    return () => clearTimeout(timer);
  }, [minDuration]);

  return isLoading || !minElapsed;
}
