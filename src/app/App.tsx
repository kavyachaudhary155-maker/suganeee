import { useState, useEffect, useRef } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import {
  Menu, X, Star, MapPin, Phone, Instagram, MessageCircle,
  ChevronDown, Sparkles as SparklesIcon, Award, Heart, Clock,
  Zap, CheckCircle, ArrowRight, Quote, BookOpen, GraduationCap,
  Palette, Users, CalendarDays, ShoppingBag, ShoppingCart, Plus, Minus, Trash2, ArrowLeft,
  Search, ShieldCheck, Truck, PackageCheck, CreditCard, LockKeyhole,
} from "lucide-react";

import photo1 from "@/assets/suganee-01.jpg";
import photo2 from "@/assets/suganee-02.jpg";
import photo3 from "@/assets/suganee-03.jpg";
import photo4 from "@/assets/suganee-04.jpg";
import photo5 from "@/assets/suganee-05.jpg";
import photo6 from "@/assets/suganee-06.jpg";
import photo7 from "@/assets/suganee-07.jpg";
import photo8 from "@/assets/suganee-08.jpg";
import photo9 from "@/assets/suganee-09.jpg";
const photo10 = photo7;

const PINK = "#c2185b";
const DEEP_PINK = "#880e4f";
const LIGHT_PINK = "#f48fb1";
const ROSE = "#fce4ec";
const PHONE_DISPLAY = "+1 (647) 244-5476";
const PHONE_LINK = "tel:+16472445476";
const WHATSAPP_LINK = "https://wa.me/16472445476";
const INSTAGRAM_LINK = "https://www.instagram.com/suganee.makeupartist/";
const INSTAGRAM_HANDLE = "@suganee.makeupartist";
const STUDIO_ADDRESS = "26 Swans Acre Trail, Brampton, ON L6R 0B3, Canada";

/* ─────────────────────────────────────────
   SCROLL ANIMATION HOOK
───────────────────────────────────────── */

type AnimVariant = "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scaleUp" | "fadeIn";

function useInView(threshold = 0.15, once = true) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once]);

  return { ref, visible };
}

function AnimateIn({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.65,
  className = "",
  style = {},
  threshold = 0.12,
}: {
  children: React.ReactNode;
  variant?: AnimVariant;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;
}) {
  const { ref, visible } = useInView(threshold);

  const initial: Record<AnimVariant, React.CSSProperties> = {
    fadeUp:    { opacity: 0, transform: "translateY(48px)" },
    fadeDown:  { opacity: 0, transform: "translateY(-48px)" },
    fadeLeft:  { opacity: 0, transform: "translateX(-60px)" },
    fadeRight: { opacity: 0, transform: "translateX(60px)" },
    scaleUp:   { opacity: 0, transform: "scale(0.82)" },
    fadeIn:    { opacity: 0 },
  };

  const animate: React.CSSProperties = { opacity: 1, transform: "none" };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        ...(visible ? animate : initial[variant]),
        transition: `opacity ${duration}s cubic-bezier(.22,.68,0,1.2) ${delay}s, transform ${duration}s cubic-bezier(.22,.68,0,1.2) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/* Staggered child wrapper — wraps each child in AnimateIn with increasing delay */
function StaggerGrid({
  children,
  className = "",
  variant = "fadeUp",
  stagger = 0.1,
  baseDelay = 0,
}: {
  children: React.ReactNode[];
  className?: string;
  variant?: AnimVariant;
  stagger?: number;
  baseDelay?: number;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <AnimateIn key={i} variant={variant} delay={baseDelay + i * stagger} threshold={0.08}>
          {child}
        </AnimateIn>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   CSS 3D SCENE COMPONENTS
───────────────────────────────────────── */

function Gem3D({ size = 40, x = "0%", y = "0%", delay = 0, duration = 6, color = PINK, rotSpeed = 1 }: {
  size?: number; x?: string; y?: string; delay?: number; duration?: number; color?: string; rotSpeed?: number;
}) {
  return (
    <div className="absolute pointer-events-none" style={{ left: x, top: y, width: size, height: size, animation: `float3d ${duration}s ease-in-out ${delay}s infinite alternate` }}>
      <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg,rgba(255,255,255,0.9) 0%,${color} 40%,${DEEP_PINK} 100%)`, clipPath: "polygon(50% 0%,100% 38%,82% 100%,18% 100%,0% 38%)", filter: `drop-shadow(0 0 ${size * 0.4}px ${color}88)`, animation: `gemSpin ${5 / rotSpeed}s linear ${delay}s infinite`, transform: "perspective(200px) rotateX(20deg)" }} />
    </div>
  );
}

function Ring3D({ size = 120, x = "0%", y = "0%", delay = 0, duration = 12, color = PINK, tiltX = 60, tiltZ = 0 }: {
  size?: number; x?: string; y?: string; delay?: number; duration?: number; color?: string; tiltX?: number; tiltZ?: number;
}) {
  return (
    <div className="absolute pointer-events-none" style={{ left: x, top: y, width: size, height: size, animation: `floatRing ${duration}s ease-in-out ${delay}s infinite alternate` }}>
      <div style={{ width: "100%", height: "100%", border: `${Math.max(2, size * 0.03)}px solid ${color}`, borderRadius: "50%", transform: `perspective(400px) rotateX(${tiltX}deg) rotateZ(${tiltZ}deg)`, boxShadow: `0 0 ${size * 0.2}px ${color}66,inset 0 0 ${size * 0.1}px ${color}33`, animation: `ringRotate ${duration * 0.7}s linear ${delay}s infinite` }} />
    </div>
  );
}

function GlowOrb({ size = 300, x = "0%", y = "0%", delay = 0, duration = 8, color = LIGHT_PINK, opacity = 0.4 }: {
  size?: number; x?: string; y?: string; delay?: number; duration?: number; color?: string; opacity?: number;
}) {
  return (
    <div className="absolute pointer-events-none" style={{ left: x, top: y, width: size, height: size, background: `radial-gradient(circle at 40% 35%,rgba(255,255,255,0.8) 0%,${color} 30%,transparent 70%)`, borderRadius: "50%", filter: `blur(${size * 0.15}px)`, opacity, animation: `floatOrb ${duration}s ease-in-out ${delay}s infinite alternate` }} />
  );
}

function Sparkle({ x = "50%", y = "50%", delay = 0, size = 4, color = LIGHT_PINK }: { x?: string; y?: string; delay?: number; size?: number; color?: string }) {
  return (
    <div className="absolute pointer-events-none" style={{ left: x, top: y, animation: `twinkle ${2 + delay * 0.5}s ease-in-out ${delay}s infinite alternate` }}>
      <div style={{ width: size, height: size, borderRadius: "50%", background: color, boxShadow: `0 0 ${size * 2}px ${color},0 0 ${size * 4}px ${color}66` }} />
    </div>
  );
}

function ParticleField({ count = 25 }: { count?: number }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    x: `${(i * 37 + 5) % 95}%`, y: `${(i * 53 + 10) % 90}%`,
    delay: i * 0.4, size: (i % 3) + 2,
    color: i % 3 === 0 ? PINK : i % 3 === 1 ? LIGHT_PINK : "#ffffff",
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => <Sparkle key={i} {...p} />)}
    </div>
  );
}

function Scene3D({ children }: { children: React.ReactNode }) {
  return <div className="absolute inset-0 overflow-hidden pointer-events-none">{children}</div>;
}

function FloatingCube({ x = "0%", y = "0%", size = 40, delay = 0, color = PINK }: { x?: string; y?: string; size?: number; delay?: number; color?: string }) {
  return (
    <div className="absolute pointer-events-none" style={{ left: x, top: y, width: size, height: size, transformStyle: "preserve-3d", animation: `cubeFloat ${5 + delay}s ease-in-out ${delay}s infinite alternate,cubeRotate ${8 + delay * 0.5}s linear ${delay}s infinite` }}>
      {[
        { transform: `translateZ(${size / 2}px)`, opacity: 0.95 },
        { transform: `rotateY(180deg) translateZ(${size / 2}px)`, opacity: 0.5 },
        { transform: `rotateY(90deg) translateZ(${size / 2}px)`, opacity: 0.7 },
        { transform: `rotateY(-90deg) translateZ(${size / 2}px)`, opacity: 0.6 },
        { transform: `rotateX(90deg) translateZ(${size / 2}px)`, opacity: 0.8 },
        { transform: `rotateX(-90deg) translateZ(${size / 2}px)`, opacity: 0.4 },
      ].map((face, i) => (
        <div key={i} className="absolute inset-0" style={{ background: `linear-gradient(135deg,${color}cc,${DEEP_PINK}88)`, border: `1px solid ${color}55`, boxShadow: `0 0 ${size * 0.3}px ${color}44`, transform: face.transform, opacity: face.opacity }} />
      ))}
    </div>
  );
}

function Diamond3D({ x = "0%", y = "0%", size = 50, delay = 0, color = PINK }: { x?: string; y?: string; size?: number; delay?: number; color?: string }) {
  return (
    <div className="absolute pointer-events-none" style={{ left: x, top: y, animation: `float3d ${4 + delay}s ease-in-out ${delay}s infinite alternate` }}>
      <div style={{ width: 0, height: 0, borderLeft: `${size / 2}px solid transparent`, borderRight: `${size / 2}px solid transparent`, borderBottom: `${size * 0.6}px solid ${color}`, filter: `drop-shadow(0 0 ${size * 0.3}px ${color}88)`, animation: `gemSpin ${6 + delay}s linear ${delay}s infinite`, position: "relative" }}>
        <div style={{ position: "absolute", top: `${size * 0.6}px`, left: `-${size / 2}px`, width: 0, height: 0, borderLeft: `${size / 2}px solid transparent`, borderRight: `${size / 2}px solid transparent`, borderTop: `${size * 0.4}px solid ${DEEP_PINK}` }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   3D CARD TILT HOOK
───────────────────────────────────────── */

function use3DTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `perspective(700px) rotateY(${x * 16}deg) rotateX(${-y * 16}deg) scale3d(1.04,1.04,1.04)`;
    el.style.boxShadow = `${-x * 20}px ${-y * 20}px 60px ${PINK}33,0 20px 60px ${PINK}22`;
  };
  const onMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "";
    ref.current.style.boxShadow = "";
  };
  return { ref, onMouseMove, onMouseLeave };
}

/* ─────────────────────────────────────────
   SECTION HEADING HELPER
───────────────────────────────────────── */

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <div className="text-center mb-14">
      <AnimateIn variant="fadeDown" delay={0}>
        <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: PINK, fontFamily: "'DM Sans',sans-serif" }}>{eyebrow}</p>
      </AnimateIn>
      <AnimateIn variant="scaleUp" delay={0.12}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 800, color: DEEP_PINK }}>{title}</h2>
        <div className="w-16 h-1 mx-auto rounded-full mt-4" style={{ background: `linear-gradient(90deg,${PINK},${LIGHT_PINK})` }} />
      </AnimateIn>
      {subtitle && (
        <AnimateIn variant="fadeUp" delay={0.22}>
          <p className="mt-4 max-w-xl mx-auto text-sm leading-relaxed" style={{ color: "#9e5a72", fontFamily: "'DM Sans',sans-serif" }}>{subtitle}</p>
        </AnimateIn>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   NAVBAR
───────────────────────────────────────── */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = ["Home", "Services", "Gallery", "Shop", "Academy", "Reviews", "Contact"];
  const scrollTo = (id: string) => {
    if (id === "Shop") openSuganeeShop();
    else document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500" style={{
      background: scrolled ? "rgba(253,246,249,0.92)" : "rgba(253,246,249,0.08)",
      backdropFilter: "blur(24px)",
      borderBottom: scrolled ? `1px solid rgba(194,24,91,0.12)` : "none",
      boxShadow: scrolled ? "0 4px 40px rgba(194,24,91,0.1)" : "none",
    }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <AnimateIn variant="fadeLeft" delay={0} duration={0.5}>
          <div>
            <div className="text-lg sm:text-xl font-bold" style={{ fontFamily: "'Playfair Display',serif", color: PINK }}>Suganee Makeup Artist | Brampton Bridal Makeover</div>
            <div className="text-[10px] tracking-[0.25em] uppercase" style={{ color: DEEP_PINK, fontFamily: "'DM Sans',sans-serif" }}>Beauty Studio &amp; Academy</div>
          </div>
        </AnimateIn>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l, i) => (
            <AnimateIn key={l} variant="fadeDown" delay={0.05 * i} duration={0.4}>
              <button onClick={() => scrollTo(l)} className={`text-xs tracking-[0.15em] uppercase font-medium transition-all ${l === "Shop" ? "px-5 py-2.5 rounded-full hover:scale-105" : "hover:opacity-50"}`} style={{ color: l === "Shop" ? "#f7e9ef" : DEEP_PINK, background: l === "Shop" ? "linear-gradient(135deg,#17171c,#29242c)" : "transparent", border: l === "Shop" ? "1px solid rgba(194,24,91,.35)" : "none", boxShadow: l === "Shop" ? "0 7px 22px rgba(25,12,20,.18)" : "none", fontFamily: "'DM Sans',sans-serif" }}>{l === "Shop" ? <><ShoppingBag size={13} className="inline mr-2" />Shop</> : l}</button>
            </AnimateIn>
          ))}
          <AnimateIn variant="fadeRight" delay={0.35} duration={0.4}>
            <button onClick={() => scrollTo("contact")} className="px-6 py-2.5 rounded-full text-xs font-bold text-white tracking-wider hover:scale-105 transition-transform" style={{ background: `linear-gradient(135deg,${PINK},${DEEP_PINK})`, boxShadow: `0 4px 20px ${PINK}55`, fontFamily: "'DM Sans',sans-serif" }}>Book Now</button>
          </AnimateIn>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ color: PINK }}>{open ? <X size={24} /> : <Menu size={24} />}</button>
      </div>
      {open && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-3" style={{ background: "rgba(253,246,249,0.97)", backdropFilter: "blur(24px)" }}>
          {links.map((l) => <button key={l} onClick={() => scrollTo(l)} className={`text-left py-2 text-sm border-b ${l === "Shop" ? "rounded-full px-4 mt-1" : ""}`} style={{ color: l === "Shop" ? "#f7e9ef" : DEEP_PINK, background: l === "Shop" ? "linear-gradient(135deg,#17171c,#29242c)" : "transparent", borderColor: l === "Shop" ? "rgba(194,24,91,.35)" : `${PINK}22`, fontFamily: "'DM Sans',sans-serif" }}>{l === "Shop" ? <><ShoppingBag size={14} className="inline mr-2" />Shop the store</> : l}</button>)}
          <button onClick={() => scrollTo("contact")} className="mt-2 py-3 rounded-full text-sm font-bold text-white" style={{ background: `linear-gradient(135deg,${PINK},${DEEP_PINK})`, fontFamily: "'DM Sans',sans-serif" }}>Book Appointment</button>
        </div>
      )}
    </nav>
  );
}

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */

