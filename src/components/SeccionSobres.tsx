"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FondoDecorado from "./FondoDecorado";
import { SOBRES } from "@/lib/datos";

/**
 * Sección final: sorteo aleatorio del destino secreto.
 * Al llegar a la sección, la máquina sortea sola entre Italia y París
 * y el sobre ganador se abre con la promesa.
 */

type Estado = "esperando" | "girando" | "ganador";

export default function SeccionSobres() {
  const [estado, setEstado] = useState<Estado>("esperando");
  const [ganador, setGanador] = useState<number | null>(null);
  const [candidatos, setCandidatos] = useState<number[]>([]);
  const seccionRef = useRef<HTMLElement | null>(null);
  const iniciadoRef = useRef(false);

  /* Al entrar en la sección arranca el sorteo */
  useEffect(() => {
    const el = seccionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting && !iniciadoRef.current) {
          iniciadoRef.current = true;
          setEstado("girando");
        }
      },
      { threshold: 0.45 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* La ruleta va saltando nombres y para en el ganador */
  useEffect(() => {
    if (estado !== "girando") return;

    let ticks = 0;
    const total = 18;

    const intervalo = setInterval(() => {
      ticks++;
      setCandidatos([Math.floor(Math.random() * SOBRES.length)]);

      if (ticks >= total) {
        clearInterval(intervalo);
        const elegido = Math.floor(Math.random() * SOBRES.length);
        setCandidatos([elegido]);
        setGanador(elegido);
        setEstado("ganador");
      }
    }, 110);

    return () => clearInterval(intervalo);
  }, [estado]);

  const SobreGanador = ganador !== null ? SOBRES[ganador] : null;

  return (
    <section
      ref={seccionRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-pink-100 via-rose-50 to-pink-200"
    >
      <FondoDecorado seed={57} cantidad={36} color="#f9a8d4" intensidad={1.3} />

      <div className="relative z-10 mx-auto max-w-2xl px-5 py-20 sm:max-w-4xl sm:px-6 sm:py-24">
        {/* Cabecera */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="text-center"
        >
          <h2 className="font-serif text-[2.1rem] leading-tight tracking-tight text-pink-700 sm:text-5xl">
            Un sorteo. Un viaje.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-stone-500">
            El destino lo decide la suerte, no tú ni yo. Pero{" "}
            <span className="font-semibold text-pink-600">la planificación es toda
            mía</span>, ya te lo juro.
          </p>
        </motion.div>

        {/* Máquina del sorteo */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-12 max-w-xs sm:mt-14 sm:max-w-lg"
        >
          <div className="relative rounded-[2.5rem] border-8 border-white bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 p-3 shadow-[0_30px_80px_-25px_rgba(219,39,119,0.5)]">
            {/* Cabecera */}
            <div className="flex items-center justify-between rounded-t-[1.6rem] bg-gradient-to-r from-pink-500 to-rose-400 px-5 py-3">
              <span className="flex gap-1.5">
                {["#fbbf24", "#f472b6", "#a78bfa"].map((c) => (
                  <span
                    key={c}
                    className="h-3 w-3 rounded-full shadow-inner"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </span>
              <span className="font-serif text-sm font-semibold tracking-wide text-white">
                Sorteo del destino
              </span>
              <span className="text-xs font-bold text-white/80">02/12</span>
            </div>

            {/* Pantalla de la máquina */}
            <div className="relative flex min-h-[150px] items-center justify-center overflow-hidden rounded-b-[1.6rem] bg-gradient-to-br from-pink-50 to-white p-6">
              {/* Rejilla */}
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "linear-gradient(#db2777 1px, transparent 1px), linear-gradient(90deg, #db2777 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />

              <AnimatePresence mode="wait">
                {estado === "esperando" && (
                  <motion.p
                    key="espera"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative text-center font-serif text-lg text-stone-400"
                  >
                    Desliza para sortear…
                  </motion.p>
                )}

                {estado === "girando" && (
                  <motion.div
                    key="girando"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative text-center"
                  >
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                      className="block text-5xl"
                    >
                      🎡
                    </motion.span>
                    <p className="mt-4 font-serif text-3xl font-bold text-pink-600">
                      {SOBRES[candidatos[0] ?? 0].nombre}
                    </p>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-pink-400">
                      Sorteando…
                    </p>
                  </motion.div>
                )}

                {estado === "ganador" && SobreGanador && (
                  <motion.div
                    key="ganador"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 160, damping: 14 }}
                    className="relative text-center"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-pink-400">
                      Ha salido
                    </p>
                    <p className="font-serif text-5xl font-bold leading-tight text-pink-600">
                      {SobreGanador.nombre}
                    </p>
                    <p className="mt-2 text-sm text-stone-400">
                      {SobreGanador.pista}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Pies de la máquina */}
          <div className="mx-auto flex w-3/4 justify-between">
            <span className="h-8 w-10 rounded-b-2xl bg-pink-300/70" />
            <span className="h-8 w-10 rounded-b-2xl bg-pink-300/70" />
          </div>
        </motion.div>

        {/* El sobre ganador se abre */}
        <AnimatePresence>
          {estado === "ganador" && SobreGanador && (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto mt-14 max-w-sm sm:mt-16 sm:max-w-md"
            >
              {/* Carta */}
              <motion.div
                initial={{ y: 40, opacity: 0, rotate: -2 }}
                animate={{ y: 0, opacity: 1, rotate: -1.5 }}
                transition={{ duration: 0.9, delay: 0.7 }}
                className="relative overflow-hidden rounded-[2rem] border-[6px] border-white bg-white shadow-[0_28px_70px_-25px_rgba(190,24,93,0.5)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={SobreGanador.imagen}
                    alt={SobreGanador.nombre}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-900/40 via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-pink-600 backdrop-blur">
                    Destino secreto
                  </span>
                </div>

                <div className="p-8 text-center">
                  <h3 className="font-serif text-4xl font-bold leading-none text-pink-700">
                    {SobreGanador.nombre}
                  </h3>
                  <p className="mt-5 font-serif text-lg leading-relaxed text-stone-600">
                    {SobreGanador.texto}
                  </p>

                  <div className="mt-7 flex items-center gap-3">
                    <span className="h-px flex-1 bg-gradient-to-r from-pink-200 to-transparent" />
                    <span className="text-pink-300">✈️</span>
                    <span className="h-px flex-1 bg-gradient-to-r from-transparent to-pink-200" />
                  </div>

                  <p className="mt-6 text-sm font-semibold text-pink-600">
                    Del viaje me encargo yo. Tú solo di “sí”.
                  </p>
                  <p className="mt-6 text-3xl">💌</p>
                </div>
              </motion.div>

              {/* Confeti */}
              <div className="pointer-events-none absolute inset-0">
                {Array.from({ length: 18 }).map((_, i) => {
                  const angle = (i / 18) * Math.PI * 2;
                  const dist = 120 + (i % 4) * 30;
                  return (
                    <motion.span
                      key={i}
                      className="absolute left-1/2 top-1/3 select-none"
                      initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                      animate={{
                        x: Math.cos(angle) * dist,
                        y: Math.sin(angle) * dist,
                        scale: [0, 1.1, 0.4],
                        opacity: [1, 1, 0],
                      }}
                      transition={{ duration: 1.2, delay: 0.8 + i * 0.02, ease: "easeOut" }}
                      style={{ fontSize: 16 + (i % 4) * 8 }}
                    >
                      {i % 2 ? "💗" : "✨"}
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Promesa final */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mx-auto mt-16 max-w-2xl rounded-[2rem] border border-pink-200 bg-white/80 p-7 text-center shadow-[0_28px_70px_-30px_rgba(190,24,93,0.5)] backdrop-blur sm:mt-20 sm:rounded-[2.5rem] sm:p-9"
        >
          <p className="text-3xl">💍</p>
          <h3 className="mt-5 font-serif text-3xl leading-tight text-pink-700 sm:text-4xl">
            En cuanto se sortee, ya lo estoy
            <span className="block italic text-pink-500">preparando todo</span>
          </h3>
          <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-stone-500">
            Vuelos, hotel, cenas, el tren del día que no quieres que acabe. No
            te pido nada más que una respuesta:{" "}
            <span className="font-serif text-lg font-bold text-pink-600">
              sí, claro que sí.
            </span>
          </p>

          <div className="mt-9 flex flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-pink-200" />
              <span className="font-serif text-sm font-bold uppercase tracking-[0.3em] text-pink-400">
                02 · 12 · 2023
              </span>
              <span className="h-px w-10 bg-pink-200" />
            </div>
            <p className="text-sm text-stone-400">
              Te quiero. Hoy, mañana y en cada viaje que viene.
            </p>
          </div>
        </motion.div>

        {/* Colofón */}
        <p className="mt-16 text-center text-[11px] font-medium uppercase tracking-[0.3em] text-pink-300">
          Hecho con cariño · Para ti
        </p>
      </div>
    </section>
  );
}
