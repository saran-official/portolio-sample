export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      {/* Warm ambient glow */}
      <div
        className="absolute -top-40 right-[-10%] h-[720px] w-[720px] rounded-full blur-[160px] opacity-[0.18] animate-float-slow"
        style={{ background: "radial-gradient(circle, #F86D09, transparent 65%)" }}
      />
      <div
        className="absolute bottom-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full blur-[180px] opacity-[0.10] animate-float"
        style={{ background: "radial-gradient(circle, #F86D09, transparent 70%)" }}
      />
      {/* Noise */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}