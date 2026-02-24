import { useState, useEffect, useRef } from "react";

const COLORS = {
  darkBlue: "#0A1628",
  navy: "#132038",
  accentBlue: "#2E75B6",
  electricBlue: "#4A9FE5",
  orange: "#E8712B",
  orangeLight: "#FF8C42",
  white: "#FFFFFF",
  offWhite: "#F0F4F8",
  lightGray: "#E8ECF1",
  mediumGray: "#8899AA",
  darkGray: "#334155",
  success: "#22C55E",
  danger: "#EF4444",
};

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function AnimateIn({ children, delay = 0, direction = "up", className = "" }) {
  const [ref, visible] = useInView(0.1);
  const transforms = {
    up: "translateY(40px)",
    down: "translateY(-40px)",
    left: "translateX(40px)",
    right: "translateX(-40px)",
    none: "none",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transforms[direction],
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(10, 22, 40, 0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(74, 159, 229, 0.15)" : "none",
        transition: "all 0.4s ease",
        padding: "0 24px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", height: 72 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 900, fontSize: 24, color: COLORS.white, letterSpacing: "-0.02em" }}>SYSLED</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.electricBlue, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>Industrial OS</span>
        </div>
        <button
          onClick={() => document.getElementById("cta-final")?.scrollIntoView({ behavior: "smooth" })}
          style={{
            background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.orangeLight})`,
            color: COLORS.white, border: "none", padding: "10px 24px", borderRadius: 8,
            fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer",
            letterSpacing: "0.02em",
            boxShadow: "0 4px 15px rgba(232, 113, 43, 0.35)",
          }}
        >
          CRIAR CONTA GRÁTIS
        </button>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: `radial-gradient(ellipse at 20% 50%, rgba(46, 117, 182, 0.15) 0%, transparent 60%),
                     radial-gradient(ellipse at 80% 20%, rgba(232, 113, 43, 0.08) 0%, transparent 50%),
                     linear-gradient(180deg, ${COLORS.darkBlue} 0%, ${COLORS.navy} 100%)`,
        position: "relative", overflow: "hidden", padding: "120px 24px 80px",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.03,
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(255,255,255,0.5) 59px, rgba(255,255,255,0.5) 60px),
                          repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(255,255,255,0.5) 59px, rgba(255,255,255,0.5) 60px)`,
      }} />
      <div style={{ maxWidth: 900, textAlign: "center", position: "relative", zIndex: 1 }}>
        <AnimateIn delay={0.1}>
          <div style={{
            display: "inline-block", padding: "6px 20px", borderRadius: 50,
            border: `1px solid ${COLORS.orange}`, marginBottom: 32,
            background: "rgba(232, 113, 43, 0.08)",
          }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: COLORS.orangeLight, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Industrial Operating System
            </span>
          </div>
        </AnimateIn>
        <AnimateIn delay={0.25}>
          <h1 style={{
            fontFamily: "'Anybody', sans-serif", fontWeight: 900, fontSize: "clamp(36px, 6vw, 72px)",
            lineHeight: 1.05, color: COLORS.white, margin: "0 0 12px",
            letterSpacing: "-0.03em",
          }}>
            O ERP <span style={{ color: COLORS.orange, textDecoration: "line-through", textDecorationColor: COLORS.danger, textDecorationThickness: 3 }}>morreu</span>.
          </h1>
        </AnimateIn>
        <AnimateIn delay={0.4}>
          <h2 style={{
            fontFamily: "'Anybody', sans-serif", fontWeight: 700, fontSize: "clamp(24px, 3.5vw, 48px)",
            lineHeight: 1.15, color: COLORS.electricBlue, margin: "0 0 28px",
            letterSpacing: "-0.02em",
          }}>
            Sua fábrica merece um<br />Sistema Operacional.
          </h2>
        </AnimateIn>
        <AnimateIn delay={0.55}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(16px, 2vw, 20px)",
            color: COLORS.mediumGray, maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.6,
          }}>
            Gestão industrial na nuvem. Sem setup. Com personalização por IA.
            Crie sua conta em 2 minutos.
          </p>
        </AnimateIn>
        <AnimateIn delay={0.7}>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => document.getElementById("cta-final")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.orangeLight})`,
                color: COLORS.white, border: "none", padding: "16px 40px", borderRadius: 12,
                fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 16, cursor: "pointer",
                letterSpacing: "0.03em",
                boxShadow: "0 8px 30px rgba(232, 113, 43, 0.4)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 12px 40px rgba(232, 113, 43, 0.5)"; }}
              onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 8px 30px rgba(232, 113, 43, 0.4)"; }}
            >
              CRIAR CONTA GRÁTIS
            </button>
            <button
              onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                background: "rgba(255,255,255,0.05)", color: COLORS.white,
                border: `1.5px solid rgba(255,255,255,0.2)`, padding: "16px 32px", borderRadius: 12,
                fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15, cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.1)"; e.target.style.borderColor = "rgba(255,255,255,0.4)"; }}
              onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.05)"; e.target.style.borderColor = "rgba(255,255,255,0.2)"; }}
            >
              Calcule seu desperdício →
            </button>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

function PainSection() {
  const pains = [
    { emoji: "📊", text: "Uso ERP pro financeiro, mas a produção está na planilha." },
    { emoji: "💸", text: "Meu sistema é caro e eu uso 30% dele." },
    { emoji: "⏳", text: "Pedi uma customização simples e orçaram 3 meses e R$ 50 mil." },
    { emoji: "🖥️", text: "Meu ERP parece que foi feito nos anos 2000." },
    { emoji: "😰", text: "Quero trocar de sistema mas tenho medo de ficar parado." },
  ];
  const [checked, setChecked] = useState(new Set());
  const toggle = (i) => {
    setChecked(prev => {
      const n = new Set(prev);
      n.has(i) ? n.delete(i) : n.add(i);
      return n;
    });
  };
  return (
    <section style={{ background: COLORS.offWhite, padding: "100px 24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <AnimateIn>
          <h2 style={{
            fontFamily: "'Anybody', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 44px)",
            color: COLORS.darkBlue, textAlign: "center", marginBottom: 12, letterSpacing: "-0.02em",
          }}>
            Você se reconhece?
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: COLORS.mediumGray, textAlign: "center", marginBottom: 48 }}>
            Marque as que se aplicam à sua fábrica:
          </p>
        </AnimateIn>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {pains.map((p, i) => (
            <AnimateIn key={i} delay={0.1 * i}>
              <div
                onClick={() => toggle(i)}
                style={{
                  display: "flex", alignItems: "center", gap: 16, padding: "18px 24px",
                  background: checked.has(i) ? "rgba(232, 113, 43, 0.08)" : COLORS.white,
                  border: `2px solid ${checked.has(i) ? COLORS.orange : "transparent"}`,
                  borderRadius: 14, cursor: "pointer",
                  boxShadow: checked.has(i) ? "0 4px 20px rgba(232, 113, 43, 0.12)" : "0 2px 8px rgba(0,0,0,0.04)",
                  transition: "all 0.25s ease",
                }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                  border: `2px solid ${checked.has(i) ? COLORS.orange : "#CBD5E1"}`,
                  background: checked.has(i) ? COLORS.orange : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.25s ease",
                }}>
                  {checked.has(i) && <span style={{ color: COLORS.white, fontSize: 16, fontWeight: 700 }}>✓</span>}
                </div>
                <span style={{ fontSize: 20 }}>{p.emoji}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: COLORS.darkGray, fontWeight: 500, lineHeight: 1.4 }}>
                  {p.text}
                </span>
              </div>
            </AnimateIn>
          ))}
        </div>
        {checked.size >= 2 && (
          <AnimateIn>
            <div style={{
              marginTop: 32, padding: "20px 28px", borderRadius: 14, textAlign: "center",
              background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.orangeLight})`,
              boxShadow: "0 8px 30px rgba(232, 113, 43, 0.3)",
            }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700, color: COLORS.white, margin: 0 }}>
                {checked.size} de 5 marcados. O SYSLED | Industrial OS foi feito pra você. ↓
              </p>
            </div>
          </AnimateIn>
        )}
      </div>
    </section>
  );
}

