import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";

import heroImg from "@/assets/scene-hero.jpg";
import precisionImg from "@/assets/scene-precision.jpg";
import workshopImg from "@/assets/scene-workshop.jpg";
import steelImg from "@/assets/scene-steel.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BRAFH · Inteligencia Comercial" },
      { name: "description", content: "Una propuesta estratégica para transformar datos dispersos en inteligencia comercial." },
    ],
  }),
  component: BrafhExperience,
});

/* ───────────────────── helpers ───────────────────── */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: EASE, delay: d },
  }),
};

function Eyebrow({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-4 text-mono text-[11px] tracking-[0.28em] uppercase text-[var(--rouge)]">
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
    ink: "bg-[#1a1a1a] text-[var(--bone)]",
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
            <span className="text-mono text-[11px] tracking-[0.3em]">BRAFH / 2026</span>
          </div>
          <span className="text-mono text-[11px] tracking-[0.3em] opacity-70">
            PROPUESTA ESTRATÉGICA
          </span>
          <span className="text-mono text-[11px] tracking-[0.3em] tabular-nums">
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
            alt="Cocina industrial BRAFH"
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />
        </motion.div>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end px-10 pb-20 md:px-20 md:pb-28">
        <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0.2}>
          <Eyebrow index="01" label="Apertura" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.4 }}
          className="text-display mt-8 text-[12vw] md:text-[8.5vw] leading-[0.9]"
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
          Una oportunidad para transformar información en inteligencia comercial.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-mono text-[10px] tracking-[0.4em] text-[var(--bone)]/40"
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

/* ───────────────────── scene 2: SISTEMA ACTUAL ───────────────────── */

const PLATFORMS = [
  { name: "Meta Ads", x: 12, y: 22 },
  { name: "Google Ads", x: 78, y: 18 },
  { name: "Instagram", x: 30, y: 70 },
  { name: "Shopify", x: 65, y: 60 },
  { name: "WhatsApp", x: 18, y: 50 },
  { name: "Analytics", x: 85, y: 75 },
  { name: "Odoo", x: 48, y: 38 },
];

