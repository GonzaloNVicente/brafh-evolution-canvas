import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import heroImg from "@/assets/scene-hero.jpg";
import precisionImg from "@/assets/scene-precision.jpg";
import steelImg from "@/assets/scene-steel.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BRAFH · Inteligencia Comercial" },
      {
        name: "description",
        content:
          "Una propuesta estratégica para transformar datos dispersos en inteligencia comercial.",
      },
    ],
  }),
  component: BrafhExperience,
});

/* ───────────────────── helpers ───────────────────── */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// Deterministic pseudo-random (avoids SSR/CSR hydration drift)
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

function Eyebrow({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-4 font-mono text-[11px] tracking-[0.28em] uppercase text-[var(--rouge)]">
      <span>{index}</span>
      <span className="h-px w-10 bg-current opacity-50" />
      <span className="text-[var(--ink)]/60">{label}</span>
    </div>
  );
}

function Scene({
  id,
  bg = "bone",
  children,
}: {
  id: string;
  bg?: "bone" | "graphite" | "ink";
  children: React.ReactNode;
}) {
  const bgMap = {
    bone: "bg-[var(--bone)] text-[var(--ink)]",
    graphite: "bg-[var(--graphite)] text-[var(--bone)]",
    ink: "bg-[#0f0f0f] text-[var(--bone)]",
  };
  return (
    <section
      id={id}
      className={`relative h-screen w-full snap-start snap-always overflow-hidden ${bgMap[bg]}`}
    >
      {children}
    </section>
  );
}

/* ───────────────────── chrome ───────────────────── */

function Chrome({ current, total }: { current: number; total: number }) {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="flex items-center justify-between px-10 py-6 mix-blend-difference text-[var(--bone)]">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-[var(--rouge)]" />
            <span className="font-mono text-[11px] tracking-[0.3em]">BRAFH / 2026</span>
          </div>
          <span className="font-mono text-[11px] tracking-[0.3em] opacity-70">
            PROPUESTA ESTRATÉGICA
          </span>
          <span className="font-mono text-[11px] tracking-[0.3em] tabular-nums">
            {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </header>

      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <a
            key={i}
            href={`#scene-${i + 1}`}
            className="group flex items-center gap-2"
            aria-label={`Escena ${i + 1}`}
          >
            <span
              className={`h-px transition-all duration-500 ${
                i === current ? "w-8 bg-[var(--rouge)]" : "w-3 bg-current opacity-30"
              }`}
            />
          </a>
        ))}
      </div>
    </>
  );
}

/* ───────────────────── scene 1: HERO ───────────────────── */

function SceneHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <Scene id="scene-1" bg="ink">
      <div ref={ref} className="absolute inset-0">
        <motion.div style={{ scale, opacity }} className="absolute inset-0">
          <img
            src={heroImg}
            alt="Equipamiento industrial BRAFH"
            className="h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/85" />
        </motion.div>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end px-10 pb-20 md:px-20 md:pb-28">
        <Eyebrow index="01" label="Apertura" />

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
          className="font-display font-bold tracking-tight mt-8 text-[12vw] md:text-[8.5vw] leading-[0.9]"
        >
          Los datos están ahí.
          <br />
          <span className="text-[var(--rouge)]">Falta usarlos.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.9 }}
          className="mt-10 max-w-xl text-lg md:text-xl text-[var(--bone)]/70 leading-relaxed"
        >
          De información dispersa a inteligencia comercial.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.4em] text-[var(--bone)]/40"
        >
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            SCROLL
          </motion.span>
        </motion.div>
      </div>
    </Scene>
  );
}

/* ───────────────────── scene 2: SISTEMA ACTUAL (living ecosystem) ───────────────────── */

const PLATFORMS = [
  { name: "Meta Ads", x: 14, y: 24, slug: "meta" },
  { name: "Google Ads", x: 78, y: 18, slug: "googleads" },
  { name: "Instagram", x: 28, y: 68, slug: "instagram" },
  { name: "Shopify", x: 62, y: 58, slug: "shopify" },
  { name: "WhatsApp", x: 18, y: 46, slug: "whatsapp" },
  { name: "Analytics", x: 84, y: 72, slug: "googleanalytics" },
  { name: "Odoo", x: 50, y: 38, slug: "odoo" },
];

