import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import heroImg from "@/assets/hero-industrial.jpg";
import scatteredImg from "@/assets/scattered-data.jpg";
import architectureImg from "@/assets/architecture.jpg";
import forgeImg from "@/assets/forge.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BRAFH — Sistema Operativo Comercial" },
      {
        name: "description",
        content:
          "Una propuesta para transformar los datos dispersos de BRAFH en inteligencia comercial. Visibilidad, atribución, decisión.",
      },
      { property: "og:title", content: "BRAFH — Sistema Operativo Comercial" },
      {
        property: "og:description",
        content:
          "Del archivo disperso a la decisión en tiempo real. Roadmap de implementación en tres etapas.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`relative w-full px-6 md:px-12 lg:px-20 ${className}`}
    >
      <div className="mx-auto max-w-[1440px]">{children}</div>
    </section>
  );
}

function Eyebrow({ children, index }: { children: React.ReactNode; index?: string }) {
  return (
    <div className="flex items-center gap-4">
      {index && (
        <span className="text-mono text-[10px] tracking-[0.3em] text-[var(--ink)]/40">
          {index}
        </span>
      )}
      <span className="eyebrow">{children}</span>
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ y: 28, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Nav                                                                 */
/* ------------------------------------------------------------------ */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-md bg-[var(--bone)]/75 border-b border-[var(--ink)]/8" : ""
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 md:px-12 lg:px-20 py-5">
        <a href="#top" className="flex items-baseline gap-3">
          <span className="text-display text-2xl text-[var(--ink)]">BRAFH</span>
          <span className="text-mono text-[10px] tracking-[0.25em] text-[var(--ink)]/40">
            ° propuesta
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-10 text-mono text-[11px] tracking-[0.18em] uppercase text-[var(--ink)]/60">
          <a href="#diagnostico" className="hover:text-[var(--rouge)] transition-colors">
            Diagnóstico
          </a>
          <a href="#tesis" className="hover:text-[var(--rouge)] transition-colors">
            Tesis
          </a>
          <a href="#roadmap" className="hover:text-[var(--rouge)] transition-colors">
            Roadmap
          </a>
          <a href="#resultado" className="hover:text-[var(--rouge)] transition-colors">
            Resultado
          </a>
        </nav>
        <a
          href="#contacto"
          className="text-mono text-[11px] tracking-[0.18em] uppercase text-[var(--rouge)] border-b border-[var(--rouge)]/40 pb-0.5 hover:border-[var(--rouge)] transition"
        >
          Iniciar conversación
        </a>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={ref} id="top" className="relative min-h-[100svh] overflow-hidden grain">
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 -z-10"
      >
        <img
          src={heroImg}
          alt=""
          className="h-full w-full object-cover opacity-[0.22]"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bone)]/40 via-[var(--bone)]/20 to-[var(--bone)]" />
      </motion.div>

      <Section className="pt-40 md:pt-48 pb-24">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="col-span-12 md:col-span-3 space-y-3"
          >
            <Eyebrow index="00 /">Propuesta confidencial</Eyebrow>
            <p className="text-mono text-[11px] text-[var(--ink)]/50 leading-relaxed">
              Documento preparado para
              <br />
              el consejo directivo de BRAFH.
              <br />
              Junio · 2026
            </p>
          </motion.div>

          <div className="col-span-12 md:col-span-9">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-display text-[14vw] md:text-[10.5vw] lg:text-[9rem] text-[var(--ink)]"
            >
              Del archivo
              <br />
              <span className="italic font-light text-[var(--rouge)]">disperso</span>
              <br />
              a la decisión.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.6 }}
              className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-8"
            >
              <p className="md:col-span-7 text-lg md:text-xl leading-[1.55] text-[var(--ink)]/85 max-w-[52ch]">
                BRAFH genera, todos los días, suficiente información para gobernar
                con precisión su mercado.
                <span className="text-[var(--ink)]"> Lo que falta no es dato. Es estructura.</span>
                <br />
                <br />
                Esta propuesta describe el sistema operativo comercial que convierte
                lo que ya existe — pedidos, contactos, históricos, conversaciones —
                en una sola superficie de decisión.
              </p>
              <div className="md:col-span-4 md:col-start-9 space-y-6 self-end">
                <div className="hairline text-[var(--ink)]" />
                <div className="flex justify-between text-mono text-[10px] tracking-[0.2em] uppercase text-[var(--ink)]/55">
                  <span>3 etapas</span>
                  <span>9 meses</span>
                  <span>1 sistema</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-mono text-[10px] tracking-[0.3em] uppercase text-[var(--ink)]/40"
      >
        <span>Recorrer</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="h-10 w-px bg-[var(--ink)]/30"
        />
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Diagnóstico — scattered data                                        */
/* ------------------------------------------------------------------ */

