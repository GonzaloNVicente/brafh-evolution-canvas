import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useEffect, useState, type ReactNode } from "react";
import heroImg from "@/assets/hero-industrial.jpg";
import architectureImg from "@/assets/architecture.jpg";
import forgeImg from "@/assets/forge.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BRAFH — De los datos a la ventaja competitiva" },
      {
        name: "description",
        content:
          "Una experiencia narrativa interactiva. Cómo BRAFH puede transformar datos dispersos en inteligencia comercial.",
      },
      { property: "og:title", content: "BRAFH — De los datos a la ventaja competitiva" },
      {
        property: "og:description",
        content: "Roadmap en tres etapas: Visibilidad, Atribución, Inteligencia Comercial.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

/* ------------------------------------------------------------------ */
/* Scene shell                                                         */
/* ------------------------------------------------------------------ */

const TOTAL_SCENES = 12;

function Scene({
  index,
  bg = "bg-bone",
  text = "text-ink",
  children,
}: {
  index: number;
  bg?: string;
  text?: string;
  children: (inView: boolean) => ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.55, once: false });

  return (
    <section
      ref={ref}
      data-scene={index}
      className={`relative h-screen w-full snap-start snap-always overflow-hidden ${bg} ${text}`}
    >
      <div className="absolute inset-0 flex flex-col">
        <div className="flex-1 flex items-center justify-center px-6 md:px-16">
          {children(inView)}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const i = Math.round(el.scrollTop / window.innerHeight);
      setActive(i);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (i: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ top: i * window.innerHeight, behavior: "smooth" });
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-bone text-ink">
      {/* Top chrome */}
      <div className="pointer-events-none fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 mix-blend-difference">
        <div className="text-mono text-[11px] tracking-[0.28em] uppercase text-bone">
          BRAFH · Propuesta Estratégica
        </div>
        <div className="text-mono text-[11px] tracking-[0.28em] uppercase text-bone">
          {String(active + 1).padStart(2, "0")} / {String(TOTAL_SCENES).padStart(2, "0")}
        </div>
      </div>

      {/* Side scene indicator */}
      <div className="pointer-events-auto fixed right-5 top-1/2 z-50 -translate-y-1/2 hidden md:flex flex-col gap-2">
        {Array.from({ length: TOTAL_SCENES }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Escena ${i + 1}`}
            className="group relative h-6 w-6 flex items-center justify-center"
          >
            <span
              className={`block transition-all duration-500 ${
                active === i
                  ? "h-[2px] w-5 bg-rouge"
                  : "h-[2px] w-2 bg-ink/30 group-hover:bg-ink/60"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Bottom hint */}
      <AnimatePresence>
        {active === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="pointer-events-none fixed bottom-8 left-1/2 z-50 -translate-x-1/2 text-mono text-[11px] tracking-[0.28em] uppercase text-bone mix-blend-difference"
          >
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              ↓ desplazar para avanzar
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scenes container */}
      <div
        ref={containerRef}
        className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
        style={{ scrollSnapType: "y mandatory" }}
      >
        <Scene1 />
        <Scene2 />
        <Scene3 />
        <Scene4 />
        <Scene5 />
        <Scene6 />
        <Scene7 />
        <Scene8 />
        <Scene9 />
        <Scene10 />
        <Scene11 />
        <Scene12 />
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Reusable motion primitives                                          */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="text-mono text-[11px] tracking-[0.28em] uppercase text-rouge mb-6">
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SCENE 1 — Hero                                                      */
/* ------------------------------------------------------------------ */

function Scene1() {
  return (
    <Scene index={0} bg="bg-ink" text="text-bone">
      {(inView) => (
        <>
          <motion.img
            src={heroImg}
            alt="Cocina industrial BRAFH"
            initial={{ scale: 1.08, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 0.55 } : {}}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink/80" />
          <div className="relative z-10 max-w-6xl mx-auto w-full">
            <motion.div
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              variants={fadeUp}
            >
              <Eyebrow>BRAFH · 2026</Eyebrow>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-display text-[clamp(2.8rem,8vw,8rem)] text-bone"
            >
              Los datos están ahí.
              <br />
              <span className="text-rouge italic">Falta implementarlos.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-10 max-w-xl text-lg md:text-xl text-bone/70 font-light"
            >
              Una oportunidad para transformar información dispersa en
              inteligencia comercial.
            </motion.p>
          </div>
        </>
      )}
    </Scene>
  );
}

/* ------------------------------------------------------------------ */
/* SCENE 2 — Platforms floating                                        */
/* ------------------------------------------------------------------ */

const PLATFORMS = [
  { name: "Meta Ads", x: "12%", y: "22%", d: 0 },
  { name: "Google Ads", x: "72%", y: "16%", d: 0.1 },
  { name: "Shopify", x: "82%", y: "62%", d: 0.2 },
  { name: "WhatsApp", x: "18%", y: "72%", d: 0.3 },
  { name: "Analytics", x: "46%", y: "12%", d: 0.4 },
  { name: "Odoo CRM", x: "52%", y: "78%", d: 0.5 },
];

function Scene2() {
  return (
    <Scene index={1}>
      {(inView) => (
        <>
          <div className="absolute inset-0">
            {PLATFORMS.map((p) => (
              <motion.div
                key={p.name}
                className="absolute"
                style={{ left: p.x, top: p.y }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={
                  inView
                    ? {
                        opacity: 1,
                        scale: 1,
                        y: [0, -8, 0],
                      }
                    : { opacity: 0 }
                }
                transition={{
                  opacity: { duration: 0.8, delay: p.d },
                  scale: { duration: 0.8, delay: p.d },
                  y: { duration: 4 + p.d * 2, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <div className="border border-ink/20 bg-bone px-5 py-3 text-mono text-xs tracking-[0.18em] uppercase text-ink shadow-[0_20px_40px_-20px_rgba(0,0,0,0.2)]">
                  {p.name}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="relative z-10 text-center max-w-4xl">
            <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={fadeUp}>
              <Eyebrow>Escena 02 · Diagnóstico</Eyebrow>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-display text-[clamp(2.2rem,6vw,5.5rem)]"
            >
              Información
              <br />
              <span className="italic text-rouge">en todas partes.</span>
            </motion.h2>
          </div>
        </>
      )}
    </Scene>
  );
}

/* ------------------------------------------------------------------ */
/* SCENE 3 — Data fragmenting                                          */
/* ------------------------------------------------------------------ */

const FRAGMENTS = [
  "Consulta web",
  "WhatsApp",
  "Lead",
  "Visita",
  "Campaña",
  "Click",
  "Mensaje",
  "Sesión",
  "Pedido",
  "Quote",
  "Form",
  "Llamada",
];

function Scene3() {
  return (
    <Scene index={2}>
      {(inView) => (
        <>
          <div className="absolute inset-0 overflow-hidden">
            {FRAGMENTS.map((f, i) => {
              const startX = 50;
              const startY = 50;
              const angle = (i / FRAGMENTS.length) * Math.PI * 2;
              const tx = Math.cos(angle) * 45;
              const ty = Math.sin(angle) * 38;
              return (
                <motion.div
                  key={f}
                  className="absolute text-mono text-[10px] tracking-[0.22em] uppercase"
                  style={{ left: `${startX}%`, top: `${startY}%` }}
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={
                    inView
                      ? {
                          opacity: [0, 1, 1, 0.25],
                          x: [`0%`, `${tx}vw`],
                          y: [`0%`, `${ty}vh`],
                        }
                      : { opacity: 0 }
                  }
                  transition={{
                    duration: 3.5,
                    delay: 0.1 * i,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                    ease: "easeOut",
                  }}
                >
                  <span className="border border-ink/20 bg-bone px-3 py-1.5 text-ink/70">
                    {f}
                  </span>
                </motion.div>
              );
            })}
          </div>
          <div className="relative z-10 text-center max-w-3xl">
            <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={fadeUp}>
              <Eyebrow>Escena 03 · Fragmentación</Eyebrow>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-display text-[clamp(2rem,5.5vw,5rem)]"
            >
              Los datos existen.
              <br />
              <span className="italic text-rouge">La visibilidad no.</span>
            </motion.h2>
          </div>
        </>
      )}
    </Scene>
  );
}

/* ------------------------------------------------------------------ */
/* SCENE 4 — Consequences (dark)                                       */
/* ------------------------------------------------------------------ */

const CONSEQUENCES = [
  "No sabemos qué campaña genera más oportunidades.",
  "No conocemos el costo real de cada lead.",
  "No podemos identificar el canal más rentable.",
  "Las oportunidades se gestionan fuera del CRM.",
  "Las decisiones dependen de intuición, no de evidencia.",
];

function Scene4() {
  return (
    <Scene index={3} bg="bg-graphite" text="text-bone">
      {(inView) => (
        <div className="relative z-10 max-w-5xl w-full">
          <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={fadeUp}>
            <Eyebrow>Escena 04 · Consecuencias</Eyebrow>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-display text-[clamp(1.6rem,3.2vw,2.6rem)] text-bone/70 mb-12 max-w-2xl"
          >
            Lo que cuesta operar sin un sistema conectado.
          </motion.h2>
          <ul className="space-y-5">
            {CONSEQUENCES.map((c, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.18 }}
                className="flex items-start gap-5 border-b border-bone/10 pb-5"
              >
                <span className="text-mono text-xs text-rouge pt-2">
                  0{i + 1}
                </span>
                <span className="text-[clamp(1.1rem,2vw,1.6rem)] font-light text-bone leading-snug">
                  {c}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </Scene>
  );
}

/* ------------------------------------------------------------------ */
/* SCENE 5 — The statement                                             */
/* ------------------------------------------------------------------ */

function Scene5() {
  return (
    <Scene index={4}>
      {(inView) => (
        <div className="relative z-10 max-w-6xl w-full">
          <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={fadeUp}>
            <Eyebrow>Escena 05 · Diagnóstico</Eyebrow>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1.2 }}
            className="text-display text-[clamp(2.4rem,7vw,7rem)] leading-[0.95]"
          >
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="block"
            >
              El problema no es la
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="block"
            >
              falta de datos.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 1.0 }}
              className="block italic text-rouge mt-4"
            >
              El problema es que no están conectados.
            </motion.span>
          </motion.h2>
        </div>
      )}
    </Scene>
  );
}

/* ------------------------------------------------------------------ */
/* SCENE 6 — Connection diagram                                        */
/* ------------------------------------------------------------------ */

function Scene6() {
  const sources = ["Meta Ads", "Google Ads", "Shopify", "WhatsApp", "Analytics"];
  return (
    <Scene index={5} bg="bg-ink" text="text-bone">
      {(inView) => (
        <div className="relative z-10 w-full max-w-6xl">
          <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={fadeUp}>
            <Eyebrow>Escena 06 · Conexión</Eyebrow>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="text-display text-[clamp(1.8rem,4vw,3.4rem)] mb-12 text-bone max-w-2xl"
          >
            Todo conectado a una única fuente de verdad.
          </motion.h2>

          <div className="grid grid-cols-12 gap-6 items-center">
            <div className="col-span-4 space-y-3">
              {sources.map((s, i) => (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className="border border-bone/20 px-4 py-3 text-mono text-xs tracking-[0.18em] uppercase text-bone/80"
                >
                  {s}
                </motion.div>
              ))}
            </div>

            <div className="col-span-4 relative h-64">
              <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
                {[20, 60, 100, 140, 180].map((y, i) => (
                  <motion.path
                    key={i}
                    d={`M0 ${y} Q 100 ${y}, 200 100`}
                    fill="none"
                    stroke="#8B1620"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: 0.8 } : {}}
                    transition={{ duration: 1.5, delay: 0.7 + i * 0.15 }}
                  />
                ))}
                <motion.path
                  d="M200 100 L 400 100"
                  fill="none"
                  stroke="#F6F4EF"
                  strokeWidth="1.2"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1.8 }}
                />
              </svg>
            </div>

            <div className="col-span-4 space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: 1.5 }}
                className="border border-rouge bg-rouge/10 px-5 py-4"
              >
                <div className="text-mono text-[10px] tracking-[0.22em] uppercase text-rouge mb-1">
                  Hub
                </div>
                <div className="text-bone text-lg">Odoo CRM</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: 2.1 }}
                className="border border-bone/40 px-5 py-4"
              >
                <div className="text-mono text-[10px] tracking-[0.22em] uppercase text-bone/60 mb-1">
                  Output
                </div>
                <div className="text-bone text-lg">Dashboard Ejecutivo</div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </Scene>
  );
}

/* ------------------------------------------------------------------ */
/* SCENES 7–9 — Roadmap                                                */
/* ------------------------------------------------------------------ */

function StageScene({
  index,
  num,
  months,
  title,
  bullets,
  goal,
}: {
  index: number;
  num: string;
  months: string;
  title: string;
  bullets: string[];
  goal: string;
}) {
  return (
    <Scene index={index}>
      {(inView) => (
        <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="text-mono text-[11px] tracking-[0.28em] uppercase text-rouge mb-4">
                Roadmap · Etapa {num}
              </div>
              <div className="text-mono text-xs text-ink/50 mb-6">{months}</div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="h-px bg-rouge origin-left mb-6"
              />
              <div className="text-[8rem] leading-none text-display text-ink/10 select-none">
                {num}
              </div>
            </motion.div>
          </div>
          <div className="md:col-span-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="text-display text-[clamp(2.4rem,6vw,5.5rem)] mb-10"
            >
              {title}
            </motion.h2>
            <ul className="space-y-4 mb-10">
              {bullets.map((b, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + i * 0.15 }}
                  className="flex items-start gap-4 border-b border-ink/10 pb-4"
                >
                  <span className="text-mono text-[10px] text-rouge pt-1.5">
                    0{i + 1}
                  </span>
                  <span className="text-lg md:text-xl font-light text-ink leading-snug">
                    {b}
                  </span>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="border-l-2 border-rouge pl-5"
            >
              <div className="text-mono text-[10px] tracking-[0.22em] uppercase text-rouge mb-1">
                Objetivo
              </div>
              <div className="text-ink text-lg italic">{goal}</div>
            </motion.div>
          </div>
        </div>
      )}
    </Scene>
  );
}

function Scene7() {
  return (
    <StageScene
      index={6}
      num="01"
      months="Mes 01 — 02"
      title="Visibilidad"
      bullets={[
        "Integrar WhatsApp con Odoo CRM.",
        "Registrar origen, estado y responsable de cada lead.",
        "Exigir reportes mensuales de campañas.",
      ]}
      goal="Ninguna oportunidad queda invisible."
    />
  );
}

function Scene8() {
  return (
    <StageScene
      index={7}
      num="02"
      months="Mes 02 — 03"
      title="Atribución"
      bullets={[
        "Agregar ‘¿Cómo nos conociste?’ en Shopify.",
        "Construir buyer personas reales.",
        "Diferenciar distribuidores, catering e interioristas.",
      ]}
      goal="Comprender qué canal genera mejores resultados."
    />
  );
}

function Scene9() {
  return (
    <StageScene
      index={8}
      num="03"
      months="Mes 03 — 05"
      title="Inteligencia Comercial"
      bullets={[
        "Dashboard Power BI consolidado.",
        "Leads por canal, costo por lead, conversión.",
        "Tendencias de búsqueda y tiempo de respuesta.",
      ]}
      goal="Tomar decisiones basadas en evidencia."
    />
  );
}

/* ------------------------------------------------------------------ */
/* SCENE 10 — Future state funnel                                      */
/* ------------------------------------------------------------------ */

const FUNNEL = ["Ads", "Web", "Lead", "CRM", "Venta"];

function Scene10() {
  return (
    <Scene index={9} bg="bg-ink" text="text-bone">
      {(inView) => (
        <>
          <motion.img
            src={architectureImg}
            alt=""
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.18 } : {}}
            transition={{ duration: 1.6 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10 w-full max-w-6xl">
            <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={fadeUp}>
              <Eyebrow>Escena 10 · Estado futuro</Eyebrow>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9 }}
              className="text-display text-[clamp(2rem,4.5vw,3.6rem)] text-bone mb-16 max-w-3xl"
            >
              Por primera vez BRAFH podrá visualizar
              <br />
              su funnel comercial <span className="italic text-rouge">completo</span>.
            </motion.h2>

            <div className="flex flex-wrap items-center gap-3 md:gap-5">
              {FUNNEL.map((step, i) => (
                <div key={step} className="flex items-center gap-3 md:gap-5">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
                    className="border border-bone/30 px-5 py-3 text-mono text-xs tracking-[0.22em] uppercase text-bone"
                  >
                    {step}
                  </motion.div>
                  {i < FUNNEL.length - 1 && (
                    <motion.span
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.5 + i * 0.2 }}
                      className="h-px w-8 md:w-12 bg-rouge origin-left"
                    />
                  )}
                </div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1.6 }}
              className="mt-10 text-bone/60 text-sm max-w-xl"
            >
              Todas las métricas visibles. Todo el recorrido trazable.
            </motion.p>
          </div>
        </>
      )}
    </Scene>
  );
}

/* ------------------------------------------------------------------ */
/* SCENE 11 — Innovation                                               */
/* ------------------------------------------------------------------ */

function Scene11() {
  return (
    <Scene index={10}>
      {(inView) => (
        <div className="relative z-10 w-full max-w-6xl">
          <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={fadeUp}>
            <Eyebrow>Escena 11 · Innovación</Eyebrow>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="text-display text-[clamp(2rem,5vw,4rem)] mb-14"
          >
            Más allá del dato:
            <br />
            <span className="italic text-rouge">narrativa de marca.</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                tag: "Sound Branding",
                title: "Identidad sonora",
                body: "Una firma auditiva propia para videos, presentaciones y experiencias de marca.",
              },
              {
                tag: "Leonardo AI",
                title: "Visualización hiperrealista",
                body: "Proyectos gastronómicos generados con equipamiento BRAFH, antes de instalarse.",
              },
            ].map((b, i) => (
              <motion.div
                key={b.tag}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.2 }}
                className="border border-ink/15 p-8 group hover:border-rouge transition-colors duration-500"
              >
                <div className="text-mono text-[10px] tracking-[0.22em] uppercase text-rouge mb-6">
                  {b.tag}
                </div>
                <div className="text-display text-3xl mb-4">{b.title}</div>
                <div className="text-ink/70 font-light leading-relaxed">{b.body}</div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 1, delay: 0.8 + i * 0.2 }}
                  className="h-px bg-rouge mt-8 origin-left"
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </Scene>
  );
}

/* ------------------------------------------------------------------ */
/* SCENE 12 — Closing                                                  */
/* ------------------------------------------------------------------ */

function Scene12() {
  return (
    <Scene index={11} bg="bg-ink" text="text-bone">
      {(inView) => (
        <>
          <motion.img
            src={forgeImg}
            alt=""
            initial={{ opacity: 0, scale: 1.1 }}
            animate={inView ? { opacity: 0.25, scale: 1 } : {}}
            transition={{ duration: 2 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
          <div className="relative z-10 w-full max-w-6xl text-center">
            <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={fadeUp}>
              <Eyebrow>Cierre</Eyebrow>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.2 }}
              className="text-display text-[clamp(2.4rem,7.5vw,7.5rem)] text-bone leading-[0.95]"
            >
              BRAFH ya genera datos.
              <br />
              <span className="italic text-rouge">
                Ahora puede generar ventaja competitiva.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1.2 }}
              className="mt-12 max-w-2xl mx-auto text-bone/70 text-lg font-light"
            >
              El mejor marketing no es el que llega a más personas.
              Es el que sabe exactamente a quién llegar, cómo hacerlo y cuánto
              cuesta hacerlo.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="mt-16 text-mono text-[11px] tracking-[0.32em] uppercase text-bone/50"
            >
              BRAFH · Propuesta Estratégica · 2026
            </motion.div>
          </div>
        </>
      )}
    </Scene>
  );
}
