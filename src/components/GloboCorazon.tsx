"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FondoDecorado from "./FondoDecorado";

/**
 * Globo con forma de corazón: se hincha con cada toque
 * y explota en el tercero. Sin palo ni cinta amarilla.
 */
export default function GloboCorazon({ onExplode }: { onExplode: () => void }) {
  const [pulsos, setPulsos] = useState(0);
  const [explotando, setExplotando] = useState(false);

  const ESCALA = [1, 1.22, 1.46, 1.72];

  const tocar = () => {
    if (explotando) return;
    if (pulsos < 3) {
      setPulsos((p) => p + 1);
    } else {
      setExplotando(true);
      setTimeout(onExplode, 900);
    }
  };

  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden bg-gradient-to-b from-rose-50 via-white to-pink-100">
      <FondoDecorado seed={3} cantidad={30} color="#fbcfe8" intensidad={1.1} />

      {/* Halo pulsante detrás del corazón */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-200/40 blur-3xl"
        animate={
          explotando
            ? { scale: [1, 2.4], opacity: [0.55, 0] }
            : { scale: [1, 1.12, 1], opacity: [0.35, 0.6, 0.35] }
        }
        transition={
          explotando
            ? { duration: 0.9, ease: "easeOut" }
            : { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
        style={{ width: 260, height: 260 }}
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6">
        {/* Fecha arriba, discreta */}
        <motion.p
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9 }}
          className="mb-10 text-center text-[11px] font-medium uppercase tracking-[0.42em] text-pink-400"
        >
          Desde el 02 · 12 · 2023
        </motion.p>

        {/* Corazón-globo */}
        <motion.button
          onClick={tocar}
          className="relative cursor-pointer outline-none"
          initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 13, delay: 0.15 }}
          whileTap={{ scale: 0.96 }}
          aria-label="Toca el corazón para inflarlo"
        >
          {/* Latido */}
          <motion.div
            className="absolute inset-0"
            animate={
              explotando
                ? { scale: [1, 1.6], opacity: [1, 0] }
                : { scale: [1, 1.035, 1] }
            }
            transition={
              explotando
                ? { duration: 0.5, ease: "easeOut" }
                : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <svg
              viewBox="0 0 100 100"
              className="h-[62vw] max-h-[340px] w-[62vw] max-w-[340px] drop-shadow-[0_18px_45px_rgba(236,72,153,0.35)]"
            >
              <defs>
                <radialGradient id="globoGrad" cx="35%" cy="28%" r="78%">
                  <stop offset="0%" stopColor="#fde7f1" />
                  <stop offset="42%" stopColor="#f9bfd8" />
                  <stop offset="100%" stopColor="#f472b6" />
                </radialGradient>
              </defs>
              <path
                fill="url(#globoGrad)"
                d="M50 92C50 92 4 62 4 33.5C4 16.6 17 4 32.5 4C42 4 48.5 9.5 50 14.5C51.5 9.5 58 4 67.5 4C83 4 96 16.6 96 33.5C96 62 50 92 50 92Z"
              />
              {/* Brillo */}
              <ellipse cx="33" cy="26" rx="11" ry="8" fill="#fff" opacity="0.42" transform="rotate(-22 33 26)" />
            </svg>
          </motion.div>

          {/* "02" dentro del corazón */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={
              explotando
                ? { scale: [1, 2.1], opacity: [1, 0] }
                : { opacity: 1, scale: 1 }
            }
            transition={
              explotando
                ? { duration: 0.55, ease: "easeOut" }
                : { duration: 0.3 }
            }
          >
            <span className="mt-1 select-none text-[13vw] font-black leading-none tracking-tighter text-white/95 drop-shadow-[0_3px_10px_rgba(190,24,93,0.28)]">
              02
            </span>
          </motion.div>
        </motion.button>

        {/* Explosión de partículas */}
        <AnimatePresence>
          {explotando && (
            <div className="pointer-events-none absolute inset-0 z-20">
              {Array.from({ length: 26 }).map((_, i) => {
                const angle = (i / 26) * Math.PI * 2;
                const dist = 130 + (i % 5) * 34;
                return (
                  <motion.span
                    key={i}
                    className="absolute left-1/2 top-1/2 select-none"
                    initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                    animate={{
                      x: Math.cos(angle) * dist,
                      y: Math.sin(angle) * dist,
                      scale: [0, 1.1, 0.3],
                      opacity: [1, 1, 0],
                      rotate: (i % 2 ? 1 : -1) * 220,
                    }}
                    transition={{ duration: 1.05, ease: "easeOut" }}
                    style={{ fontSize: 20 + (i % 4) * 8 }}
                  >
                    {i % 3 === 0 ? "💗" : i % 3 === 1 ? "💖" : "✨"}
                  </motion.span>
                );
              })}
            </div>
          )}
        </AnimatePresence>

        {/* Píldora de estado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative z-10 mt-10 flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-2 w-2 rounded-full"
                animate={
                  pulsos > i
                    ? { scale: [1, 1.6, 1], backgroundColor: "#ec4899" }
                    : { scale: 1, backgroundColor: "#fbcfe8" }
                }
                transition={{ duration: 0.45 }}
              />
            ))}
          </div>
          <p className="text-center text-sm font-medium text-pink-500">
            {explotando
              ? "💥"
              : pulsos === 0
                ? "Toca el corazón para empezar"
                : pulsos < 3
                  ? "Un poquito más…"
                  : "Ahora…"}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