function SceneSystem() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4 });

  return (
    <Scene id="scene-2" bg="bone">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="relative h-full w-full px-10 py-20 md:px-20 md:py-24">
        <Eyebrow index="02" label="Sistema actual" />
        <h2 className="text-display mt-6 text-5xl md:text-6xl max-w-2xl">
          Información en todas partes.
        </h2>

        <div className="absolute inset-0 pointer-events-none">
          {PLATFORMS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.12, ease: EASE }}
              className="absolute"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="px-4 py-2 border border-[var(--ink)]/15 bg-[var(--bone)] text-mono text-[11px] tracking-[0.2em] uppercase shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)]">
                  {p.name}
                </div>
                {/* dispersing particles */}
                {Array.from({ length: 6 }).map((_, j) => (
                  <motion.div
                    key={j}
                    className="absolute top-1/2 left-1/2 h-1 w-1 rounded-full bg-[var(--rouge)]"
                    animate={
                      inView
                        ? {
                            x: [0, (Math.random() - 0.5) * 120],
                            y: [0, (Math.random() - 0.5) * 120],
                            opacity: [0.8, 0],
                          }
                        : {}
                    }
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: j * 0.4 + i * 0.2,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        <p className="absolute bottom-20 left-10 md:left-20 max-w-md text-[var(--ink)]/60 text-base">
          Siete plataformas. Ninguna se habla. Cada dato se evapora antes de
          convertirse en decisión.
        </p>
      </div>
    </Scene>
  );
}

/* ───────────────────── scene 3: PUNTOS DE FUGA ───────────────────── */

function SceneLeaks() {
  const leaks = [
    { label: "Lead perdido", x: 18, y: 30 },
    { label: "Origen desconocido", x: 62, y: 25 },
    { label: "ROI desconocido", x: 30, y: 60 },
    { label: "Seguimiento inconsistente", x: 70, y: 70 },
  ];
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4 });

  return (
    <Scene id="scene-3" bg="bone">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="relative h-full w-full px-10 py-20 md:px-20 md:py-24">
        <Eyebrow index="03" label="Puntos de fuga" />
        <h2 className="text-display mt-6 text-5xl md:text-6xl max-w-3xl">
          Lo que <span className="text-[var(--rouge)]">no se mide</span>, se
          escapa.
        </h2>

        <div className="absolute inset-0 pointer-events-none">
          {leaks.map((leak, i) => (
            <motion.div
              key={leak.label}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: [0, 1, 1, 0.15] } : {}}
              transition={{
                duration: 4,
                delay: 0.4 + i * 0.5,
                repeat: Infinity,
                repeatDelay: 2,
                times: [0, 0.2, 0.7, 1],
                ease: EASE,
              }}
              className="absolute"
              style={{ left: `${leak.x}%`, top: `${leak.y}%` }}
            >
              <div className="relative">
                <div className="absolute -inset-3 rounded-full border border-[var(--rouge)]/30" />
                <div className="px-3 py-1.5 bg-[var(--rouge)] text-[var(--bone)] text-mono text-[10px] tracking-[0.22em] uppercase">
                  {leak.label}
                </div>
                <motion.div
                  className="absolute left-1/2 top-full mt-2 h-px w-px bg-[var(--rouge)]"
                  animate={inView ? { height: [0, 80, 80], opacity: [1, 1, 0] } : {}}
                  transition={{
                    duration: 4,
                    delay: 0.4 + i * 0.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="absolute bottom-20 left-10 md:left-20 right-10 md:right-20 flex flex-wrap items-end justify-between gap-6">
          <p className="max-w-md text-[var(--ink)]/60 text-base">
            Cada gota es una venta posible, un cliente que vuelve, una decisión
            informada — perdida en el silencio entre sistemas.
          </p>
          <div className="text-mono text-xs text-[var(--ink)]/40">FIG. 03 · LEAKAGE MAP</div>
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
      <div ref={ref as React.RefObject<HTMLDivElement>} className="relative h-full w-full flex flex-col justify-center px-10 md:px-20">
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
          className="text-display mt-10 text-[8vw] md:text-[6vw] max-w-6xl"
        >
          El problema no es la <br />
          <span className="text-[var(--bone)]/30">falta de datos.</span>
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, ease: EASE, delay: 0.8 }}
          className="text-display mt-6 text-[8vw] md:text-[6vw] max-w-6xl"
        >
          El problema es que <br />
          <span className="text-[var(--rouge)]">no están conectados.</span>
        </motion.h3>
      </div>
    </Scene>
  );
}

/* ───────────────────── scene 5: TRANSFORMACIÓN ───────────────────── */

function SceneTransformation() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4 });

  const nodes = [
    { name: "Meta Ads", x: 10 },
    { name: "Shopify", x: 32 },
    { name: "WhatsApp", x: 54 },
    { name: "Odoo CRM", x: 76, primary: true },
    { name: "Dashboard", x: 92 },
  ];

  return (
    <Scene id="scene-5" bg="graphite">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="relative h-full w-full px-10 py-20 md:px-20 md:py-24">
        <Eyebrow index="05" label="Arquitectura" />
        <h2 className="text-display mt-6 text-5xl md:text-6xl max-w-3xl text-[var(--bone)]">
          Una sola corriente de información.
        </h2>

        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-10 md:px-20">
          <svg viewBox="0 0 1000 200" className="w-full h-40">
            <motion.path
              d="M 80 100 C 200 100, 280 100, 400 100 S 600 100, 760 100 S 900 100, 940 100"
              fill="none"
              stroke="var(--rouge)"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 2.2, ease: EASE, delay: 0.4 }}
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-between">
            {nodes.map((n, i) => (
              <motion.div
                key={n.name}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.3, ease: EASE }}
                className="flex flex-col items-center gap-3"
                style={{ width: "20%" }}
              >
                <div
                  className={`relative h-14 w-14 rounded-full flex items-center justify-center ${
                    n.primary
                      ? "bg-[var(--rouge)]"
                      : "bg-[var(--bone)]/5 border border-[var(--bone)]/20"
                  }`}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full border border-[var(--rouge)]/40"
                    animate={inView ? { scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] } : {}}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  />
                  <div className={`h-2 w-2 rounded-full ${n.primary ? "bg-[var(--bone)]" : "bg-[var(--rouge)]"}`} />
                </div>
                <span className="text-mono text-[10px] tracking-[0.22em] uppercase text-[var(--bone)]/70">
                  {n.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="absolute bottom-20 left-10 md:left-20 max-w-md text-[var(--bone)]/50 text-base">
          Cada plataforma deja de ser una isla. Empieza a alimentar un solo
          cerebro operativo.
        </p>
      </div>
    </Scene>
  );
}

