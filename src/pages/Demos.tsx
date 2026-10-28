import { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BookOpen, CalendarClock, Clock, Play } from "lucide-react";
import PageShell from "@/components/PageShell";
import { DOMAIN_COLORS } from "@/lib/domains";
import DemoRequestDialog from "@/components/DemoRequestDialog";
import { demos, demoUrl, formatDuration, getDemo } from "@/lib/demos";

const Demos = () => {
  const [params, setParams] = useSearchParams();
  const current = getDemo(params.get("v")) ?? demos[0];
  const playerRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  // Bring the player into view when a different video is picked (not on first load).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    playerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [current.id]);

  return (
    <PageShell accent={DOMAIN_COLORS.response}>
      <section className="relative py-16">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            <span className="h-2.5 w-2.5 shrink-0 bg-[var(--page-accent)]" />
            Demo videos
          </p>
            <h1 className="mb-4 font-heading text-2xl font-bold leading-[1.1] text-foreground md:text-4xl">See Cy360 in action</h1>
            <p className="max-w-2xl text-muted-foreground">
              Narrated walkthroughs of the platform and each of its modules, recorded in the live portal. Pick a video
              below; every one has a matching page in the <Link to="/docs" className="text-primary hover:underline">documentation</Link>.
            </p>
          </div>

          <div ref={playerRef} className="mb-12 scroll-mt-28">
            <div className="overflow-hidden rounded-xl border border-border bg-black shadow-xl">
              <video
                key={current.id}
                src={demoUrl(current)}
                poster={current.poster}
                controls
                playsInline
                preload="metadata"
                autoPlay={params.has("v")}
                className="aspect-video w-full"
              >
                Your browser can't play this video. <a href={demoUrl(current)}>Download it</a> instead.
              </video>
            </div>
            <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground">{current.title}</h2>
                <p className="text-sm text-muted-foreground">{current.tagline}</p>
              </div>
              {current.docSlug && (
                <Link
                  to={`/docs/${current.docSlug}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <BookOpen className="h-4 w-4" /> Read the guide
                </Link>
              )}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {demos.map((d) => {
              const active = d.id === current.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setParams({ v: d.id })}
                  aria-current={active ? "true" : undefined}
                  className={`group overflow-hidden rounded-xl border bg-card text-left transition-all ${
                    active ? "border-primary" : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className="relative aspect-video overflow-hidden bg-secondary">
                    <img
                      src={d.poster}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover object-left-top opacity-80 transition-opacity group-hover:opacity-100"
                    />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
                        <Play className="ml-0.5 h-5 w-5" />
                      </span>
                    </span>
                    <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded bg-black/75 px-2 py-0.5 text-xs text-white">
                      <Clock className="h-3 w-3" /> {formatDuration(d.duration)}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="mb-1 font-heading text-base font-bold text-foreground">{d.title}</h3>
                    <p className="text-sm text-muted-foreground">{d.tagline}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-12 flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-6 text-center sm:flex-row sm:text-left">
            <CalendarClock className="h-10 w-10 shrink-0 text-primary" />
            <div className="flex-1">
              <p className="font-heading text-base font-bold text-foreground">Prefer a live walkthrough?</p>
              <p className="text-sm text-muted-foreground">
                Book a guided demo with a CyAssure expert, focused on your environment and your questions.
              </p>
            </div>
            <DemoRequestDialog
              startWithLive
              trigger={
                <button
                  type="button"
                  className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
                >
                  Book a live demo
                </button>
              }
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Demos;
