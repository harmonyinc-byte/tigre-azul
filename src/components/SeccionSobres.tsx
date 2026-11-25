"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import FondoDecorado from "./FondoDecorado";
import { SOBRES } from "@/lib/datos";

/**
 * Sección final: dos sobres cerrados (Italia / París).
 * Se abren solos con el scroll, como el resto de la web.
 */

function Sobre({
  nombre,
  imagen,
  pista,
  texto,
  abierto,
}: {
  nombre: string;
  imagen: string;
  pista: string;
  texto: string;
  abierto: boolean;
}) {
  return (
    <div className="relative">
      <div className="relative mx-auto w-full max-w-[280px] [perspective:1200px]">
        {/* CARTA (detrás, asoma por arriba del sobre) */}
        <motion.div
          className="relative z-10 mb-[-70px] rounded-[1.5rem] border-[5px] border-white bg-white p-5 shadow-[0_24px_60px_-22px_rgba(190,24,93,0.5)]"
          initial={false}
          animate={
            abierto
              ? { y: -34, opacity: 1, rotate: 0 }
              : { y: 120, opacity: 0, rotate: 3 }
          }
          transition={{ duration: 0.85, delay: abierto ? 0.35 : 0, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imagen} alt={nombre} className="h-full w-full object-cover" />
          </div>
          <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-pink-400">
            {nombre}
          </p>
          <p className="mt-3 text-center font-serif text-[15px] leading-relaxed text-stone-600">
            {texto}
          </p>
          <p className="mt-4 text-center text-2xl">💌</p>
        </motion.div>

        {/* CUERPO DEL SOBRE (delante) */}
        <motion.div
          className="relative z-20"
          initial={false}
          animate={abierto ? { opacity: 0, y: 16 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ pointerEvents: "none" }}
        >
          <div className="relative aspect-[3/4] w-full rounded-[1.5rem] bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 shadow-[0_20px_50px_-18px_rgba(190,24,93,0.45)]">
            {/* bolsillo inferior */}
            <svg
              viewBox="0 0 200 266"
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0 0 L100 130 L200 0 L200 266 L0 266 Z"
                fill="#fbcfe8"
                fillOpacity="0.85"
                stroke="rgba(190,24,93,0.16)"
                strokeWidth="1.5"
              />
            </svg>

            {/* Sello */}
            <motion.div
              className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-2 border-dashed border-pink-400 bg-white/95 shadow-md"
              animate={abierto ? { scale: 0, rotate: 180 } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="font-serif text-lg font-bold leading-none text-pink-600">
                {nombre === "Italia" ? "IT" : "PA"}
              </span>
              <span className="mt-0.5 text-[8px] font-bold uppercase tracking-widest text-pink-400">
                02/12
              </span>
            </motion.div>

            {/* Nombre */}
            <p className="absolute bottom-7 left-0 right-0 text-center font-serif text-xl font-bold tracking-wide text-pink-700">
              {nombre}
            </p>

            {/* Pista */}
            <p className="absolute bottom-3 left-0 right-0 px-4 text-center text-[9px] font-medium uppercase leading-relaxed tracking-[0.12em] text-pink-500">
              {pista}
            </p>

            {/* SOLAPA (se levanta al abrir) */}
            <motion.div
              className="absolute inset-x-0 top-0 h-[48%] origin-top"
              initial={false}
              animate={
                abierto
                  ? { rotateX: -172, opacity: 0 }
                  : { rotateX: 0, opacity: 1 }
              }
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: "preserve-3d", pointerEvents: "none" }}
            >
              <svg
                viewBox="0 0 200 130"
                className="h-full w-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id={`solapa-${nombre}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#fdf2f8" />
                    <stop offset="100%" stopColor="#fbcfe8" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 0 L200 0 L100 130 Z"
                  fill={`url(#solapa-${nombre})`}
                  stroke="rgba(190,24,93,0.16)"
                  strokeWidth="1.5"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function SeccionSobres() {
  const [abiertos, setAbiertos] = useState<string[]>([]);
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  const abrir = (nombre: string) =>
    setAbiertos((prev) => (prev.includes(nombre) ? prev : [...prev, nombre]));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            const n = e.target.getAttribute("data-sobre");
            if (n) abrir(n);
          }
        });
      },
      { threshold: 0.6 }
    );

    Object.values(refs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-pink-100 via-rose-50 to-pink-200">
      <FondoDecorado seed={57} cantidad={36} color="#f9a8d4" intensidad={1.3} />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-pink-500 shadow-sm">
            ✉️ El destino secreto
          </span>
          <h2 className="mt-7 font-serif text-[2.4rem] leading-tight tracking-tight text-pink-700 sm:text-5xl">
            Dos sobres. Un viaje.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-stone-500">
            Este es el punto donde te toca a ti. Elige el sobre que quieras y
            lo celebrated juntos. Del resto{" "}
            <span className="font-semibold text-pink-600">me encargo yo</span>.
          </p>
        </motion.div>

        {/* Sobres */}
        <div className="mt-16 grid gap-12 sm:grid-cols-2">
          {SOBRES.map((s, i) => (
            <motion.div
              key={s.nombre}
              data-sobre={s.nombre}
              ref={(el: HTMLDivElement | null) => {
                refs.current[s.nombre] = el;
              }}
              initial={{ opacity: 0, y: 60, rotate: i === 0 ? -4 : 4 }}
              whileInView={{ opacity: 1, y: 0, rotate: i === 0 ? -3 : 3 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <Sobre
                nombre={s.nombre}
                imagen={s.imagen}
                pista={s.pista}
                texto={s.texto}
                abierto={abiertos.includes(s.nombre)}
              />
            </motion.div>
          ))}
        </div>

        {/* Promesa final */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mx-auto mt-20 max-w-2xl rounded-[2.5rem] border border-pink-200 bg-white/80 p-9 text-center shadow-[0_28px_70px_-30px_rgba(190,24,93,0.5)] backdrop-blur"
        >
          <p className="text-3xl">💍</p>
          <h3 className="mt-5 font-serif text-3xl leading-tight text-pink-700 sm:text-4xl">
            En cuanto abras el sobre, ya lo estoy
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
