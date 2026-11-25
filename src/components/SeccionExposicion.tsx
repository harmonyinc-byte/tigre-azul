"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FondoDecorado from "./FondoDecorado";
import { DESTINOS } from "@/lib/datos";

/**
 * Exposición: las fotos de los destinos van pasando automáticamente
 * (estilo carrusel/galería) con el texto del destino debajo.
 * Se detiene cuando no se ve y avanza solo, sin botones.
 */
export default function SeccionExposicion() {
  const [indice, setIndice] = useState(0);
  const [visible, setVisible] = useState(true);
  const contenedorRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Pausa el carrusel cuando la sección no está en pantalla */
  useEffect(() => {
    const el = contenedorRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entrada]) => setVisible(entrada.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* Avance automático */
  useEffect(() => {
    if (!visible) return;

    timerRef.current = setInterval(() => {
      setIndice((i) => (i + 1) % DESTINOS.length);
    }, 4200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [visible]);

  const destino = DESTINOS[indice];

  return (
    <section
      ref={contenedorRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-rose-50 via-white to-pink-100"
    >
      <FondoDecorado seed={67} cantidad={30} color="#f9a8d4" intensidad={1.15} />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24">
        {/* Cabecera */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-pink-500 shadow-sm">
            🖼️ Nuestra exposición
          </span>
          <h2 className="mt-7 font-serif text-[2.4rem] leading-tight tracking-tight text-pink-700 sm:text-5xl">
            Frames de nosotros
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-stone-500">
            Las fotos van pasando solas, como las recuerdos cuando te cuento
            cada viaje. Tú solo míralas.
          </p>
        </motion.div>

        {/* Lámina de exposición */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-14 max-w-3xl"
        >
          {/* Marco */}
          <div className="relative overflow-hidden rounded-[2.5rem] border-[8px] border-white bg-white shadow-[0_30px_80px_-25px_rgba(190,24,93,0.5)]">
            {/* Ventana de la foto */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-pink-100">
              <AnimatePresence mode="wait">
                <motion.img
                  key={destino.slug}
                  src={destino.imagen}
                  alt={destino.nombre}
                  initial={{ opacity: 0, scale: 1.12, filter: "blur(8px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>

              {/* Etiqueta arriba */}
              <div className="absolute left-5 top-5 flex items-center gap-2">
                <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-pink-600 backdrop-blur">
                  {destino.etiqueta}
                </span>
                <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 backdrop-blur">
                  {destino.fecha}
                </span>
              </div>

              {/* Número de lámina */}
              <span className="absolute right-5 top-5 rounded-full bg-black/25 px-3 py-1 text-[11px] font-bold tracking-widest text-white backdrop-blur">
                {String(indice + 1).padStart(2, "0")} /{" "}
                {String(DESTINOS.length).padStart(2, "0")}
              </span>

              {/* Degradado inferior */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />
            </div>

            {/* Texto debajo de la foto */}
            <div className="min-h-[190px] bg-white p-7 sm:p-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={destino.slug}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-serif text-4xl font-bold leading-none tracking-tight text-pink-700 sm:text-5xl">
                      {destino.nombre}
                    </h3>
                    <p className="font-serif text-lg italic text-pink-400">
                      {destino.subtitulo}
                    </p>
                  </div>

                  <p className="mt-5 text-[15px] leading-relaxed text-stone-500">
                    {destino.texto}
                  </p>

                  <div className="mt-6 flex items-center gap-3">
                    <span className="h-px flex-1 bg-gradient-to-r from-pink-200 to-transparent" />
                    <span className="text-pink-300">♥</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Barra de progreso del carrusel */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {DESTINOS.map((d, i) => (
              <span key={d.slug} className="relative h-1 overflow-hidden rounded-full">
                <span
                  className={`block h-1 rounded-full transition-all duration-500 ${
                    i === indice
                      ? "w-10 bg-gradient-to-r from-pink-400 to-rose-500"
                      : "w-5 bg-pink-200"
                  }`}
                />
              </span>
            ))}
          </div>

          <p className="mt-4 text-center text-[11px] font-medium uppercase tracking-[0.28em] text-pink-300">
            Las fotos van pasando solas
          </p>
        </motion.div>
      </div>
    </section>
  );
}