function SceneSystem() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4 });

  // precompute deterministic particle vectors per platform
  const particles = useMemo(
    () =>
      PLATFORMS.map((_, i) =>
        Array.from({ length: 7 }).map((_, j) => ({
          dx: (rand(i * 11 + j) - 0.5) * 180,
          dy: (rand(i * 13 + j + 7) - 0.5) * 180,
          delay: rand(i * 17 + j) * 2.5,
          dur: 2.4 + rand(i + j * 5) * 1.6,
        })),
      ),
    [],
  );

  // broken / dashed half-paths between random platform pairs
  const brokenPairs = useMemo(
    () => [
      [0, 4],
      [1, 6],
      [2, 3],
      [4, 6],
      [3, 5],
    ],
    [],
  );

  return (
    <Scene id="scene-2" bg="bone">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="relative h-full w-full px-10 py-20 md:px-20 md:py-24"
      >
        <Eyebrow index="02" label="Sistema actual" />
        <h2 className="font-display font-bold tracking-tight mt-6 text-5xl md:text-6xl max-w-2xl">
          Siete plataformas. <br />
          <span className="text-[var(--ink)]/40">Cero conexión.</span>
        </h2>

        {/* broken connection layer */}
        <svg className="absolute inset-0 h-full w-full pointer-events-none" preserveAspectRatio="none">
          {brokenPairs.map(([a, b], k) => {
            const A = PLATFORMS[a];
            const B = PLATFORMS[b];
            return (
              <motion.line
                key={k}
                x1={`${A.x}%`}
                y1={`${A.y}%`}
                x2={`${(A.x + B.x) / 2}%`}
                y2={`${(A.y + B.y) / 2}%`}
                stroke="var(--rouge)"
                strokeWidth="1"
                strokeDasharray="3 6"
                strokeOpacity="0.35"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: [0, 0.55, 0.55] } : {}}
                transition={{
                  duration: 3,
                  delay: 0.4 + k * 0.25,
                  repeat: Infinity,
                  repeatDelay: 1.4,
                }}
              />
            );
          })}
        </svg>

        <div className="absolute inset-0 pointer-events-none">
          {PLATFORMS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: EASE }}
              className="absolute"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 4 + (i % 3) * 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative -translate-x-1/2 -translate-y-1/2"
              >
                <div className="px-4 py-2 border border-[var(--ink)]/15 bg-[var(--bone)] font-mono text-[11px] tracking-[0.2em] uppercase shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)] flex items-center gap-2.5">
                  <img
                    src={`https://cdn.simpleicons.org/${p.slug}/2B2B2B`}
                    alt=""
                    aria-hidden="true"
                    className="h-3.5 w-3.5 opacity-80"
                    loading="lazy"
                  />
                  {p.name}
                </div>
                {/* dispersing particles (data leaks) */}
                {particles[i].map((pt, j) => (
                  <motion.div
                    key={j}
                    className="absolute top-1/2 left-1/2 h-1 w-1 rounded-full bg-[var(--rouge)]"
                    animate={
                      inView
                        ? {
                            x: [0, pt.dx],
                            y: [0, pt.dy],
                            opacity: [0.9, 0],
                            scale: [1, 0.4],
                          }
                        : {}
                    }
                    transition={{
                      duration: pt.dur,
                      repeat: Infinity,
                      delay: pt.delay,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="absolute bottom-10 left-10 md:left-20 right-10 md:right-20 flex items-end justify-between gap-6 font-mono text-[10px] tracking-[0.3em] text-[var(--ink)]/40">
          <span>FIG. 02 · ECOSISTEMA FRAGMENTADO</span>
          <span>SIN HUB CENTRAL</span>
        </div>
      </div>
    </Scene>
  );
}

/* ───────────────────── scene 3: PUNTOS DE FUGA (visual leak) ───────────────────── */

function SceneLeaks() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4 });

  const streams = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        x: 10 + rand(i) * 80,
        delay: rand(i + 100) * 4,
        dur: 3 + rand(i + 200) * 2,
        size: 2 + rand(i + 50) * 2,
      })),
    [],
  );

  return (
    <Scene id="scene-3" bg="bone">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="relative h-full w-full px-10 py-20 md:px-20 md:py-24"
      >
        <Eyebrow index="03" label="Puntos de fuga" />
        <h2 className="font-display font-bold tracking-tight mt-6 text-5xl md:text-6xl max-w-3xl">
          Lo que <span className="text-[var(--rouge)]">no se mide</span>,<br />
          se escapa.
        </h2>

        {/* the bucket: a horizontal line — particles fall through */}
        <div className="absolute inset-x-10 md:inset-x-20 top-[42%]">
          <div className="relative h-px bg-[var(--ink)]/20">
            {/* holes in the bucket */}
            {[18, 38, 58, 78].map((p, i) => (
              <div
                key={i}
                className="absolute top-0 h-2 w-8 -translate-y-1/2 bg-[var(--bone)]"
                style={{ left: `${p}%` }}
              />
            ))}
          </div>
        </div>

        {/* falling data drops */}
        <div className="absolute inset-x-10 md:inset-x-20 top-[42%] bottom-10 pointer-events-none overflow-hidden">
          {streams.map((s, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-[var(--rouge)]"
              style={{
                left: `${s.x}%`,
                top: 0,
                width: s.size,
                height: s.size,
              }}
              animate={
                inView
                  ? { y: ["0%", "100%"], opacity: [1, 1, 0] }
                  : {}
              }
              transition={{
                duration: s.dur,
                delay: s.delay,
                repeat: Infinity,
                ease: "easeIn",
                times: [0, 0.85, 1],
              }}
            />
          ))}
        </div>

        {/* labels positioned over the holes — minimal */}
        <div className="absolute inset-x-10 md:inset-x-20 top-[36%] flex justify-between font-mono text-[9px] tracking-[0.22em] uppercase text-[var(--ink)]/50">
          <span>Lead perdido</span>
          <span>Origen ?</span>
          <span>ROI ?</span>
          <span>Sin seguimiento</span>
        </div>

        <div className="absolute bottom-10 left-10 md:left-20 right-10 md:right-20 flex items-end justify-between gap-6 font-mono text-[10px] tracking-[0.3em] text-[var(--ink)]/40">
          <span>FIG. 03 · LEAKAGE MAP</span>
          <span>FUGA CONTINUA</span>
        </div>
      </div>
    </Scene>
  );
}