function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "linear-gradient(135deg,#fdf6f9 0%,#fff0f5 40%,#fde8f0 100%)" }}>
      <Scene3D>
        <GlowOrb size={600} x="-10%" y="-15%" delay={0} duration={9} color={LIGHT_PINK} opacity={0.35} />
        <GlowOrb size={500} x="55%" y="-5%" delay={2} duration={11} color={PINK} opacity={0.18} />
        <GlowOrb size={350} x="75%" y="55%" delay={1} duration={8} color={ROSE} opacity={0.5} />
        <Ring3D size={420} x="52%" y="8%" delay={0} duration={18} color={`${PINK}55`} tiltX={72} />
        <Ring3D size={300} x="58%" y="18%" delay={1} duration={14} color={`${LIGHT_PINK}66`} tiltX={55} tiltZ={25} />
        <Ring3D size={180} x="20%" y="70%" delay={2} duration={10} color={`${PINK}44`} tiltX={80} tiltZ={45} />
        <Gem3D size={36} x="8%" y="20%" delay={0} duration={6} color={PINK} />
        <Gem3D size={24} x="88%" y="15%" delay={1} duration={7} color={LIGHT_PINK} />
        <Gem3D size={30} x="78%" y="72%" delay={2} duration={5} color={DEEP_PINK} />
        <Gem3D size={44} x="92%" y="48%" delay={1.5} duration={6} color={PINK} />
        <FloatingCube x="3%" y="45%" size={32} delay={0} color={PINK} />
        <FloatingCube x="88%" y="80%" size={24} delay={2} color={LIGHT_PINK} />
        <Diamond3D x="70%" y="82%" size={28} delay={0} color={PINK} />
        <Diamond3D x="2%" y="35%" size={22} delay={1.5} color={LIGHT_PINK} />
        <ParticleField count={30} />
      </Scene3D>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[88vh]">
          {/* Text */}
          <div className="flex flex-col justify-center">
            <AnimateIn variant="fadeLeft" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-[0.25em] uppercase mb-6 self-start" style={{ background: `linear-gradient(135deg,${ROSE},rgba(244,143,177,0.3))`, color: DEEP_PINK, border: `1px solid ${LIGHT_PINK}55`, fontFamily: "'DM Sans',sans-serif" }}>
                <SparklesIcon size={12} /> Premium Makeup &amp; Hair · Brampton
              </div>
            </AnimateIn>
            <AnimateIn variant="fadeLeft" delay={0.22}>
              <h1 className="mb-4 leading-[1.05]" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(3.5rem,8vw,7rem)", fontWeight: 900, background: `linear-gradient(135deg,${DEEP_PINK} 0%,${PINK} 50%,${LIGHT_PINK} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Suganee<br /><em>Makeup Artist</em>
              </h1>
            </AnimateIn>
            <AnimateIn variant="fadeLeft" delay={0.34}>
              <p className="text-sm mb-2 tracking-[0.3em] uppercase font-semibold" style={{ color: PINK, fontFamily: "'DM Sans',sans-serif" }}>Makeup &amp; Hair Artist · Brampton</p>
              <p className="text-base mb-8 max-w-md leading-relaxed" style={{ color: "#9e5a72", fontFamily: "'DM Sans',sans-serif" }}>
                Transforming beauty into art. Bridal, editorial &amp; luxury makeup looks that make every woman feel like royalty on her most special day.
              </p>
            </AnimateIn>
            <AnimateIn variant="fadeUp" delay={0.44}>
              <div className="flex flex-wrap gap-4 mb-10">
                <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white hover:scale-105 transition-all duration-300 group" style={{ background: `linear-gradient(135deg,${PINK},${DEEP_PINK})`, boxShadow: `0 12px 40px ${PINK}55`, fontFamily: "'DM Sans',sans-serif" }}>
                  Book Appointment <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold hover:scale-105 transition-all" style={{ border: `2px solid ${PINK}`, color: PINK, background: "rgba(255,255,255,0.45)", backdropFilter: "blur(16px)", fontFamily: "'DM Sans',sans-serif" }}>
                  View Portfolio
                </button>
              </div>
            </AnimateIn>
            <AnimateIn variant="fadeUp" delay={0.54}>
              <div className="flex gap-8">
                {[["500+","Brides Made"],["8+","Years Experience"],["100%","Satisfaction"]].map(([n, l]) => (
                  <div key={l} className="text-center">
                    <div className="text-2xl font-black" style={{ fontFamily: "'Playfair Display',serif", color: PINK }}>{n}</div>
                    <div className="text-xs tracking-wider uppercase" style={{ color: "#9e5a72", fontFamily: "'DM Sans',sans-serif" }}>{l}</div>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>

          {/* Hero photo */}
          <AnimateIn variant="fadeRight" delay={0.3} duration={0.8}>
            <div className="relative flex justify-center items-center">
              <div className="absolute" style={{ width: 440, height: 440, borderRadius: "50%", background: `radial-gradient(circle,${LIGHT_PINK}44 0%,transparent 70%)`, filter: "blur(30px)", animation: "pulse3d 4s ease-in-out infinite alternate" }} />
              <div className="absolute" style={{ width: 440, height: 440, borderRadius: "50%", border: `1px solid ${PINK}33`, transform: "perspective(600px) rotateX(75deg)", animation: "ringRotate 20s linear infinite" }} />
              <div className="absolute" style={{ width: 360, height: 360, borderRadius: "50%", border: `2px solid ${LIGHT_PINK}44`, transform: "perspective(600px) rotateX(75deg) rotateZ(30deg)", animation: "ringRotate 14s linear infinite reverse" }} />
              <div style={{ width: 320, position: "relative", zIndex: 10, borderRadius: "40% 60% 60% 40% / 60% 40% 60% 40%", overflow: "hidden", border: `3px solid rgba(244,143,177,0.5)`, boxShadow: `0 30px 80px ${PINK}44,0 0 0 8px rgba(244,143,177,0.1)`, animation: "morphBlob 8s ease-in-out infinite" }}>
                <ImageWithFallback src={photo10} alt="Bridal makeover by Suganee Makeup Artist" className="w-full object-cover" style={{ aspectRatio: "3/4" }} />
              </div>
              <div className="absolute bottom-6 -left-2 flex items-center gap-3 px-4 py-3 rounded-2xl z-20" style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)", border: `1px solid ${LIGHT_PINK}55`, boxShadow: `0 8px 32px ${PINK}22` }}>
                <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} size={11} fill={PINK} color={PINK} />)}</div>
                <div>
                  <div className="text-xs font-bold" style={{ color: DEEP_PINK, fontFamily: "'DM Sans',sans-serif" }}>Top Rated</div>
                  <div className="text-xs" style={{ color: "#9e5a72", fontFamily: "'DM Sans',sans-serif" }}>500+ Happy Brides</div>
                </div>
              </div>
              <div className="absolute top-6 -right-2 px-4 py-3 rounded-2xl z-20 text-center" style={{ background: `linear-gradient(135deg,${PINK},${DEEP_PINK})`, boxShadow: `0 8px 32px ${PINK}55` }}>
                <Award size={20} color="white" />
                <div className="text-xs font-bold text-white" style={{ fontFamily: "'DM Sans',sans-serif" }}>Premium</div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10" style={{ color: PINK, opacity: 0.6 }}>
        <span className="text-[10px] tracking-widest uppercase" style={{ fontFamily: "'DM Sans',sans-serif" }}>Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SERVICES
───────────────────────────────────────── */

