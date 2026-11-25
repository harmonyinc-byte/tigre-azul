"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GloboCorazon from "@/components/GloboCorazon";
import SeccionCarta from "@/components/SeccionCarta";
import SeccionViajes from "@/components/SeccionViajes";
import SeccionAudio from "@/components/SeccionAudio";
import SeccionSobres from "@/components/SeccionSobres";

export default function Page() {
  const [fase, setFase] = useState<"globo" | "carta">("globo");
  const [deslizando, setDeslizando] = useState(false);
  const [haScroll, setHaScroll] = useState(false);

  const explotar = () => {
    setFase("carta");
    // Tras la explosión, el scroll queda habilitado sobre la carta
    setTimeout(() => setDeslizando(true), 400);
  };

  /* El indicador "desliza" se aparta en cuanto el usuario hace scroll,
     para no tapar el contenido. */
  useEffect(() => {
    const alScroll = () => setHaScroll(window.scrollY > 120);
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => window.removeEventListener("scroll", alScroll);
  }, []);

  return (
    <main className="relative min-h-[100svh] w-full bg-white">
      <AnimatePresence mode="wait">
        {fase === "globo" ? (
          <motion.div
            key="globo"
            exit={{ opacity: 0, scale: 1.35, filter: "blur(14px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <GloboCorazon onExplode={explotar} />
          </motion.div>
        ) : (
          <motion.div
            key="carta"
            initial={{ opacity: 0, scale: 1.25, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <SeccionCarta foto="/img/pareja.jpg" firma="Tu novio" />

            {/* Separador de transición */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative flex h-32 items-center justify-center bg-white"
            >
              <span className="font-serif text-sm italic tracking-widest text-pink-300">
                sigue deslizando
              </span>
            </motion.div>

            <SeccionViajes />
            <SeccionAudio audioSrc="/audio/carta.mp3" videoSrc="/video/nosotros.mp4" poster="/img/audio.jpg" />
            <SeccionSobres />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Indicador de scroll (solo mientras la carta está visible) */}
      <AnimatePresence>
        {fase === "carta" && deslizando && !haScroll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.6 }}
            className="pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1 rounded-full border border-pink-200 bg-white/85 px-4 py-2 backdrop-blur"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pink-400">
                Desliza
              </span>
              <span className="text-xs text-pink-400">↓</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
