"use client";

import { motion } from "framer-motion";
import FondoDecorado from "./FondoDecorado";
import { FECHA, FECHA_LARGA } from "@/lib/datos";

/**
 * Sección de apertura: texto de bienvenida + foto + la fecha
 * que aparece de forma sutil por toda la web.
 */
export default function SeccionCarta({
  foto,
  firma,
}: {
  foto: string;
  firma: string;
}) {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-white">
      <FondoDecorado seed={11} cantidad={28} color="#fbcfe8" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-center gap-12 px-5 py-20 sm:px-6 sm:py-24">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <h2 className="font-serif text-[2.2rem] leading-[1.08] tracking-tight text-pink-700 sm:text-6xl">
            Tres años de
            <span className="block bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 bg-clip-text text-transparent">
              nosotros dos
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-[15px] leading-relaxed text-stone-500 sm:text-base">
            Hay fechas que no se olvidan, se llevan. Y desde la nuestra, cada día
            ha tenido algo de ti: un mensaje, una risa, un viaje improvisado.
            Esto no es una web, es una carta abierta. Deslízala.
          </p>
        </motion.div>

        {/* Foto + fecha */}
        <div className="grid w-full items-center gap-12 md:grid-cols-[1.05fr_1fr] md:gap-14">
          <motion.figure
            initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -1.5 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-[6px] border-white shadow-[0_28px_70px_-18px_rgba(219,39,119,0.45)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={foto}
                alt="Nosotros"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Sello de la fecha */}
            <motion.div
              initial={{ opacity: 0, scale: 0.4, rotate: -25 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 140 }}
              className="absolute -bottom-5 -right-3 flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-dashed border-pink-300 bg-white/95 shadow-xl backdrop-blur sm:-right-6"
            >
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-pink-400">
                Desde
              </span>
              <span className="font-serif text-lg font-bold leading-tight text-pink-600">
                02/12
              </span>
              <span className="text-[9px] font-semibold tracking-widest text-pink-300">
                2023
              </span>
            </motion.div>
          </motion.figure>

          {/* Carta */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative rounded-[2rem] border border-pink-100 bg-gradient-to-br from-white to-pink-50/70 p-8 shadow-[0_24px_60px_-28px_rgba(190,24,93,0.35)] sm:p-11"
          >
            <span className="absolute -top-4 left-8 rounded-full bg-pink-500 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-white shadow-md">
              Carta
            </span>

            <p className="font-serif text-lg leading-[1.85] text-stone-600 sm:text-xl">
              Te escribo esto para que quede escrito, aunque ya sabes leerlo en
              mis ojos. Empezamos el{" "}
              <span className="font-semibold text-pink-600">{FECHA}</span> y
              desde entonces cada plan, cada broma, cada{" "}
              <span className="italic text-pink-600">&ldquo;te quiero&rdquo;</span> ha sido
              lo mejor de cada día.
            </p>

            <p className="mt-6 font-serif text-lg leading-[1.85] text-stone-600 sm:text-xl">
              Gracias por el viaje, por los planes locos y por aguantarme, por
              elegirme una y otra vez.
            </p>

            <div className="mt-8 flex items-end justify-between gap-4 border-t border-dashed border-pink-200 pt-6">
              <div>
                <p className="text-sm font-semibold text-pink-600">{firma}</p>
                <p className="mt-0.5 text-xs text-stone-400">{FECHA_LARGA}</p>
              </div>
              <span className="text-3xl">💌</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
