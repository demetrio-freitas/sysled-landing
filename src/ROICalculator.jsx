import { useState, useEffect, useRef } from "react";

// ─── Paleta SYSLED ───────────────────────────────────────────────────────────
const C = {
  navy:        "#0A1628",
  navyMid:     "#0F2040",
  navyLight:   "#162840",
  orange:      "#E8712B",
  orangeLight: "#FF8C42",
  blue:        "#2E75B6",
  blueLight:   "#4A9FE5",
  green:       "#10B981",
  greenLight:  "#34D399",
  purple:      "#7C3AED",
  purpleLight: "#A78BFA",
  red:         "#EF4444",
  white:       "#FFFFFF",
  offWhite:    "#F0F4F8",
  muted:       "#8899AA",
  dark:        "#334155",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n) =>
  n >= 1_000_000
    ? `R$ ${(n / 1_000_000).toFixed(1).replace(".", ",")}M`
    : n >= 1_000
    ? `R$ ${(n / 1_000).toFixed(0)}K`
    : `R$ ${n.toFixed(0)}`;

const fmtFull = (n) =>
  "R$ " + Math.round(n).toLocaleString("pt-BR");

const pct = (n) => `${(n * 100).toFixed(0)}%`;

// ─── Animação de número ───────────────────────────────────────────────────────
function AnimatedNumber({ value, prefix = "", suffix = "", decimals = 0, duration = 800 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const start = ref.current ?? 0;
    ref.current = value;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(start + (value - start) * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value, duration]);
  const formatted = decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString("pt-BR");
  return <span>{prefix}{formatted}{suffix}</span>;
}

