import { motion } from "framer-motion";
import {
  Laptop, Smartphone, Server, Router, Check, Wifi,
  LucideIcon, Shield, EyeOff, AlertTriangle,
} from "lucide-react";

// Tailwind can't see dynamically-built class strings like `text-${color}` — it only
// picks up whole literal class names present somewhere in the source. This lookup
// keeps every class fully static (found here, in this file) while still letting
// each visual pick a theme by short key. `hex` is for raw SVG/CSS values, which
// aren't Tailwind classes and are safe to interpolate directly.
const THEME = {
  primary: { text: "text-primary", border: "border-primary/50", borderFaint: "border-primary/20", hex: "#22d3ee" },
  emerald: { text: "text-emerald-400", border: "border-emerald-500/50", borderFaint: "border-emerald-500/20", hex: "#34d399" },
  orange: { text: "text-orange-400", border: "border-orange-500/50", borderFaint: "border-orange-500/20", hex: "#fb923c" },
  cyan: { text: "text-cyan-400", border: "border-cyan-400/50", borderFaint: "border-cyan-400/20", hex: "#22d3ee" },
  violet: { text: "text-violet-400", border: "border-violet-500/50", borderFaint: "border-violet-500/20", hex: "#a78bfa" },
  blue: { text: "text-blue-400", border: "border-blue-500/50", borderFaint: "border-blue-500/20", hex: "#60a5fa" },
} as const;

type ThemeKey = keyof typeof THEME;

const wrap = "relative flex h-full w-full items-center justify-center overflow-hidden bg-secondary/20";

/* Rotating conic-gradient sweep + a center icon — for scanning/discovery functions */
export const RadarSweep = ({ icon: Icon, theme = "primary" }: { icon: LucideIcon; theme?: ThemeKey }) => {
  const t = THEME[theme];
  return (
    <div className={wrap}>
      <div className="relative flex h-24 w-24 items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: `conic-gradient(from 0deg, transparent 270deg, ${t.hex}59 360deg)` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        />
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className={`absolute rounded-full border ${t.borderFaint}`}
            style={{ inset: `${(4 - ring) * 10}%` }}
            animate={{ opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: ring * 0.3 }}
          />
        ))}
        <div className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full border ${t.border} bg-card`}>
          <Icon className={`h-5 w-5 ${t.text}`} />
        </div>
        {[
          { top: "10%", left: "70%", delay: 0.4 },
          { top: "68%", left: "78%", delay: 1.2 },
          { top: "78%", left: "24%", delay: 2 },
        ].map((blip, i) => (
          <motion.div
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full"
            style={{ top: blip.top, left: blip.left, backgroundColor: t.hex }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: blip.delay }}
          />
        ))}
      </div>
    </div>
  );
};

/* Animated arc gauge with a score readout — for scoring/benchmarking functions */
export const GaugeMeter = ({ icon: Icon, score, sub, theme = "primary", fillPct = 0.78 }: { icon: LucideIcon; score: string; sub: string; theme?: ThemeKey; fillPct?: number }) => {
  const t = THEME[theme];
  const circumference = 264;
  return (
    <div className={wrap}>
      <div className="relative flex h-24 w-24 items-center justify-center">
        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
          <motion.circle
            cx="50" cy="50" r="42" fill="none" stroke={t.hex} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: circumference * (1 - fillPct) }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
        </svg>
        <div className="relative z-10 flex flex-col items-center">
          <Icon className={`mb-0.5 h-4 w-4 ${t.text}`} />
          <span className="font-heading text-lg font-bold text-foreground">{score}</span>
          <span className="text-[9px] text-muted-foreground">{sub}</span>
        </div>
      </div>
    </div>
  );
};

/* Heartbeat/activity waveform behind an icon — for analytics functions */
export const WaveformPulse = ({ icon: Icon, theme = "primary" }: { icon: LucideIcon; theme?: ThemeKey }) => {
  const t = THEME[theme];
  return (
    <div className={wrap}>
      <svg className="absolute h-16 w-full opacity-60" viewBox="0 0 300 60" preserveAspectRatio="none">
        <motion.path
          d="M0,30 L60,30 L75,10 L90,50 L105,30 L300,30"
          fill="none"
          stroke={t.hex}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
      </svg>
      <motion.div
        className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-full border ${t.border} bg-card`}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        <Icon className={`h-6 w-6 ${t.text}`} />
      </motion.div>
    </div>
  );
};

/* Multiple streams converging into a central node — for the correlation engine / data lake */
export const StreamConverge = () => (
  <div className={wrap}>
    <div className="flex w-full items-center justify-between px-6">
      <div className="flex flex-col gap-2">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="h-1.5 w-8 rounded-full bg-primary/40"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.25 }}
          />
        ))}
      </div>
      <div className="relative flex-1">
        <svg className="h-16 w-full" viewBox="0 0 200 64" preserveAspectRatio="none">
          {[6, 22, 42, 58].map((y, i) => (
            <motion.path
              key={i}
              d={`M0,${y} Q100,${y} 200,32`}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              strokeDasharray="3 3"
              strokeOpacity="0.4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.1 }}
            />
          ))}
        </svg>
      </div>
      <motion.div
        className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-primary/50 bg-card shadow-[var(--glow-primary)]"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Shield className="h-6 w-6 text-primary" />
      </motion.div>
    </div>
  </div>
);