function Diagnostico() {
  const fragments = [
    { label: "Pedidos en Excel", x: "8%", y: "18%", w: 180 },
    { label: "CRM legado", x: "62%", y: "12%", w: 140 },
    { label: "Chats de WhatsApp", x: "30%", y: "44%", w: 200 },
    { label: "Correos comerciales", x: "75%", y: "52%", w: 170 },
    { label: "Cotizaciones .pdf", x: "12%", y: "68%", w: 160 },
    { label: "Notas del vendedor", x: "55%", y: "78%", w: 180 },
    { label: "ERP — partidas", x: "82%", y: "32%", w: 150 },
    { label: "Histórico papel", x: "38%", y: "86%", w: 160 },
  ];

  return (
    <Section id="diagnostico" className="py-32 md:py-48">
      <div className="grid grid-cols-12 gap-x-6 gap-y-16">
        <div className="col-span-12 md:col-span-4 md:sticky md:top-32 self-start space-y-8">
          <Eyebrow index="01 /">Diagnóstico</Eyebrow>
          <Reveal>
            <h2 className="text-display text-5xl md:text-6xl text-[var(--ink)]">
              Ocho lugares.
              <br />
              <span className="text-[var(--rouge)] italic">Ninguna</span> verdad.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base leading-[1.7] text-[var(--ink)]/75 max-w-[38ch]">
              La operación comercial de BRAFH vive simultáneamente en al menos
              ocho sistemas independientes. Cada uno fue lógico en su momento.
              Juntos hacen invisible la fotografía completa del cliente.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="space-y-3 pt-4">
              <div className="hairline text-[var(--ink)]" />
              <div className="flex justify-between text-mono text-[11px] text-[var(--ink)]/55">
                <span>Fuentes activas</span>
                <span className="text-[var(--rouge)]">08</span>
              </div>
              <div className="hairline text-[var(--ink)]" />
              <div className="flex justify-between text-mono text-[11px] text-[var(--ink)]/55">
                <span>Vista consolidada</span>
                <span className="text-[var(--rouge)]">00</span>
              </div>
              <div className="hairline text-[var(--ink)]" />
            </div>
          </Reveal>
        </div>

        <div className="col-span-12 md:col-span-8 relative">
          <Reveal>
            <div className="relative aspect-[4/5] md:aspect-[5/6] w-full overflow-hidden bg-[var(--ink)]/95">
              <img
                src={scatteredImg}
                alt="Documentación dispersa"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-60"
                width={1600}
                height={1200}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--ink)]/70 via-transparent to-[var(--rouge)]/20" />

              {fragments.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute"
                  style={{ left: f.x, top: f.y, width: f.w }}
                >
                  <div className="flex items-center gap-2">
                    <span className="block h-px flex-1 bg-[var(--bone)]/60" />
                    <span className="text-mono text-[10px] tracking-[0.18em] uppercase text-[var(--bone)] whitespace-nowrap">
                      {f.label}
                    </span>
                  </div>
                  <div className="mt-1 text-mono text-[9px] text-[var(--bone)]/50">
                    {String(i + 1).padStart(3, "0")} · sin consolidar
                  </div>
                </motion.div>
              ))}

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-mono text-[10px] uppercase tracking-[0.2em] text-[var(--bone)]/60">
                <span>Estado actual</span>
                <span className="text-[var(--bone)]">FIG. 01 — fragmentación</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Tesis — manifesto                                                   */
