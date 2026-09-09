import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NAV_LINKS, PROFILE } from "./data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(1, y / h) : 0);
      const anchor = y + 140;
      for (const l of NAV_LINKS) {
        const el = document.querySelector<HTMLElement>(l.href);
        if (el && el.offsetTop <= anchor && el.offsetTop + el.offsetHeight > anchor) {
          setActive(l.href);
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-foreground/5"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 sm:px-6 sm:py-5 md:px-10">
        <a href="#home" className="group flex items-center gap-3">
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-full bg-[color:var(--brand)] shadow-[0_0_16px_var(--brand)]"
          />
          <span className="font-display text-sm font-semibold tracking-[0.02em]">
            Saran Kumar
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={cn(
                  "relative text-[13px] font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground",
                  active === l.href && "text-foreground",
                )}
              >
                <span className="mr-2 text-[10px] tabular-nums text-muted-foreground/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {l.label}
                {active === l.href && (
                  <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-[color:var(--brand)]" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="group hidden items-center gap-2 rounded-full border border-foreground/10 px-4 py-2 text-[13px] font-medium transition-colors hover:border-[color:var(--brand)] hover:text-[color:var(--brand)] md:inline-flex"
          >
            Let's talk
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground/10 active:bg-foreground/5 md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Scroll progress */}
      <div
        aria-hidden
        className="h-px w-full origin-left bg-[color:var(--brand)]/70 transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
      />

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-foreground/5 bg-background/95 backdrop-blur-xl transition-all md:hidden",
          open ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <ul className="flex flex-col gap-1 px-6 py-6">
          {NAV_LINKS.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 py-3 font-display text-2xl font-semibold tracking-tight text-foreground/90 hover:text-[color:var(--brand)]"
              >
                <span className="text-[11px] font-mono text-muted-foreground/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {l.label}
              </a>
            </li>
          ))}
          <li className="mt-3">
            <a
              href={PROFILE.resumeUrl}
              download
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[color:var(--brand)] px-5 py-3 text-sm font-semibold text-white active:scale-95"
            >
              Download Resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}