/* ───────────────────── scene 4: MOMENTO CLAVE ───────────────────── */

function SceneKeyMoment() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.5 });

  return (
    <Scene id="scene-4" bg="graphite">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="relative h-full w-full flex flex-col justify-center px-10 md:px-20"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <Eyebrow index="04" label="Diagnóstico" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
          className="font-display font-bold tracking-tight mt-10 text-[8vw] md:text-[6vw] max-w-6xl leading-[0.95]"
        >
          No falta <span className="text-[var(--bone)]/30">información.</span>
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, ease: EASE, delay: 0.8 }}
          className="font-display font-bold tracking-tight mt-6 text-[8vw] md:text-[6vw] max-w-6xl leading-[0.95]"
        >
          Falta <span className="text-[var(--rouge)]">conexión.</span>
        </motion.h3>
      </div>
    </Scene>
  );
}

/* ───────────────────── scene 5: TRANSFORMACIÓN (cinematic converge) ───────────────────── */

function SceneTransformation() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4 });

  // platforms orbit around a central Odoo hub then dashboard
  const sources = [
    { name: "Meta Ads", angle: -150 },
    { name: "Google Ads", angle: -110 },
    { name: "Instagram", angle: -70 },
    { name: "Shopify", angle: 150 },
    { name: "WhatsApp", angle: 110 },
    { name: "Analytics", angle: 70 },
  ];

  return (
    <Scene id="scene-5" bg="graphite">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="relative h-full w-full px-10 py-20 md:px-20 md:py-24"
      >
        <Eyebrow index="05" label="Arquitectura" />
        <h2 className="font-display font-bold tracking-tight mt-6 text-5xl md:text-6xl max-w-3xl text-[var(--bone)]">
          Todo converge.
        </h2>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-[640px] h-[420px] max-w-[90vw]">
            {/* Connection lines */}
            <svg className="absolute inset-0 h-full w-full" viewBox="-320 -210 640 420">
              {sources.map((s, i) => {
                const rad = (s.angle * Math.PI) / 180;
                const x = Math.cos(rad) * 260;
                const y = Math.sin(rad) * 170;
                return (
                  <motion.line
                    key={s.name}
                    x1={x}
                    y1={y}
                    x2={-160}
                    y2={0}
                    stroke="var(--rouge)"
                    strokeWidth="1"
                    strokeOpacity="0.55"
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1.4, delay: 0.4 + i * 0.12, ease: EASE }}
                  />
                );
              })}
              {/* hub → dashboard */}
              <motion.line
                x1={-160}
                y1={0}
                x2={200}
                y2={0}
                stroke="var(--bone)"
                strokeWidth="1.2"
                strokeOpacity="0.7"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.2, delay: 1.8, ease: EASE }}
              />

              {/* travelling data dots on each line */}
              {sources.map((s, i) => {
                const rad = (s.angle * Math.PI) / 180;
                const x = Math.cos(rad) * 260;
                const y = Math.sin(rad) * 170;
                return (
                  <motion.circle
                    key={`d-${s.name}`}
                    r="2.5"
                    fill="var(--rouge)"
                    initial={{ cx: x, cy: y, opacity: 0 }}
                    animate={
                      inView
                        ? {
                            cx: [x, -160],
                            cy: [y, 0],
                            opacity: [0, 1, 1, 0],
                          }
                        : {}
                    }
                    transition={{
                      duration: 1.8,
                      delay: 2.2 + i * 0.25,
                      repeat: Infinity,
                      repeatDelay: 0.6,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
              {/* hub → dashboard particle */}
              <motion.circle
                r="2.5"
                fill="var(--bone)"
                initial={{ cx: -160, cy: 0, opacity: 0 }}
                animate={
                  inView
                    ? { cx: [-160, 200], cy: [0, 0], opacity: [0, 1, 1, 0] }
                    : {}
                }
                transition={{
                  duration: 1.6,
                  delay: 3,
                  repeat: Infinity,
                  repeatDelay: 0.4,
                  ease: "easeInOut",
                }}
              />
            </svg>

            {/* Source nodes */}
            {sources.map((s, i) => {
              const rad = (s.angle * Math.PI) / 180;
              const x = Math.cos(rad) * 260;
              const y = Math.sin(rad) * 170;
              return (
                <motion.div
                  key={s.name}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ x, y }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: EASE }}
                >
                  <div className="px-3 py-1.5 border border-[var(--bone)]/20 bg-[var(--graphite)] font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--bone)]/80">
                    {s.name}
                  </div>
                </motion.div>
              );
            })}

            {/* Odoo central hub */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ x: -160, y: 0 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.6, ease: EASE }}
            >
              <div className="relative h-20 w-20 rounded-full bg-[var(--rouge)] flex items-center justify-center">
                <motion.div
                  className="absolute inset-0 rounded-full border border-[var(--rouge)]"
                  animate={inView ? { scale: [1, 2, 1], opacity: [0.7, 0, 0.7] } : {}}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--bone)]">
                  Odoo
                </span>
              </div>
            </motion.div>

            {/* Dashboard panel */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-y-1/2"
              style={{ x: 100 }}
              initial={{ opacity: 0, x: 140 }}
              animate={inView ? { opacity: 1, x: 100 } : {}}
              transition={{ duration: 1, delay: 2.6, ease: EASE }}
            >
              <div className="w-44 border border-[var(--bone)]/25 bg-[var(--bone)]/5 backdrop-blur p-3">
                <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.22em] text-[var(--bone)]/60">
                  <span>DASHBOARD</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--rouge)] animate-pulse" />
                </div>
                <div className="mt-3 space-y-2">
                  {[60, 85, 45, 72].map((w, i) => (
                    <motion.div
                      key={i}
                      className="h-1 bg-[var(--rouge)]"
                      initial={{ scaleX: 0 }}
                      animate={inView ? { scaleX: w / 100 } : {}}
                      transition={{ duration: 1, delay: 3 + i * 0.15, ease: EASE }}
                      style={{ transformOrigin: "left" }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-10 left-10 md:left-20 right-10 md:right-20 flex items-end justify-between font-mono text-[10px] tracking-[0.3em] text-[var(--bone)]/40">
          <span>FIG. 05 · ARQUITECTURA UNIFICADA</span>
          <span>ODOO · HUB CENTRAL</span>
        </div>
      </div>
    </Scene>
  );
}

/* ───────────────────── scene 6: ROADMAP overview ───────────────────── */

function SceneRoadmap() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.3 });

  const stages = [
    { n: "01", t: "Visibilidad", m: "Mes 01 — 03" },
    { n: "02", t: "Atribución", m: "Mes 04 — 06" },
    { n: "03", t: "Inteligencia", m: "Mes 07 — 09" },
  ];

  return (
    <Scene id="scene-6" bg="bone">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="relative h-full w-full px-10 py-20 md:px-20 md:py-24 flex flex-col"
      >
        <Eyebrow index="06" label="Roadmap" />
        <h2 className="font-display font-bold tracking-tight mt-6 text-5xl md:text-6xl max-w-3xl">
          Tres etapas.<br />
          <span className="text-[var(--ink)]/40">Una sola dirección.</span>
        </h2>

        <div className="relative mt-auto pt-20">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 2, ease: EASE, delay: 0.3 }}
            style={{ transformOrigin: "left" }}
            className="absolute top-[140px] left-0 right-0 h-px bg-[var(--ink)]/20"
          />
          <div className="grid grid-cols-3 gap-8">
            {stages.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, ease: EASE, delay: 0.5 + i * 0.3 }}
                className="relative"
              >
                <div className="font-mono text-[11px] tracking-[0.3em] text-[var(--rouge)]">
                  ETAPA {s.n}
                </div>
                <h3 className="font-display font-bold tracking-tight mt-3 text-4xl md:text-5xl">
                  {s.t}
                </h3>
                <div className="relative my-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 1 + i * 0.3, ease: EASE }}
                    className="h-3 w-3 rounded-full bg-[var(--rouge)]"
                  />
                </div>
                <div className="font-mono text-xs text-[var(--ink)]/50 tracking-[0.2em]">
                  {s.m}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Scene>
  );
}

