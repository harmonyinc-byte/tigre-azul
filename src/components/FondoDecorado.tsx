"use client";

import { useMemo } from "react";

/**
 * Fondo decorado estático: corazones y figuras románticas
 * dibujados con SVG, repartidos de forma determinista
 * (sin Math.random en el render del servidor).
 */

type Figura =
  | { tipo: "corazon"; x: number; y: number; s: number; r: number; o: number }
  | { tipo: "arco"; x: number; y: number; s: number; r: number; o: number }
  | { tipo: "estrella"; x: number; y: number; s: number; r: number; o: number }
  | { tipo: "puntos"; x: number; y: number; s: number; r: number; o: number };

/** Generador pseudoaleatorio determinista (mulberry32) */
function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Heart({ s, o }: { s: number; o: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        opacity={o}
      />
    </svg>
  );
}

function ArcoIris({ s, o }: { s: number; o: number }) {
  return (
    <svg width={s} height={s * 0.62} viewBox="0 0 40 25" fill="none" aria-hidden>
      <path
        d="M3 22a17 17 0 0134 0"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        opacity={o}
      />
    </svg>
  );
}

function Estrella({ s, o }: { s: number; o: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path
        d="M12 2l2.9 6.26L21.5 9.3l-4.75 4.6 1.12 6.6L12 17.36 6.13 20.5l1.12-6.6L2.5 9.3l6.6-1.04L12 2z"
        opacity={o}
      />
    </svg>
  );
}

function Puntos({ s, o }: { s: number; o: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="5" cy="5" r="2" opacity={o} />
      <circle cx="12" cy="5" r="2" opacity={o * 0.8} />
      <circle cx="19" cy="5" r="2" opacity={o} />
      <circle cx="5" cy="12" r="2" opacity={o * 0.8} />
      <circle cx="12" cy="12" r="2" opacity={o} />
      <circle cx="19" cy="12" r="2" opacity={o * 0.8} />
      <circle cx="5" cy="19" r="2" opacity={o} />
      <circle cx="12" cy="19" r="2" opacity={o * 0.8} />
      <circle cx="19" cy="19" r="2" opacity={o} />
    </svg>
  );
}

export default function FondoDecorado({
  seed = 7,
  cantidad = 26,
  color = "#f9a8d4",
  className = "",
  intensidad = 1,
}: {
  seed?: number;
  cantidad?: number;
  color?: string;
  className?: string;
  intensidad?: number;
}) {
  const figuras = useMemo<Figura[]>(() => {
    const r = rng(seed);
    const tipos: Figura["tipo"][] = ["corazon", "corazon", "arco", "estrella", "puntos"];
    const salida: Figura[] = [];

    for (let i = 0; i < cantidad; i++) {
      const tipo = tipos[Math.floor(r() * tipos.length)];
      salida.push({
        tipo,
        x: r() * 100,
        y: r() * 100,
        s: tipo === "puntos" ? 14 + r() * 18 : 12 + r() * 34,
        r: r() * 360,
        o: (0.12 + r() * 0.3) * intensidad,
      });
    }
    return salida;
  }, [seed, cantidad, intensidad]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {figuras.map((f, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            transform: `rotate(${f.r}deg)`,
            color,
          }}
        >
          {f.tipo === "corazon" && <Heart s={f.s} o={f.o} />}
          {f.tipo === "arco" && <ArcoIris s={f.s} o={f.o} />}
          {f.tipo === "estrella" && <Estrella s={f.s} o={f.o} />}
          {f.tipo === "puntos" && <Puntos s={f.s} o={f.o} />}
        </div>
      ))}
    </div>
  );
}
