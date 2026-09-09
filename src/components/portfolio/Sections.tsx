import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  PROFILE,
  PROJECTS,
  SERVICES,
  SKILLS,
  STATS,
} from "./data";
import { cn } from "@/lib/utils";

// ————————————————————————————————————————————————————————————
// Utilities
// ————————————————————————————————————————————————————————————
function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "-60px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transform: show ? "translateY(0)" : `translateY(${y}px)`,
      }}
      className={cn(
        "transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        show ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="mb-14 flex items-center gap-4">
      <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[color:var(--brand)]">
        {index}
      </span>
      <span className="h-px flex-1 bg-foreground/10" />
      <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
      className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground/10 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-[color:var(--brand)] hover:text-[color:var(--brand)] active:scale-95 active:border-[color:var(--brand)] active:text-[color:var(--brand)]"
    >
      {children}
    </a>
  );
}

// ————————————————————————————————————————————————————————————
// Hero — split editorial
// ————————————————————————————————————————————————————————————
export function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isRevealed, setIsRevealed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const userPausedRef = useRef(false);

  useEffect(() => {
    const id = setInterval(
      () => setRoleIdx((i) => (i + 1) % PROFILE.roles.length),
      2600,
    );
    return () => clearInterval(id);
  }, []);

  // Play on hover (desktop) / when scrolled into view (mobile). Pause otherwise.
  useEffect(() => {
    const v = videoRef.current;
    const wrap = videoWrapRef.current;
    if (!v || !wrap) return;

    const playVideo = async () => {
      try {
        setIsRevealed(true);
        v.muted = true;
        await v.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Video play:", err);
      }
    };

    const pauseVideo = () => {
      v.pause();
      setIsPlaying(false);
      setIsRevealed(false);
    };

    const isTouch = window.matchMedia("(hover: none)").matches;

    if (isTouch) {
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            playVideo();
          } else {
            pauseVideo();
          }
        },
        { threshold: [0, 0.4, 1] },
      );
      io.observe(wrap);
      return () => io.disconnect();
    }

    const onEnter = () => {
      userPausedRef.current = false;
      playVideo();
    };
    const onLeave = () => {
      if (!userPausedRef.current) {
        pauseVideo();
      }
    };
    wrap.addEventListener("mouseenter", onEnter);
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mouseenter", onEnter);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      userPausedRef.current = false;
      setIsRevealed(true);
      v.play().catch(() => {});
      setIsPlaying(true);
    } else {
      userPausedRef.current = true;
      v.pause();
      setIsPlaying(false);
    }
  };
  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    if (!next) {
      v.volume = 1;
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
      setIsPlaying(true);
    }
    setIsMuted(next);
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-28 sm:pt-32 sm:pb-20"
    >
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-12 px-5 sm:gap-16 sm:px-6 md:px-10 lg:grid-cols-[1.25fr_1fr] lg:gap-24">
        {/* Left — editorial copy */}
        <div>
          <Reveal>
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-[color:var(--brand)]/60" />
                <span className="relative h-2 w-2 rounded-full bg-[color:var(--brand)]" />
              </span>
              Available for freelance ’26
            </div>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
              — Hello, I am
            </p>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-3 font-display text-[clamp(2.75rem,12vw,8.5rem)] font-bold leading-[0.92] tracking-[-0.03em]">
              Saran<span className="text-[color:var(--brand)]">.</span>
              <br />
              <span className="block overflow-hidden">
                <span
                  key={roleIdx}
                  className="inline-block animate-fade-up text-foreground/90"
                >
                  {PROFILE.roles[roleIdx]}
                </span>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-8 max-w-xl text-base leading-[1.6] text-muted-foreground sm:text-lg md:mt-10 md:text-xl">
              {PROFILE.tagline}
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10">
              <a
                href="#projects"
                className="group inline-flex min-h-[44px] w-full items-center justify-center gap-3 rounded-full bg-[color:var(--brand)] px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.96] sm:w-auto"
              >
                View Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={PROFILE.resumeUrl}
                download
                className="group inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-foreground/15 px-6 py-3.5 text-sm font-medium transition-colors hover:border-foreground/30 hover:bg-foreground/5 active:bg-foreground/5 sm:w-auto"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
              <a
                href="#contact"
                className="group inline-flex min-h-[44px] items-center gap-2 px-2 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Contact Me
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <div className="mt-14 flex items-center gap-4">
              <SocialIcon href={PROFILE.socials.github} label="GitHub">
                <Github className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href={PROFILE.socials.linkedin} label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href={PROFILE.socials.email} label="Email">
                <Mail className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href={PROFILE.socials.instagram} label="Instagram">
                <Instagram className="h-4 w-4" />
              </SocialIcon>
              <div className="ml-3 hidden items-center gap-2 text-xs uppercase tracking-[0.24em] text-muted-foreground sm:flex">
                <MapPin className="h-3.5 w-3.5" />
                {PROFILE.location}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right — portrait / intro video */}
        <Reveal delay={180} y={40}>
          <div className="relative mx-auto w-full max-w-[440px] lg:max-w-none">
            <div
              className={cn(
                "pointer-events-none absolute -inset-16 rounded-[2rem] bg-[radial-gradient(circle_at_50%_50%,rgba(248,109,9,0.4),transparent_65%)] blur-3xl transition-opacity duration-700",
                isRevealed ? "opacity-100" : "opacity-30",
              )}
              aria-hidden
            />
            <div
              ref={videoWrapRef}
              onClick={togglePlay}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  togglePlay();
                }
              }}
              tabIndex={0}
              role="button"
              aria-label="Toggle intro video playback"
              className="group/video relative aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-2xl border border-foreground/10 bg-black/5 shadow-2xl transition-transform duration-500 hover:scale-[1.01]"
            >
              {/* Idle state — animated rings + prompt */}
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 transition-opacity duration-700",
                  isRevealed ? "opacity-0" : "opacity-100",
                )}
                aria-hidden
              >
                <div className="absolute inset-[6%] rounded-full border border-[color:var(--brand)]/25 [animation:spin_18s_linear_infinite]" />
                <div className="absolute inset-[18%] rounded-full border border-foreground/10 [animation:spin_26s_linear_infinite_reverse]" />
                <div className="absolute inset-[30%] rounded-full border border-[color:var(--brand)]/15 [animation:spin_34s_linear_infinite]" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inset-0 animate-ping rounded-full bg-[color:var(--brand)]/70" />
                      <span className="relative h-3 w-3 rounded-full bg-[color:var(--brand)] shadow-[0_0_28px_rgba(248,109,9,0.9)]" />
                    </span>
                    <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                      Hover to meet me
                    </p>
                  </div>
                </div>
              </div>

              {/* Video — revealed on hover / when in view */}
              <div
                className={cn(
                  "absolute inset-0 transition-all duration-[800ms] ease-out will-change-transform",
                  isRevealed
                    ? "opacity-100 scale-100 blur-0"
                    : "opacity-0 scale-95 blur-sm",
                )}
              >
                <video
                  ref={videoRef}
                  src={PROFILE.introVideoUrl}
                  poster={PROFILE.introPosterUrl}
                  muted={isMuted}
                  loop
                  playsInline
                  preload="auto"
                  aria-label={`${PROFILE.name} — intro`}
                  className="h-full w-full object-cover"
                />
                {/* Subtle vignette mask */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_65%,rgba(0,0,0,0.35)_100%)]" />
              </div>

              <div
                className={cn(
                  "absolute top-4 right-4 z-10 flex gap-2 transition-opacity duration-500",
                  isRevealed ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  aria-label={isMuted ? "Unmute intro video" : "Mute intro video"}
                  aria-pressed={!isMuted}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur transition-all hover:border-[color:var(--brand)] hover:text-[color:var(--brand)]"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  aria-label={isPlaying ? "Pause intro video" : "Play intro video"}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur transition-all hover:border-[color:var(--brand)] hover:text-[color:var(--brand)]"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Bottom row: marquee + scroll indicator */}
      <div className="absolute inset-x-0 bottom-0 hidden border-t border-foreground/5 bg-background/40 backdrop-blur-sm sm:block">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-4 text-[11px] uppercase tracking-[0.28em] text-muted-foreground md:px-10">
          <div className="hidden items-center gap-2 md:flex">
            <span className="h-1 w-1 rounded-full bg-[color:var(--brand)]" />
            Scroll to explore
          </div>
          <div className="hidden gap-8 sm:flex">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <span className="font-display text-base font-semibold text-foreground">
                  {s.value}
                </span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <div className="font-mono text-[10px]">© {new Date().getFullYear()}</div>
        </div>
      </div>
    </section>
  );
}