/* Central icon + radiating satellite icons + pulsing rings — for hub/coverage functions */
export const PulseHub = ({ centerIcon: CenterIcon, satellites, theme = "primary" }: { centerIcon: LucideIcon; satellites: LucideIcon[]; theme?: ThemeKey }) => {
  const t = THEME[theme];
  return (
    <div className={wrap}>
      <div className="relative flex h-24 w-24 items-center justify-center">
        {[1, 2].map((ring) => (
          <motion.div
            key={ring}
            className={`absolute rounded-full border ${t.borderFaint}`}
            style={{ inset: `-${ring * 14}px` }}
            animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.2, 1] }}
            transition={{ duration: 2.6, repeat: Infinity, delay: ring * 0.4 }}
          />
        ))}
        <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border ${t.border} bg-card`}>
          <CenterIcon className={`h-5 w-5 ${t.text}`} />
        </div>
        {satellites.map((Icon, i) => {
          const angle = (360 / satellites.length) * i - 90;
          const rad = (angle * Math.PI) / 180;
          const x = 58 * Math.cos(rad);
          const y = 58 * Math.sin(rad);
          return (
            <motion.div
              key={i}
              className="absolute flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card"
              style={{ left: `calc(50% + ${x}px - 16px)`, top: `calc(50% + ${y}px - 16px)` }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.35 }}
            >
              <Icon className="h-3.5 w-3.5 text-muted-foreground" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

/* Left labels flowing through a central gate icon to a result icon — for gateway/enrichment functions */
export const FlowGate = ({ leftLabels, gateIcon: GateIcon, resultIcon: ResultIcon = Check, theme = "primary" }: { leftLabels: string[]; gateIcon: LucideIcon; resultIcon?: LucideIcon; theme?: ThemeKey }) => {
  const t = THEME[theme];
  return (
    <div className={wrap}>
      <div className="flex w-full items-center justify-between px-6">
        <div className="flex flex-col gap-1.5">
          {leftLabels.map((label, i) => (
            <motion.div
              key={label}
              className="rounded-md border border-border bg-card px-2 py-1 text-[10px] text-muted-foreground"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            >
              {label}
            </motion.div>
          ))}
        </div>
        <div className="relative flex flex-1 items-center justify-center">
          <svg className="h-6 w-full" viewBox="0 0 160 24" preserveAspectRatio="none">
            <line x1="0" y1="12" x2="160" y2="12" stroke={t.hex} strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.4" />
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={i}
                r="2" cy="12" fill={t.hex}
                animate={{ cx: [0, 160] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.55, ease: "linear" }}
              />
            ))}
          </svg>
        </div>
        <motion.div
          className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 ${t.border} bg-card`}
          animate={{ boxShadow: [`0 0 0px ${t.hex}00`, `0 0 16px ${t.hex}80`, `0 0 0px ${t.hex}00`] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <GateIcon className={`h-5 w-5 ${t.text}`} />
        </motion.div>
        <div className="flex flex-1 items-center justify-center">
          <motion.div
            className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
          >
            <ResultIcon className="h-4 w-4 text-emerald-400" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/* An eye revealing hidden/unapproved items with an alert badge — for Shadow AI */
export const HiddenAlert = () => (
  <div className={wrap}>
    <div className="relative flex h-20 w-20 items-center justify-center">
      <motion.div
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-orange-500/50 bg-card"
      >
        <EyeOff className="h-6 w-6 text-orange-400" />
      </motion.div>
      {[
        { top: "-6%", left: "68%", delay: 0.3 },
        { top: "62%", left: "72%", delay: 1 },
        { top: "70%", left: "6%", delay: 1.7 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute flex h-6 w-6 items-center justify-center rounded-full border border-orange-500/60 bg-orange-500/15"
          style={pos}
          animate={{ opacity: [0, 1, 0], y: [4, -2, 4] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: pos.delay }}
        >
          <AlertTriangle className="h-3 w-3 text-orange-400" />
        </motion.div>
      ))}
    </div>
  </div>
);

/* Concentric signal waves emitting from a small device — for IoT scanning */
export const SignalWaves = () => (
  <div className={wrap}>
    <div className="relative flex h-24 w-24 items-center justify-center">
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute rounded-full border border-cyan-400/30"
          style={{ inset: `-${ring * 12}px` }}
          animate={{ opacity: [0.6, 0, 0.6], scale: [0.9, 1.3, 0.9] }}
          transition={{ duration: 2.6, repeat: Infinity, delay: ring * 0.35, ease: "easeOut" }}
        />
      ))}
      <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/60 bg-card">
        <Wifi className="h-5 w-5 text-cyan-400" />
      </div>
    </div>
  </div>
);

/* Framework badges cycling with checkmarks — for GRC */
export const ChecklistCycle = ({ items }: { items: string[] }) => (
  <div className={wrap}>
    <div className="flex flex-wrap items-center justify-center gap-2 px-8">
      {items.map((item, i) => (
        <motion.div
          key={item}
          className="flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.25 }}
        >
          <Check className="h-3 w-3 text-emerald-400" />
          <span className="text-[10px] font-medium text-emerald-300">{item}</span>
        </motion.div>
      ))}
    </div>
  </div>
);

export const endpointSatellites = [Laptop, Smartphone, Server, Router];
export const assetSatellites = [Laptop, Server, Smartphone, Router];