/* ───────────────────── scene 7: VISIBILIDAD (live connection WA→Odoo) ───────────────────── */

function SceneVisibilidad() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4 });

  return (
    <Scene id="scene-7" bg="bone">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="grid h-full grid-cols-1 md:grid-cols-[1fr_1.2fr]"
      >
        <div className="relative flex flex-col justify-center px-10 py-20 md:px-20">
          <Eyebrow index="07" label="Etapa 01 · Visibilidad" />
          <h2 className="font-display font-bold tracking-tight mt-6 text-5xl md:text-6xl">
            WhatsApp <br />
            <span className="text-[var(--rouge)]">se conecta</span> a Odoo.
          </h2>
        </div>

        <div className="relative bg-[var(--ash)]/40 flex items-center justify-center p-10 overflow-hidden">
          <div className="relative w-full max-w-md h-[340px]">
            {/* WA node */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 px-4 py-3 border border-[var(--ink)]/20 bg-[var(--bone)] font-mono text-[11px] tracking-[0.22em] uppercase"
            >
              WhatsApp API
            </motion.div>
            {/* Odoo node */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 px-4 py-3 bg-[var(--rouge)] text-[var(--bone)] font-mono text-[11px] tracking-[0.22em] uppercase"
            >
              Odoo CRM
            </motion.div>

            {/* connection */}
            <svg className="absolute inset-0 h-full w-full">
              <motion.line
                x1="22%"
                y1="50%"
                x2="78%"
                y2="50%"
                stroke="var(--rouge)"
                strokeWidth="1.2"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.4, delay: 0.6, ease: EASE }}
              />
              {[0, 0.6, 1.2].map((d, i) => (
                <motion.circle
                  key={i}
                  r="3"
                  fill="var(--rouge)"
                  initial={{ opacity: 0 }}
                  animate={
                    inView
                      ? {
                          cx: ["22%", "78%"],
                          cy: ["50%", "50%"],
                          opacity: [0, 1, 1, 0],
                        }
                      : {}
                  }
                  transition={{
                    duration: 1.8,
                    delay: 2 + d,
                    repeat: Infinity,
                    repeatDelay: 0.8,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </svg>

            {/* live lead cards appearing in Odoo */}
            <div className="absolute right-0 bottom-0 w-56 space-y-2">
              {[
                ["L-0421", "Cualificado"],
                ["L-0422", "Nuevo"],
                ["L-0423", "Seguimiento"],
              ].map(([id, st], i) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 2.4 + i * 0.5, ease: EASE }}
                  className="flex items-center justify-between border border-[var(--ink)]/15 bg-[var(--bone)] px-3 py-2 font-mono text-[10px] tracking-[0.18em]"
                >
                  <span className="text-[var(--rouge)]">{id}</span>
                  <span className="text-[var(--ink)]/60 uppercase">{st}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Scene>
  );
}

/* ───────────────────── scene 8: ATRIBUCIÓN (origin tags) ───────────────────── */

function SceneAtribucion() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const channels = [
    { name: "Meta", value: 38, color: "var(--rouge)" },
    { name: "Google", value: 27, color: "var(--ink)" },
    { name: "Instagram", value: 21, color: "var(--rouge)" },
    { name: "Referido", value: 14, color: "var(--ink)" },
  ];

  const leads = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        ch: i % 4,
        delay: rand(i) * 1.6,
      })),
    [],
  );

  return (
    <Scene id="scene-8" bg="bone">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="relative h-full w-full px-10 py-20 md:px-20 md:py-24"
      >
        <Eyebrow index="08" label="Etapa 02 · Atribución" />
        <h2 className="font-display font-bold tracking-tight mt-6 text-5xl md:text-6xl max-w-3xl">
          Cada venta <br />
          <span className="text-[var(--rouge)]">tiene un origen.</span>
        </h2>

        <div className="mt-14 grid grid-cols-4 gap-3">
          {channels.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="relative"
            >
              <div className="flex items-baseline justify-between font-mono text-[10px] tracking-[0.22em] uppercase">
                <span>{c.name}</span>
                <span className="text-[var(--ink)]/50">{c.value}%</span>
              </div>
              <div className="mt-2 h-1 w-full bg-[var(--ink)]/10 overflow-hidden">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: c.value / 40 } : {}}
                  transition={{ duration: 1.2, delay: 0.5 + i * 0.1, ease: EASE }}
                  style={{ transformOrigin: "left", background: c.color }}
                  className="h-full"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* leads being tagged with origin */}
        <div className="mt-12 grid grid-cols-4 gap-3 gap-y-3">
          {leads.map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + l.delay, ease: EASE }}
              className="flex items-center justify-between border border-[var(--ink)]/12 bg-[var(--bone)] px-3 py-2 font-mono text-[10px] tracking-[0.18em]"
            >
              <span className="text-[var(--ink)]/70">
                L-{String(420 + i).padStart(4, "0")}
              </span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 1.4 + l.delay }}
                className="uppercase"
                style={{ color: channels[l.ch].color }}
              >
                {channels[l.ch].name}
              </motion.span>
            </motion.div>
          ))}
        </div>

        <div className="absolute bottom-10 right-10 md:right-20 font-mono text-[10px] tracking-[0.3em] text-[var(--ink)]/40">
          ETIQUETADO AUTOMÁTICO
        </div>
      </div>
    </Scene>
  );
}