/* ───────────────────── scene 6: ROADMAP ───────────────────── */

function SceneRoadmap() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.3 });

  const stages = [
    {
      n: "01",
      t: "Visibilidad",
      m: "Mes 01 — 03",
      d: "Conectar fuentes. Capturar cada lead. Asignar responsables.",
    },
    {
      n: "02",
      t: "Atribución",
      m: "Mes 04 — 06",
      d: "Saber de dónde viene cada venta. Calcular costo real por canal.",
    },
    {
      n: "03",
      t: "Inteligencia Comercial",
      m: "Mes 07 — 09",
      d: "Decisiones predictivas. Pronósticos. Optimización continua.",
    },
  ];

  return (
    <Scene id="scene-6" bg="bone">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="relative h-full w-full px-10 py-20 md:px-20 md:py-24 flex flex-col">
        <Eyebrow index="06" label="Roadmap general" />
        <h2 className="text-display mt-6 text-5xl md:text-6xl max-w-3xl">
          Tres etapas. Una sola dirección.
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
                <div className="text-mono text-[11px] tracking-[0.3em] text-[var(--rouge)]">
                  ETAPA {s.n}
                </div>
                <h3 className="text-display mt-3 text-4xl md:text-5xl">{s.t}</h3>
                <div className="relative my-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 1 + i * 0.3, ease: EASE }}
                    className="h-3 w-3 rounded-full bg-[var(--rouge)]"
                  />
                </div>
                <div className="text-mono text-xs text-[var(--ink)]/50 tracking-[0.2em]">
                  {s.m}
                </div>
                <p className="mt-4 text-[var(--ink)]/70 text-base leading-relaxed max-w-xs">
                  {s.d}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Scene>
  );
}

/* ───────────────────── scene 7: ETAPA 1 VISIBILIDAD ───────────────────── */

