"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FondoDecorado from "./FondoDecorado";
import { DESTINOS } from "@/lib/datos";

/**
 * Sección de viajes con estética de sorteo.
 * Sin botones: cada boleto se raspa solo al entrar en pantalla
 * (scroll), revelando el destino de forma progresiva.
 */
export default function SeccionViajes() {
  const [revelados, setRevelados] = useState<string[]>([]);

  const revelar = useCallback((slug: string) => {
    setRevelados((prev) => (prev.includes(slug) ? prev : [...prev, slug]));
  }, []);

  /* Revelado progresivo por scroll: cada boleto se abre
     cuando su tarjeta entra en pantalla. */
  const boletoRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            const slug = e.target.getAttribute("data-slug");
            if (slug) revelar(slug);
          }
        });
      },
      { threshold: 0.55 }
    );

    Object.values(boletoRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [revelar]);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-pink-50 to-rose-50">
      <FondoDecorado seed={23} cantidad={34} color="#f9a8d4" intensidad={1.2} />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        {/* Cabecera */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="text-center"
        >
          <h2 className="font-serif text-[2.4rem] leading-tight tracking-tight text-pink-700 sm:text-5xl">
            Nuestro mapa de fondo
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-stone-500">
            Cinco bolos, cinco sorteos, cinco veces que la vida nos llevó a
            algún sitio. Y en todos ellos, tú ibas con la mejor foto del
            carrete.
          </p>
        </motion.div>

        {/* Máquina del sorteo */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 12 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-16 max-w-3xl"
        >
          <div className="relative rounded-[2.5rem] border-8 border-white bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 p-3 shadow-[0_30px_80px_-25px_rgba(219,39,119,0.5)]">
            {/* Cabecera de la máquina */}
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
                Sorteo de Viajes · 02/12/2023
              </span>
              <span className="text-xs font-bold text-white/80">
                {revelados.length}/{DESTINOS.length}
              </span>
            </div>

            {/* Rejilla de resultados */}
            <div className="grid gap-3 rounded-b-[1.6rem] bg-white/70 p-5 sm:grid-cols-2">
              {DESTINOS.map((d, i) => {
                const abierto = revelados.includes(d.slug);
                return (
                  <motion.div
                    key={d.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ delay: i * 0.08, duration: 0.6 }}
                    className="relative"
                    data-slug={d.slug}
                    ref={(el: HTMLDivElement | null) => {
                      boletoRefs.current[d.slug] = el;
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {abierto ? (
                        <motion.div
                          key="abierto"
                          initial={{ opacity: 0, scale: 0.85, rotateY: 90 }}
                          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          className="flex gap-4 rounded-2xl border border-pink-100 bg-white p-3 shadow-[0_10px_30px_-12px_rgba(190,24,93,0.35)]"
                        >
                          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={d.imagen}
                              alt={d.nombre}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-pink-400">
                              {d.etiqueta} · {d.fecha}
                            </p>
                            <p className="mt-0.5 font-serif text-lg font-bold leading-tight text-pink-700">
                              {d.nombre}
                            </p>
                            <p className="text-xs italic text-stone-400">
                              {d.subtitulo}
                            </p>
                          </div>
                          <span className="self-start text-lg">🎉</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="cerrado"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true, amount: 0.5 }}
                          transition={{ duration: 0.5 }}
                          className="relative flex h-24 w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-pink-200 via-rose-200 to-pink-300 shadow-inner"
                        >
                          {/* textura de raspa y gana */}
                          <div
                            className="absolute inset-0 opacity-40"
                            style={{
                              backgroundImage:
                                "repeating-linear-gradient(45deg, rgba(255,255,255,0.55) 0 6px, rgba(255,255,255,0) 6px 13px)",
                            }}
                          />
                          <motion.span
                            animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.08, 1] }}
                            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                            className="relative text-3xl"
                          >
                            🎁
                          </motion.span>
                          <span className="absolute bottom-1.5 right-3 text-[9px] font-bold uppercase tracking-widest text-white/85">
                            Por descubrir
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Pies de la máquina */}
          <div className="mx-auto flex w-3/4 justify-between">
            <span className="h-8 w-10 rounded-b-2xl bg-pink-300/70" />
            <span className="h-8 w-10 rounded-b-2xl bg-pink-300/70" />
          </div>
        </motion.div>

        {/* Fichas de viaje */}
        <div className="mt-24 space-y-8">
          {DESTINOS.map((d, i) => (
            <motion.article
              key={d.slug}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={`grid items-center gap-8 md:gap-14 ${
                i % 2 === 0 ? "md:grid-cols-[1.1fr_1fr]" : "md:grid-cols-[1fr_1.1fr]"
              }`}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1 }}
                className={`relative ${
                  i % 2 === 0 ? "md:order-1" : "md:order-2"
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border-[5px] border-white shadow-[0_26px_65px_-22px_rgba(190,24,93,0.45)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={d.imagen}
                    alt={d.nombre}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-900/45 via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-pink-600 backdrop-blur">
                    {d.etiqueta}
                  </span>
                </div>
              </motion.div>

              <div className={i % 2 === 0 ? "md:order-2" : "md:order-1"}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-pink-400">
                  {String(i + 1).padStart(2, "0")} · {d.fecha}
                </p>
                <h3 className="mt-3 font-serif text-4xl font-bold leading-none tracking-tight text-pink-700 sm:text-5xl">
                  {d.nombre}
                </h3>
                <p className="mt-2 font-serif text-lg italic text-pink-400">
                  {d.subtitulo}
                </p>
                <p className="mt-5 text-[15px] leading-relaxed text-stone-500">
                  {d.texto}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="h-px flex-1 bg-gradient-to-r from-pink-200 to-transparent" />
                  <span className="text-pink-300">♥</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