function ServicesSection() {
  const services = [
    { icon: "💍", title: "Bridal Makeup", desc: "Timeless bridal looks from classical tradition to modern elegance.", price: "C$250" },
    { icon: "✨", title: "Airbrush Makeup", desc: "Flawless, long-lasting airbrush finish for the most premium look.", price: "C$285" },
    { icon: "📸", title: "Photoshoot Makeup", desc: "Camera-ready makeup perfected for professional photography.", price: "From C$50" },
    { icon: "👑", title: "Engagement Makeup", desc: "Soft radiant looks that photograph beautifully at your engagement.", price: "C$85 – C$120" },
    { icon: "🎭", title: "Editorial Makeup", desc: "Avant-garde artistic looks for fashion and creative projects.", price: "From C$75" },
    { icon: "🌙", title: "Reception Makeup", desc: "Long-lasting opulent looks that hold beautifully all night long.", price: "From C$95" },
  ];

  return (
    <section id="services" className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(180deg,#fff0f5 0%,#fdf6f9 100%)" }}>
      <Scene3D>
        <GlowOrb size={350} x="70%" y="-10%" delay={0} duration={9} color={PINK} opacity={0.1} />
        <GlowOrb size={250} x="-5%" y="60%" delay={1} duration={11} color={LIGHT_PINK} opacity={0.18} />
        <Ring3D size={200} x="80%" y="30%" delay={0} duration={14} color={`${PINK}44`} tiltX={65} />
        <Ring3D size={140} x="-2%" y="10%" delay={1} duration={10} color={`${LIGHT_PINK}55`} tiltX={70} tiltZ={30} />
        <Gem3D size={28} x="6%" y="8%" delay={0} color={PINK} />
        <Gem3D size={22} x="91%" y="75%" delay={1.5} color={LIGHT_PINK} />
        <Diamond3D x="85%" y="5%" size={24} delay={1} color={PINK} />
        <FloatingCube x="2%" y="80%" size={28} delay={0.5} color={LIGHT_PINK} />
      </Scene3D>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeading eyebrow="What I Offer" title="Luxury Services" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const tilt = use3DTilt();
            return (
              <AnimateIn key={i} variant="fadeUp" delay={0.08 * i} threshold={0.06}>
                <div ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}
                  className="group relative p-8 rounded-3xl cursor-default h-full"
                  style={{ background: "rgba(255,255,255,0.72)", backdropFilter: "blur(20px)", border: `1px solid rgba(194,24,91,0.12)`, boxShadow: "0 4px 24px rgba(194,24,91,0.06)", transition: "transform 0.15s ease,box-shadow 0.3s ease", willChange: "transform" }}>
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 50% 0%,${LIGHT_PINK}22,transparent 70%)` }} />
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6" style={{ background: `linear-gradient(135deg,${ROSE},rgba(244,143,177,0.3))` }}>{s.icon}</div>
                  <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Playfair Display',serif", color: DEEP_PINK }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "#9e5a72", fontFamily: "'DM Sans',sans-serif" }}>{s.desc}</p>
                  <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold" style={{ background: `linear-gradient(135deg,${PINK},${DEEP_PINK})`, color: "#fff", fontFamily: "'DM Sans',sans-serif" }}>{s.price}</div>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   WHY CHOOSE US
───────────────────────────────────────── */

function WhyChooseUs() {
  const reasons = [
    { icon: Award, title: "8+ Years of Expertise", desc: "A decade perfecting makeup artistry with thousands of satisfied clients." },
    { icon: Heart, title: "100% Cruelty-Free Products", desc: "Premium, skin-safe, cruelty-free products from top luxury international brands." },
    { icon: Zap, title: "Airbrush Technology", desc: "State-of-the-art airbrush for flawless, long-lasting, camera-ready finishes." },
    { icon: Clock, title: "Punctual & Professional", desc: "We respect your time. Always on schedule — zero compromises." },
    { icon: SparklesIcon, title: "Custom Looks for You", desc: "Fully personalized looks tailored to your unique features and event." },
    { icon: CheckCircle, title: "Trial Sessions Available", desc: "Full trial sessions so you look perfect on your special day." },
  ];

  return (
    <section id="about" className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(135deg,#fdf6f9 0%,#fff5f8 50%,#fde8f0 100%)" }}>
      <Scene3D>
        <GlowOrb size={500} x="30%" y="-20%" delay={0} duration={10} color={LIGHT_PINK} opacity={0.2} />
        <GlowOrb size={300} x="75%" y="60%" delay={2} duration={8} color={PINK} opacity={0.12} />
        <Ring3D size={300} x="-5%" y="20%" delay={0} duration={16} color={`${PINK}44`} tiltX={68} tiltZ={10} />
        <Ring3D size={200} x="80%" y="65%" delay={1.5} duration={12} color={`${LIGHT_PINK}55`} tiltX={60} />
        <Gem3D size={34} x="5%" y="10%" delay={0} color={DEEP_PINK} rotSpeed={0.8} />
        <Gem3D size={26} x="90%" y="8%" delay={2} color={LIGHT_PINK} rotSpeed={1.2} />
        <FloatingCube x="88%" y="20%" size={30} delay={1} color={PINK} />
        <Diamond3D x="3%" y="75%" size={30} delay={0.5} color={LIGHT_PINK} />
        <ParticleField count={20} />
      </Scene3D>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeading eyebrow="Why Us" title="Why Choose Suganee?" subtitle="We don't just do makeup and hair — we create confidence, beauty, and unforgettable memories." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map(({ icon: Icon, title, desc }, i) => {
            const tilt = use3DTilt();
            return (
              <AnimateIn key={i} variant={i % 2 === 0 ? "fadeLeft" : "fadeRight"} delay={0.07 * i} threshold={0.06}>
                <div ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}
                  className="group flex flex-col gap-4 p-7 rounded-3xl h-full"
                  style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(20px)", border: `1px solid rgba(194,24,91,0.1)`, boxShadow: "0 4px 20px rgba(194,24,91,0.05)", transition: "transform 0.15s ease,box-shadow 0.3s ease", willChange: "transform" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg,${PINK},${DEEP_PINK})`, boxShadow: `0 8px 20px ${PINK}44` }}>
                    <Icon size={20} color="white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2 text-lg" style={{ fontFamily: "'Playfair Display',serif", color: DEEP_PINK }}>{title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#9e5a72", fontFamily: "'DM Sans',sans-serif" }}>{desc}</p>
                  </div>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   THE SUGANEE EXPERIENCE
───────────────────────────────────────── */

function TheExperienceSection() {
  const steps = [
    { num: "01", title: "Consultation", desc: "Deep one-on-one consultation to understand your vision, skin type, outfit, and personality." },
    { num: "02", title: "Custom Curation", desc: "We hand-select every product, shade, and technique specifically for your unique features." },
    { num: "03", title: "Artistry in Action", desc: "With precision tools and expert hands, we sculpt, highlight, and transform your look." },
    { num: "04", title: "Final Perfection", desc: "Setting and finishing — ensuring every detail is flawless before your big moment." },
  ];

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(180deg,#fff5f8 0%,#fde8f0 100%)" }}>
      <Scene3D>
        <GlowOrb size={450} x="55%" y="-10%" delay={0} duration={9} color={PINK} opacity={0.13} />
        <GlowOrb size={300} x="-8%" y="50%" delay={1} duration={11} color={LIGHT_PINK} opacity={0.2} />
        <Ring3D size={380} x="35%" y="15%" delay={0} duration={20} color={`${PINK}33`} tiltX={72} />
        <Ring3D size={260} x="42%" y="22%" delay={1} duration={16} color={`${LIGHT_PINK}44`} tiltX={65} tiltZ={20} />
        <Gem3D size={30} x="5%" y="8%" delay={0} color={DEEP_PINK} />
        <Gem3D size={24} x="88%" y="75%" delay={1} color={LIGHT_PINK} />
        <FloatingCube x="4%" y="5%" size={36} delay={0} color={PINK} />
        <Diamond3D x="88%" y="5%" size={32} delay={1} color={DEEP_PINK} />
      </Scene3D>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <AnimateIn variant="fadeLeft" delay={0}>
              <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: PINK, fontFamily: "'DM Sans',sans-serif" }}>The Process</p>
              <h2 className="mb-6 leading-tight" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 800, background: `linear-gradient(135deg,${DEEP_PINK},${PINK})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                The Suganee<br /><em>Experience</em>
              </h2>
              <p className="text-base leading-relaxed mb-10" style={{ color: "#9e5a72", fontFamily: "'DM Sans',sans-serif", maxWidth: 420 }}>
                Every booking is a journey. From the first consultation to the final touch, we ensure your experience is as beautiful as your look.
              </p>
            </AnimateIn>
            <div className="flex flex-col gap-5">
              {steps.map(({ num, title, desc }, i) => (
                <AnimateIn key={num} variant="fadeLeft" delay={0.12 + i * 0.1}>
                  <div className="flex gap-5 p-5 rounded-2xl hover:-translate-y-1 transition-all duration-300" style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(16px)", border: `1px solid rgba(194,24,91,0.1)` }}>
                    <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center font-black text-white" style={{ background: `linear-gradient(135deg,${PINK},${DEEP_PINK})`, fontFamily: "'Playfair Display',serif", fontSize: "0.9rem" }}>{num}</div>
                    <div>
                      <h4 className="font-bold mb-1" style={{ color: DEEP_PINK, fontFamily: "'Playfair Display',serif" }}>{title}</h4>
                      <p className="text-sm leading-relaxed" style={{ color: "#9e5a72", fontFamily: "'DM Sans',sans-serif" }}>{desc}</p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[photo5, photo9, photo7, photo3].map((photo, i) => {
              const tilt = use3DTilt();
              return (
                <AnimateIn key={i} variant="scaleUp" delay={0.15 + i * 0.1}>
                  <div ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave} className="rounded-2xl overflow-hidden" style={{ boxShadow: `0 15px 40px ${PINK}33`, transition: "transform 0.15s ease", willChange: "transform", marginTop: i % 2 === 1 ? 24 : 0 }}>
                    <ImageWithFallback src={photo} alt="Makeup look" className="w-full object-cover" style={{ aspectRatio: "3/4" }} />
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   GALLERY
───────────────────────────────────────── */

function GallerySection() {
  const [active, setActive] = useState<number | null>(null);
  const photos = [
    { src: photo1, alt: "Suganee bridal look in a purple and gold saree" }, { src: photo2, alt: "Soft traditional makeup look" },
    { src: photo3, alt: "Traditional purple bridal makeover" }, { src: photo4, alt: "Soft makeup look with a black outfit" },
    { src: photo5, alt: "Elegant cream and gold bridal look" }, { src: photo6, alt: "Floral bridal bun hairstyle" },
    { src: photo7, alt: "Pink bridal makeover with bouquet" }, { src: photo8, alt: "Red and gold traditional bridal makeover" },
    { src: photo9, alt: "Red silk saree bridal portrait" }, { src: photo10, alt: "Pink bridal makeover with bouquet" },
  ];

  return (
    <section id="gallery" className="relative py-24 overflow-hidden" style={{ background: "#fff5f8" }}>
      <Scene3D>
        <GlowOrb size={400} x="-5%" y="30%" delay={0} duration={10} color={LIGHT_PINK} opacity={0.15} />
        <GlowOrb size={300} x="75%" y="60%" delay={2} duration={8} color={PINK} opacity={0.1} />
        <Ring3D size={160} x="85%" y="5%" delay={0} duration={12} color={`${PINK}55`} tiltX={65} />
        <Gem3D size={28} x="3%" y="5%" delay={0} color={PINK} />
        <Gem3D size={22} x="90%" y="3%" delay={1} color={LIGHT_PINK} />
        <Diamond3D x="4%" y="92%" size={26} delay={0.5} color={PINK} />
      </Scene3D>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeading eyebrow="Portfolio" title="Our Gallery" subtitle="Every face tells a different story of beauty." />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo, i) => {
            const tilt = use3DTilt();
            return (
              <AnimateIn key={i} variant="scaleUp" delay={0.05 * i} threshold={0.05}>
                <div ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}
                  className="rounded-2xl overflow-hidden cursor-pointer group relative"
                  style={{ boxShadow: `0 4px 20px rgba(194,24,91,0.1)`, transition: "transform 0.15s ease,box-shadow 0.3s ease", willChange: "transform" }}
                  onClick={() => setActive(i)}>
                  <ImageWithFallback src={photo.src} alt={photo.alt} className="w-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ aspectRatio: "3/4" }} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4" style={{ background: `linear-gradient(to top,${DEEP_PINK}cc,transparent)` }}>
                    <span className="text-white text-xs font-medium" style={{ fontFamily: "'DM Sans',sans-serif" }}>{photo.alt}</span>
                  </div>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </div>

      {active !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: "rgba(26,10,18,0.93)", backdropFilter: "blur(20px)" }} onClick={() => setActive(null)}>
          <button className="absolute top-6 right-6 p-2 rounded-full" style={{ background: "rgba(255,255,255,0.1)", color: "white" }} onClick={() => setActive(null)}><X size={24} /></button>
          <div className="max-w-lg w-full rounded-3xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <ImageWithFallback src={photos[active].src} alt={photos[active].alt} className="w-full object-contain max-h-[80vh]" />
          </div>
        </div>
      )}
    </section>
  );
}

/* ─────────────────────────────────────────
   ACADEMY PROGRAMS
───────────────────────────────────────── */

function AcademyProgramsSection() {
  const programs = [
    {
      Icon: Palette,
      level: "Foundation",
      title: "Professional Makeup Essentials",
      detail: "Master skin preparation, complexion, colour theory, eye techniques, sanitation, and a polished client-ready workflow.",
      meta: "Beginner friendly · Hands-on",
    },
    {
      Icon: GraduationCap,
      level: "Advanced",
      title: "Bridal Artistry Intensive",
      detail: "Build complete South Asian and contemporary bridal looks with long-wear makeup, draping, lashes, and luxury finishing.",
      meta: "Portfolio focused · Live practice",
    },
    {
      Icon: SparklesIcon,
      level: "Specialist",
      title: "Hair Styling Masterclass",
      detail: "Learn smooth prep, waves, textured buns, braids, extensions, accessory placement, and secure all-day bridal styling.",
      meta: "Technique driven · Small groups",
    },
  ];

  return (
    <section id="academy" className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(145deg,#fff8fb 0%,#fde8f0 100%)" }}>
      <Scene3D>
        <GlowOrb size={430} x="-8%" y="-10%" delay={0} duration={9} color={LIGHT_PINK} opacity={0.2} />
        <GlowOrb size={360} x="72%" y="40%" delay={2} duration={11} color={PINK} opacity={0.1} />
        <Ring3D size={280} x="76%" y="3%" delay={0} duration={17} color={`${PINK}33`} tiltX={68} />
        <Gem3D size={28} x="5%" y="78%" delay={1} color={PINK} />
      </Scene3D>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Suganee Makeup Academy"
          title={<>Learn the Art. <em>Build Your Career.</em></>}
          subtitle="Professional makeup and hair education in Brampton, designed for aspiring artists who want practical skill, confidence, and industry-ready technique."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {programs.map(({ Icon, level, title, detail, meta }, i) => {
            const tilt = use3DTilt();
            return (
              <AnimateIn key={title} variant="fadeUp" delay={i * 0.1}>
                <div
                  ref={tilt.ref}
                  onMouseMove={tilt.onMouseMove}
                  onMouseLeave={tilt.onMouseLeave}
                  className="relative h-full p-8 rounded-3xl overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.76)", backdropFilter: "blur(22px)", border: `1px solid ${PINK}22`, boxShadow: `0 16px 50px ${PINK}14`, transition: "transform 0.15s ease,box-shadow 0.3s ease" }}
                >
                  <div className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg,${DEEP_PINK},${PINK},${LIGHT_PINK})` }} />
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: `linear-gradient(135deg,${PINK},${DEEP_PINK})`, boxShadow: `0 10px 30px ${PINK}40` }}>
                    <Icon size={24} color="white" />
                  </div>
                  <p className="text-[10px] tracking-[0.25em] uppercase font-bold mb-2" style={{ color: PINK }}>{level} Program</p>
                  <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Playfair Display',serif", color: DEEP_PINK }}>{title}</h3>
                  <p className="text-sm leading-relaxed mb-7" style={{ color: "#815267" }}>{detail}</p>
                  <div className="pt-5 text-xs font-semibold" style={{ color: PINK, borderTop: `1px solid ${PINK}18` }}>{meta}</div>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   ACADEMY LEARNING EXPERIENCE
───────────────────────────────────────── */