function SceneVisibilidad() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4 });

  return (
    <Scene id="scene-7" bg="bone">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="grid h-full grid-cols-1 md:grid-cols-2">
        <div className="relative flex flex-col justify-center px-10 py-20 md:px-20">
          <Eyebrow index="07" label="Etapa 01 / Visibilidad" />
          <h2 className="text-display mt-6 text-5xl md:text-6xl">
            Ningún lead vuelve a perderse.
          </h2>
          <p className="mt-8 max-w-md text-[var(--ink)]/70 text-base leading-relaxed">
            WhatsApp Business API conectado a Odoo CRM. Cada conversación entra
            con origen, estado y responsable — automáticamente.
          </p>

          <div className="mt-10 flex items-center gap-4 text-mono text-[10px] tracking-[0.25em] uppercase">
            <span className="text-[var(--ink)]/40">Origen</span>
            <span className="text-[var(--ink)]/20">·</span>
            <span className="text-[var(--ink)]/40">Estado</span>
            <span className="text-[var(--ink)]/20">·</span>
            <span className="text-[var(--ink)]/40">Responsable</span>
          </div>
        </div>

        <div className="relative bg-[var(--ash)]/40 flex items-center justify-center p-10">
          {/* Before / After */}
          <div className="relative w-full max-w-md">
            <motion.div
              initial={{ opacity: 1 }}
              animate={inView ? { opacity: [1, 1, 0] } : {}}
              transition={{ duration: 3, delay: 0.5, repeat: Infinity, repeatDelay: 2 }}
              className="absolute inset-0 border border-[var(--ink)]/15 bg-[var(--bone)] p-6"
            >
              <div className="text-mono text-[10px] tracking-[0.25em] text-[var(--ink)]/40">
                ANTES
              </div>
              {["Mensaje sin registro", "Sin responsable", "Sin origen"].map((t) => (
                <div key={t} className="mt-4 flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--rouge)]" />
                  <span className="text-[var(--ink)]/50 line-through">{t}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: [0, 0, 1, 1] } : {}}
              transition={{ duration: 3, delay: 0.5, repeat: Infinity, repeatDelay: 2 }}
              className="relative border border-[var(--ink)]/15 bg-[var(--bone)] p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)]"
            >
              <div className="flex items-center justify-between text-mono text-[10px] tracking-[0.25em]">
                <span className="text-[var(--rouge)]">DESPUÉS</span>
                <span className="text-[var(--ink)]/40">ODOO · CRM</span>
              </div>
              <div className="mt-6 space-y-4">
                {[
                  ["Origen", "WhatsApp / Meta Ads"],
                  ["Estado", "Cualificado"],
                  ["Responsable", "Equipo Comercial"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between border-b border-[var(--ink)]/10 pb-3">
                    <span className="text-mono text-[10px] tracking-[0.22em] uppercase text-[var(--ink)]/50">
                      {k}
                    </span>
                    <span className="text-sm">{v}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Scene>
  );
}

/* ───────────────────── scene 8: ETAPA 2 ATRIBUCIÓN ───────────────────── */

function SceneAtribucion() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const channels = ["Meta Ads", "Google Ads", "Instagram", "Referidos"];

  return (
    <Scene id="scene-8" bg="bone">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="relative h-full w-full px-10 py-20 md:px-20 md:py-24">
        <Eyebrow index="08" label="Etapa 02 / Atribución" />
        <h2 className="text-display mt-6 text-5xl md:text-6xl max-w-3xl">
          ¿Cómo nos conociste?
        </h2>
        <p className="mt-6 max-w-xl text-[var(--ink)]/70">
          Una pregunta. Cuatro canales. Trazabilidad completa.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-10 items-center">
          <div className="space-y-3">
            {channels.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.15, ease: EASE }}
                className="flex items-center justify-between border-b border-[var(--ink)]/15 pb-3"
              >
                <span className="text-lg">{c}</span>
                <span className="text-mono text-[10px] tracking-[0.25em] text-[var(--ink)]/40">
                  CH/0{i + 1}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="hidden md:flex flex-col items-center">
            <svg width="120" height="120" viewBox="0 0 120 120">
              <motion.path
                d="M 10 60 C 50 60, 70 60, 110 60"
                stroke="var(--rouge)"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.2, delay: 1, ease: EASE }}
              />
              <motion.circle
                cx="110"
                cy="60"
                r="4"
                fill="var(--rouge)"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: 2.2 }}
              />
            </svg>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 1.4, ease: EASE }}
            className="border border-[var(--ink)]/15 bg-[var(--bone)] p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.2)]"
          >
            <div className="text-mono text-[10px] tracking-[0.25em] text-[var(--rouge)]">
              ATRIBUCIÓN COMPLETA
            </div>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between"><span>Canal</span><span className="text-[var(--ink)]/60">Meta Ads</span></div>
              <div className="flex justify-between"><span>Costo por lead</span><span className="text-[var(--ink)]/60">$ 18.40</span></div>
              <div className="flex justify-between"><span>Tasa de cierre</span><span className="text-[var(--ink)]/60">14.2%</span></div>
              <div className="flex justify-between font-medium border-t border-[var(--ink)]/15 pt-3 mt-3">
                <span>ROI</span><span className="text-[var(--rouge)]">4.7×</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Scene>
  );
}

/* ───────────────────── scene 9: INTELIGENCIA COMERCIAL ───────────────────── */

