"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import FondoDecorado from "./FondoDecorado";

/**
 * Sección de audio: un espectro de barras que reacciona
 * al sonido real (Web Audio API) y una carta de audio.
 * Debajo, un reproductor de vídeo para un vídeo en directo.
 */

const BARRAS = 56;

export default function SeccionAudio({
  audioSrc,
  videoSrc,
  poster,
}: {
  audioSrc?: string;
  videoSrc?: string;
  poster: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);

  const [reproduciendo, setReproduciendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [duracion, setDuracion] = useState(0);
  const [videoEnPlay, setVideoEnPlay] = useState(false);
  const [errorAudio, setErrorAudio] = useState(false);
  const [errorVideo, setErrorVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  /* ---------- Espectro con Web Audio API ---------- */
  const pintarEspectro = () => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const datos = new Uint8Array(analyser.frequencyBinCount);
    const ancho = canvas.width;
    const alto = canvas.height;

    const dibujar = () => {
      analyser.getByteFrequencyData(datos);

      ctx.clearRect(0, 0, ancho, alto);

      const barras = BARRAS;
      const anchoBarra = ancho / barras;

      for (let i = 0; i < barras; i++) {
        // mapeo logarítmico para que las frecuencias bajas no dominen
        const idx = Math.floor(
          Math.pow(i / barras, 1.6) * (datos.length * 0.72)
        );
        const v = (datos[idx] ?? 0) / 255;
        const h = Math.max(3, v * alto * 0.94);

        const gradiente = ctx.createLinearGradient(0, alto, 0, alto - h);
        gradiente.addColorStop(0, "rgba(244,114,182,0.35)");
        gradiente.addColorStop(0.5, "rgba(236,72,153,0.85)");
        gradiente.addColorStop(1, "rgba(190,24,93,1)");

        ctx.fillStyle = gradiente;

        const x = i * anchoBarra;
        const w = Math.max(1.5, anchoBarra * 0.62);
        const r = Math.min(w / 2, 4);
        const y = alto - h;

        ctx.beginPath();
        ctx.roundRect(x, y, w, h, [r, r, 0, 0]);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(dibujar);
    };

    dibujar();
  };

  const detenerEspectro = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  };

  useEffect(() => {
    return () => {
      detenerEspectro();
      ctxRef.current?.close().catch(() => {});
    };
  }, []);

  /* ---------- Control del audio ---------- */
  const alternar = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (reproduciendo) {
      audio.pause();
      setReproduciendo(false);
      detenerEspectro();
      return;
    }

    try {
      if (!ctxRef.current) {
        const AC =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        const ctx = new AC();
        const source = ctx.createMediaElementSource(audio);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.82;
        source.connect(analyser);
        analyser.connect(ctx.destination);
        ctxRef.current = ctx;
        analyserRef.current = analyser;
      }

      await ctxRef.current.resume();
      await audio.play();
      setReproduciendo(true);
      pintarEspectro();
    } catch {
      setReproduciendo(false);
    }
  };

  /* ---------- Reproductor de vídeo ---------- */
  const alternarVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setVideoEnPlay(true)).catch(() => {});
    } else {
      v.pause();
      setVideoEnPlay(false);
    }
  };

  const formatear = (s: number) => {
    if (!Number.isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const seg = Math.floor(s % 60);
    return `${m}:${String(seg).padStart(2, "0")}`;
  };

  const hayAudio = Boolean(audioSrc) && !errorAudio;
  const hayVideo = Boolean(videoSrc) && !errorVideo;

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-rose-50 via-white to-pink-100">
      <FondoDecorado seed={41} cantidad={30} color="#f9a8d4" intensidad={1.1} />

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
            Si pudieras oírmelo todo
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-stone-500">
            Hay cosas que se dicen mejor en voz alta. Aquí está la mía: dale al
            play y quédate un momento.
          </p>
        </motion.div>

        {/* Tarjeta de audio */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-12 overflow-hidden rounded-[2rem] border-[5px] border-white bg-white/80 p-5 shadow-[0_30px_80px_-28px_rgba(190,24,93,0.45)] backdrop-blur sm:mt-14 sm:rounded-[2.5rem] sm:border-[6px] sm:p-9"
        >
          {/* Espectro: siempre visible. Con sonido real se dibuja con Web Audio,
              en reposo muestra barras animadas de fondo. */}
          <div className="relative h-28 w-full overflow-hidden rounded-2xl bg-gradient-to-b from-pink-50 to-white sm:h-40">
            <canvas
              ref={canvasRef}
              width={1200}
              height={320}
              className={`h-full w-full ${reproduciendo ? "opacity-100" : "opacity-0"}`}
              aria-label="Espectro de audio"
            />

            {!reproduciendo && (
              <div className="absolute inset-0 flex items-end justify-center gap-[3px] px-4 pb-6">
                {Array.from({ length: BARRAS }).map((_, i) => (
                  <motion.span
                    key={i}
                    className="w-[3px] rounded-t-full bg-gradient-to-t from-pink-300/40 to-pink-500"
                    animate={{
                      height: [
                        8 + Math.abs(Math.sin(i * 0.55)) * 70,
                        12 + Math.abs(Math.cos(i * 0.4)) * 90,
                        8 + Math.abs(Math.sin(i * 0.3)) * 60,
                      ],
                    }}
                    transition={{
                      duration: 1.6 + (i % 5) * 0.28,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1.5">
              <motion.span
                animate={reproduciendo ? { scale: 1 } : { scale: [1, 1.12, 1] }}
                transition={{ duration: 2, repeat: reproduciendo ? 0 : Infinity, ease: "easeInOut" }}
                className="text-3xl drop-shadow-sm"
              >
                {reproduciendo ? "🎶" : "🎵"}
              </motion.span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-pink-400">
                {reproduciendo ? "Sonando" : "Pulsa para escuchar"}
              </span>
            </div>
          </div>

          {/* Reproductor: siempre visible */}
          <div className="mt-6">
            <audio
              ref={audioRef}
              src={audioSrc}
              preload="metadata"
              onTimeUpdate={(e) => {
                const el = e.currentTarget;
                if (el.duration) setProgreso(el.currentTime / el.duration);
              }}
              onLoadedMetadata={(e) => setDuracion(e.currentTarget.duration)}
              onError={() => {
                setErrorAudio(true);
                setReproduciendo(false);
                detenerEspectro();
              }}
              onEnded={() => {
                setReproduciendo(false);
                setProgreso(0);
                detenerEspectro();
              }}
            />

            {/* Barra de progreso */}
            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-pink-100">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-pink-400 to-rose-500"
                animate={{ width: `${progreso * 100}%` }}
                transition={{ duration: 0.15 }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-xs font-medium text-stone-400">
              <span>{formatear(progreso * duracion)}</span>
              <span>{formatear(duracion)}</span>
            </div>

            <div className="mt-5 flex items-center justify-center">
              <motion.button
                type="button"
                onClick={alternar}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-[0_14px_35px_-10px_rgba(236,72,153,0.8)]"
                aria-label={reproduciendo ? "Pausar" : "Reproducir"}
              >
                {reproduciendo ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1.5" />
                    <rect x="14" y="4" width="4" height="16" rx="1.5" />
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </motion.button>
            </div>

            {/* Aviso si falta el audio */}
            {!hayAudio && (
              <div className="mt-5 rounded-2xl border border-dashed border-pink-200 bg-pink-50/60 px-5 py-5 text-center">
                <p className="text-sm font-semibold text-pink-500">
                  Aquí irá tu audio
                </p>
                <p className="mt-1 text-xs text-stone-400">
                  {errorAudio ? (
                    <>
                      No se encontró el archivo. Colócalo en{" "}
                      <code className="font-mono">public/audio/</code> como{" "}
                      <code className="font-mono">carta.mp3</code>.
                    </>
                  ) : (
                    <>
                      Sube el archivo a{" "}
                      <code className="font-mono">public/audio/</code> y asígnalo
                      en <code className="font-mono">audioSrc</code>.
                    </>
                  )}
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Vídeo en directo */}
        {hayVideo && (
          <motion.div            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="relative mt-14 overflow-hidden rounded-[2.5rem] border-[6px] border-white bg-black shadow-[0_30px_80px_-28px_rgba(190,24,93,0.5)]"
          >
            <video
              ref={videoRef}
              src={videoSrc}
              poster={poster}
              playsInline
              className="aspect-[9/16] w-full object-cover"
              onPlay={() => setVideoEnPlay(true)}
              onPause={() => setVideoEnPlay(false)}
              onError={() => setErrorVideo(true)}
            />

            {!videoEnPlay && (
              <button
                type="button"
                onClick={alternarVideo}
                className="absolute inset-0 flex items-center justify-center bg-black/25 backdrop-blur-[2px]"
                aria-label="Reproducir vídeo"
              >
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 text-3xl text-pink-500 shadow-2xl"
                >
                  ▶
                </motion.span>
              </button>
            )}

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-14">
              <p className="text-sm font-semibold text-white">En directo</p>
              <p className="text-xs text-white/70">
                Un vídeo nuestro · 02/12/2023
              </p>
            </div>
          </motion.div>
        )}

        {/* Aviso si falta el vídeo */}
        {!hayVideo && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="relative mt-14 overflow-hidden rounded-[2.5rem] border-[6px] border-white bg-black/5 p-8 text-center"
          >
            <div
              className="absolute inset-0 opacity-70"
              style={{
                backgroundImage: `url(${poster})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px]" />
            <div className="relative">
              <span className="text-4xl">🎬</span>
              <p className="mt-4 text-sm font-semibold text-pink-600">
                Aquí irá tu vídeo
              </p>
              <p className="mt-1.5 text-xs text-stone-500">
                {errorVideo ? (
                  <>
                    Colócalo en <code className="font-mono">public/video/</code> como{" "}
                    <code className="font-mono">nosotros.mp4</code>.
                  </>
                ) : (
                  <>
                    Sube el vídeo a <code className="font-mono">public/video/</code>{" "}
                    y asígnalo en <code className="font-mono">videoSrc</code>.
                  </>
                )}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