function AcademyExperienceSection() {
  const features = [
    { Icon: Users, title: "Small-Batch Mentorship", text: "Personal feedback, guided correction, and space to ask questions at every stage." },
    { Icon: BookOpen, title: "Complete Artist Toolkit", text: "Product knowledge, hygiene, consultations, kit building, photography, and client care." },
    { Icon: CalendarDays, title: "Flexible Learning", text: "Focused formats for working learners, emerging artists, and skill-building professionals." },
    { Icon: Award, title: "Portfolio & Certification", text: "Finish with refined looks, stronger technique, and a professional course certificate." },
  ];

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(135deg,#250d1a 0%,#54132f 55%,#2b0b1e 100%)" }}>
      <Scene3D>
        <ParticleField count={30} />
        <Ring3D size={430} x="45%" y="8%" delay={0} duration={22} color="rgba(244,143,177,0.16)" tiltX={72} />
        <Gem3D size={30} x="5%" y="12%" delay={0} color={LIGHT_PINK} />
        <Diamond3D x="90%" y="78%" size={30} delay={1} color={PINK} />
      </Scene3D>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
          <AnimateIn variant="fadeLeft">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: LIGHT_PINK }}>Inside the Academy</p>
              <h2 className="text-white mb-5 leading-tight" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 800 }}>
                Technique that becomes <em style={{ color: LIGHT_PINK }}>second nature.</em>
              </h2>
              <p className="text-sm sm:text-base leading-relaxed mb-8" style={{ color: "rgba(255,235,243,0.72)" }}>
                Learn Suganee&apos;s complete approach from consultation to final reveal, with demonstrations followed by supervised practice and constructive feedback.
              </p>
              <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white font-bold hover:scale-105 transition-transform" style={{ color: DEEP_PINK }}>
                Ask About Academy Dates <ArrowRight size={17} />
              </button>
            </div>
          </AnimateIn>
          <div className="grid sm:grid-cols-2 gap-5">
            {features.map(({ Icon, title, text }, i) => (
              <AnimateIn key={title} variant={i % 2 ? "fadeRight" : "fadeUp"} delay={i * 0.08}>
                <div className="h-full p-6 rounded-3xl" style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(20px)", border: "1px solid rgba(244,143,177,0.2)" }}>
                  <Icon size={23} color={LIGHT_PINK} className="mb-5" />
                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display',serif" }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,235,243,0.66)" }}>{text}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   ACADEMY ENROLMENT
───────────────────────────────────────── */

function AcademyEnrollmentSection() {
  return (
    <section className="relative py-20 overflow-hidden" style={{ background: "linear-gradient(120deg,#fff7fa,#fde1ec)" }}>
      <Scene3D>
        <GlowOrb size={500} x="15%" y="-40%" delay={0} duration={10} color={LIGHT_PINK} opacity={0.24} />
        <FloatingCube x="6%" y="60%" size={28} delay={0} color={PINK} />
        <Gem3D size={26} x="91%" y="14%" delay={1} color={DEEP_PINK} />
      </Scene3D>
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <AnimateIn variant="scaleUp">
          <div className="p-8 sm:p-12 rounded-[2rem] text-center" style={{ background: "rgba(255,255,255,0.72)", backdropFilter: "blur(24px)", border: `1px solid ${PINK}26`, boxShadow: `0 25px 80px ${PINK}20` }}>
            <div className="w-14 h-14 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: `linear-gradient(135deg,${PINK},${DEEP_PINK})` }}>
              <GraduationCap size={25} color="white" />
            </div>
            <p className="text-xs tracking-[0.35em] uppercase mb-3" style={{ color: PINK }}>Now Accepting Enquiries</p>
            <h2 className="mb-4" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 800, color: DEEP_PINK }}>Your artistry journey starts here.</h2>
            <p className="max-w-2xl mx-auto mb-8 text-sm leading-relaxed" style={{ color: "#815267" }}>
              Tell us your experience level and learning goals. We&apos;ll help you choose the right makeup or hair program and share upcoming Brampton course dates.
            </p>
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold hover:scale-105 transition-transform" style={{ background: `linear-gradient(135deg,${PINK},${DEEP_PINK})`, boxShadow: `0 12px 35px ${PINK}45` }}>
              Enquire About Training <ArrowRight size={17} />
            </button>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   REVIEWS
───────────────────────────────────────── */

function ReviewsSection() {
  const reviews = [
    { name: "Priya Sharma", event: "Bridal Makeup", rating: 5, text: "Suganee is absolutely magical! My bridal look was exactly what I dreamed of — soft, glowing, and utterly timeless. She made me feel like a queen." },
    { name: "Neha Patel", event: "Airbrush Makeup", rating: 5, text: "I was blown away by the quality. The makeup stayed perfect all night. Airbrushing was flawless. Highly recommended!" },
    { name: "Ritika Joshi", event: "Engagement Makeup", rating: 5, text: "Suganee understood exactly what I wanted without much explanation. Results exceeded expectations. Truly a gifted artist." },
    { name: "Ananya Mehta", event: "Party Makeup", rating: 5, text: "Got so many compliments! She worked with my skin tone perfectly and the colors she chose were stunning. Will book again." },
    { name: "Surbhi Agarwal", event: "Bridal Makeup", rating: 5, text: "Best decision for my wedding. Professional, punctual, incredibly talented. She sees the beauty in you and amplifies it." },
    { name: "Kavita Desai", event: "Photoshoot Makeup", rating: 5, text: "Camera-perfect every shot. She knows exactly how light hits makeup. A true professional." },
  ];

  return (
    <section id="reviews" className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(180deg,#fde8f0 0%,#fdf6f9 100%)" }}>
      <Scene3D>
        <GlowOrb size={400} x="-8%" y="20%" delay={0} duration={9} color={PINK} opacity={0.12} />
        <GlowOrb size={300} x="75%" y="65%" delay={2} duration={11} color={LIGHT_PINK} opacity={0.18} />
        <Ring3D size={220} x="82%" y="5%" delay={0} duration={15} color={`${PINK}44`} tiltX={68} />
        <Ring3D size={160} x="3%" y="70%" delay={1} duration={11} color={`${LIGHT_PINK}55`} tiltX={72} tiltZ={20} />
        <Gem3D size={32} x="88%" y="8%" delay={0} color={PINK} rotSpeed={0.9} />
        <FloatingCube x="92%" y="70%" size={26} delay={1} color={DEEP_PINK} />
        <Diamond3D x="6%" y="85%" size={28} delay={0} color={PINK} />
        <ParticleField count={18} />
      </Scene3D>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeading eyebrow="Testimonials" title="What Brides Say" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => {
            const tilt = use3DTilt();
            return (
              <AnimateIn key={i} variant="fadeUp" delay={0.09 * i} threshold={0.06}>
                <div ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}
                  className="p-7 rounded-3xl relative overflow-hidden h-full"
                  style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(20px)", border: `1px solid rgba(194,24,91,0.1)`, boxShadow: "0 4px 24px rgba(194,24,91,0.07)", transition: "transform 0.15s ease", willChange: "transform" }}>
                  <Quote size={32} className="absolute top-5 right-5 opacity-10" style={{ color: PINK }} />
                  <div className="flex items-center gap-1 mb-4">{[...Array(r.rating)].map((_, j) => <Star key={j} size={14} fill={PINK} color={PINK} />)}</div>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "#5c3548", fontFamily: "'DM Sans',sans-serif" }}>&ldquo;{r.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: `linear-gradient(135deg,${PINK},${DEEP_PINK})` }}>{r.name[0]}</div>
                    <div>
                      <div className="font-semibold text-sm" style={{ color: DEEP_PINK, fontFamily: "'Playfair Display',serif" }}>{r.name}</div>
                      <div className="text-xs" style={{ color: "#9e5a72", fontFamily: "'DM Sans',sans-serif" }}>{r.event}</div>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   COMPLIMENTS STATS
───────────────────────────────────────── */

function ComplimentsSection() {
  const stats = [
    ["500+","Bridal Transformations"],["200+","5-Star Reviews"],["8+","Years of Artistry"],
    ["5+","Cities Served"],["300+","Airbrush Looks"],["1000+","Happy Families"],
  ];
  return (
    <section className="relative py-20 overflow-hidden" style={{ background: `linear-gradient(135deg,${DEEP_PINK},${PINK},#e91e8c)` }}>
      <Scene3D>
        <ParticleField count={35} />
        <Gem3D size={40} x="2%" y="10%" delay={0} color="rgba(255,255,255,0.7)" rotSpeed={0.8} />
        <Gem3D size={30} x="90%" y="70%" delay={1} color="rgba(255,255,255,0.6)" rotSpeed={1} />
        <Ring3D size={200} x="75%" y="-10%" delay={0} duration={15} color="rgba(255,255,255,0.2)" tiltX={70} />
        <FloatingCube x="85%" y="10%" size={32} delay={1} color="rgba(255,255,255,0.15)" />
        <Diamond3D x="5%" y="65%" size={28} delay={0.5} color="rgba(255,255,255,0.5)" />
      </Scene3D>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <AnimateIn variant="fadeDown" delay={0}>
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.4em] uppercase mb-3 text-pink-200" style={{ fontFamily: "'DM Sans',sans-serif" }}>Achievements</p>
            <h2 className="text-white" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800 }}>Numbers Speak Louder</h2>
          </div>
        </AnimateIn>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {stats.map(([v, l], i) => (
            <AnimateIn key={i} variant="scaleUp" delay={0.07 * i} threshold={0.1}>
              <div className="text-center p-5 rounded-2xl hover:scale-105 transition-transform duration-300" style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <div className="text-3xl font-black text-white mb-1" style={{ fontFamily: "'Playfair Display',serif" }}>{v}</div>
                <div className="text-xs text-pink-100 leading-tight" style={{ fontFamily: "'DM Sans',sans-serif" }}>{l}</div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   AWARDS
───────────────────────────────────────── */

function AwardsSection() {
  const awards = [
    { icon: "01", title: "Bridal Beauty Specialist", subtitle: "Signature Artistry", desc: "Known for refined bridal makeup and hair that feels personal, polished, and beautifully camera-ready." },
    { icon: "02", title: "Premium Beauty Expert", subtitle: "Luxury Experience", desc: "A detail-led beauty experience with tailored consultations and premium professional products." },
    { icon: "03", title: "Client-Loved Studio", subtitle: "Brampton, Ontario", desc: "Trusted by brides and occasion clients for attentive service, calm energy, and lasting results." },
    { icon: "04", title: "Hair & Makeup Specialist", subtitle: "Complete Styling", desc: "One cohesive vision for makeup, hair, accessories, and the complete final look." },
    { icon: "05", title: "Beauty Educator", subtitle: "Suganee Makeup Academy", desc: "Practical, technique-first education for the next generation of makeup and hair artists." },
    { icon: "06", title: "Artist of Excellence", subtitle: "Professional Standards", desc: "Committed to hygiene, precision, continuous learning, and a luxury client experience." },
  ];

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(180deg,#fdf6f9 0%,#fff0f5 100%)" }}>
      <Scene3D>
        {[0,1,2,3,4,5,6,7].map((i) => {
          const angle = (i / 8) * 360;
          return <Gem3D key={i} size={16 + (i % 3) * 8} x={`${50 + 42 * Math.cos(angle * Math.PI / 180)}%`} y={`${50 + 38 * Math.sin(angle * Math.PI / 180)}%`} delay={i * 0.5} color={i % 2 === 0 ? PINK : LIGHT_PINK} rotSpeed={0.7} />;
        })}
        <GlowOrb size={500} x="20%" y="-15%" delay={0} duration={10} color={LIGHT_PINK} opacity={0.18} />
        <Ring3D size={350} x="28%" y="15%" delay={0} duration={22} color={`${PINK}33`} tiltX={74} />
        <Ring3D size={250} x="35%" y="22%" delay={1} duration={17} color={`${LIGHT_PINK}44`} tiltX={65} tiltZ={15} />
        <FloatingCube x="2%" y="5%" size={40} delay={0} color={PINK} />
        <Diamond3D x="88%" y="3%" size={36} delay={1} color={DEEP_PINK} />
        <ParticleField count={22} />
      </Scene3D>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <AnimateIn variant="scaleUp" delay={0}>
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: PINK, fontFamily: "'DM Sans',sans-serif" }}>Recognition</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 900, background: `linear-gradient(135deg,${DEEP_PINK},${PINK},${LIGHT_PINK})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Brampton&apos;s Choice for<br /><em>Makeup &amp; Hair</em>
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-sm leading-relaxed" style={{ color: "#9e5a72", fontFamily: "'DM Sans',sans-serif" }}>Personalized beauty, refined technique, and a calm luxury experience — Suganee brings complete makeup and hair artistry to Brampton.</p>
          </div>
        </AnimateIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map(({ icon, title, subtitle, desc }, i) => {
            const tilt = use3DTilt();
            return (
              <AnimateIn key={i} variant="fadeUp" delay={0.08 * i} threshold={0.06}>
                <div ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}
                  className="group relative p-8 rounded-3xl overflow-hidden h-full"
                  style={{ background: "rgba(255,255,255,0.72)", backdropFilter: "blur(24px)", border: `1px solid rgba(194,24,91,0.15)`, boxShadow: "0 8px 32px rgba(194,24,91,0.08)", transition: "transform 0.15s ease,box-shadow 0.3s ease", willChange: "transform" }}>
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ background: `linear-gradient(90deg,${PINK},${LIGHT_PINK},${DEEP_PINK})` }} />
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 30% 20%,${LIGHT_PINK}18,transparent 60%)` }} />
                  <div className="w-11 h-11 rounded-full mb-4 flex items-center justify-center text-sm font-black text-white" style={{ background: `linear-gradient(135deg,${PINK},${DEEP_PINK})` }}>{icon}</div>
                  <h3 className="text-lg font-bold mb-1" style={{ fontFamily: "'Playfair Display',serif", color: DEEP_PINK }}>{title}</h3>
                  <p className="text-xs font-semibold mb-3 tracking-wider uppercase" style={{ color: PINK, fontFamily: "'DM Sans',sans-serif" }}>{subtitle}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#9e5a72", fontFamily: "'DM Sans',sans-serif" }}>{desc}</p>
                </div>
              </AnimateIn>
            );
          })}
        </div>

        <AnimateIn variant="fadeUp" delay={0.3}>
          <div className="mt-12 p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6" style={{ background: `linear-gradient(135deg,${PINK}22,${LIGHT_PINK}33)`, border: `1px solid ${PINK}33`, backdropFilter: "blur(20px)" }}>
            <div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display',serif", color: DEEP_PINK }}>Ready to Experience the Best?</h3>
              <p className="text-sm" style={{ color: "#9e5a72", fontFamily: "'DM Sans',sans-serif" }}>Join brides and beauty clients who trust Suganee for their most important moments.</p>
            </div>
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white flex-shrink-0 hover:scale-105 transition-transform" style={{ background: `linear-gradient(135deg,${PINK},${DEEP_PINK})`, boxShadow: `0 12px 40px ${PINK}44`, fontFamily: "'DM Sans',sans-serif" }}>
              Book Now <ArrowRight size={16} />
            </button>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   LOVE & PRAISE — DARK
───────────────────────────────────────── */

