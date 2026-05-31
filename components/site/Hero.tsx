"use client";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import heroShip from "@/assets/hero-ship.jpg";

const EVENT_TARGET = new Date("2026-11-19T09:30:00+04:00");

function useCountdown(target: Date) {
  const [t, setT] = useState<number | null>(null);
  useEffect(() => {
    setT(target.getTime() - Date.now());
    const id = setInterval(() => setT(target.getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);
  if (t === null) return { days: 0, hours: 0, mins: 0, secs: 0, ready: false };
  const clamp = Math.max(0, t);
  return {
    days: Math.floor(clamp / 86400000),
    hours: Math.floor((clamp / 3600000) % 24),
    mins: Math.floor((clamp / 60000) % 60),
    secs: Math.floor((clamp / 1000) % 60),
    ready: true,
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 20 },
  },
} as const;

export function Hero() {
  const c = useCountdown(EVENT_TARGET);

  return (
    <section className="relative min-h-screen pt-16 overflow-hidden bg-hero-gradient">
      {/* Ken Burns slow background scale on load */}
      <motion.img
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 3, ease: "easeOut" }}
        src={heroShip.src}
        alt="Container ship navigating stormy seas"
        width={1920}
        height={1080}
        className="absolute inset-0 size-full object-cover opacity-50 mix-blend-luminosity pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/40 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-32 grid lg:grid-cols-12 gap-12 items-center">
        {/* Staggered text element introduction */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 text-white"
        >
          <motion.span 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 backdrop-blur text-xs uppercase tracking-[0.2em]"
          >
            <span className="size-1.5 rounded-full bg-coral animate-pulse" />
            Exclusive Invitation
          </motion.span>
          
          <motion.h1 
            variants={itemVariants}
            className="mt-6 font-display text-6xl md:text-8xl font-semibold leading-[0.95] text-balance"
          >
            Troubled <em className="text-coral not-italic font-bold">Waters</em>.
            <br />
            Charted by <em className="italic font-bold">AI</em>.
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="mt-6 max-w-xl text-lg text-white/70"
          >
            A maritime gathering for supply chain leaders navigating the next decade of disruption. November 19, 2026 · Marriott Resort, The Palm.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a href="#register" className="px-7 py-3.5 rounded-full bg-coral-gradient text-coral-foreground font-medium shadow-glow hover:scale-105 transition-transform duration-300">
              Reserve your seat
            </a>
            <a href="#agenda" className="px-7 py-3.5 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors duration-300">
              View agenda
            </a>
          </motion.div>
        </motion.div>

        {/* Hover-reactive glass countdown card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.45, type: "spring", stiffness: 100, damping: 18 }}
          whileHover={{ y: -5 }}
          className="lg:col-span-5"
        >
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-deep hover:border-white/20 transition-colors duration-300">
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Countdown to embark</p>
            
            <div className="mt-4 grid grid-cols-4 gap-2 text-white">
              {[
                { v: c.days, l: "Days" },
                { v: c.hours, l: "Hours" },
                { v: c.mins, l: "Minutes" },
                { v: c.secs, l: "Seconds" },
              ].map(({ v, l }) => (
                <motion.div 
                  key={l}
                  whileHover={{ scale: 1.06, borderColor: "rgba(238, 77, 72, 0.4)" }}
                  className="rounded-xl bg-deep/40 border border-white/5 p-3 text-center transition-colors duration-300 cursor-default"
                >
                  <div className="font-display text-3xl md:text-4xl tabular-nums" suppressHydrationWarning>
                    {c.ready ? String(v).padStart(2, "0") : "—"}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-white/50 mt-1">{l}</div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/10 text-sm text-white/70 space-y-1.5">
              <div className="flex justify-between"><span>Date</span><span className="text-white">19 Nov 2026</span></div>
              <div className="flex justify-between"><span>Time</span><span className="text-white">09:30 - 02:00</span></div>
              <div className="flex justify-between"><span>Venue</span><span className="text-white">The Palm, Dubai</span></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Wave divider */}
      <svg className="absolute bottom-0 inset-x-0 text-background" viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path fill="currentColor" d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,30 1440,40 L1440,80 L0,80 Z" />
      </svg>
    </section>
  );
}
