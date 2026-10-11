import { useEffect, useState } from "react";
import Loader from "./Loader";

const FADE_MS = 500;

/**
 * Overlay de carga a pantalla completa.
 * - show: true mientras debe verse. Al pasar a false hace un fade-out
 *   suave y recién después se desmonta.
 * - text: mensaje debajo del loader.
 */
export default function PageLoader({ show = true, text = "Cargando..." }) {
  const [mounted, setMounted] = useState(show);

  useEffect(() => {
    if (show) {
      setMounted(true);
      return;
    }
    const timer = setTimeout(() => setMounted(false), FADE_MS);
    return () => clearTimeout(timer);
  }, [show]);

  if (!mounted) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center gap-5 bg-zinc-950/85 backdrop-blur-sm transition-opacity  ${
        show ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <Loader />
      <p className="font-text text-xs mt-12 text-zinc-400">{text}</p>
      <div className="flex justify-center items-center gap-1 mt-8 absolute bottom-1 w-full -ml-4 lg:-ml-6">
        <i
          className="bx bx-copyright text-lg xl:text-xl text-purple-400"
          aria-hidden="true"
        ></i>
        <p className="text-xs md:text-sm font-text italic 3xl:text-base text-zinc-400">
          EVAS DEL EDEN - 2026
        </p>
      </div>
    </div>
  );
}