/* ------------------------------------------------------------------ */

function Tesis() {
  return (
    <Section id="tesis" className="py-32 md:py-48 border-t border-[var(--ink)]/10">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3">
          <Eyebrow index="02 /">Tesis</Eyebrow>
        </div>
        <div className="col-span-12 md:col-span-9">
          <Reveal>
            <p className="text-display text-3xl md:text-5xl lg:text-6xl text-[var(--ink)] leading-[1.05] max-w-[20ch] md:max-w-[18ch]">
              <span className="text-[var(--ink)]/30">No proponemos </span>
              otro software.
              <br />
              <span className="text-[var(--rouge)] italic">Proponemos</span> una capa
              de inteligencia <span className="text-[var(--ink)]/30">sobre lo que ya existe.</span>
            </p>
          </Reveal>

          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                k: "Capturar",
                v: "Conectamos las fuentes vivas — pedidos, conversaciones, ERP, contactos — sin pedirle al equipo que cambie su forma de trabajar.",
              },
              {
                k: "Estructurar",
                v: "Cada interacción comercial se vuelve un evento atribuible: cliente, vendedor, producto, margen, momento.",
              },
              {
                k: "Decidir",
                v: "Las preguntas que hoy toman dos semanas y tres reuniones, se contestan en una pantalla. La dirección recupera el tiempo.",
              },
            ].map((c, i) => (
              <Reveal key={c.k} delay={i * 0.12}>
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="text-mono text-[10px] tracking-[0.25em] text-[var(--rouge)]">
                      0{i + 1}
                    </span>
                    <div className="hairline flex-1 text-[var(--ink)]" />
                  </div>
                  <h3 className="text-display text-3xl text-[var(--ink)]">{c.k}.</h3>
                  <p className="text-[15px] leading-[1.65] text-[var(--ink)]/70">
                    {c.v}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Flow visual — sistema                                               */
/* ------------------------------------------------------------------ */

function FlowDiagram() {
  const sources = ["Pedidos", "CRM", "WhatsApp", "ERP", "Correos", "Cotizaciones"];

  return (
    <Section className="py-32 md:py-44 border-t border-[var(--ink)]/10">
      <div className="grid grid-cols-12 gap-6 mb-20">
        <div className="col-span-12 md:col-span-3">
          <Eyebrow>Arquitectura del sistema</Eyebrow>
        </div>
        <div className="col-span-12 md:col-span-9">
          <Reveal>
            <h3 className="text-display text-4xl md:text-5xl text-[var(--ink)] max-w-[18ch]">
              Ocho entradas. Una superficie de verdad.
            </h3>
          </Reveal>
        </div>
      </div>

      <Reveal>
        <div className="relative w-full aspect-[16/9] bg-[var(--bone)] border border-[var(--ink)]/12 overflow-hidden">
          {/* grid backdrop */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" aria-hidden>
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          <svg
            viewBox="0 0 1000 560"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
          >
            {/* connecting lines */}
            {sources.map((_, i) => {
              const y = 80 + i * 70;
              return (
                <motion.path
                  key={i}
                  d={`M 180 ${y} C 380 ${y}, 420 280, 620 280`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-[var(--ink)]/30"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, delay: 0.1 * i, ease: "easeInOut" }}
                />
              );
            })}
            {/* output line */}
            <motion.path
              d="M 780 280 L 940 280"
              stroke="#8B1620"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 1.6 }}
            />
            <motion.circle
              cx="940"
              cy="280"
              r="4"
              fill="#8B1620"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 2.6 }}
            />
          </svg>

          {/* source nodes */}
          <div className="absolute inset-0 grid grid-cols-12">
            <div className="col-span-3 flex flex-col justify-center gap-3 pl-8 md:pl-12">
              {sources.map((s, i) => (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <span className="block w-2 h-2 bg-[var(--ink)]/50" />
                  <span className="text-mono text-[11px] tracking-[0.15em] uppercase text-[var(--ink)]/70">
                    {s}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* core */}
            <div className="col-span-6 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.94, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-square w-[42%] border border-[var(--rouge)]/30 flex items-center justify-center"
              >
                <span className="absolute -top-3 left-0 eyebrow bg-[var(--bone)] px-2">
                  núcleo · BRAFH OS
                </span>
                <div className="text-center px-4">
                  <div className="text-display text-3xl md:text-4xl text-[var(--rouge)]">
                    Capa de
                    <br />
                    inteligencia
                  </div>
                </div>
                <span className="absolute -bottom-3 right-0 text-mono text-[10px] tracking-[0.2em] text-[var(--ink)]/40 bg-[var(--bone)] px-2">
                  v.01
                </span>
              </motion.div>
            </div>

            {/* output */}
            <div className="col-span-3 flex flex-col justify-center items-end gap-2 pr-8 md:pr-12">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 2.8 }}
                className="text-right"
              >
                <span className="eyebrow">Salida</span>
                <div className="text-display text-2xl md:text-3xl text-[var(--ink)] mt-2">
                  Una pantalla.
                </div>
                <div className="text-mono text-[11px] text-[var(--ink)]/50 mt-2">
                  Vista 360° por cliente · vendedor · producto · margen
                </div>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex justify-between text-mono text-[10px] tracking-[0.2em] uppercase text-[var(--ink)]/40">
            <span>FIG. 02 — flujo</span>
            <span>tiempo real</span>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Roadmap — centerpiece                                               */
/* ------------------------------------------------------------------ */

function Roadmap() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useSpring(useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]), {
    stiffness: 80,
    damping: 30,
  });

  const stages = [
    {
      n: "I",
      title: "Visibilidad",
      months: "Mes 01 — 03",
      lede: "Ver lo que la operación ya está diciendo.",
      body:
        "Conectamos las fuentes existentes. Construimos la primera vista consolidada: qué se vendió, a quién, por quién, con qué margen. Sin pedirle al equipo que cambie de herramienta.",
      deliverables: ["Conectores a ERP, CRM, hojas", "Tablero ejecutivo v.1", "Limpieza de catálogo maestro"],
      img: architectureImg,
    },
    {
      n: "II",
      title: "Atribución",
      months: "Mes 04 — 06",
      lede: "Saber por qué pasó lo que pasó.",
      body:
        "Cada venta deja de ser un número y se vuelve una historia: qué contacto la originó, qué vendedor la cerró, cuánto tardó, qué la repitió. Atribuimos resultado a causa.",
      deliverables: ["Modelo de atribución comercial", "Ciclo de vida del cliente", "Cohortes de recompra"],
      img: forgeImg,
    },
    {
      n: "III",
      title: "Inteligencia comercial",
      months: "Mes 07 — 09",
      lede: "Decidir antes que el competidor pregunte.",
      body:
        "La capa anticipa. Detecta clientes en riesgo, productos en pendiente, oportunidades de cruce. La dirección deja de revisar el pasado y empieza a ordenar el siguiente trimestre.",
      deliverables: ["Alertas de churn", "Sugerencias de cross-sell", "Pronóstico rodante de margen"],
      img: heroImg,
    },
  ];

  return (
    <div ref={ref} id="roadmap" className="relative border-t border-[var(--ink)]/10">
      <Section className="pt-32 md:pt-48 pb-12">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <Eyebrow index="03 /">Roadmap</Eyebrow>
          </div>
          <div className="col-span-12 md:col-span-9 space-y-10">
            <Reveal>
              <h2 className="text-display text-[12vw] md:text-[8vw] lg:text-[7.5rem] text-[var(--ink)] leading-[0.95]">
                Tres etapas.
                <br />
                <span className="italic text-[var(--rouge)]">Una</span> dirección.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-lg leading-[1.6] text-[var(--ink)]/75 max-w-[58ch]">
                El sistema no se entrega. Se construye con BRAFH, en trimestres
                discretos, cada uno con valor independiente. Si en cualquier
                momento la dirección decide detener, lo entregado ya está
                funcionando.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section className="pb-32 md:pb-48">
        <div className="relative grid grid-cols-12 gap-x-6">
          {/* vertical rule */}
          <div className="hidden md:block col-span-1 col-start-4 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--ink)]/10" />
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-1/2 top-0 w-px bg-[var(--rouge)] origin-top"
            />
          </div>

          <div className="col-span-12 md:col-span-8 md:col-start-5 space-y-40">
            {stages.map((s, i) => (
              <Stage key={s.n} s={s} index={i} />
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}

function Stage({
  s,
  index,
}: {
  s: {
    n: string;
    title: string;
    months: string;
    lede: string;
    body: string;
    deliverables: string[];
    img: string;
  };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div ref={ref} className="relative">
      {/* node marker */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:block absolute -left-[calc(12.5%+0.5px)] top-2 w-3 h-3 bg-[var(--rouge)] -translate-x-1/2"
      />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-5 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-baseline gap-4">
              <span className="text-display italic text-[var(--rouge)] text-7xl md:text-8xl">
                {s.n}
              </span>
              <span className="text-mono text-[11px] tracking-[0.2em] uppercase text-[var(--ink)]/45">
                Etapa
              </span>
            </div>
            <div className="hairline text-[var(--ink)] mt-6" />
            <div className="flex justify-between text-mono text-[10px] tracking-[0.2em] uppercase text-[var(--ink)]/55 mt-3">
              <span>{s.months}</span>
              <span>0{index + 1} de 03</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            <h3 className="text-display text-5xl md:text-6xl text-[var(--ink)]">
              {s.title}.
            </h3>
            <p className="text-display text-xl md:text-2xl italic text-[var(--ink)]/60 leading-snug max-w-[26ch]">
              {s.lede}
            </p>
            <p className="text-[15px] leading-[1.7] text-[var(--ink)]/75 max-w-[42ch] pt-2">
              {s.body}
            </p>

            <div className="pt-4 space-y-2">
              {s.deliverables.map((d, di) => (
                <motion.div
                  key={d}
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + di * 0.1, duration: 0.6 }}
                  className="flex items-baseline gap-3 py-2 border-b border-[var(--ink)]/8"
                >
                  <span className="text-mono text-[10px] text-[var(--rouge)]">
                    {String(di + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[14px] text-[var(--ink)]/80">{d}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.2 }}
            className="relative aspect-[4/5] overflow-hidden bg-[var(--ink)]/90"
          >
            <motion.img
              src={s.img}
              alt=""
              style={{ y: imgY }}
              className="absolute inset-0 h-[120%] w-full object-cover opacity-90"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/40 to-transparent" />
            <div className="absolute top-5 left-5 right-5 flex justify-between text-mono text-[10px] tracking-[0.25em] uppercase text-[var(--bone)]/85">
              <span>FIG. {index + 3}</span>
              <span>Etapa {s.n}</span>
            </div>
            <div className="absolute bottom-5 left-5 right-5">
              <div className="text-display text-3xl md:text-4xl text-[var(--bone)]">
                {s.title}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Resultado — metrics                                                 */
/* ------------------------------------------------------------------ */

function Resultado() {
  const metrics = [
    { v: "−72%", k: "Tiempo de respuesta del comité comercial" },
    { v: "1", k: "Fuente única para clientes y pedidos" },
    { v: "+19%", k: "Margen recuperable identificado en piloto" },
    { v: "9 mo", k: "Implementación total, valor desde el mes 03" },
  ];

  return (
    <Section id="resultado" className="py-32 md:py-48 border-t border-[var(--ink)]/10">
      <div className="grid grid-cols-12 gap-6 mb-20">
        <div className="col-span-12 md:col-span-3">
          <Eyebrow index="04 /">Resultado</Eyebrow>
        </div>
        <div className="col-span-12 md:col-span-9">
          <Reveal>
            <h2 className="text-display text-5xl md:text-7xl text-[var(--ink)] max-w-[20ch] leading-[1]">
              Cuando el sistema está
              <br />
              de pie, BRAFH
              <span className="text-[var(--rouge)] italic"> deja de adivinar.</span>
            </h2>
          </Reveal>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-[var(--ink)]/10 border border-[var(--ink)]/10">
        {metrics.map((m, i) => (
          <Reveal key={m.k} delay={i * 0.1}>
            <div className="bg-[var(--bone)] p-8 md:p-10 h-full flex flex-col justify-between gap-12 aspect-square md:aspect-auto md:min-h-[280px]">
              <span className="text-mono text-[10px] tracking-[0.25em] uppercase text-[var(--ink)]/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="space-y-4">
                <div className="text-display text-6xl md:text-7xl text-[var(--rouge)]">
                  {m.v}
                </div>
                <p className="text-[13px] leading-[1.5] text-[var(--ink)]/70 max-w-[24ch]">
                  {m.k}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* CTA + Footer                                                        */
/* ------------------------------------------------------------------ */

function Contacto() {
  return (
    <Section id="contacto" className="py-32 md:py-56 border-t border-[var(--ink)]/10">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3">
          <Eyebrow index="05 /">Siguiente paso</Eyebrow>
        </div>
        <div className="col-span-12 md:col-span-9 space-y-12">
          <Reveal>
            <h2 className="text-display text-[12vw] md:text-[7.5vw] lg:text-[7rem] text-[var(--ink)] leading-[0.95]">
              Comencemos por
              <br />
              <span className="italic text-[var(--rouge)]">Visibilidad</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-[1.6] text-[var(--ink)]/75 max-w-[52ch]">
              Una sesión de dos horas con el equipo directivo es suficiente para
              dimensionar la Etapa I. Sin compromiso, sin propuesta cerrada —
              solo el mapa real de lo que BRAFH ya tiene.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row items-start gap-8 pt-4">
              <a
                href="mailto:propuesta@brafh.example"
                className="group inline-flex items-center gap-5 bg-[var(--rouge)] text-[var(--bone)] px-8 py-5 hover:bg-[var(--ink)] transition-colors duration-500"
              >
                <span className="text-mono text-[11px] tracking-[0.25em] uppercase">
                  Agendar sesión
                </span>
                <span className="text-display text-2xl translate-y-[-1px] group-hover:translate-x-1 transition-transform duration-500">
                  →
                </span>
              </a>
              <div className="flex flex-col gap-1 text-mono text-[11px] tracking-[0.15em] uppercase text-[var(--ink)]/55">
                <span>O escribir a</span>
                <a
                  href="mailto:propuesta@brafh.example"
                  className="text-[var(--ink)] hover:text-[var(--rouge)] transition"
                >
                  propuesta@brafh.example
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--ink)]/10 py-10 px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1440px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-mono text-[10px] tracking-[0.2em] uppercase text-[var(--ink)]/45">
        <div className="flex items-baseline gap-3">
          <span className="text-display text-lg text-[var(--ink)]">BRAFH</span>
          <span>· documento confidencial</span>
        </div>
        <div className="flex gap-8">
          <span>v.01 — junio 2026</span>
          <span>Preparado para el consejo directivo</span>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function Index() {
  return (
    <main className="min-h-screen bg-[var(--bone)] text-[var(--ink)] overflow-x-hidden">
      <Nav />
      <Hero />
      <Diagnostico />
      <Tesis />
      <FlowDiagram />
      <Roadmap />
      <Resultado />
      <Contacto />
      <Footer />
    </main>
  );
}
