"use client";

import { motion } from "framer-motion";
import FondoDecorado from "./FondoDecorado";

/**
 * Cabecera de la sección de viajes.
 * La galería en movimiento vive en SeccionExposicion.
 */
export default function SeccionViajes() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-pink-50 to-rose-50">
      <FondoDecorado seed={23} cantidad={34} color="#f9a8d4" intensidad={1.2} />

      <div className="relative z-10 mx-auto max-w-3xl px-5 py-20 sm:px-6 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="text-center"
        >
          <h2 className="font-serif text-[2.1rem] leading-tight tracking-tight text-pink-700 sm:text-5xl">
            Nuestro mapa de fondo
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-stone-500">
            Seis bolos, seis sorteos, seis veces que la vida nos llevó a
            algún sitio. Y en todos ellos, tú ibas con la mejor foto del
            carrete.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