/* ───────────────────── scene 9: INTELIGENCIA · Dashboard ───────────────────── */

function SceneInteligencia() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.3 });

  const kpis = [
    { label: "Canal más rentable", value: "Meta", delta: "ROI 5.1×" },
    { label: "Costo por lead", value: "$16.20", delta: "− 12%" },
    { label: "Conversión", value: "11.8%", delta: "+ 4.1 pts" },
    { label: "Tiempo respuesta", value: "3m 12s", delta: "− 68%" },
    { label: "Tendencia mensual", value: "↑ 18%", delta: "vs Q ant." },
    { label: "Buyer persona top", value: "Hotelería", delta: "42% leads" },
  ];

  // mini sparkline path
  const spark = useMemo(
    () =>
      Array.from({ length: 16 })
        .map((_, i) => {
          const y = 20 - rand(i + 3) * 16;
          return `${i === 0 ? "M" : "L"} ${i * 6} ${y}`;
        })
        .join(" "),
    [],
  );

  return (
    <Scene id="scene-9" bg="graphite">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="relative h-full w-full px-10 py-20 md:px-20 md:py-24"
      >
        <Eyebrow index="09" label="Etapa 03 · Inteligencia" />
        <h2 className="font-display font-bold tracking-tight mt-6 text-5xl md:text-6xl max-w-3xl text-[var(--bone)]">
          Cuadro de mando comercial.
        </h2>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-px bg-[var(--bone)]/10">
          {kpis.map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.08, ease: EASE }}
              className="bg-[var(--graphite)] p-6 min-h-[170px] flex flex-col justify-between relative overflow-hidden"
            >
              <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--bone)]/50">
                {k.label}
              </div>
              <svg
                className="absolute right-4 top-4 opacity-40"
                width="100"
                height="22"
                viewBox="0 0 100 22"
              >
                <motion.path
                  d={spark}
                  fill="none"
                  stroke="var(--rouge)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.6, delay: 0.6 + i * 0.1 }}
                />
              </svg>
              <div>
                <div className="font-display font-bold tracking-tight text-3xl md:text-4xl text-[var(--bone)]">
                  {k.value}
                </div>
                <div className="mt-2 font-mono text-[11px] text-[var(--rouge)]">
                  {k.delta}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="absolute bottom-8 left-10 md:left-20 right-10 md:right-20 flex justify-between font-mono text-[10px] tracking-[0.3em] text-[var(--bone)]/40">
          <span>BRAFH · COMMAND CENTER</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--rouge)] animate-pulse" />
            LIVE · ODOO
          </span>
        </div>
      </div>
    </Scene>
  );
}