// ─── Slider customizado ───────────────────────────────────────────────────────
function Slider({ label, value, min, max, step, onChange, format, color = C.orange, hint }) {
  const pctVal = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>
          {label}
        </span>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color }}>
          {format(value)}
        </span>
      </div>
      {hint && <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: C.muted, margin: "0 0 8px", opacity: 0.7 }}>{hint}</p>}
      <div style={{ position: "relative", height: 6, borderRadius: 3, background: "rgba(255,255,255,0.08)" }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${pctVal}%`, borderRadius: 3, background: `linear-gradient(90deg, ${color}88, ${color})` }} />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            opacity: 0, cursor: "pointer", margin: 0,
          }}
        />
        <div style={{
          position: "absolute", top: "50%", left: `${pctVal}%`,
          transform: "translate(-50%, -50%)",
          width: 18, height: 18, borderRadius: "50%",
          background: color, border: "3px solid #0A1628",
          boxShadow: `0 0 12px ${color}66`,
          pointerEvents: "none",
        }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        <span style={{ fontSize: 11, color: C.muted, fontFamily: "'Space Grotesk', sans-serif" }}>{format(min)}</span>
        <span style={{ fontSize: 11, color: C.muted, fontFamily: "'Space Grotesk', sans-serif" }}>{format(max)}</span>
      </div>
    </div>
  );
}

// ─── Card de KPI ──────────────────────────────────────────────────────────────
function KpiCard({ label, value, sub, color = C.green, icon }) {
  return (
    <div style={{
      padding: "20px 22px", borderRadius: 14,
      background: "rgba(255,255,255,0.04)",
      border: `1px solid ${color}33`,
      boxShadow: `0 0 24px ${color}11`,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</span>
        <span style={{ fontSize: 18 }}>{icon}</span>
      </div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 800, color, marginTop: 8, lineHeight: 1.1 }}>{value}</div>
      {sub && <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: C.muted, marginTop: 6, lineHeight: 1.4 }}>{sub}</div>}
    </div>
  );
}

// ─── Gráfico de barras MRR ────────────────────────────────────────────────────
function MrrChart({ data, height = 200 }) {
  const max = Math.max(...data.map((d) => d.mrr));
  const milestones = [
    { month: 3, label: "Fundação", color: C.orange },
    { month: 9, label: "PMF", color: C.purple },
    { month: 18, label: "Tração", color: C.blue },
    { month: 36, label: "Escala", color: C.green },
  ];

  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height }}>
        {data.map((d, i) => {
          const milestone = milestones.find((m) => m.month === d.month);
          const h = (d.mrr / max) * (height - 32);
          const color = milestone ? milestone.color : C.blueLight;
          return (
            <div
              key={i}
              title={`Mês ${d.month}: ${fmtFull(d.mrr)} MRR · ${d.clients} clientes`}
              style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}
            >
              {milestone && (
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: 9, color: milestone.color,
                  fontWeight: 700, marginBottom: 4, whiteSpace: "nowrap", letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}>
                  {milestone.label}
                </div>
              )}
              {!milestone && <div style={{ marginBottom: 4, height: 13 }} />}
              <div style={{
                width: "100%", height: h || 2, minHeight: 2,
                background: milestone
                  ? `linear-gradient(180deg, ${color}, ${color}88)`
                  : `linear-gradient(180deg, ${C.blueLight}88, ${C.blueLight}44)`,
                borderRadius: "3px 3px 0 0",
                boxShadow: milestone ? `0 0 10px ${color}55` : "none",
                transition: "height 0.5s cubic-bezier(0.16,1,0.3,1)",
              }} />
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif", fontSize: d.month % 6 === 0 ? 10 : 9,
                color: milestone ? milestone.color : (d.month % 6 === 0 ? C.muted : "transparent"),
                marginTop: 4, fontWeight: d.month % 6 === 0 ? 700 : 400,
              }}>
                {d.month}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Timeline de retorno ──────────────────────────────────────────────────────
function ReturnTimeline({ investment, monthlyData }) {
  const paybackMonth = monthlyData.findIndex((d) => d.cumulativeRevenue >= investment);
  const roiAt36 = ((monthlyData[35]?.cumulativeRevenue - investment) / investment) * 100;

  return (
    <div>
      <div style={{ position: "relative", height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, marginBottom: 16 }}>
        <div style={{
          position: "absolute", left: 0, top: 0, height: "100%",
          width: `${Math.min((paybackMonth / 36) * 100, 100)}%`,
          background: `linear-gradient(90deg, ${C.orange}, ${C.green})`,
          borderRadius: 3,
        }} />
        {paybackMonth > 0 && paybackMonth <= 36 && (
          <div style={{
            position: "absolute", top: "50%", left: `${(paybackMonth / 36) * 100}%`,
            transform: "translate(-50%, -50%)",
            width: 14, height: 14, borderRadius: "50%",
            background: C.green, border: "3px solid #0A1628",
            boxShadow: `0 0 14px ${C.green}`,
          }} />
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: C.muted }}>
        <span>Mês 0 (Investimento)</span>
        <span style={{ color: C.green, fontWeight: 700 }}>
          {paybackMonth > 0 && paybackMonth <= 36 ? `Payback: Mês ${paybackMonth}` : paybackMonth > 36 ? "Payback > 36 meses" : "Payback < 1 mês"}
        </span>
        <span>Mês 36</span>
      </div>
      <div style={{
        marginTop: 16, padding: "14px 18px", borderRadius: 10,
        background: roiAt36 > 0 ? "rgba(16, 185, 129, 0.06)" : "rgba(239,68,68,0.06)",
        border: `1px solid ${roiAt36 > 0 ? C.green : C.red}33`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: C.muted }}>ROI em 36 meses (sobre receita acumulada)</span>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800, color: roiAt36 > 0 ? C.green : C.red }}>
          {roiAt36 > 0 ? "+" : ""}{roiAt36.toFixed(0)}%
        </span>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function SYSLEDInvestorCalculator() {
  // Inputs controláveis
  const [investment, setInvestment]       = useState(500_000);
  const [ticketMedio, setTicketMedio]     = useState(2_000);
  const [churnMensal, setChurnMensal]     = useState(3);
  const [growthRate, setGrowthRate]       = useState(15);
  const [grossMargin, setGrossMargin]     = useState(70);
  const [cacMultiplier, setCacMultiplier] = useState(3_500);

  // Cenário atual
  const [scenario, setScenario] = useState("base"); // base | otimista | conservador

  const scenarios = {
    base:        { ticket: 2_000, churn: 3,   growth: 15, margin: 70, cac: 3_500, invest: 500_000  },
    otimista:    { ticket: 2_500, churn: 2,   growth: 20, margin: 75, cac: 2_500, invest: 500_000  },
    conservador: { ticket: 1_500, churn: 5,   growth: 10, margin: 65, cac: 5_000, invest: 500_000  },
  };

  const applyScenario = (s) => {
    const sc = scenarios[s];
    setTicketMedio(sc.ticket);
    setChurnMensal(sc.churn);
    setGrowthRate(sc.growth);
    setGrossMargin(sc.margin);
    setCacMultiplier(sc.cac);
    setInvestment(sc.invest);
    setScenario(s);
  };

  // ── Projeção mês a mês ─────────────────────────────────────────────────────
  const monthlyData = (() => {
    const data = [];
    let clients = 0;
    let mrr = 0;
    let cumulativeRevenue = 0;

    // Fase 0-1: Fundação (meses 1-6) — crescimento inicial mais lento
    // Fase 2: Tração (meses 7-18) — crescimento acelerado
    // Fase 3: Escala (meses 19-36) — crescimento sustentado

    for (let m = 1; m <= 36; m++) {
      const phase = m <= 6 ? "fundacao" : m <= 18 ? "tracao" : "escala";
      const phaseGrowth = {
        fundacao: growthRate * 0.5,
        tracao:   growthRate,
        escala:   growthRate * 0.8,
      }[phase];

      // Novos clientes com base no CAC e budget alocado por fase
      const phaseBudgetAlloc = { fundacao: 0.2, tracao: 0.5, escala: 0.3 }[phase];
      const mktBudget = (investment * phaseBudgetAlloc) / (phase === "fundacao" ? 6 : phase === "tracao" ? 12 : 18);
      const newClients = Math.round(mktBudget / cacMultiplier);

      const churned = Math.round(clients * (churnMensal / 100));
      clients = clients + newClients - churned;
      mrr = clients * ticketMedio;
      cumulativeRevenue += mrr;

      data.push({ month: m, clients, mrr, cumulativeRevenue, newClients, churned, phase });
    }
    return data;
  })();

  const lastMonth = monthlyData[35];
  const arr36 = lastMonth.mrr * 12;
  const ltv = (ticketMedio / (churnMensal / 100)) * (grossMargin / 100);
  const ltvCac = ltv / cacMultiplier;
  const paybackMonths = cacMultiplier / (ticketMedio * (grossMargin / 100));
  const totalRevenue36 = lastMonth.cumulativeRevenue;
  const totalGrossProfit36 = totalRevenue36 * (grossMargin / 100);
  const roi = ((totalRevenue36 - investment) / investment) * 100;

  const milestoneMonths = [
    { m: 3,  label: "Smart Factory",   target: "10-20 clientes",   color: C.orange  },
    { m: 6,  label: "Go-live",         target: "MRR R$30-50K",    color: C.orangeLight },
    { m: 9,  label: "PMF",             target: "Sean Ellis ≥40%",  color: C.purple  },
    { m: 18, label: "Tração",          target: "100 clientes",     color: C.blue    },
    { m: 36, label: "Escala",          target: "200+ clientes",    color: C.green   },
  ];

  const scBtn = (s, label) => (
    <button
      onClick={() => applyScenario(s)}
      style={{
        padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer",
        fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700,
        background: scenario === s
          ? (s === "otimista" ? C.green : s === "conservador" ? C.red : C.orange)
          : "rgba(255,255,255,0.06)",
        color: scenario === s ? C.white : C.muted,
        transition: "all 0.2s",
        boxShadow: scenario === s ? `0 0 16px ${s === "otimista" ? C.green : s === "conservador" ? C.red : C.orange}44` : "none",
      }}
    >{label}</button>
  );

  return (
    <div style={{
      minHeight: "100vh", background: C.navy, color: C.white,
      fontFamily: "'Space Grotesk', sans-serif",
      padding: "0 0 60px",
    }}>
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div style={{
        background: `linear-gradient(135deg, ${C.navyLight} 0%, ${C.navyMid} 100%)`,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "28px 40px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 16,
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
            <span style={{ fontSize: 22, fontWeight: 900, color: C.white, letterSpacing: "-0.02em" }}>SYSLED</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: C.blueLight, letterSpacing: "0.1em", textTransform: "uppercase" }}>Industrial OS</span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: C.white, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Calculadora de ROI — Investidores
          </h1>
          <p style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>
            Projeção 36 meses · B2B SaaS · Manufatura Industrial Brasil · Fevereiro 2026
          </p>
        </div>
        <div style={{
          padding: "10px 20px", borderRadius: 10,
          background: "rgba(232,113,43,0.1)", border: `1px solid ${C.orange}44`,
        }}>
          <div style={{ fontSize: 11, color: C.orange, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>Cenário</div>
          <div style={{ display: "flex", gap: 8 }}>
            {scBtn("conservador", "Conservador")}
            {scBtn("base", "Base")}
            {scBtn("otimista", "Otimista")}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 32, alignItems: "start" }}>

          {/* ── Painel de Inputs ───────────────────────────────────────────── */}
          <div style={{
            background: C.navyLight, borderRadius: 18, padding: "28px 24px",
            border: "1px solid rgba(255,255,255,0.06)",
            position: "sticky", top: 24,
          }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 24 }}>
              Parâmetros do Modelo
            </h2>

            <Slider
              label="Investimento Seed"
              value={investment}
              min={100_000} max={2_000_000} step={50_000}
              onChange={setInvestment}
              format={(v) => fmtFull(v)}
              color={C.orange}
              hint="Capital alocado (FIEC, SENAI, Angel, Seed Fund)"
            />
            <Slider
              label="Ticket Médio / mês"
              value={ticketMedio}
              min={500} max={5_000} step={100}
              onChange={setTicketMedio}
              format={(v) => `R$ ${v.toLocaleString("pt-BR")}`}
              color={C.blueLight}
              hint="Sweet spot: R$1.499/mês (Plano Indústria)"
            />
            <Slider
              label="Churn Mensal"
              value={churnMensal}
              min={1} max={10} step={0.5}
              onChange={setChurnMensal}
              format={(v) => `${v}%`}
              color={C.red}
              hint="Meta: 2% / Conservador: 5%"
            />
            <Slider
              label="Crescimento MoM"
              value={growthRate}
              min={5} max={35} step={1}
              onChange={setGrowthRate}
              format={(v) => `${v}%`}
              color={C.green}
              hint="15-20% na fase de tração (benchmark SaaS B2B)"
            />
            <Slider
              label="Gross Margin"
              value={grossMargin}
              min={50} max={90} step={1}
              onChange={setGrossMargin}
              format={(v) => `${v}%`}
              color={C.purple}
              hint="Meta >70% (inclui compliance fiscal)"
            />
            <Slider
              label="CAC médio"
              value={cacMultiplier}
              min={500} max={10_000} step={250}
              onChange={setCacMultiplier}
              format={(v) => `R$ ${v.toLocaleString("pt-BR")}`}
              color={C.orangeLight}
              hint="Canal direto + indicação + eventos"
            />

            {/* Disclaimer */}
            <div style={{
              marginTop: 20, padding: "12px 14px", borderRadius: 8,
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <p style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
                ⚠️ Projeção financeira baseada em premissas de mercado.
                Números validados com dados reais após lançamento.
                Confidencial — uso interno.
              </p>
            </div>
          </div>

          {/* ── Painel de Resultados ───────────────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* KPIs principais */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              <KpiCard
                label="MRR em 36 meses"
                value={<AnimatedNumber value={lastMonth.mrr} prefix="R$ " />}
                sub={`${lastMonth.clients} clientes ativos`}
                color={C.green} icon="📈"
              />
              <KpiCard
                label="ARR em 36 meses"
                value={<AnimatedNumber value={arr36} prefix="R$ " />}
                sub={`Receita anualizada no mês 36`}
                color={C.blueLight} icon="🏭"
              />
              <KpiCard
                label="ROI sobre Investimento"
                value={<AnimatedNumber value={roi} suffix="%" />}
                sub={`Receita acumulada 36 meses`}
                color={roi > 200 ? C.green : roi > 0 ? C.orange : C.red} icon="💰"
              />
            </div>

            {/* Unit Economics */}
            <div style={{
              background: C.navyLight, borderRadius: 18, padding: "24px",
              border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <h2 style={{ fontSize: 13, fontWeight: 700, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
                Unit Economics
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                {[
                  { label: "LTV (Gross)", value: fmt(ltv), color: C.green, sub: `Por cliente ativo` },
                  { label: "CAC", value: `R$ ${cacMultiplier.toLocaleString("pt-BR")}`, color: C.orange, sub: `Custo aquisição` },
                  { label: "LTV:CAC", value: `${ltvCac.toFixed(1)}:1`, color: ltvCac >= 10 ? C.green : ltvCac >= 3 ? C.orange : C.red, sub: `Benchmark ≥3:1` },
                  { label: "Payback CAC", value: `${Math.ceil(paybackMonths)} meses`, color: paybackMonths <= 12 ? C.green : C.orange, sub: `Meta ≤12 meses` },
                ].map((k, i) => (
                  <div key={i} style={{ padding: "14px 16px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: `1px solid ${k.color}22` }}>
                    <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>{k.label}</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: k.color, lineHeight: 1 }}>{k.value}</div>
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 6 }}>{k.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gráfico MRR */}
            <div style={{
              background: C.navyLight, borderRadius: 18, padding: "24px",
              border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h2 style={{ fontSize: 13, fontWeight: 700, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Curva de MRR — 36 Meses
                </h2>
                <div style={{ display: "flex", gap: 16 }}>
                  {[{ l: "Marcos", c: C.orange }, { l: "Crescimento", c: C.blueLight }].map((x) => (
                    <div key={x.l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: x.c }} />
                      <span style={{ fontSize: 11, color: C.muted }}>{x.l}</span>
                    </div>
                  ))}
                </div>
              </div>
              <MrrChart data={monthlyData} height={220} />
            </div>

            {/* Timeline Payback */}
            <div style={{
              background: C.navyLight, borderRadius: 18, padding: "24px",
              border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <h2 style={{ fontSize: 13, fontWeight: 700, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
                Timeline de Retorno
              </h2>
              <ReturnTimeline investment={investment} monthlyData={monthlyData} />
            </div>

            {/* Milestones com dados projetados */}
            <div style={{
              background: C.navyLight, borderRadius: 18, padding: "24px",
              border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <h2 style={{ fontSize: 13, fontWeight: 700, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
                Marcos Estratégicos — Dados Projetados
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
                {milestoneMonths.map((ms) => {
                  const d = monthlyData[ms.m - 1];
                  return (
                    <div key={ms.m} style={{
                      padding: "16px 14px", borderRadius: 12,
                      background: `${ms.color}0A`, border: `1px solid ${ms.color}33`,
                      textAlign: "center",
                    }}>
                      <div style={{ fontSize: 11, color: ms.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                        Mês {ms.m}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: ms.color, marginBottom: 4 }}>
                        {ms.label}
                      </div>
                      <div style={{ width: 40, height: 1, background: `${ms.color}44`, margin: "8px auto" }} />
                      <div style={{ fontSize: 18, fontWeight: 800, color: C.white, marginBottom: 2 }}>
                        {d.clients}
                      </div>
                      <div style={{ fontSize: 10, color: C.muted, marginBottom: 6 }}>clientes</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: ms.color }}>
                        {fmt(d.mrr)}
                      </div>
                      <div style={{ fontSize: 10, color: C.muted }}>MRR</div>
                      <div style={{ marginTop: 8, fontSize: 10, color: C.muted, fontStyle: "italic", lineHeight: 1.4 }}>
                        {ms.target}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Resumo financeiro consolidado */}
            <div style={{
              borderRadius: 18, padding: "28px 32px",
              background: `linear-gradient(135deg, rgba(232,113,43,0.08), rgba(46,117,182,0.08))`,
              border: `1px solid rgba(232,113,43,0.2)`,
            }}>
              <h2 style={{ fontSize: 13, fontWeight: 700, color: C.orange, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
                Resumo do Tese de Investimento
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <div>
                  {[
                    ["Investimento total", fmtFull(investment), C.orange],
                    ["Receita acumulada 36m", fmtFull(totalRevenue36), C.green],
                    ["Lucro bruto acumulado 36m", fmtFull(totalGrossProfit36), C.greenLight],
                    ["MRR final (mês 36)", fmtFull(lastMonth.mrr), C.blueLight],
                    ["ARR equivalente", fmtFull(arr36), C.purple],
                  ].map(([label, val, color]) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingBottom: 12, marginBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <span style={{ fontSize: 13, color: C.muted }}>{label}</span>
                      <span style={{ fontSize: 16, fontWeight: 700, color }}>{val}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{
                    padding: "20px", borderRadius: 12, textAlign: "center",
                    background: roi > 200 ? "rgba(16,185,129,0.08)" : "rgba(232,113,43,0.08)",
                    border: `1px solid ${roi > 200 ? C.green : C.orange}33`,
                    marginBottom: 16,
                  }}>
                    <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                      ROI Total 36 Meses
                    </div>
                    <div style={{ fontSize: 48, fontWeight: 900, color: roi > 200 ? C.green : C.orange, lineHeight: 1 }}>
                      <AnimatedNumber value={roi} suffix="%" />
                    </div>
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 8 }}>
                      sobre receita acumulada
                    </div>
                  </div>
                  <div style={{
                    padding: "14px 16px", borderRadius: 10,
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                    fontSize: 12, color: C.muted, lineHeight: 1.6,
                  }}>
                    <strong style={{ color: C.white }}>TAM/SAM:</strong> R$9,9B TAM · R$550M SAM<br />
                    <strong style={{ color: C.white }}>Janela:</strong> 18-24 meses antes da resposta competitiva<br />
                    <strong style={{ color: C.white }}>Proteção:</strong> Compliance fiscal BR (NF-e, SPED, Bloco K)
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