function LovePraiseSection() {
  const praises = [
    { quote: "Suganee brought my entire bridal vision together. The makeup felt light, my hair stayed perfect, and I still looked completely like myself.", author: "Bridal Client", type: "Bride" },
    { quote: "Every detail was considered, from my skin prep to the placement of my jewellery. The whole experience felt calm and luxurious.", author: "Brampton Client", type: "Review" },
    { quote: "On my wedding day I looked in the mirror and cried — not from nerves, but because I had never seen myself look so beautiful.", author: "Pooja R.", type: "Letter" },
    { quote: "Her teaching is clear, practical, and generous. I left the academy with stronger technique and much more confidence.", author: "Academy Student", type: "Training" },
  ];

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(135deg,#1a0a12 0%,#2d0e1f 50%,#1a0a12 100%)" }}>
      <Scene3D>
        <ParticleField count={40} />
        <Gem3D size={38} x="3%" y="8%" delay={0} color={LIGHT_PINK} rotSpeed={0.7} />
        <Gem3D size={28} x="88%" y="5%" delay={1} color={PINK} rotSpeed={1} />
        <Gem3D size={32} x="92%" y="75%" delay={2} color="#ff80ab" rotSpeed={0.8} />
        <Gem3D size={24} x="5%" y="80%" delay={1.5} color={LIGHT_PINK} rotSpeed={1.1} />
        <Ring3D size={450} x="25%" y="20%" delay={0} duration={25} color="rgba(244,143,177,0.15)" tiltX={75} />
        <Ring3D size={300} x="32%" y="28%" delay={1} duration={18} color="rgba(194,24,91,0.2)" tiltX={65} tiltZ={20} />
        <FloatingCube x="90%" y="40%" size={36} delay={0} color="rgba(244,143,177,0.2)" />
        <Diamond3D x="45%" y="88%" size={32} delay={1} color={LIGHT_PINK} />
      </Scene3D>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <AnimateIn variant="scaleUp" delay={0}>
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.4em] uppercase mb-3 text-pink-400" style={{ fontFamily: "'DM Sans',sans-serif" }}>Love &amp; Praise</p>
            <h2 className="mb-4" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 900, background: `linear-gradient(135deg,#fff 0%,${LIGHT_PINK} 50%,${PINK} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              What the World<br /><em>Says About Us</em>
            </h2>
            <p className="max-w-md mx-auto text-sm text-pink-300 leading-relaxed" style={{ fontFamily: "'DM Sans',sans-serif" }}>From bridal mornings to academy classrooms, every kind word inspires Suganee to keep creating and teaching.</p>
          </div>
        </AnimateIn>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {praises.map(({ quote, author, type }, i) => {
            const tilt = use3DTilt();
            return (
              <AnimateIn key={i} variant={i % 2 === 0 ? "fadeLeft" : "fadeRight"} delay={0.1 * i}>
                <div ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}
                  className="p-8 rounded-3xl relative overflow-hidden h-full"
                  style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(20px)", border: `1px solid rgba(244,143,177,0.2)`, boxShadow: `0 8px 40px rgba(194,24,91,0.15)`, transition: "transform 0.15s ease", willChange: "transform" }}>
                  <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg,transparent,${LIGHT_PINK},transparent)` }} />
                  <div className="absolute top-4 right-4">
                    <span className="text-xs px-3 py-1 rounded-full font-semibold" style={{ background: `${PINK}33`, color: LIGHT_PINK, fontFamily: "'DM Sans',sans-serif" }}>{type}</span>
                  </div>
                  <Quote size={36} className="mb-4 opacity-30" style={{ color: LIGHT_PINK }} />
                  <p className="text-base leading-relaxed mb-6 italic" style={{ color: "rgba(255,240,245,0.9)", fontFamily: "'Playfair Display',serif" }}>&ldquo;{quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 rounded-full" style={{ background: `linear-gradient(180deg,${PINK},${LIGHT_PINK})` }} />
                    <span className="text-sm font-semibold" style={{ color: LIGHT_PINK, fontFamily: "'DM Sans',sans-serif" }}>{author}</span>
                  </div>
                </div>
              </AnimateIn>
            );
          })}
        </div>

        <AnimateIn variant="fadeUp" delay={0.2}>
          <div className="flex flex-wrap justify-center gap-6 p-6 rounded-3xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(244,143,177,0.15)", backdropFilter: "blur(10px)" }}>
            {[["❤️","Loved by 1000+ Families"],["📰","Featured in 5+ Publications"],["🏆","3x Award Winner"],["📸","10,000+ Looks Created"]].map(([icon, text], i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-xl">{icon}</span>
                <span className="text-sm font-medium text-pink-200" style={{ fontFamily: "'DM Sans',sans-serif" }}>{text}</span>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   APPOINTMENT
───────────────────────────────────────── */

function AppointmentSection() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", date: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(`Hello Suganee! I'd like to book an appointment.
Name: ${form.name}
Phone: ${form.phone}
Service: ${form.service}
Date: ${form.date}
Message: ${form.message}`);
    window.open(`${WHATSAPP_LINK}?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  const inputBase: React.CSSProperties = { width: "100%", padding: "14px 18px", borderRadius: 12, border: `1.5px solid rgba(194,24,91,0.2)`, background: "rgba(255,255,255,0.8)", backdropFilter: "blur(10px)", color: DEEP_PINK, fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", outline: "none" };

  return (
    <section id="contact" className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(180deg,#fdf6f9 0%,#fff0f5 100%)" }}>
      <Scene3D>
        <GlowOrb size={400} x="65%" y="-5%" delay={0} duration={9} color={LIGHT_PINK} opacity={0.18} />
        <GlowOrb size={280} x="-5%" y="60%" delay={1} duration={11} color={PINK} opacity={0.1} />
        <Ring3D size={180} x="80%" y="70%" delay={0} duration={13} color={`${PINK}44`} tiltX={68} />
        <Gem3D size={30} x="3%" y="20%" delay={0} color={DEEP_PINK} />
        <Gem3D size={24} x="91%" y="10%" delay={2} color={LIGHT_PINK} />
        <FloatingCube x="88%" y="5%" size={28} delay={1} color={PINK} />
        <Diamond3D x="4%" y="82%" size={26} delay={0.5} color={LIGHT_PINK} />
      </Scene3D>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeading eyebrow="Get In Touch" title="Book Your Appointment" subtitle="Fill the form and we'll confirm your booking within 24 hours." />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <AnimateIn variant="fadeLeft" delay={0.1}>
            <div className="p-8 rounded-3xl" style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", border: `1px solid rgba(194,24,91,0.12)`, boxShadow: "0 20px 60px rgba(194,24,91,0.1)" }}>
              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", color: DEEP_PINK, fontSize: "1.5rem", fontWeight: 700 }}>Booking Sent!</h3>
                  <p className="mt-2 text-sm" style={{ color: "#9e5a72", fontFamily: "'DM Sans',sans-serif" }}>Request sent via WhatsApp. We&apos;ll confirm shortly!</p>
                  <button className="mt-6 px-6 py-3 rounded-full text-white text-sm font-bold" style={{ background: `linear-gradient(135deg,${PINK},${DEEP_PINK})` }} onClick={() => setSubmitted(false)}>Book Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input style={inputBase} placeholder="Your Full Name" value={form.name} required onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <input style={inputBase} placeholder="Phone Number" type="tel" value={form.phone} required onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <input style={inputBase} placeholder="Email Address" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input style={inputBase} type="date" value={form.date} required onChange={(e) => setForm({ ...form, date: e.target.value })} />
                    <select style={{ ...inputBase, cursor: "pointer" }} value={form.service} required onChange={(e) => setForm({ ...form, service: e.target.value })}>
                      <option value="">Select Service</option>
                      <option>Bridal Makeup — C$250</option>
                      <option>Airbrush Makeup — C$285</option>
                      <option>Engagement Makeup — C$85–C$120</option>
                      <option>Reception Makeup</option>
                      <option>Party Makeup</option>
                      <option>Photoshoot Makeup</option>
                      <option>Editorial Makeup</option>
                      <option>Academy Training Enquiry</option>
                    </select>
                  </div>
                  <textarea style={{ ...inputBase, resize: "none" }} rows={4} placeholder="Tell us your vision, inspiration, or requirements..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  <button type="submit" className="flex items-center justify-center gap-2 py-4 rounded-full text-white font-bold hover:scale-[1.02] transition-transform" style={{ background: `linear-gradient(135deg,${PINK},${DEEP_PINK})`, boxShadow: `0 8px 30px ${PINK}55`, fontFamily: "'DM Sans',sans-serif" }}>
                    <MessageCircle size={18} /> Send via WhatsApp
                  </button>
                  <p className="text-xs text-center" style={{ color: "#9e5a72", fontFamily: "'DM Sans',sans-serif" }}>
                    Or call: <a href={PHONE_LINK} style={{ color: PINK, fontWeight: 700 }}>{PHONE_DISPLAY}</a>
                  </p>
                </form>
              )}
            </div>
          </AnimateIn>

          <div className="flex flex-col gap-5">
            <AnimateIn variant="fadeRight" delay={0.15}>
              <div className="p-7 rounded-3xl" style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", border: `1px solid rgba(194,24,91,0.1)` }}>
                <h3 className="text-xl font-bold mb-5" style={{ fontFamily: "'Playfair Display',serif", color: DEEP_PINK }}>Studio Details</h3>
                {[
                  { Icon: MapPin, label: "Address", val: STUDIO_ADDRESS },
                  { Icon: Phone, label: "Phone", val: PHONE_DISPLAY, href: PHONE_LINK },
                  { Icon: Clock, label: "Working Hours", val: "Mon – Sun: 8:00 AM – 9:00 PM" },
                  { Icon: Instagram, label: "Instagram", val: INSTAGRAM_HANDLE, href: INSTAGRAM_LINK },
                ].map(({ Icon, label, val, href }) => (
                  <div key={label} className="flex gap-4 items-start mb-5 last:mb-0">
                    <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg,${ROSE},rgba(244,143,177,0.3))` }}>
                      <Icon size={16} style={{ color: PINK }} />
                    </div>
                    <div>
                      <div className="font-semibold text-xs mb-1 uppercase tracking-wider" style={{ color: DEEP_PINK, fontFamily: "'DM Sans',sans-serif" }}>{label}</div>
                      {href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="text-sm break-all" style={{ color: PINK, fontFamily: "'DM Sans',sans-serif", fontWeight: 600 }}>{val}</a>
                        : <div className="text-sm whitespace-pre-line" style={{ color: "#9e5a72", fontFamily: "'DM Sans',sans-serif" }}>{val}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </AnimateIn>

            <AnimateIn variant="fadeRight" delay={0.25}>
              <div className="p-7 rounded-3xl relative overflow-hidden" style={{ background: `linear-gradient(135deg,${PINK},${DEEP_PINK})`, boxShadow: `0 20px 60px ${PINK}44` }}>
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full" style={{ background: "rgba(255,255,255,0.05)", transform: "translate(40%,-40%)" }} />
                <h3 className="text-white font-bold text-xl mb-2" style={{ fontFamily: "'Playfair Display',serif" }}>Ready to Look Stunning?</h3>
                <p className="text-pink-100 text-sm mb-5" style={{ fontFamily: "'DM Sans',sans-serif" }}>Limited appointments available. Book your slot today.</p>
                <a href={PHONE_LINK} className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full text-sm font-bold hover:scale-105 transition-transform" style={{ color: PINK, fontFamily: "'DM Sans',sans-serif" }}>
                  <Phone size={16} /> Call Now
                </a>
              </div>
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   MAP
───────────────────────────────────────── */

function MapSection() {
  return (
    <section className="relative py-16" style={{ background: "#fdf6f9" }}>
      <div className="max-w-7xl mx-auto px-6">
        <AnimateIn variant="fadeUp" delay={0}>
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: PINK, fontFamily: "'DM Sans',sans-serif" }}>Find Us</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 800, color: DEEP_PINK }}>Visit Our Studio</h2>
            <p className="mt-3 text-sm" style={{ color: "#9e5a72", fontFamily: "'DM Sans',sans-serif" }}>{STUDIO_ADDRESS}</p>
          </div>
        </AnimateIn>
        <AnimateIn variant="scaleUp" delay={0.12}>
          <div className="rounded-3xl overflow-hidden" style={{ border: `2px solid rgba(194,24,91,0.15)`, boxShadow: `0 20px 60px rgba(194,24,91,0.12)`, height: 400 }}>
            <iframe title="Suganee Makeup Artist studio location" src="https://www.google.com/maps?q=26%20Swans%20Acre%20Trail%2C%20Brampton%2C%20ON%20L6R%200B3%2C%20Canada&output=embed" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   CTA
───────────────────────────────────────── */

function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(180deg,#fff0f5 0%,#fdf6f9 100%)" }}>
      <Scene3D>
        <GlowOrb size={550} x="15%" y="-20%" delay={0} duration={10} color={LIGHT_PINK} opacity={0.22} />
        <GlowOrb size={400} x="60%" y="40%" delay={2} duration={8} color={PINK} opacity={0.12} />
        {[0,1,2,3,4,5].map((i) => {
          const angle = (i / 6) * 360;
          return <Gem3D key={i} size={18 + (i % 2) * 10} x={`${50 + 40 * Math.cos(angle * Math.PI / 180)}%`} y={`${50 + 35 * Math.sin(angle * Math.PI / 180)}%`} delay={i * 0.6} color={i % 2 === 0 ? PINK : LIGHT_PINK} rotSpeed={0.8} />;
        })}
        <Ring3D size={400} x="25%" y="10%" delay={0} duration={22} color={`${PINK}33`} tiltX={74} />
        <FloatingCube x="3%" y="10%" size={36} delay={0} color={PINK} />
        <Diamond3D x="88%" y="5%" size={34} delay={1} color={DEEP_PINK} />
        <ParticleField count={25} />
      </Scene3D>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <AnimateIn variant="scaleUp" delay={0}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-[0.2em] uppercase mb-6" style={{ background: `linear-gradient(135deg,${ROSE},rgba(244,143,177,0.3))`, color: DEEP_PINK, fontFamily: "'DM Sans',sans-serif" }}>
            <SparklesIcon size={12} /> Limited Slots Available
          </div>
        </AnimateIn>
        <AnimateIn variant="fadeUp" delay={0.12}>
          <h2 className="mb-4 leading-tight" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.5rem,7vw,5rem)", fontWeight: 900, background: `linear-gradient(135deg,${DEEP_PINK},${PINK},${LIGHT_PINK})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Your Dream Look<br /><em>Awaits You</em>
          </h2>
        </AnimateIn>
        <AnimateIn variant="fadeUp" delay={0.22}>
          <p className="text-base mb-10 max-w-lg mx-auto" style={{ color: "#9e5a72", fontFamily: "'DM Sans',sans-serif" }}>Every woman deserves to feel extraordinary. Let Suganee transform your makeup and hair vision into breathtaking reality.</p>
        </AnimateIn>
        <AnimateIn variant="scaleUp" delay={0.32}>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="flex items-center gap-2 px-10 py-4 rounded-full font-bold text-white hover:scale-105 transition-transform group" style={{ background: `linear-gradient(135deg,${PINK},${DEEP_PINK})`, boxShadow: `0 12px 40px ${PINK}55`, fontFamily: "'DM Sans',sans-serif", fontSize: "1rem" }}>
              Book Appointment <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform" style={{ border: `2px solid ${PINK}`, color: PINK, background: "rgba(255,255,255,0.6)", backdropFilter: "blur(10px)", fontFamily: "'DM Sans',sans-serif", fontSize: "1rem" }}>
              <MessageCircle size={18} /> WhatsApp Us
            </a>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   FOOTER
───────────────────────────────────────── */

function Footer() {
  return (
    <footer className="relative py-12 overflow-hidden" style={{ background: `linear-gradient(135deg,#1a0a12,${DEEP_PINK}cc)`, borderTop: `1px solid rgba(244,143,177,0.2)` }}>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="text-2xl font-bold mb-1" style={{ fontFamily: "'Playfair Display',serif", color: LIGHT_PINK }}>Suganee Makeup Artist | Brampton Bridal Makeover</div>
            <div className="text-xs tracking-[0.2em] uppercase text-pink-300 mb-4" style={{ fontFamily: "'DM Sans',sans-serif" }}>Beauty Studio &amp; Academy</div>
            <p className="text-sm text-pink-200 leading-relaxed" style={{ fontFamily: "'DM Sans',sans-serif" }}>Bringing beautiful bridal makeovers and timeless makeup looks to life in Brampton.</p>
          </div>
          <div>
            <h4 className="font-bold text-pink-200 mb-4 text-sm tracking-wider uppercase" style={{ fontFamily: "'DM Sans',sans-serif" }}>Quick Links</h4>
            <div className="flex flex-col gap-2">
              {["Home","Services","Gallery","Academy","Reviews","Contact"].map((l) => (
                <button key={l} onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })} className="text-sm text-pink-300 hover:text-pink-100 transition-colors text-left" style={{ fontFamily: "'DM Sans',sans-serif" }}>{l}</button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-pink-200 mb-4 text-sm tracking-wider uppercase" style={{ fontFamily: "'DM Sans',sans-serif" }}>Connect</h4>
            <div className="flex flex-col gap-3">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-pink-300 hover:text-pink-100 transition-colors" style={{ fontFamily: "'DM Sans',sans-serif" }}><MessageCircle size={15} /> {PHONE_DISPLAY}</a>
              <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-pink-300 hover:text-pink-100 transition-colors break-all" style={{ fontFamily: "'DM Sans',sans-serif" }}><Instagram size={15} className="flex-shrink-0" /> {INSTAGRAM_HANDLE}</a>
              <div className="flex items-start gap-3 text-sm text-pink-300" style={{ fontFamily: "'DM Sans',sans-serif" }}><MapPin size={15} className="mt-0.5 flex-shrink-0" /><span>{STUDIO_ADDRESS}</span></div>
            </div>
          </div>
        </div>
        <div className="border-t border-pink-900/40 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-pink-400" style={{ fontFamily: "'DM Sans',sans-serif" }}>© 2026 Suganee Makeup Artist | Brampton Bridal Makeover. All rights reserved.</p>
          <p className="text-xs text-pink-400" style={{ fontFamily: "'DM Sans',sans-serif" }}>Proudly serving Brampton, Ontario</p>
        </div>
      </div>
    </footer>
  );
}

function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a href={INSTAGRAM_LINK} aria-label="Follow Suganee Makeup Artist on Instagram" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-transform" style={{ background: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", boxShadow: "0 8px 25px rgba(220,39,67,0.5)" }}>
        <Instagram size={22} color="white" />
      </a>
      <a href={WHATSAPP_LINK} aria-label="Message Suganee Makeup Artist on WhatsApp" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-transform" style={{ background: "linear-gradient(135deg,#25d366,#128c7e)", boxShadow: "0 8px 25px rgba(37,211,102,0.5)" }}>
        <MessageCircle size={22} color="white" />
      </a>
    </div>
  );
}

/* ─────────────────────────────────────────
   SHOP ENTRY BANNER + DEDICATED BEAUTY STORE
───────────────────────────────────────── */
type ShopProduct = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  tag?: string;
};
type ShopCartItem = { product: ShopProduct; quantity: number };
type DemoOrder = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  total: number;
  payment: string;
  items: ShopCartItem[];
  status: "Confirmed" | "Processing" | "Shipped" | "Delivered";
  address: string;
};

const SHOP_PRODUCTS: ShopProduct[] = [
  { id: 1, name: "Velvet Rose Lip Colour", category: "Lips", price: 28, description: "A comfortable, richly pigmented rose shade with a soft velvet finish for day-to-evening looks.", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1000&q=88", tag: "Bestseller" },
  { id: 2, name: "Radiance Glow Serum", category: "Skincare", price: 42, description: "A lightweight glow-boosting serum concept designed to sit beautifully beneath makeup.", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=88", tag: "New arrival" },
  { id: 3, name: "Silk Finish Setting Powder", category: "Complexion", price: 34, description: "A finely milled finishing powder concept for a soft-focus, polished makeup look.", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=88" },
  { id: 4, name: "Petal Blush Palette", category: "Complexion", price: 38, description: "A curated palette of fresh, buildable blush tones inspired by soft rose petals.", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=88" },
  { id: 5, name: "Luxe Lash Mascara", category: "Eyes", price: 26, description: "A dramatic lash-look mascara concept for definition, lift, and everyday impact.", image: "https://images.unsplash.com/photo-1631214540242-9c6c6c3e5e7b?auto=format&fit=crop&w=1000&q=88", tag: "Popular" },
  { id: 6, name: "Golden Hour Brush Set", category: "Tools", price: 49, description: "A thoughtfully selected brush set concept for seamless blending and precise application.", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=88" },
  { id: 7, name: "Cloud Skin Moisturizer", category: "Skincare", price: 36, description: "A daily moisturizer concept with a silky texture and a fresh, hydrated finish.", image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=1000&q=88", tag: "Studio pick" },
  { id: 8, name: "Soft Focus Primer", category: "Complexion", price: 32, description: "A smoothing primer concept created to prep skin for a seamless makeup finish.", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1000&q=88" },
];

const SHOP_DARK = "#101014";
const SHOP_PANEL = "#19191f";
const SHOP_MUTED = "#a4a1aa";
const SHOP_ACCENT = "#e7a9bd";
const SHOP_CURRENCY = "C$";
const readStored = <T,>(key: string, fallback: T): T => {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) as T : fallback; } catch { return fallback; }
};

function openSuganeeShop() {
  window.dispatchEvent(new Event("suganee:open-shop"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function BeautyShopSection() {
  return (
    <section id="shop" className="relative overflow-hidden px-5 py-20 sm:py-28" style={{ background: "linear-gradient(135deg,#fff8fb 0%,#f8e7ee 52%,#fff9fb 100%)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="relative min-h-[390px] sm:min-h-[470px] overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] flex items-center" style={{ background: "#111116", boxShadow: "0 28px 90px rgba(35,15,26,.2)" }}>
          <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1800&q=90" alt="Luxury beauty products" className="absolute inset-0 w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(10,10,14,.97) 0%,rgba(10,10,14,.82) 48%,rgba(10,10,14,.18) 100%)" }} />
          <div className="absolute -right-16 -top-24 w-80 h-80 rounded-full border opacity-20" style={{ borderColor: SHOP_ACCENT, boxShadow: `0 0 100px ${SHOP_ACCENT}55` }} />
          <div className="relative z-10 max-w-2xl px-7 py-14 sm:px-14 sm:py-16">
            <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] tracking-[.25em] uppercase" style={{ borderColor: `${SHOP_ACCENT}66`, color: SHOP_ACCENT }}><SparklesIcon size={13} /> The Suganee Beauty Store</div>
            <p className="mt-7 text-xs uppercase tracking-[.35em]" style={{ color: "#d5b9c4" }}>A little luxury, every day</p>
            <h2 className="mt-3 text-4xl sm:text-6xl leading-[1.04] text-white" style={{ fontFamily: "'Playfair Display',serif" }}>Your beauty ritual.<br /><span style={{ color: SHOP_ACCENT }}>Beautifully curated.</span></h2>
            <p className="mt-5 max-w-lg text-sm leading-7" style={{ color: "#d2cbd0" }}>Explore the edit of beauty essentials, studio favourites and finishing touches selected for your everyday glow.</p>
            <button onClick={openSuganeeShop} className="mt-8 inline-flex items-center gap-3 rounded-full px-7 py-4 text-xs font-bold uppercase tracking-[.16em] transition-all hover:translate-y-[-2px]" style={{ background: SHOP_ACCENT, color: "#171319", boxShadow: `0 10px 35px ${SHOP_ACCENT}33` }}>Explore the store <ArrowRight size={16} /></button>
          </div>
          <div className="absolute bottom-7 right-8 hidden sm:flex items-center gap-3 text-[10px] tracking-[.22em] uppercase text-white/60"><span className="w-10 h-px bg-white/40" /> Beauty, with intention</div>
        </div>
      </div>
    </section>
  );
}

function BeautyStorefront({ onExit }: { onExit: () => void }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<ShopCartItem[]>(() => readStored("suganee-demo-cart-v2", []));
  const [selected, setSelected] = useState<ShopProduct | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [view, setView] = useState<"shop" | "checkout" | "tracking" | "success">("shop");
  const [payment, setPayment] = useState("card-demo");
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "", address: "", city: "", postal: "", country: "Canada" });
  const [orders, setOrders] = useState<DemoOrder[]>(() => readStored("suganee-demo-orders-v2", []));
  const [trackingId, setTrackingId] = useState("");
  const [trackingEmail, setTrackingEmail] = useState("");
  const [trackedOrder, setTrackedOrder] = useState<DemoOrder | null>(null);
  const [trackError, setTrackError] = useState("");
  const [lastOrder, setLastOrder] = useState<DemoOrder | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const categories = ["All", "Skincare", "Complexion", "Lips", "Eyes", "Tools"];
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 75 || subtotal === 0 ? 0 : 8.95;
  const tax = subtotal * 0.13;
  const total = subtotal + shipping + tax;
  const filtered = SHOP_PRODUCTS.filter((product) => (category === "All" || product.category === category) && `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => { localStorage.setItem("suganee-demo-cart-v2", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("suganee-demo-orders-v2", JSON.stringify(orders)); }, [orders]);
  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);

  const addToCart = (product: ShopProduct) => {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      return existing ? current.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { product, quantity: 1 }];
    });
    setSelected(null);
    setCartOpen(true);
  };
  const changeQuantity = (id: number, amount: number) => setCart((current) => current.map((item) => item.product.id === id ? { ...item, quantity: item.quantity + amount } : item).filter((item) => item.quantity > 0));
  const goCheckout = () => { setCartOpen(false); setView("checkout"); window.scrollTo(0, 0); };
  const placeDemoOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const order: DemoOrder = {
      id: `SG-${Date.now().toString().slice(-8)}`,
      email: customer.email.trim().toLowerCase(),
      name: customer.name,
      createdAt: new Date().toISOString(),
      total,
      payment: payment === "cod" ? "Cash on delivery (demo)" : "Online payment simulation (demo)",
      items: cart,
      status: "Confirmed",
      address: `${customer.address}, ${customer.city}, ${customer.postal}, ${customer.country}`,
    };
    setOrders((current) => [order, ...current]);
    setLastOrder(order);
    setCart([]);
    setView("success");
    window.scrollTo(0, 0);
  };
  const trackOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const match = orders.find((order) => order.id.toLowerCase() === trackingId.trim().toLowerCase() && order.email === trackingEmail.trim().toLowerCase());
    setTrackedOrder(match || null);
    setTrackError(match ? "" : "We couldn't find an order with those details in this browser's demo order history.");
  };
  const returnToStore = () => { setView("shop"); setSelected(null); setCartOpen(false); window.scrollTo(0, 0); };
  const money = (amount: number) => `${SHOP_CURRENCY}${amount.toFixed(2)}`;

  return (
    <div className="fixed inset-0 z-[120] overflow-y-auto" style={{ background: SHOP_DARK, color: "#f7f4f6", fontFamily: "'DM Sans',sans-serif" }}>
      <div className="sticky top-0 z-[130] border-b backdrop-blur-2xl" style={{ background: "rgba(16,16,20,.9)", borderColor: "rgba(255,255,255,.09)" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[76px] flex items-center justify-between gap-4">
          <button onClick={onExit} className="flex items-center gap-3 text-left group"><span className="w-9 h-9 rounded-full grid place-items-center border transition-colors group-hover:bg-white/10" style={{ borderColor: "#ffffff2b", color: SHOP_ACCENT }}><ArrowLeft size={17} /></span><span><span className="block text-base sm:text-lg text-white" style={{ fontFamily: "'Playfair Display',serif" }}>SUGANEE</span><span className="block text-[9px] tracking-[.28em] uppercase" style={{ color: SHOP_MUTED }}>Beauty Store</span></span></button>
          <div className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-[.2em]" style={{ color: "#c7c1c8" }}>
            <button onClick={returnToStore} className={view === "shop" ? "text-white" : "hover:text-white"}>Shop</button>
            <button onClick={() => { setView("tracking"); setTrackedOrder(null); setTrackError(""); }} className="hover:text-white">Track order</button>
            <button onClick={onExit} className="hover:text-white">Portfolio</button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { setView("tracking"); setTrackedOrder(null); setTrackError(""); }} className="hidden sm:inline-flex items-center gap-2 px-4 py-3 rounded-full text-[10px] uppercase tracking-[.15em] border hover:bg-white/10" style={{ borderColor: "#ffffff2b", color: "#e8e2e7" }}><PackageCheck size={15} /> Track</button>
            <button onClick={() => setCartOpen(true)} className="relative inline-flex items-center gap-2 px-4 py-3 rounded-full text-[10px] uppercase tracking-[.15em] font-bold" style={{ background: SHOP_ACCENT, color: "#171319" }}><ShoppingBag size={15} /> Bag <span className="min-w-5 h-5 px-1 rounded-full grid place-items-center text-[10px]" style={{ background: "#171319", color: "white" }}>{itemCount}</span></button>
            <button className="md:hidden p-2" onClick={() => setMobileMenu((v) => !v)} aria-label="Open store menu"><Menu size={20} /></button>
          </div>
        </div>
        {mobileMenu && <div className="md:hidden px-6 pb-5 flex flex-col gap-4 text-xs uppercase tracking-widest" style={{ background: SHOP_PANEL }}><button onClick={returnToStore} className="text-left">Shop</button><button onClick={() => { setView("tracking"); setMobileMenu(false); }}>Track order</button><button onClick={onExit} className="text-left">Back to portfolio</button></div>}
      </div>

      {view === "shop" && <>
        <section className="relative overflow-hidden border-b" style={{ borderColor: "#ffffff12", background: "radial-gradient(circle at 78% 25%,rgba(231,169,189,.16),transparent 28%),linear-gradient(120deg,#15151b,#101014 62%,#1d151b)" }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24 grid lg:grid-cols-[1.05fr_.95fr] gap-10 items-center">
            <div><p className="text-[10px] uppercase tracking-[.35em] mb-5" style={{ color: SHOP_ACCENT }}>THE SUGANEE EDIT · 01 / BEAUTY</p><h1 className="text-5xl sm:text-7xl leading-[1.02] text-white" style={{ fontFamily: "'Playfair Display',serif" }}>Beauty begins<br /><span style={{ color: SHOP_ACCENT }}>with the details.</span></h1><p className="mt-6 max-w-xl text-sm leading-7" style={{ color: "#b8b2ba" }}>A considered collection of beauty essentials, makeup favourites and tools to make every ritual feel special.</p><div className="mt-8 flex flex-wrap gap-3"><button onClick={() => document.getElementById("store-products")?.scrollIntoView({ behavior: "smooth" })} className="rounded-full px-7 py-4 text-[10px] uppercase tracking-[.18em] font-bold inline-flex items-center gap-3" style={{ background: SHOP_ACCENT, color: "#171319" }}>Shop collection <ArrowRight size={15} /></button><button onClick={() => { setView("tracking"); setTrackedOrder(null); }} className="rounded-full px-7 py-4 text-[10px] uppercase tracking-[.18em] border" style={{ borderColor: "#ffffff30", color: "#f5edf2" }}>Track an order</button></div><div className="mt-10 flex gap-7 text-[10px] uppercase tracking-[.15em]" style={{ color: "#aaa4ad" }}><span className="flex items-center gap-2"><ShieldCheck size={15} color={SHOP_ACCENT} /> Secure checkout preview</span><span className="flex items-center gap-2"><Truck size={15} color={SHOP_ACCENT} /> Delivery options</span></div></div>
            <div className="relative mx-auto w-full max-w-[540px]"><div className="absolute inset-8 rounded-full blur-3xl" style={{ background: `${SHOP_ACCENT}22` }} /><img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=90" alt="Suganee curated beauty edit" className="relative w-full aspect-[5/4] object-cover rounded-[2rem] border" style={{ borderColor: "#ffffff20", boxShadow: "0 30px 90px #0008" }} /><div className="absolute -bottom-5 left-5 sm:left-10 rounded-2xl px-5 py-4 border backdrop-blur-xl" style={{ background: "#17171dcc", borderColor: "#ffffff20" }}><p className="text-[9px] uppercase tracking-[.2em]" style={{ color: SHOP_ACCENT }}>Curated with care</p><p className="mt-1 text-sm text-white" style={{ fontFamily: "'Playfair Display',serif" }}>Your everyday beauty ritual</p></div></div>
          </div>
        </section>
        <section id="store-products" className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-7 mb-9"><div><p className="text-[10px] uppercase tracking-[.3em] mb-3" style={{ color: SHOP_ACCENT }}>THE COLLECTION</p><h2 className="text-4xl sm:text-5xl text-white" style={{ fontFamily: "'Playfair Display',serif" }}>Shop the edit</h2><p className="mt-3 text-sm" style={{ color: SHOP_MUTED }}>Thoughtful essentials for your beauty shelf.</p></div><div className="flex flex-col sm:flex-row gap-3"><div className="relative"><Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: SHOP_MUTED }} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products" className="w-full sm:w-64 rounded-full pl-11 pr-4 py-3 text-xs outline-none border" style={{ background: SHOP_PANEL, borderColor: "#ffffff18", color: "white" }} /></div><button onClick={() => setCartOpen(true)} className="rounded-full px-5 py-3 text-xs border inline-flex items-center justify-center gap-2" style={{ borderColor: "#ffffff24", color: "white" }}><ShoppingCart size={15} /> View bag ({itemCount})</button></div></div>
          <div className="flex gap-2 overflow-x-auto pb-5 mb-5">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className="shrink-0 rounded-full px-5 py-2.5 text-[10px] uppercase tracking-[.16em] border transition-colors" style={{ background: category === item ? SHOP_ACCENT : "transparent", borderColor: category === item ? SHOP_ACCENT : "#ffffff24", color: category === item ? "#171319" : "#d8d1d8" }}>{item}</button>)}</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">{filtered.map((product) => <article key={product.id} className="group rounded-[1.35rem] overflow-hidden border transition-all duration-300 hover:-translate-y-1" style={{ background: SHOP_PANEL, borderColor: "#ffffff12" }}><button onClick={() => setSelected(product)} className="relative block w-full text-left overflow-hidden"><img src={product.image} alt={product.name} loading="lazy" className="w-full aspect-[4/4.5] object-cover transition-transform duration-700 group-hover:scale-105" />{product.tag && <span className="absolute top-4 left-4 rounded-full px-3 py-1.5 text-[9px] uppercase tracking-widest" style={{ background: "#101014e8", color: SHOP_ACCENT }}>{product.tag}</span>}<span className="absolute bottom-3 right-3 rounded-full w-9 h-9 grid place-items-center" style={{ background: "#101014dd", color: "white" }}><ArrowUpRight size={16} /></span></button><div className="p-5"><p className="text-[9px] uppercase tracking-[.22em] mb-2" style={{ color: SHOP_ACCENT }}>{product.category}</p><div className="flex items-start justify-between gap-3"><h3 className="text-sm text-white leading-5">{product.name}</h3><span className="text-sm whitespace-nowrap" style={{ color: SHOP_ACCENT }}>{money(product.price)}</span></div><button onClick={() => addToCart(product)} className="mt-5 w-full rounded-full py-3 text-[10px] uppercase tracking-[.17em] font-bold transition-colors" style={{ background: "#ffffff0d", border: "1px solid #ffffff20", color: "white" }}>Add to bag <Plus size={13} className="inline ml-1" /></button></div></article>)}</div>
          {filtered.length === 0 && <div className="py-20 text-center text-sm" style={{ color: SHOP_MUTED }}>No products match that search. Try another name or category.</div>}
        </section>
        <section className="border-y px-5 py-10" style={{ background: "#15151a", borderColor: "#ffffff12" }}><div className="max-w-7xl mx-auto grid sm:grid-cols-3 gap-8 text-center"><div><ShieldCheck className="mx-auto mb-3" color={SHOP_ACCENT} /><p className="text-xs text-white">Thoughtful selection</p><p className="mt-1 text-[10px]" style={{ color: SHOP_MUTED }}>Studio-inspired beauty edit</p></div><div><Truck className="mx-auto mb-3" color={SHOP_ACCENT} /><p className="text-xs text-white">Delivery options</p><p className="mt-1 text-[10px]" style={{ color: SHOP_MUTED }}>Shipping estimate at checkout</p></div><div><LockKeyhole className="mx-auto mb-3" color={SHOP_ACCENT} /><p className="text-xs text-white">Checkout preview</p><p className="mt-1 text-[10px]" style={{ color: SHOP_MUTED }}>Payment provider to be connected</p></div></div></section>
      </>}

      {view === "checkout" && <main className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16"><button onClick={returnToStore} className="text-xs inline-flex items-center gap-2 mb-8" style={{ color: SHOP_ACCENT }}><ArrowLeft size={15} /> Continue shopping</button><div className="mb-9"><p className="text-[10px] uppercase tracking-[.3em] mb-3" style={{ color: SHOP_ACCENT }}>SECURE CHECKOUT · PREVIEW</p><h1 className="text-4xl sm:text-5xl text-white" style={{ fontFamily: "'Playfair Display',serif" }}>Complete your order</h1><p className="mt-3 text-xs" style={{ color: SHOP_MUTED }}>Your details and payment choices are for this storefront demonstration only.</p></div><form onSubmit={placeDemoOrder} className="grid lg:grid-cols-[1.15fr_.85fr] gap-8 items-start"><div className="space-y-6"><section className="rounded-3xl border p-6 sm:p-8" style={{ background: SHOP_PANEL, borderColor: "#ffffff16" }}><h2 className="text-xl text-white mb-6" style={{ fontFamily: "'Playfair Display',serif" }}>01. Contact & delivery</h2><div className="grid sm:grid-cols-2 gap-4"><label className="text-[10px] tracking-wider" style={{ color: SHOP_MUTED }}>FULL NAME<input required value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} className="mt-2 w-full rounded-xl p-3.5 text-sm border outline-none" style={{ background: SHOP_DARK, borderColor: "#ffffff20", color: "white" }} placeholder="Your name" /></label><label className="text-[10px] tracking-wider" style={{ color: SHOP_MUTED }}>EMAIL ADDRESS<input required type="email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} className="mt-2 w-full rounded-xl p-3.5 text-sm border outline-none" style={{ background: SHOP_DARK, borderColor: "#ffffff20", color: "white" }} placeholder="you@example.com" /></label><label className="text-[10px] tracking-wider" style={{ color: SHOP_MUTED }}>PHONE NUMBER<input required type="tel" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} className="mt-2 w-full rounded-xl p-3.5 text-sm border outline-none" style={{ background: SHOP_DARK, borderColor: "#ffffff20", color: "white" }} placeholder="Phone number" /></label><label className="text-[10px] tracking-wider" style={{ color: SHOP_MUTED }}>STREET ADDRESS<input required value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} className="mt-2 w-full rounded-xl p-3.5 text-sm border outline-none" style={{ background: SHOP_DARK, borderColor: "#ffffff20", color: "white" }} placeholder="Street and number" /></label><label className="text-[10px] tracking-wider" style={{ color: SHOP_MUTED }}>CITY<input required value={customer.city} onChange={(e) => setCustomer({ ...customer, city: e.target.value })} className="mt-2 w-full rounded-xl p-3.5 text-sm border outline-none" style={{ background: SHOP_DARK, borderColor: "#ffffff20", color: "white" }} placeholder="City" /></label><label className="text-[10px] tracking-wider" style={{ color: SHOP_MUTED }}>POSTAL CODE<input required value={customer.postal} onChange={(e) => setCustomer({ ...customer, postal: e.target.value })} className="mt-2 w-full rounded-xl p-3.5 text-sm border outline-none" style={{ background: SHOP_DARK, borderColor: "#ffffff20", color: "white" }} placeholder="Postal code" /></label><label className="text-[10px] tracking-wider sm:col-span-2" style={{ color: SHOP_MUTED }}>COUNTRY<select value={customer.country} onChange={(e) => setCustomer({ ...customer, country: e.target.value })} className="mt-2 w-full rounded-xl p-3.5 text-sm border outline-none" style={{ background: SHOP_DARK, borderColor: "#ffffff20", color: "white" }}><option>Canada</option><option>United States</option><option>United Kingdom</option><option>Australia</option></select></label></div></section><section className="rounded-3xl border p-6 sm:p-8" style={{ background: SHOP_PANEL, borderColor: "#ffffff16" }}><h2 className="text-xl text-white mb-5" style={{ fontFamily: "'Playfair Display',serif" }}>02. Payment method</h2><div className="space-y-3"><label className="flex items-center gap-4 rounded-2xl p-4 border cursor-pointer" style={{ borderColor: payment === "card-demo" ? SHOP_ACCENT : "#ffffff20", background: payment === "card-demo" ? "#e7a9bd12" : "transparent" }}><input type="radio" name="payment" value="card-demo" checked={payment === "card-demo"} onChange={() => setPayment("card-demo")} /><CreditCard size={20} color={SHOP_ACCENT} /><span className="flex-1"><span className="block text-sm text-white">Credit / debit card</span><span className="block text-[10px] mt-1" style={{ color: SHOP_MUTED }}>Payment gateway preview · no card details collected</span></span><span className="text-[9px] uppercase tracking-widest" style={{ color: SHOP_ACCENT }}>Preview</span></label><label className="flex items-center gap-4 rounded-2xl p-4 border cursor-pointer" style={{ borderColor: payment === "cod" ? SHOP_ACCENT : "#ffffff20", background: payment === "cod" ? "#e7a9bd12" : "transparent" }}><input type="radio" name="payment" value="cod" checked={payment === "cod"} onChange={() => setPayment("cod")} /><PackageCheck size={20} color={SHOP_ACCENT} /><span className="flex-1"><span className="block text-sm text-white">Cash on delivery</span><span className="block text-[10px] mt-1" style={{ color: SHOP_MUTED }}>Illustrative option · availability to be confirmed</span></span></label></div><p className="mt-5 rounded-xl p-4 text-[10px] leading-5" style={{ background: "#e7a9bd10", color: "#d7cbd2" }}><LockKeyhole size={13} className="inline mr-2" color={SHOP_ACCENT} />Demo checkout only. A live Stripe / Shopify Payments / PayPal connection and secure server-side order processing must be configured before accepting real payments.</p></section></div><aside className="rounded-3xl border p-6 sm:p-8 lg:sticky lg:top-28" style={{ background: SHOP_PANEL, borderColor: "#ffffff16" }}><h2 className="text-xl text-white mb-6" style={{ fontFamily: "'Playfair Display',serif" }}>Order summary</h2><div className="space-y-4 max-h-72 overflow-y-auto">{cart.map(({ product, quantity }) => <div key={product.id} className="flex gap-3"><img src={product.image} alt={product.name} className="w-14 h-16 rounded-xl object-cover" /><div className="flex-1"><p className="text-xs text-white">{product.name}</p><p className="text-[10px] mt-1" style={{ color: SHOP_MUTED }}>Qty {quantity}</p></div><span className="text-xs" style={{ color: SHOP_ACCENT }}>{money(product.price * quantity)}</span></div>)}</div><div className="border-t mt-6 pt-5 space-y-3 text-xs" style={{ borderColor: "#ffffff20", color: SHOP_MUTED }}><div className="flex justify-between"><span>Subtotal</span><span className="text-white">{money(subtotal)}</span></div><div className="flex justify-between"><span>Shipping</span><span className="text-white">{shipping === 0 ? "Complimentary" : money(shipping)}</span></div><div className="flex justify-between"><span>Estimated tax (13%)</span><span className="text-white">{money(tax)}</span></div><div className="flex justify-between pt-4 border-t text-base" style={{ borderColor: "#ffffff20" }}><strong className="text-white">Total</strong><strong style={{ color: SHOP_ACCENT }}>{money(total)}</strong></div></div><button type="submit" disabled={!cart.length} className="mt-7 w-full rounded-full py-4 text-[10px] uppercase tracking-[.18em] font-bold disabled:opacity-40" style={{ background: SHOP_ACCENT, color: "#171319" }}>{payment === "card-demo" ? "Simulate secure payment" : "Place demo order"} <ArrowRight size={15} className="inline ml-2" /></button><p className="mt-4 text-[9px] leading-5 text-center" style={{ color: SHOP_MUTED }}>No money will be collected. This is a clickable storefront prototype.</p></aside></form></main>}

      {view === "tracking" && <main className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-24"><div className="max-w-xl mx-auto text-center"><div className="w-16 h-16 rounded-2xl mx-auto grid place-items-center border" style={{ background: SHOP_PANEL, borderColor: "#ffffff20", color: SHOP_ACCENT }}><PackageCheck size={27} /></div><p className="mt-7 text-[10px] uppercase tracking-[.3em]" style={{ color: SHOP_ACCENT }}>ORDER SUPPORT</p><h1 className="mt-3 text-4xl sm:text-5xl text-white" style={{ fontFamily: "'Playfair Display',serif" }}>Track your order</h1><p className="mt-4 text-sm leading-7" style={{ color: SHOP_MUTED }}>Enter the order reference and email used at checkout to view its demo delivery timeline.</p><form onSubmit={trackOrder} className="mt-9 rounded-3xl border p-6 sm:p-8 text-left" style={{ background: SHOP_PANEL, borderColor: "#ffffff18" }}><label className="block text-[10px] tracking-widest mb-4" style={{ color: SHOP_MUTED }}>ORDER REFERENCE<input required value={trackingId} onChange={(e) => setTrackingId(e.target.value)} placeholder="e.g. SG-12345678" className="mt-2 w-full rounded-xl p-4 text-sm border outline-none" style={{ background: SHOP_DARK, borderColor: "#ffffff20", color: "white" }} /></label><label className="block text-[10px] tracking-widest">EMAIL ADDRESS<input required type="email" value={trackingEmail} onChange={(e) => setTrackingEmail(e.target.value)} placeholder="Email used at checkout" className="mt-2 w-full rounded-xl p-4 text-sm border outline-none" style={{ background: SHOP_DARK, borderColor: "#ffffff20", color: "white" }} /></label><button type="submit" className="mt-5 w-full rounded-full py-4 text-[10px] uppercase tracking-[.18em] font-bold" style={{ background: SHOP_ACCENT, color: "#171319" }}>Find my order <ArrowRight size={15} className="inline ml-2" /></button>{trackError && <p className="mt-4 text-xs text-rose-300">{trackError}</p>}</form></div>{trackedOrder && <div className="max-w-2xl mx-auto mt-10 rounded-3xl border p-6 sm:p-8" style={{ background: SHOP_PANEL, borderColor: "#ffffff18" }}><div className="flex flex-wrap justify-between gap-3"><div><p className="text-[9px] uppercase tracking-widest" style={{ color: SHOP_MUTED }}>ORDER REFERENCE</p><h2 className="text-2xl text-white mt-1">{trackedOrder.id}</h2></div><span className="rounded-full px-4 py-2 text-[10px] uppercase tracking-widest h-fit" style={{ background: "#e7a9bd20", color: SHOP_ACCENT }}>{trackedOrder.status}</span></div><p className="mt-2 text-xs" style={{ color: SHOP_MUTED }}>Placed {new Date(trackedOrder.createdAt).toLocaleString()}</p><div className="mt-8 space-y-5">{["Order placed", "Processing", "Shipped", "Delivered"].map((step, index) => <div key={step} className="flex gap-4 items-start"><div className="w-7 h-7 rounded-full grid place-items-center shrink-0" style={{ background: index === 0 ? SHOP_ACCENT : "#ffffff12", color: index === 0 ? "#171319" : SHOP_MUTED }}>{index === 0 ? <CheckCircle size={15} /> : <span className="text-[10px]">{index + 1}</span>}</div><div><p className="text-sm text-white">{step}</p><p className="text-[10px] mt-1" style={{ color: SHOP_MUTED }}>{index === 0 ? "Demo order recorded in this browser" : "Awaiting live fulfilment integration"}</p></div></div>)}</div><p className="mt-7 text-[10px] leading-5" style={{ color: SHOP_MUTED }}>This is a local demonstration record. Live courier events will appear after a shipping provider API is connected.</p></div>}<div className="text-center mt-8"><button onClick={returnToStore} className="text-xs" style={{ color: SHOP_ACCENT }}>Continue shopping <ArrowRight size={13} className="inline ml-1" /></button></div></main>}

      {view === "success" && lastOrder && <main className="max-w-3xl mx-auto px-5 sm:px-8 py-20 text-center"><div className="w-20 h-20 rounded-full mx-auto grid place-items-center" style={{ background: `${SHOP_ACCENT}20`, color: SHOP_ACCENT }}><CheckCircle size={38} /></div><p className="mt-8 text-[10px] uppercase tracking-[.3em]" style={{ color: SHOP_ACCENT }}>DEMO ORDER CREATED</p><h1 className="mt-3 text-4xl sm:text-5xl text-white" style={{ fontFamily: "'Playfair Display',serif" }}>Thank you, {lastOrder.name.split(" ")[0]}.</h1><p className="mt-4 text-sm" style={{ color: SHOP_MUTED }}>Your sample order has been saved in this browser.</p><div className="mt-9 rounded-3xl border p-7 text-left" style={{ background: SHOP_PANEL, borderColor: "#ffffff18" }}><p className="text-[9px] uppercase tracking-widest" style={{ color: SHOP_MUTED }}>YOUR ORDER REFERENCE</p><div className="mt-2 flex items-center justify-between gap-3"><strong className="text-2xl text-white">{lastOrder.id}</strong><button onClick={() => { navigator.clipboard?.writeText(lastOrder.id); }} className="text-[10px] uppercase tracking-widest" style={{ color: SHOP_ACCENT }}>Copy ID</button></div><div className="mt-6 flex justify-between text-xs"><span style={{ color: SHOP_MUTED }}>Order total</span><strong style={{ color: SHOP_ACCENT }}>{money(lastOrder.total)}</strong></div><div className="mt-3 flex justify-between text-xs"><span style={{ color: SHOP_MUTED }}>Payment</span><span className="text-white">{lastOrder.payment}</span></div></div><div className="mt-8 flex flex-col sm:flex-row justify-center gap-3"><button onClick={() => { setTrackingId(lastOrder.id); setTrackingEmail(lastOrder.email); setTrackedOrder(lastOrder); setView("tracking"); }} className="rounded-full px-7 py-4 text-[10px] uppercase tracking-widest font-bold" style={{ background: SHOP_ACCENT, color: "#171319" }}>Track this order</button><button onClick={returnToStore} className="rounded-full px-7 py-4 text-[10px] uppercase tracking-widest border" style={{ borderColor: "#ffffff30", color: "white" }}>Back to store</button></div><p className="mt-8 text-[9px] leading-5" style={{ color: SHOP_MUTED }}>Demo only — no payment was taken and no real shipment was created.</p></main>}

      {selected && <div className="fixed inset-0 z-[150] p-4 sm:p-8 grid place-items-center overflow-y-auto" style={{ background: "#000b", backdropFilter: "blur(12px)" }} onClick={() => setSelected(null)}><div className="relative w-full max-w-3xl rounded-[2rem] overflow-hidden grid md:grid-cols-2 border" style={{ background: SHOP_PANEL, borderColor: "#ffffff20" }} onClick={(e) => e.stopPropagation()}><button onClick={() => setSelected(null)} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full grid place-items-center" style={{ background: "#101014dd", color: "white" }}><X size={18} /></button><img src={selected.image} alt={selected.name} className="w-full h-72 md:h-full object-cover" /><div className="p-7 sm:p-10 flex flex-col justify-center"><p className="text-[9px] uppercase tracking-[.25em]" style={{ color: SHOP_ACCENT }}>{selected.category}</p><h2 className="mt-3 text-3xl text-white" style={{ fontFamily: "'Playfair Display',serif" }}>{selected.name}</h2><p className="mt-4 text-xl" style={{ color: SHOP_ACCENT }}>{money(selected.price)}</p><p className="mt-5 text-sm leading-7" style={{ color: SHOP_MUTED }}>{selected.description}</p><button onClick={() => addToCart(selected)} className="mt-8 rounded-full py-4 text-[10px] uppercase tracking-widest font-bold" style={{ background: SHOP_ACCENT, color: "#171319" }}>Add to bag <Plus size={14} className="inline ml-1" /></button><p className="mt-4 text-[9px]" style={{ color: SHOP_MUTED }}>Product details and imagery are sample content for this preview.</p></div></div></div>}

      {cartOpen && <div className="fixed inset-0 z-[145]" style={{ background: "#0009", backdropFilter: "blur(5px)" }} onClick={() => setCartOpen(false)}><aside className="absolute right-0 top-0 h-full w-full max-w-md flex flex-col border-l" style={{ background: "#17171c", borderColor: "#ffffff20" }} onClick={(e) => e.stopPropagation()}><div className="p-6 border-b flex items-center justify-between" style={{ borderColor: "#ffffff18" }}><div><p className="text-[9px] uppercase tracking-[.25em]" style={{ color: SHOP_ACCENT }}>YOUR SELECTION</p><h2 className="mt-1 text-2xl text-white" style={{ fontFamily: "'Playfair Display',serif" }}>Shopping bag ({itemCount})</h2></div><button onClick={() => setCartOpen(false)} className="w-10 h-10 rounded-full grid place-items-center" style={{ background: "#ffffff10" }}><X size={18} /></button></div><div className="flex-1 overflow-y-auto p-6">{cart.length === 0 ? <div className="h-full flex flex-col items-center justify-center text-center"><ShoppingBag size={36} color={SHOP_ACCENT} /><p className="mt-4 text-sm text-white">Your bag is currently empty.</p><button onClick={() => setCartOpen(false)} className="mt-4 text-xs" style={{ color: SHOP_ACCENT }}>Explore the collection</button></div> : cart.map(({ product, quantity }) => <div key={product.id} className="flex gap-4 py-4 border-b" style={{ borderColor: "#ffffff18" }}><img src={product.image} alt={product.name} className="w-20 h-24 rounded-xl object-cover" /><div className="flex-1"><p className="text-sm text-white">{product.name}</p><p className="mt-1 text-xs" style={{ color: SHOP_ACCENT }}>{money(product.price)}</p><div className="mt-3 flex items-center gap-3"><button onClick={() => changeQuantity(product.id, -1)} className="w-7 h-7 rounded-full border grid place-items-center" style={{ borderColor: "#ffffff30" }}><Minus size={12} /></button><span className="text-xs">{quantity}</span><button onClick={() => changeQuantity(product.id, 1)} className="w-7 h-7 rounded-full border grid place-items-center" style={{ borderColor: "#ffffff30" }}><Plus size={12} /></button><button onClick={() => setCart((items) => items.filter((item) => item.product.id !== product.id))} className="ml-auto" style={{ color: "#b7aeb7" }}><Trash2 size={15} /></button></div></div></div>)}</div><div className="p-6 border-t" style={{ borderColor: "#ffffff18" }}><div className="flex justify-between text-xs mb-2" style={{ color: SHOP_MUTED }}><span>Subtotal</span><span className="text-white">{money(subtotal)}</span></div><div className="flex justify-between text-xs mb-4" style={{ color: SHOP_MUTED }}><span>Shipping & tax calculated at checkout</span><span style={{ color: SHOP_ACCENT }}>Estimate</span></div><button disabled={!cart.length} onClick={goCheckout} className="w-full rounded-full py-4 text-[10px] uppercase tracking-widest font-bold disabled:opacity-40" style={{ background: SHOP_ACCENT, color: "#171319" }}>Proceed to checkout <ArrowRight size={14} className="inline ml-2" /></button><p className="text-center mt-4 text-[9px]" style={{ color: SHOP_MUTED }}>Secure payment provider integration pending.</p></div></aside></div>}
      <footer className="border-t px-5 py-8 text-center" style={{ borderColor: "#ffffff12", color: SHOP_MUTED }}><p className="text-[9px] uppercase tracking-[.25em]">SUGANEE BEAUTY STORE</p><p className="mt-2 text-[9px]">Storefront concept · Sample products · Demo checkout and local order tracking</p><button onClick={onExit} className="mt-4 text-[10px] uppercase tracking-widest" style={{ color: SHOP_ACCENT }}>Return to portfolio</button></footer>
    </div>
  );
}

/* ─────────────────────────────────────────
   ROOT
───────────────────────────────────────── */

export default function App() {
  const [shopMode, setShopMode] = useState(false);
  useEffect(() => {
    const openShop = () => { setShopMode(true); window.scrollTo({ top: 0, behavior: "auto" as ScrollBehavior }); };
    window.addEventListener("suganee:open-shop", openShop);
    return () => window.removeEventListener("suganee:open-shop", openShop);
  }, []);
  return (
    <>
      <style>{`
        @keyframes float3d {
          0% { transform: translateY(0px) translateX(0px); }
          100% { transform: translateY(-28px) translateX(8px); }
        }
        @keyframes floatOrb {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(-35px) scale(1.06); }
        }
        @keyframes floatRing {
          0% { transform: translateY(0px); opacity: 0.7; }
          100% { transform: translateY(-20px); opacity: 1; }
        }
        @keyframes ringRotate {
          from { transform: perspective(600px) rotateX(72deg) rotateZ(0deg); }
          to { transform: perspective(600px) rotateX(72deg) rotateZ(360deg); }
        }
        @keyframes gemSpin {
          from { transform: perspective(200px) rotateX(20deg) rotateY(0deg); }
          to { transform: perspective(200px) rotateX(20deg) rotateY(360deg); }
        }
        @keyframes cubeFloat {
          0% { transform: translateY(0); }
          100% { transform: translateY(-20px); }
        }
        @keyframes cubeRotate {
          from { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          to { transform: rotateX(360deg) rotateY(360deg) rotateZ(180deg); }
        }
        @keyframes twinkle {
          0% { opacity: 0.15; transform: scale(0.7); }
          100% { opacity: 1; transform: scale(1.4); }
        }
        @keyframes pulse3d {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.25); opacity: 0.9; }
        }
        @keyframes morphBlob {
          0%,100% { border-radius: 40% 60% 60% 40% / 60% 40% 60% 40%; }
          25% { border-radius: 55% 45% 45% 55% / 45% 55% 45% 55%; }
          50% { border-radius: 35% 65% 55% 45% / 55% 35% 65% 45%; }
          75% { border-radius: 60% 40% 40% 60% / 40% 60% 40% 60%; }
        }
        * { scrollbar-width: none; }
        *::-webkit-scrollbar { display: none; }
      `}</style>
      <div style={{ fontFamily: "'DM Sans',sans-serif" }}>
        {shopMode ? <BeautyStorefront onExit={() => { setShopMode(false); window.scrollTo({ top: 0, behavior: "auto" as ScrollBehavior }); }} /> : <>
          <Navbar />
          <HeroSection />
          <ServicesSection />
          <WhyChooseUs />
          <TheExperienceSection />
          <GallerySection />
          <BeautyShopSection />
          <AcademyProgramsSection />
          <AcademyExperienceSection />
          <AcademyEnrollmentSection />
          <ReviewsSection />
          <ComplimentsSection />
          <AwardsSection />
          <LovePraiseSection />
          <AppointmentSection />
          <MapSection />
          <CTASection />
          <Footer />
          <FloatingButtons />
        </>}
      </div>
    </>
  );
}
