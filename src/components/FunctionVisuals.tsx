import { motion } from "framer-motion";
import { Monitor, Laptop, Smartphone, Server, Router, Lock, Check, Sparkles } from "lucide-react";

const containerCls = "relative flex h-full w-full items-center justify-center overflow-hidden bg-secondary/20";

export const EDRVisual = () => (
  <div className={containerCls}>
    <div className="relative flex h-20 w-20 items-center justify-center">
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute rounded-full border border-primary/30"
          style={{ inset: `-${ring * 12}px` }}
          animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.25, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: ring * 0.4, ease: "easeOut" }}
        />
      ))}
      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-primary/50 bg-card">
        <Monitor className="h-6 w-6 text-primary" />
      </div>
    </div>
    {[
      { icon: Laptop, top: "20%", left: "18%", delay: 0 },
      { icon: Smartphone, top: "70%", left: "22%", delay: 0.5 },
      { icon: Server, top: "22%", left: "78%", delay: 1 },
      { icon: Router, top: "72%", left: "80%", delay: 1.5 },
    ].map(({ icon: Icon, top, left, delay }, i) => (
      <motion.div
        key={i}
        className="absolute flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card"
        style={{ top, left }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, delay }}
      >
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      </motion.div>
    ))}
  </div>
);

export const AIGatewayVisual = () => (
  <div className={containerCls}>
    <div className="flex w-full items-center justify-between px-8">
      <div className="flex flex-col gap-2">
        {["OpenAI", "Claude", "Gemini"].map((label, i) => (
          <motion.div
            key={label}
            className="rounded-md border border-border bg-card px-2.5 py-1 text-[10px] text-muted-foreground"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          >
            {label}
          </motion.div>
        ))}
      </div>

      <div className="relative flex flex-1 items-center justify-center">
        <svg className="h-8 w-full" viewBox="0 0 200 32" preserveAspectRatio="none">
          <motion.line
            x1="0" y1="16" x2="200" y2="16"
            stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.4"
          />
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              r="2.5"
              fill="hsl(var(--primary))"
              cy="16"
              animate={{ cx: [0, 200] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.6, ease: "linear" }}
            />
          ))}
        </svg>
      </div>

      <motion.div
        className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-primary/60 bg-card"
        animate={{ boxShadow: ["0 0 0px hsl(var(--primary)/0)", "0 0 18px hsl(var(--primary)/0.5)", "0 0 0px hsl(var(--primary)/0)"] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Lock className="h-6 w-6 text-primary" />
      </motion.div>

      <div className="flex flex-1 items-center justify-center">
        <motion.div
          className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
        >
          <Check className="h-4 w-4 text-emerald-400" />
        </motion.div>
      </div>
    </div>
  </div>
);

export const AssetInventoryVisual = () => (
  <div className={containerCls}>
    <div className="relative flex h-24 w-24 items-center justify-center">
      <motion.div
        className="absolute rounded-full border border-primary/20"
        style={{ inset: "-28px" }}
        animate={{ scale: [0.9, 1.3, 0.9], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
      />
      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/50 bg-card">
        <Sparkles className="h-5 w-5 text-primary" />
      </div>
      {[
        { icon: Laptop, angle: -60 },
        { icon: Smartphone, angle: 0 },
        { icon: Server, angle: 60 },
        { icon: Router, angle: 180 },
      ].map(({ icon: Icon, angle }, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 60 * Math.cos(rad);
        const y = 60 * Math.sin(rad);
        return (
          <motion.div
            key={i}
            className="absolute flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card"
            style={{ left: `calc(50% + ${x}px - 16px)`, top: `calc(50% + ${y}px - 16px)` }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4 }}
          >
            <Icon className="h-3.5 w-3.5 text-muted-foreground" />
          </motion.div>
        );
      })}
    </div>
  </div>
);