// ————————————————————————————————————————————————————————————
// About — editorial paragraph
// ————————————————————————————————————————————————————————————
export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-32 md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-10">
        <SectionLabel index="01" label="About" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-3">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
                A little about me
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-9">
            <Reveal delay={80}>
              <h2 className="font-display text-[clamp(1.65rem,5vw,4rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-foreground/95">
                I'm a developer and marketer who believes software is a craft — where
                <span className="text-muted-foreground/70"> code, design and words </span>
                have to feel considered, useful and quietly premium.
              </h2>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
              <Reveal delay={160}>
                <p className="text-base leading-[1.7] text-muted-foreground md:text-lg">
                  I build web products with React and TypeScript, prototype AI tools
                  with the Gemini API, and design digital marketing systems that
                  actually convert. I care about the small things — typography,
                  spacing, easing curves — because those are what make an interface
                  feel expensive.
                </p>
              </Reveal>
              <Reveal delay={220}>
                <p className="text-base leading-[1.7] text-muted-foreground md:text-lg">
                  Outside of shipping, I'm continuously learning — data analytics,
                  automation, prompt engineering. My goal is simple: build things I'd
                  want to use, and help brands look and feel a step above the rest.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ————————————————————————————————————————————————————————————
// Services
// ————————————————————————————————————————————————————————————
export function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-32 md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-10">
        <SectionLabel index="02" label="What I Do" />

        <Reveal>
          <h2 className="max-w-4xl font-display text-[clamp(1.75rem,5vw,4rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
            Services crafted for founders,
            <span className="text-muted-foreground/60"> brands and teams </span>
            who care about detail.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 divide-y divide-foreground/5 border-y border-foreground/5 sm:grid-cols-2 sm:divide-x lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <div className="group relative flex h-full flex-col justify-between gap-6 p-6 transition-colors hover:bg-foreground/[0.02] active:bg-foreground/[0.03] sm:gap-8 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--brand)]" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.6] text-muted-foreground">
                    {s.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ————————————————————————————————————————————————————————————
// Skills — pills
// ————————————————————————————————————————————————————————————
export function Skills() {
  return (
    <section id="skills" className="relative py-20 sm:py-32 md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-10">
        <SectionLabel index="03" label="Skills & Stack" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="font-display text-[clamp(1.6rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
                A toolkit tuned for speed, quality and craft.
              </h2>
            </Reveal>
          </div>
          <div className="space-y-10 lg:col-span-8">
            {SKILLS.map((group, i) => (
              <Reveal key={group.title} delay={i * 80}>
                <div className="border-t border-foreground/5 pt-8">
                  <div className="mb-5 flex items-baseline justify-between">
                    <h3 className="font-display text-base font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                      {group.title}
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
                      {String(i + 1).padStart(2, "0")} / {String(SKILLS.length).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {group.items.map((s) => (
                      <span
                        key={s.name}
                        className={cn(
                          "inline-flex min-h-[36px] items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] transition-colors sm:px-4 sm:py-2 sm:text-sm",
                          s.status === "learning"
                            ? "border-foreground/10 text-muted-foreground"
                            : "border-foreground/15 bg-foreground/[0.03] text-foreground hover:border-[color:var(--brand)] hover:text-[color:var(--brand)] active:border-[color:var(--brand)] active:text-[color:var(--brand)]",
                        )}
                      >
                        {s.name}
                        {s.status === "learning" && (
                          <span className="text-[10px] uppercase tracking-widest text-[color:var(--brand)]/80">
                            learning
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ————————————————————————————————————————————————————————————
// Projects — editorial large rows
// ————————————————————————————————————————————————————————————
function ProjectCover({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const combos = [
    "linear-gradient(135deg,#F86D09 0%,#7a2b00 60%,#f6f1ea 100%)",
    "linear-gradient(135deg,#1a1a1a 0%,#3a1e0a 55%,#F86D09 120%)",
    "linear-gradient(135deg,#F86D09 0%,#f6f1ea 70%)",
    "linear-gradient(135deg,#efe7dc 0%,#f6f1ea 60%,#F86D09 130%)",
    "linear-gradient(135deg,#F86D09 0%,#f6f1ea 100%)",
  ];
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Skeleton / gradient placeholder */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-700",
          loaded ? "opacity-0" : "opacity-100",
        )}
        style={{ background: combos[index % combos.length] }}
        aria-hidden
      />
      {project.image ? (
        <img
          src={project.image}
          alt={`${project.title} project cover`}
          loading="lazy"
          decoding="async"
          sizes="(max-width: 768px) 100vw, 55vw"
          onLoad={() => setLoaded(true)}
          className={cn(
            "h-full w-full object-cover object-top transition-all duration-700 ease-out will-change-transform",
            "group-hover:scale-110",
            loaded ? "opacity-100" : "opacity-0",
          )}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: combos[index % combos.length] }}
        />
      )}
    </div>
  );
}

function ProjectRow({ project, index }: { project: (typeof PROJECTS)[number]; index: number }) {
  const primaryHref = project.demo || project.github || "#projects";
  return (
    <article className="group relative border-t border-foreground/5 py-8 md:py-14">
      {/* Primary link covers the whole card */}
      <a
        href={primaryHref}
        target={primaryHref !== "#projects" ? "_blank" : undefined}
        rel={primaryHref !== "#projects" ? "noreferrer" : undefined}
        className="absolute inset-0 z-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`Open ${project.title}`}
      />

      <div className="relative z-10 grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_1.1fr] md:gap-12">
        <div className="order-3 min-w-0 md:order-none">
          <div className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            <span>{project.category}</span>
            <span className="h-px w-6 bg-foreground/15" />
            <span>{project.year}</span>
          </div>
          <h3 className="font-display text-[clamp(1.5rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em] transition-colors group-hover:text-[color:var(--brand)] group-active:text-[color:var(--brand)]">
            {project.title}
          </h3>
          <p className="mt-3 max-w-lg text-sm leading-[1.6] text-muted-foreground md:text-base">
            {project.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-foreground/10 px-2.5 py-0.5 text-[11px] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Explicit action buttons — sit above the primary overlay */}
          <div className="relative z-20 mt-6 flex flex-wrap items-center gap-3">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-[color:var(--brand)] px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(248,109,9,0.35)] active:scale-[0.96]"
              >
                Live Demo
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-foreground/15 px-4 py-2 text-sm font-medium transition-colors hover:border-foreground/30 hover:bg-foreground/5 active:bg-foreground/5"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            )}
            {!project.demo && !project.github && (
              <span className="text-sm text-muted-foreground">Case study</span>
            )}
          </div>
        </div>

        <div className="order-2 relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-foreground/10 transition-all duration-500 group-hover:border-[color:var(--brand)]/30 group-hover:shadow-[0_0_40px_rgba(248,109,9,0.12)] sm:aspect-[16/10] md:order-none">
          <div className="absolute inset-0 scale-100 transition-transform duration-700 ease-out group-hover:scale-[1.06]">
            <ProjectCover project={project} index={index} />
            {!project.image && (
              <div
                className="absolute inset-0 opacity-25 mix-blend-overlay"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
            )}
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
          <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/80">
              {project.tagline}
            </span>
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur transition-all group-hover:-translate-y-0.5 group-hover:bg-[color:var(--brand)] group-hover:text-white">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative py-20 sm:py-32 md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-10">
        <SectionLabel index="04" label="Selected Work" />

        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <h2 className="max-w-3xl font-display text-[clamp(1.75rem,5vw,4rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
              Projects with
              <span className="text-[color:var(--brand)]"> intent</span>, not filler.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <a
              href={PROFILE.socials.github}
              target="_blank"
              rel="noreferrer"
              className="hidden shrink-0 items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground md:inline-flex"
            >
              All on GitHub
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 border-b border-foreground/5">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 40} y={30}>
              <ProjectRow project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ————————————————————————————————————————————————————————————
// Experience + Certifications
// ————————————————————————————————————————————————————————————
export function Experience() {
  const timeline = useMemo(
    () => [
      ...EXPERIENCE.map((e) => ({
        kind: "Experience" as const,
        title: e.role,
        org: e.org,
        period: e.period,
        detail: e.points.join(" · "),
      })),
      ...EDUCATION.map((e) => ({
        kind: "Education" as const,
        title: e.degree,
        org: e.school,
        period: e.period,
        detail: e.detail,
      })),
    ],
    [],
  );

  return (
    <section id="experience" className="relative py-20 sm:py-32 md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-10">
        <SectionLabel index="05" label="Journey" />

        <Reveal>
          <h2 className="max-w-3xl font-display text-[clamp(1.75rem,5vw,4rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
            A short timeline of learning, building and
            <span className="text-[color:var(--brand)]"> shipping</span>.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <ol className="relative border-l border-foreground/10">
              {timeline.map((t, i) => (
                <Reveal key={t.title + i} delay={i * 60}>
                  <li className="relative pl-6 pb-10 last:pb-0 sm:pl-8 sm:pb-12">
                    <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border border-[color:var(--brand)] bg-background">
                      <span className="absolute inset-[3px] rounded-full bg-[color:var(--brand)]" />
                    </span>
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--brand)]">
                        {t.kind}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                        {t.period}
                      </span>
                    </div>
                    <h4 className="mt-2 font-display text-lg font-semibold tracking-tight sm:text-xl md:text-2xl">
                      {t.title}
                    </h4>
                    <p className="mt-1 text-sm uppercase tracking-[0.18em] text-muted-foreground">
                      {t.org}
                    </p>
                    {t.detail && (
                      <p className="mt-3 max-w-2xl text-sm leading-[1.7] text-muted-foreground md:text-base">
                        {t.detail}
                      </p>
                    )}
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-4">
            <Reveal delay={100}>
              <h3 className="mb-6 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                Certifications
              </h3>
            </Reveal>
            <div className="grid grid-cols-1 gap-3">
              {CERTIFICATIONS.map((c, i) => (
                <Reveal key={c.title} delay={i * 50}>
                  <div className="group flex items-start justify-between gap-4 rounded-md border border-foreground/8 p-4 transition-all hover:-translate-y-0.5 hover:border-[color:var(--brand)]/60 hover:bg-foreground/[0.02]">
                    <div>
                      <p className="font-display text-sm font-semibold tracking-tight">
                        {c.title}
                      </p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                        {c.issuer}
                      </p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--brand)]" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ————————————————————————————————————————————————————————————
// Contact — editorial
// ————————————————————————————————————————————————————————————
export function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email})`,
    );
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-32 md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-10">
        <SectionLabel index="06" label="Contact" />

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
                — Have an idea?
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 font-display text-[clamp(2.25rem,8vw,6rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
                Let's make
                <br />
                <span className="text-[color:var(--brand)]">something great.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 max-w-lg text-base leading-[1.7] text-muted-foreground md:text-lg">
                Freelance, internships, collaborations or a friendly hello — my
                inbox is open. I usually reply within a day.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-12 space-y-4">
                <a
                  href={PROFILE.socials.email}
                  className="group flex items-center justify-between border-t border-foreground/10 py-4 text-lg font-medium transition-colors hover:text-[color:var(--brand)]"
                >
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      Email
                    </span>
                    {PROFILE.email}
                  </span>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a
                  href={PROFILE.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between border-t border-foreground/10 py-4 text-lg font-medium transition-colors hover:text-[color:var(--brand)]"
                >
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      LinkedIn
                    </span>
                    saran-kumar
                  </span>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a
                  href={PROFILE.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between border-t border-b border-foreground/10 py-4 text-lg font-medium transition-colors hover:text-[color:var(--brand)]"
                >
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      GitHub
                    </span>
                    saran-official
                  </span>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={100}>
              <form onSubmit={onSubmit} aria-label="Contact form" className="space-y-8">
                <FieldEditorial label="Your name">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Appleseed"
                    className="w-full border-b border-foreground/15 bg-transparent py-3 text-base outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-[color:var(--brand)]"
                  />
                </FieldEditorial>
                <FieldEditorial label="Email">
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full border-b border-foreground/15 bg-transparent py-3 text-base outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-[color:var(--brand)]"
                  />
                </FieldEditorial>
                <FieldEditorial label="Message">
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project, timeline and goals…"
                    className="w-full resize-none border-b border-foreground/15 bg-transparent py-3 text-base outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-[color:var(--brand)]"
                  />
                </FieldEditorial>
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-muted-foreground">
                    {sent ? "Opening your email client…" : "Opens in your mail app."}
                  </p>
                  <button
                    type="submit"
                    className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[color:var(--brand)] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.96]"
                  >
                    Send message
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function FieldEditorial({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

// ————————————————————————————————————————————————————————————
// Footer
// ————————————————————————————————————————————————————————————
export function Footer() {
  return (
    <footer className="relative border-t border-foreground/5">
      <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-6 sm:py-16 md:px-10 md:py-24">
        <div className="flex flex-col gap-12">
          <a
            href="#home"
            className="font-display text-[clamp(2.5rem,12vw,8rem)] font-bold leading-none tracking-[-0.03em]"
          >
            Saran<span className="text-[color:var(--brand)]">.</span>
          </a>

          <div className="grid grid-cols-1 gap-8 border-t border-foreground/5 pt-10 md:grid-cols-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Connect
              </p>
              <div className="mt-4 flex gap-3">
                <SocialIcon href={PROFILE.socials.github} label="GitHub">
                  <Github className="h-4 w-4" />
                </SocialIcon>
                <SocialIcon href={PROFILE.socials.linkedin} label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </SocialIcon>
                <SocialIcon href={PROFILE.socials.instagram} label="Instagram">
                  <Instagram className="h-4 w-4" />
                </SocialIcon>
                <SocialIcon href={PROFILE.socials.email} label="Email">
                  <Mail className="h-4 w-4" />
                </SocialIcon>
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Elsewhere
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a href={PROFILE.resumeUrl} download className="hover:text-[color:var(--brand)]">
                    Download Resume ↗
                  </a>
                </li>
                <li>
                  <a href="#projects" className="hover:text-[color:var(--brand)]">
                    Selected Work
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[color:var(--brand)]">
                    Start a project
                  </a>
                </li>
              </ul>
            </div>
            <div className="md:text-right">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Location
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Based in {PROFILE.location}
              </p>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium hover:text-[color:var(--brand)]"
              >
                Back to top ↑
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-foreground/5 pt-8 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            <span>© {new Date().getFullYear()} Saran Kumar</span>
            <span>Designed & built with care · Tiruchirappalli, IN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}