function VsSection() {
  const rows = [
    ["Filosofia", "Você se adapta ao sistema", "O sistema se adapta a você"],
    ["Implantação", "3 a 12 meses", "Zero setup. Usa hoje."],
    ["Customização", "R$ 30–50 mil. Meses.", "IA entrega em dias."],
    ["Atualizações", "Anuais. Traumáticas.", "Contínuas. Sem parar."],
    ["Interface", "Desktop dos anos 2000", "Moderna. Mobile-first."],
    ["Ecossistema", "Fechado. Caro.", "Marketplace plug-and-play"],
    ["Inteligência", "Relatórios estáticos", "IA nativa"],
    ["Seus dados", "Presos no fornecedor", "100% seus"],
    ["Preço", "Opaco. Surpresas.", "Transparente. Sempre."],
    ["Suporte", "Ticket. Fila. Espera.", "IA resolve 80% na hora"],
  ];
  return (
    <section style={{ background: COLORS.darkBlue, padding: "100px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: 600, height: 600, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(46, 117, 182, 0.1) 0%, transparent 70%)`,
      }} />
      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <AnimateIn>
          <h2 style={{
            fontFamily: "'Anybody', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 44px)",
            color: COLORS.white, textAlign: "center", marginBottom: 8, letterSpacing: "-0.02em",
          }}>
            Industrial OS <span style={{ color: COLORS.mediumGray }}>vs.</span> ERP Tradicional
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: COLORS.mediumGray, textAlign: "center", marginBottom: 48 }}>
            Não é uma melhoria. É uma mudança de conceito.
          </p>
        </AnimateIn>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
            <div style={{ padding: "14px 20px", background: "rgba(255,255,255,0.03)" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, color: COLORS.mediumGray, letterSpacing: "0.12em", textTransform: "uppercase" }}>Dimensão</span>
            </div>
            <div style={{ padding: "14px 20px", background: "rgba(239, 68, 68, 0.08)", textAlign: "center" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, color: COLORS.danger, letterSpacing: "0.12em", textTransform: "uppercase" }}>ERP Tradicional</span>
            </div>
            <div style={{ padding: "14px 20px", background: "rgba(34, 197, 94, 0.08)", textAlign: "center" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, color: COLORS.success, letterSpacing: "0.12em", textTransform: "uppercase" }}>SYSLED | Industrial OS</span>
            </div>
          </div>
          {rows.map((row, i) => (
            <AnimateIn key={i} delay={0.04 * i}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
                <div style={{ padding: "14px 20px", background: "rgba(255,255,255,0.03)" }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: COLORS.electricBlue }}>{row[0]}</span>
                </div>
                <div style={{ padding: "14px 20px", background: "rgba(239, 68, 68, 0.04)", textAlign: "center" }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#F87171" }}>{row[1]}</span>
                </div>
                <div style={{ padding: "14px 20px", background: "rgba(34, 197, 94, 0.04)", textAlign: "center" }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.success, fontWeight: 600 }}>{row[2]}</span>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
        <AnimateIn delay={0.5}>
          <div style={{
            marginTop: 48, padding: "28px 32px", borderRadius: 16,
            background: "rgba(255,255,255,0.04)", borderLeft: `4px solid ${COLORS.electricBlue}`,
          }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: COLORS.mediumGray, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
              Pense no seu celular: você não espera 3 meses pra instalar um app. Não paga R$ 50 mil pra customizar. O sistema atualiza sozinho. <span style={{ color: COLORS.white, fontWeight: 600, fontStyle: "normal" }}>O SYSLED funciona assim — só que pra sua fábrica.</span>
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

function PillarsSection() {
  const pillars = [
    { icon: "⚡", title: "Zero Setup", desc: "Cria a conta e começa a usar hoje. Nada de 6 meses esperando implantação.", color: COLORS.electricBlue },
    { icon: "💎", title: "Preço Justo", desc: "Sem surpresas, sem setup obrigatório. Você sabe quanto paga. Sempre.", color: COLORS.success },
    { icon: "🤖", title: "Customiza em Dias", desc: "IA transforma sua necessidade em funcionalidade. 1 semana, não 3 meses.", color: COLORS.orange },
    { icon: "📱", title: "Mobile e Moderno", desc: "Interface atual, funciona no celular. Gestão da fábrica na palma da mão.", color: "#A78BFA" },
    { icon: "🔐", title: "Seu Dado é Seu", desc: "Controle total sobre seu banco de dados. Nunca mais refém de fornecedor.", color: "#F472B6" },
  ];
  return (
    <section style={{ background: COLORS.white, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <AnimateIn>
          <h2 style={{
            fontFamily: "'Anybody', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 44px)",
            color: COLORS.darkBlue, textAlign: "center", marginBottom: 8, letterSpacing: "-0.02em",
          }}>
            Os 5 Pilares
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: COLORS.mediumGray, textAlign: "center", marginBottom: 56 }}>
            O que torna o SYSLED | Industrial OS diferente de tudo que existe.
          </p>
        </AnimateIn>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
        }}>
          {pillars.map((p, i) => (
            <AnimateIn key={i} delay={0.1 * i}>
              <div style={{
                padding: "32px 28px", borderRadius: 18,
                background: COLORS.offWhite,
                border: "1px solid transparent",
                transition: "all 0.3s ease",
                cursor: "default",
                position: "relative", overflow: "hidden",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = p.color; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 30px ${p.color}15`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{
                  position: "absolute", top: -20, right: -20, width: 100, height: 100,
                  borderRadius: "50%", background: `${p.color}08`,
                }} />
                <span style={{ fontSize: 36, display: "block", marginBottom: 16 }}>{p.icon}</span>
                <h3 style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 700, fontSize: 22, color: COLORS.darkBlue, margin: "0 0 10px", letterSpacing: "-0.01em" }}>
                  {p.title}
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: COLORS.darkGray, margin: 0, lineHeight: 1.6, opacity: 0.85 }}>
                  {p.desc}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Calculator() {
  const [hours, setHours] = useState(10);
  const [errors, setErrors] = useState(5);
  const [reportTime, setReportTime] = useState(4);
  const [rework, setRework] = useState(3);
  const [calculated, setCalculated] = useState(false);

  const hourCost = 50;
  const errorCost = 800;
  const reportCost = hourCost;
  const reworkCost = 1200;

  const monthlyLoss = (hours * 4 * hourCost) + (errors * errorCost) + (reportTime * 4 * reportCost) + (rework * reworkCost);

  const SliderInput = ({ label, value, setValue, min, max, unit, helpText }) => (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
        <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: COLORS.darkBlue }}>
          {label}
        </label>
        <span style={{ fontFamily: "'Anybody', sans-serif", fontSize: 24, fontWeight: 800, color: COLORS.orange }}>
          {value} <span style={{ fontSize: 14, fontWeight: 500, color: COLORS.mediumGray }}>{unit}</span>
        </span>
      </div>
      {helpText && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.mediumGray, margin: "0 0 8px" }}>{helpText}</p>}
      <input
        type="range" min={min} max={max} value={value}
        onChange={e => { setValue(Number(e.target.value)); setCalculated(false); }}
        style={{ width: "100%", accentColor: COLORS.orange, height: 6, cursor: "pointer" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.mediumGray }}>{min}</span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.mediumGray }}>{max}</span>
      </div>
    </div>
  );

  return (
    <section id="calculator" style={{ background: COLORS.offWhite, padding: "100px 24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <AnimateIn>
          <h2 style={{
            fontFamily: "'Anybody', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 40px)",
            color: COLORS.darkBlue, textAlign: "center", marginBottom: 8, letterSpacing: "-0.02em",
          }}>
            Calculadora de Desperdício
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: COLORS.mediumGray, textAlign: "center", marginBottom: 48 }}>
            Descubra quanto sua fábrica perde por não ter o sistema certo.
          </p>
        </AnimateIn>
        <AnimateIn delay={0.15}>
          <div style={{
            background: COLORS.white, borderRadius: 20, padding: "40px 36px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.04)",
          }}>
            <SliderInput label="Horas por semana com planilhas" value={hours} setValue={setHours} min={0} max={40} unit="h/sem" helpText="Tempo gasto alimentando planilhas, conferindo dados, formatando relatórios" />
            <SliderInput label="Erros de estoque por mês" value={errors} setValue={setErrors} min={0} max={30} unit="erros/mês" helpText="Divergências entre estoque físico e sistema" />
            <SliderInput label="Horas por semana para relatórios de produção" value={reportTime} setValue={setReportTime} min={0} max={20} unit="h/sem" helpText="Tempo para gerar, conferir e distribuir relatórios" />
            <SliderInput label="Retrabalhos por mês por erro de sistema" value={rework} setValue={setRework} min={0} max={15} unit="vezes/mês" helpText="Produção refeita por informação incorreta do sistema" />

            <button
              onClick={() => setCalculated(true)}
              style={{
                width: "100%", padding: "16px 32px", borderRadius: 12, border: "none",
                background: calculated ? COLORS.darkBlue : `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.orangeLight})`,
                color: COLORS.white, fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 16,
                cursor: "pointer", marginTop: 8,
                boxShadow: calculated ? "none" : "0 8px 30px rgba(232, 113, 43, 0.3)",
                transition: "all 0.3s",
              }}
            >
              {calculated ? "✓ RESULTADO ABAIXO" : "CALCULAR MEU DESPERDÍCIO"}
            </button>

            {calculated && (
              <div style={{
                marginTop: 28, padding: "28px", borderRadius: 16,
                background: `linear-gradient(135deg, ${COLORS.darkBlue}, ${COLORS.navy})`,
                textAlign: "center",
              }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.mediumGray, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Sua fábrica perde aproximadamente
                </p>
                <p style={{ fontFamily: "'Anybody', sans-serif", fontSize: 48, fontWeight: 900, color: COLORS.danger, margin: "0 0 4px" }}>
                  R$ {monthlyLoss.toLocaleString("pt-BR")}
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: COLORS.mediumGray, margin: "0 0 20px" }}>
                  por mês
                </p>
                <div style={{ height: 1, background: "rgba(255,255,255,0.1)", margin: "0 0 20px" }} />
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: COLORS.electricBlue, margin: "0 0 4px" }}>
                  O SYSLED | Industrial OS custa a partir de
                </p>
                <p style={{ fontFamily: "'Anybody', sans-serif", fontSize: 32, fontWeight: 800, color: COLORS.success, margin: 0 }}>
                  R$ 199/mês
                </p>
              </div>
            )}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

function CompetitorSection() {
  const features = [
    { name: "Produção industrial", sysled: "Robusto", bling: "Fraco", nomus: "Bom", totvs: "Bom" },
    { name: "Interface moderna", sysled: true, bling: true, nomus: false, totvs: false },
    { name: "Mobile nativo", sysled: true, bling: true, nomus: false, totvs: "Parcial" },
    { name: "Zero setup", sysled: true, bling: true, nomus: false, totvs: false },
    { name: "Customizável com IA", sysled: true, bling: false, nomus: false, totvs: false },
    { name: "Preço acessível", sysled: true, bling: true, nomus: true, totvs: false },
    { name: "Controle de dados", sysled: true, bling: false, nomus: "Parcial", totvs: "Depende" },
    { name: "Marketplace de módulos", sysled: true, bling: false, nomus: false, totvs: false },
  ];

  const renderCell = (val) => {
    if (val === true) return <span style={{ color: COLORS.success, fontSize: 18 }}>✅</span>;
    if (val === false) return <span style={{ color: COLORS.danger, fontSize: 18 }}>❌</span>;
    return <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.darkGray }}>{val}</span>;
  };

  return (
    <section style={{ background: COLORS.white, padding: "100px 24px" }}>
      <div style={{ maxWidth: 950, margin: "0 auto" }}>
        <AnimateIn>
          <h2 style={{
            fontFamily: "'Anybody', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 40px)",
            color: COLORS.darkBlue, textAlign: "center", marginBottom: 48, letterSpacing: "-0.02em",
          }}>
            Comparativo Direto
          </h2>
        </AnimateIn>
        <AnimateIn delay={0.15}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, fontFamily: "'DM Sans', sans-serif" }}>
              <thead>
                <tr>
                  <th style={{ padding: "14px 16px", textAlign: "left", fontSize: 13, fontWeight: 700, color: COLORS.mediumGray, letterSpacing: "0.08em", textTransform: "uppercase", borderBottom: `2px solid ${COLORS.lightGray}` }} />
                  <th style={{ padding: "14px 16px", textAlign: "center", fontSize: 14, fontWeight: 800, color: COLORS.orange, letterSpacing: "0.04em", borderBottom: `2px solid ${COLORS.orange}`, background: "rgba(232, 113, 43, 0.04)" }}>SYSLED</th>
                  <th style={{ padding: "14px 16px", textAlign: "center", fontSize: 13, fontWeight: 600, color: COLORS.darkGray, borderBottom: `2px solid ${COLORS.lightGray}` }}>Bling/Tiny</th>
                  <th style={{ padding: "14px 16px", textAlign: "center", fontSize: 13, fontWeight: 600, color: COLORS.darkGray, borderBottom: `2px solid ${COLORS.lightGray}` }}>Nomus</th>
                  <th style={{ padding: "14px 16px", textAlign: "center", fontSize: 13, fontWeight: 600, color: COLORS.darkGray, borderBottom: `2px solid ${COLORS.lightGray}` }}>TOTVS</th>
                </tr>
              </thead>
              <tbody>
                {features.map((f, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? COLORS.offWhite : COLORS.white }}>
                    <td style={{ padding: "12px 16px", fontSize: 14, fontWeight: 600, color: COLORS.darkBlue }}>{f.name}</td>
                    <td style={{ padding: "12px 16px", textAlign: "center", background: i % 2 === 0 ? "rgba(232, 113, 43, 0.04)" : "rgba(232, 113, 43, 0.02)" }}>{renderCell(f.sysled)}</td>
                    <td style={{ padding: "12px 16px", textAlign: "center" }}>{renderCell(f.bling)}</td>
                    <td style={{ padding: "12px 16px", textAlign: "center" }}>{renderCell(f.nomus)}</td>
                    <td style={{ padding: "12px 16px", textAlign: "center" }}>{renderCell(f.totvs)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

function ChallengeSection() {
  return (
    <section style={{
      background: `linear-gradient(135deg, ${COLORS.darkBlue} 0%, #0D2240 100%)`,
      padding: "80px 24px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: "32px 32px",
      }} />
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <AnimateIn>
          <div style={{
            display: "inline-block", padding: "8px 24px", borderRadius: 50, marginBottom: 24,
            background: "rgba(232, 113, 43, 0.15)", border: `1px solid rgba(232, 113, 43, 0.3)`,
          }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: COLORS.orangeLight, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Desafio SYSLED
            </span>
          </div>
        </AnimateIn>
        <AnimateIn delay={0.15}>
          <h2 style={{
            fontFamily: "'Anybody', sans-serif", fontWeight: 900, fontSize: "clamp(24px, 4vw, 42px)",
            color: COLORS.white, marginBottom: 16, lineHeight: 1.15, letterSpacing: "-0.02em",
          }}>
            Se a gente não implantar em<br />
            <span style={{ color: COLORS.orange }}>15 dias</span>, você não paga<br />
            o primeiro mês.
          </h2>
        </AnimateIn>
        <AnimateIn delay={0.3}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: COLORS.mediumGray, maxWidth: 500, margin: "0 auto 32px", lineHeight: 1.6 }}>
            Enquanto outros ERPs pedem 6 meses de implantação, a gente te desafia: 15 dias ou é grátis.
          </p>
        </AnimateIn>
        <AnimateIn delay={0.45}>
          <button
            onClick={() => document.getElementById("cta-final")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.orangeLight})`,
              color: COLORS.white, border: "none", padding: "16px 40px", borderRadius: 12,
              fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 16, cursor: "pointer",
              boxShadow: "0 8px 30px rgba(232, 113, 43, 0.4)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.target.style.transform = "none"}
          >
            ACEITAR O DESAFIO
          </button>
        </AnimateIn>
      </div>
    </section>
  );
}

function NarrativeSection() {
  return (
    <section style={{ background: COLORS.offWhite, padding: "100px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <AnimateIn>
          <h2 style={{
            fontFamily: "'Anybody', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 40px)",
            color: COLORS.darkBlue, textAlign: "center", marginBottom: 48, letterSpacing: "-0.02em",
          }}>
            A História por Trás
          </h2>
        </AnimateIn>
        <div style={{ position: "relative", paddingLeft: 32 }}>
          <div style={{
            position: "absolute", left: 11, top: 0, bottom: 0, width: 2,
            background: `linear-gradient(180deg, ${COLORS.electricBlue}, ${COLORS.orange})`,
          }} />
          {[
            { year: "2016", title: "Varejo + Bling", text: "Comecei no varejo de iluminação. O Bling era barato e funcional, mas não personalizava nada. E meus dados? Nunca foram meus." },
            { year: "2017", title: "TOTVS, Sankhya...", text: "Fui buscar os grandes. Preços opacos, implantações de meses, orçamentos que mudam depois de assinar. A conta não fechava." },
            { year: "2018", title: "Fornecedor local", text: "Ganhei personalização, perdi nuvem e estabilidade. O sistema quebrava. Voltei para as planilhas como muleta." },
            { year: "2020", title: "Sistema próprio", text: "Construí o meu. Gastei mais que uma implantação. Fiquei refém de desenvolvedores. Autonomia que era prisão." },
            { year: "2023", title: "Virada para indústria", text: "O negócio cresceu para indústria. E aí ficou pior: menos opções, mais complexidade, preços absurdos. Se ERP já é ruim pro varejo, pra indústria é pesadelo." },
            { year: "2026", title: "SYSLED | Industrial OS", text: "Depois de 10 anos e 5 sistemas, entendi: o problema não era o ERP. Era o conceito. Construí algo completamente diferente.", color: COLORS.orange },
          ].map((item, i) => (
            <AnimateIn key={i} delay={0.1 * i}>
              <div style={{ marginBottom: 36, position: "relative" }}>
                <div style={{
                  position: "absolute", left: -28, top: 4, width: 14, height: 14,
                  borderRadius: "50%", background: item.color || COLORS.electricBlue,
                  border: `3px solid ${COLORS.offWhite}`,
                }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, color: item.color || COLORS.electricBlue, letterSpacing: "0.08em" }}>
                  {item.year}
                </span>
                <h3 style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 700, fontSize: 20, color: COLORS.darkBlue, margin: "4px 0 8px", letterSpacing: "-0.01em" }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: COLORS.darkGray, margin: 0, lineHeight: 1.6 }}>
                  {item.text}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const [form, setForm] = useState({ nome: "", empresa: "", telefone: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const inputStyle = {
    width: "100%", padding: "14px 18px", borderRadius: 10,
    border: `1.5px solid rgba(255,255,255,0.15)`, background: "rgba(255,255,255,0.06)",
    color: COLORS.white, fontFamily: "'DM Sans', sans-serif", fontSize: 15,
    outline: "none", transition: "border-color 0.2s", boxSizing: "border-box",
  };

  return (
    <section id="cta-final" style={{
      background: `linear-gradient(160deg, ${COLORS.darkBlue} 0%, #0F2847 50%, #132038 100%)`,
      padding: "100px 24px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: -200, right: -200, width: 500, height: 500,
        borderRadius: "50%", background: `radial-gradient(circle, rgba(232, 113, 43, 0.08) 0%, transparent 70%)`,
      }} />
      <div style={{ maxWidth: 560, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <AnimateIn>
          <h2 style={{
            fontFamily: "'Anybody', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 40px)",
            color: COLORS.white, textAlign: "center", marginBottom: 8, letterSpacing: "-0.02em",
          }}>
            Pronto para mudar?
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: COLORS.mediumGray, textAlign: "center", marginBottom: 40, lineHeight: 1.6 }}>
            Crie sua conta gratuita ou fale com um especialista.
          </p>
        </AnimateIn>

        {!submitted ? (
          <AnimateIn delay={0.15}>
            <div style={{
              background: "rgba(255,255,255,0.04)", borderRadius: 20, padding: "36px 32px",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
            }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.mediumGray, display: "block", marginBottom: 6 }}>Nome</label>
                  <input style={inputStyle} value={form.nome} onChange={update("nome")} placeholder="Seu nome" onFocus={e => e.target.style.borderColor = COLORS.electricBlue} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.15)"} />
                </div>
                <div>
                  <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.mediumGray, display: "block", marginBottom: 6 }}>Empresa</label>
                  <input style={inputStyle} value={form.empresa} onChange={update("empresa")} placeholder="Nome da empresa" onFocus={e => e.target.style.borderColor = COLORS.electricBlue} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.15)"} />
                </div>
              </div>
              <div style={{ marginTop: 14 }}>
                <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.mediumGray, display: "block", marginBottom: 6 }}>Telefone / WhatsApp</label>
                <input style={inputStyle} value={form.telefone} onChange={update("telefone")} placeholder="(00) 00000-0000" onFocus={e => e.target.style.borderColor = COLORS.electricBlue} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.15)"} />
              </div>
              <div style={{ marginTop: 14 }}>
                <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.mediumGray, display: "block", marginBottom: 6 }}>E-mail</label>
                <input style={inputStyle} type="email" value={form.email} onChange={update("email")} placeholder="seu@email.com" onFocus={e => e.target.style.borderColor = COLORS.electricBlue} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.15)"} />
              </div>
              <button
                onClick={() => { if (form.nome && form.empresa) setSubmitted(true); }}
                style={{
                  width: "100%", marginTop: 24, padding: "16px 32px", borderRadius: 12, border: "none",
                  background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.orangeLight})`,
                  color: COLORS.white, fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 16,
                  cursor: "pointer", boxShadow: "0 8px 30px rgba(232, 113, 43, 0.35)",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.target.style.transform = "none"}
              >
                FALAR COM ESPECIALISTA
              </button>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.3)", textAlign: "center", marginTop: 16, marginBottom: 0 }}>
                Sem compromisso. Resposta em até 24h.
              </p>
            </div>
          </AnimateIn>
        ) : (
          <AnimateIn>
            <div style={{
              background: "rgba(34, 197, 94, 0.08)", borderRadius: 20, padding: "48px 32px",
              border: `1px solid rgba(34, 197, 94, 0.2)`, textAlign: "center",
            }}>
              <span style={{ fontSize: 48, display: "block", marginBottom: 16 }}>✅</span>
              <h3 style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 700, fontSize: 24, color: COLORS.white, margin: "0 0 12px" }}>
                Recebemos seus dados, {form.nome.split(" ")[0]}!
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: COLORS.mediumGray, margin: 0, lineHeight: 1.6 }}>
                Um especialista do SYSLED vai entrar em contato em até 24h para agendar sua demonstração personalizada.
              </p>
            </div>
          </AnimateIn>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      background: "#060E1A", padding: "40px 24px", textAlign: "center",
      borderTop: "1px solid rgba(255,255,255,0.05)",
    }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 8, marginBottom: 16 }}>
        <span style={{ fontFamily: "'Anybody', sans-serif", fontWeight: 900, fontSize: 20, color: COLORS.white }}>SYSLED</span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.electricBlue, fontWeight: 500, letterSpacing: "0.08em" }}>Industrial OS</span>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 16 }}>
        <a href="/roi" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = COLORS.electricBlue} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}>ROI Investidores</a>
        <a href="/propostacomercial" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = COLORS.electricBlue} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}>Proposta Comercial</a>
      </div>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.3)", margin: 0 }}>
        SYSLED Tecnologia LTDA — Fortaleza, CE — © 2026
      </p>
    </footer>
  );
}

export default function SYSLEDLandingPage() {
  return (
    <div style={{ margin: 0, padding: 0, overflowX: "hidden" }}>
      <NavBar />
      <Hero />
      <PainSection />
      <VsSection />
      <PillarsSection />
      <Calculator />
      <CompetitorSection />
      <ChallengeSection />
      <NarrativeSection />
      <CTASection />
      <Footer />
    </div>
  );
}