/* ───────────────────── scene 10: ESTADO FUTURO ───────────────────── */

function SceneFuture() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const steps = ["Ads", "Web", "Lead", "CRM", "Venta"];

  return (
    <Scene id="scene-10" bg="bone">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="relative h-full w-full flex flex-col justify-center px-10 md:px-20"
      >
        <Eyebrow index="10" label="Estado futuro" />
        <h2 className="font-display font-bold tracking-tight mt-6 text-5xl md:text-6xl max-w-3xl">
          Visión completa <br />
          <span className="text-[var(--rouge)]">del funnel.</span>
        </h2>

        <div className="mt-20 flex items-center justify-between gap-4">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-4 flex-1 last:flex-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.2, ease: EASE }}
                className="flex flex-col items-center gap-3"
              >
                <div className="relative h-16 w-16 rounded-full border border-[var(--ink)]/20 flex items-center justify-center bg-[var(--bone)]">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-[var(--rouge)]">
                    0{i + 1}
                  </span>
                </div>
                <span className="font-mono text-[11px] tracking-[0.25em] uppercase">{s}</span>
              </motion.div>
              {i < steps.length - 1 && (
                <div className="relative h-px flex-1 bg-[var(--ink)]/15 overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + i * 0.2, ease: EASE }}
                    style={{ transformOrigin: "left" }}
                    className="h-px bg-[var(--rouge)]"
                  />
                  <motion.span
                    className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-[var(--rouge)]"
                    initial={{ left: "0%" }}
                    animate={inView ? { left: ["0%", "100%"] } : {}}
                    transition={{
                      duration: 2,
                      delay: 1.6 + i * 0.2,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="absolute bottom-10 left-10 md:left-20 right-10 md:right-20 font-mono text-[10px] tracking-[0.3em] text-[var(--ink)]/40 flex justify-between">
          <span>FIG. 10 · FUNNEL TRAZABLE</span>
          <span>SIN PUNTOS CIEGOS</span>
        </div>
      </div>
    </Scene>
  );
}

/* ───────────────────── scene 11: INNOVACIÓN ───────────────────── */

function SceneInnovacion() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.3 });

  const panels = [
    {
      n: "11 / A",
      t: "Inteligencia Comercial Avanzada",
      bullets: [
        "Lead scoring automático",
        "Predicción de conversión",
        "Alertas de seguimiento",
        "Priorización de oportunidades",
      ],
      img: precisionImg,
    },
    {
      n: "11 / B",
      t: "Leonardo AI",
      bullets: [
        "Renders fotorrealistas",
        "Equipamiento en segundos",
        "Propuestas con imagen propia",
        "Pipeline visual integrado",
      ],
      img: steelImg,
    },
  ];

  return (
    <Scene id="scene-11" bg="ink">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="grid h-full grid-cols-1 md:grid-cols-2"
      >
        {panels.map((p, i) => (
          <motion.div
            key={p.t}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 + i * 0.2, ease: EASE }}
            className="relative overflow-hidden flex flex-col justify-end p-10 md:p-16 border-r border-[var(--bone)]/10 last:border-r-0"
          >
            <img
              src={p.img}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/65 to-black/40" />
            <div className="relative">
              <div className="font-mono text-[11px] tracking-[0.3em] text-[var(--rouge)]">
                {p.n}
              </div>
              <h3 className="font-display font-bold tracking-tight mt-4 text-4xl md:text-5xl text-[var(--bone)]">
                {p.t}
              </h3>
              <ul className="mt-6 grid grid-cols-1 gap-2">
                {p.bullets.map((b, j) => (
                  <motion.li
                    key={b}
                    initial={{ opacity: 0, x: -8 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + i * 0.2 + j * 0.1 }}
                    className="flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--bone)]/75"
                  >
                    <span className="h-px w-6 bg-[var(--rouge)]" />
                    {b}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </Scene>
  );
}

/* ───────────────────── scene 12: CIERRE ───────────────────── */

function SceneClose() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4 });

  return (
    <Scene id="scene-12" bg="bone">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="relative h-full w-full flex flex-col justify-center px-10 md:px-20"
      >
        <Eyebrow index="12" label="Cierre" />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
          className="font-display font-bold tracking-tight mt-10 text-[8vw] md:text-[5.5vw] max-w-6xl leading-[0.95]"
        >
          BRAFH ya lidera <br />
          en producto.
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, ease: EASE, delay: 0.7 }}
          className="font-display font-bold tracking-tight mt-6 text-[8vw] md:text-[5.5vw] max-w-6xl text-[var(--rouge)] leading-[0.95]"
        >
          Ahora puede liderar <br />
          en inteligencia comercial.
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-14 max-w-xl text-[var(--ink)]/70 text-lg leading-relaxed"
        >
          El mejor marketing no es el que llega a más personas. Es el que sabe
          exactamente a quién llegar, cómo y cuánto cuesta.
        </motion.p>

        <div className="absolute bottom-10 left-10 md:left-20 right-10 md:right-20 flex items-end justify-between font-mono text-[10px] tracking-[0.3em] text-[var(--ink)]/40">
          <span>BRAFH · 2026</span>
          <span>FIN DE LA PROPUESTA</span>
        </div>
      </div>
    </Scene>
  );
}

/* ───────────────────── root experience ───────────────────── */

const SCENES = [
  SceneHero,
  SceneSystem,
  SceneLeaks,
  SceneKeyMoment,
  SceneTransformation,
  SceneRoadmap,
  SceneVisibilidad,
  SceneAtribucion,
  SceneInteligencia,
  SceneFuture,
  SceneInnovacion,
  SceneClose,
];

function BrafhExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const sections = Array.from(
      root.querySelectorAll<HTMLElement>("section[id^='scene-']"),
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.5) {
            const idx = sections.indexOf(e.target as HTMLElement);
            if (idx >= 0) setCurrent(idx);
          }
        });
      },
      { threshold: [0.5, 0.75], root },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Chrome current={current} total={SCENES.length} />
      <main
        ref={containerRef}
        className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        <style>{`main::-webkit-scrollbar{display:none}`}</style>
        {SCENES.map((S, i) => (
          <S key={i} />
        ))}
      </main>
    </>
  );
}