function SceneInteligencia() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.3 });

  const kpis = [
    { label: "Leads / canal", value: "1,284", delta: "+ 23%" },
    { label: "Costo por lead", value: "$ 16.20", delta: "− 12%" },
    { label: "Conversión", value: "11.8%", delta: "+ 4.1 pts" },
    { label: "Tiempo respuesta", value: "3m 12s", delta: "− 68%" },
    { label: "Tendencia mensual", value: "↑ 18%", delta: "vs Q anterior" },
    { label: "ROI consolidado", value: "5.1×", delta: "Odoo · live" },
  ];

  return (
    <Scene id="scene-9" bg="graphite">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="relative h-full w-full px-10 py-20 md:px-20 md:py-24">
        <Eyebrow index="09" label="Etapa 03 / Inteligencia comercial" />
        <h2 className="text-display mt-6 text-5xl md:text-6xl max-w-3xl text-[var(--bone)]">
          El cuadro de mando que faltaba.
        </h2>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-px bg-[var(--bone)]/10">
          {kpis.map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: EASE }}
              className="bg-[var(--graphite)] p-8 min-h-[170px] flex flex-col justify-between"
            >
              <div className="text-mono text-[10px] tracking-[0.25em] uppercase text-[var(--bone)]/50">
                {k.label}
              </div>
              <div>
                <div className="text-display text-4xl md:text-5xl text-[var(--bone)]">
                  {k.value}
                </div>
                <div className="mt-2 text-mono text-[11px] text-[var(--rouge)]">
                  {k.delta}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="absolute bottom-10 right-10 md:right-20 text-mono text-[10px] tracking-[0.3em] text-[var(--bone)]/40">
          ODOO · LIVE FEED
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
      <div ref={ref as React.RefObject<HTMLDivElement>} className="relative h-full w-full flex flex-col justify-center px-10 md:px-20">
        <Eyebrow index="10" label="Estado futuro" />
        <h2 className="text-display mt-6 text-5xl md:text-6xl max-w-3xl">
          Por primera vez, una <br />
          <span className="text-[var(--rouge)]">visión completa del funnel.</span>
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
                  <span className="text-mono text-[11px] tracking-[0.2em] text-[var(--rouge)]">
                    0{i + 1}
                  </span>
                </div>
                <span className="text-mono text-[11px] tracking-[0.25em] uppercase">
                  {s}
                </span>
              </motion.div>
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + i * 0.2, ease: EASE }}
                  style={{ transformOrigin: "left" }}
                  className="h-px flex-1 bg-[var(--rouge)]"
                />
              )}
            </div>
          ))}
        </div>

        <p className="mt-20 max-w-xl text-[var(--ink)]/60">
          Sin pérdidas. Sin puntos ciegos. Cada peso invertido tiene un nombre,
          un origen y un resultado.
        </p>
      </div>
    </Scene>
  );
}

/* ───────────────────── scene 11: INNOVACIÓN ───────────────────── */

function SceneInnovacion() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.3 });

  return (
    <Scene id="scene-11" bg="ink">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="grid h-full grid-cols-1 md:grid-cols-2">
        {[
          {
            n: "11 / A",
            t: "Sound Branding",
            d: "Una firma sonora propia. Reels, llamadas, showroom. BRAFH no se ve — se reconoce.",
            img: precisionImg,
          },
          {
            n: "11 / B",
            t: "Leonardo AI",
            d: "Renders fotorrealistas de equipamiento en segundos. Propuestas comerciales con imagen propia.",
            img: steelImg,
          },
        ].map((p, i) => (
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
              className="absolute inset-0 h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
            <div className="relative">
              <div className="text-mono text-[11px] tracking-[0.3em] text-[var(--rouge)]">
                {p.n}
              </div>
              <h3 className="text-display mt-4 text-5xl text-[var(--bone)]">{p.t}</h3>
              <p className="mt-6 max-w-md text-[var(--bone)]/70">{p.d}</p>
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
      <div ref={ref as React.RefObject<HTMLDivElement>} className="relative h-full w-full flex flex-col justify-center px-10 md:px-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <Eyebrow index="12" label="Cierre" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
          className="text-display mt-10 text-[8vw] md:text-[5.5vw] max-w-6xl leading-[0.95]"
        >
          BRAFH ya lidera <br />
          en producto.
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, ease: EASE, delay: 0.7 }}
          className="text-display mt-6 text-[8vw] md:text-[5.5vw] max-w-6xl text-[var(--rouge)] leading-[0.95]"
        >
          Ahora puede liderar <br />
          en inteligencia comercial.
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-16 max-w-xl text-[var(--ink)]/70 text-lg leading-relaxed"
        >
          El mejor marketing no es el que llega a más personas. Es el que sabe
          exactamente a quién llegar, cómo hacerlo y cuánto cuesta hacerlo.
        </motion.p>

        <div className="absolute bottom-10 left-10 md:left-20 right-10 md:right-20 flex items-end justify-between text-mono text-[10px] tracking-[0.3em] text-[var(--ink)]/40">
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
    const sections = Array.from(root.querySelectorAll<HTMLElement>("section[id^='scene-']"));
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
