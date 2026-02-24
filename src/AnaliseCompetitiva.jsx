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
  green:       "#22C55E",
  greenLight:  "#4ADE80",
  red:         "#EF4444",
  redLight:    "#F87171",
  yellow:      "#F59E0B",
  purple:      "#7C3AED",
  white:       "#FFFFFF",
  offWhite:    "#F0F4F8",
  muted:       "#8899AA",
  mutedLight:  "#AAB8C8",
  dark:        "#334155",
  border:      "rgba(255,255,255,0.07)",
};

// ─── Animação de entrada ──────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
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

function AnimateIn({ children, delay = 0, direction = "up" }) {
  const [ref, visible] = useInView(0.08);
  const transforms = {
    up: "translateY(28px)", down: "translateY(-28px)",
    left: "translateX(28px)", right: "translateX(-28px)", none: "none",
  };
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : transforms[direction],
      transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
function Badge({ label, color = C.orange }) {
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px", borderRadius: 50,
      background: `${color}18`, border: `1px solid ${color}44`,
      fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700,
      color, letterSpacing: "0.1em", textTransform: "uppercase",
    }}>{label}</span>
  );
}

// ─── Dados dos Competidores ───────────────────────────────────────────────────
const COMPETITORS = [
  {
    id: "nomus",
    name: "Nomus",
    subtitle: "Concorrente Direto Principal",
    founded: 2005,
    focus: "PMI Manufatura",
    priceEntry: "R$490/mês",
    priceReal: "R$800–2.000",
    setup: "Semanas–meses",
    clients: "~2.000 indústrias",
    mobile: false,
    ai: false,
    api: false,
    pcp: true,
    zerocost: false,
    reclameResp: "100 dias",
    reclameColor: C.red,
    tagColor: C.red,
    threat: "ALTA",
    threatColor: C.red,
    weaknesses: [
      { emoji: "🔴", title: "Gargalo de Acessos Simultâneos", text: "Plano inicial oferece apenas 3 acessos. Em um chão de fábrica com 10+ operadores, isso é inviável. Cada acesso adicional cobrado à parte, inflando o custo real." },
      { emoji: "🔴", title: "Zero API — Lock-in Estrutural", text: "Sem API pública em 2026. Impossibilidade de integração com CRM, BI, e-commerce, IoT. Para qualquer gestor de TI, isso é um deal-breaker imediato." },
      { emoji: "🔴", title: "Suporte: 100 Dias de Resposta", text: "Tempo médio de resposta no Reclame Aqui (ago/2025–jan/2026): 100 dias e 10 horas. Para fábrica com produção parada por erro no sistema, isso é catastrófico." },
      { emoji: "🔴", title: "UX Datada e Bugs Recorrentes", text: "Erros em somatórias de colunas, links quebrados, impossibilidade de importar XMLs sem histórico prévio. Suporte sempre delega para o time de desenvolvimento sem resolver." },
      { emoji: "🔴", title: "Sem Mobile Nativo", text: "Sistema 100% web responsivo, mas sem app mobile dedicado para operadores de chão de fábrica. Apontamento de produção pelo celular inexiste de forma nativa." },
    ],
    strengths: [
      "Cobertura funcional genuinamente completa: PCP, MRP, custos, qualidade, rastreabilidade, NF-e, SPED, Bloco K",
      "Cases de sucesso documentados e públicos em vários segmentos industriais",
      "Método de implantação estruturado por engenheiros de produção — credibilidade técnica real",
      "20+ anos de melhorias acumuladas — maturidade de produto",
      "Roadmap ativo com dezenas de entregas planejadas para 2026 (integrações CRM, TMS, Serasa, contabilidade)",
    ],
    pitch: "O Nomus foi feito por engenheiros de produção — e parece. É um sistema que engenheiro entende, não o operador da fábrica. Quantas pessoas usam o sistema ao mesmo tempo no seu chão de fábrica? Três? E se pudessem ser todas?",
    openings: [
      "\"Vocês têm API?\" — cada vez que perguntam isso na feira, o Nomus perde. Porque a resposta é não.",
      "\"Quanto tempo levou pra implantar?\" — se a resposta for meses, você já ganhou. SYSLED: dias.",
      "\"Seu operador de chão usa o sistema do celular?\" — a resposta é sempre não. E é exatamente aí que o dado fica preso.",
    ],
  },
  {
    id: "bling",
    name: "Bling",
    subtitle: "O ERP que Todo Mundo Superou",
    founded: 2010,
    focus: "Varejo / E-commerce",
    priceEntry: "R$55/mês",
    priceReal: "R$250–650",
    setup: "Self-service",
    clients: "+200K (varejo)",
    mobile: "Parcial",
    ai: false,
    api: true,
    pcp: false,
    zerocost: true,
    reclameResp: "Razoável",
    reclameColor: C.yellow,
    tagColor: C.yellow,
    threat: "MÉDIA",
    threatColor: C.yellow,
    weaknesses: [
      { emoji: "🟡", title: "Produção Industrial Inexistente", text: "Apenas ordem de produção básica e controle de matéria-prima — sem PCP, MRP, programação de produção ou apontamento real." },
      { emoji: "🟡", title: "Lock-in de Dados", text: "Downgrade de plano bloqueado quando armazenamento excede o limite. Clientes ficam presos no plano caro sem poder fazer downgrade." },
      { emoji: "🟡", title: "Reajuste de Abril/2025", text: "A partir de 5.000 pedidos/mês o plano obrigatório passa a ser Diamante (R$650/mês). Clientes em planos inferiores ficaram congelados." },
      { emoji: "🟡", title: "Sem Compliance Fiscal Avançado", text: "Bloco K, SPED completo e rastreabilidade de lote não são nativos para indústria." },
      { emoji: "🟡", title: "Zero IA Industrial", text: "Sem previsão de demanda, sem otimização de produção, sem inteligência nos fluxos industriais." },
    ],
    strengths: [
      "UX excelente — design moderno, onboarding self-service, trial 30 dias grátis",
      "API aberta robusta — integrações com 50+ marketplaces e e-commerces",
      "Preço imbatível para microempresas e varejo",
      "Conta digital integrada (Bling Conta) — fintech dentro do ERP",
      "Base massiva +200K clientes — brand awareness e reconhecimento no mercado",
    ],
    pitch: "O Bling é ótimo pra varejo. Se você fabrica produtos simples e vende no marketplace, funciona. Mas quando a produção fica séria — PCP, rastreabilidade, qualidade — o Bling some. E aí você descobre que seus dados estão presos no plano deles.",
    openings: [
      "\"Você usa o Bling pra produção ou só pro financeiro?\" — 100% das vezes é só pro financeiro.",
      "\"Já tentou fazer um Bloco K pelo Bling?\" — ninguém tentou. Porque não dá.",
      "\"O que acontece se você quiser mudar de plano?\" — a resposta abre a conversa sobre lock-in.",
    ],
  },
  {
    id: "totvs",
    name: "TOTVS Protheus",
    subtitle: "O Gigante Que Paralisa PMIs",
    founded: 1983,
    focus: "Médio/Grande Porte",
    priceEntry: "R$1.800+/mês",
    priceReal: "R$3.000–8.000",
    setup: "3–12 meses",
    clients: "+30.000",
    mobile: "Parcial",
    ai: "Carol (decorativa)",
    api: "AdvPL (fechada)",
    pcp: true,
    zerocost: false,
    reclameResp: "Complexo",
    reclameColor: C.red,
    tagColor: C.blue,
    threat: "BAIXA (PMI)",
    threatColor: C.blue,
    weaknesses: [
      { emoji: "🔴", title: "Complexidade Desproporcional", text: "+80 módulos, linguagem proprietária AdvPL. Projetado para empresa com TI interna dedicada — não para PMI de 40–200 funcionários." },
      { emoji: "🔴", title: "Conceito de 1980 Aplicado Hoje", text: "Originalmente sistema desktop, migrado para web sem repensar UX. Avaliação Capterra: 'não foi desenvolvido totalmente para WEB'." },
      { emoji: "🔴", title: "Ciclo de Implantação Longo", text: "3–12 meses típico para PMI — durante esse tempo a fábrica opera em dois sistemas simultaneamente, gerando caos operacional." },
      { emoji: "🔴", title: "Dependência Total de Consultoria", text: "Ecossistema inteiro de revendas TOTVS cobra por hora de customização, treinamento e suporte. R$200/hora é comum." },
      { emoji: "🔴", title: "\"Carol AI\" Decorativa", text: "IA anunciada como previsão de demanda e alertas, mas na prática limitada a insights superficiais sem ação automatizada nos fluxos core." },
    ],
    strengths: [
      "Cobertura funcional insuperável: +80 módulos cobrindo literalmente qualquer necessidade empresarial",
      "Compliance fiscal robusto: equipe dedicada a atualizações legislativas, incluindo reforma tributária 2026",
      "Ecossistema maduro: milhares de consultores certificados, integrações e comunidade ativa",
      "Marca de confiança: 'ninguém foi demitido por escolher TOTVS' — segurança na decisão",
      "Investimento contínuo: migração para cloud, Smart View, otimizador de tela na versão 12.1.2410",
    ],
    pitch: "A TOTVS é excelente. Para quem tem R$2.000+/mês e 6 meses de paciência pra implantar. Se esse é você, eles são a escolha certa. Mas se você quer entrar amanhã, sem consultoria obrigatória, sem licença por usuário, sem pagar R$200/hora de customização... é outro produto que você precisa.",
    openings: [
      "\"Há quanto tempo está no TOTVS? A implantação foi tranquila?\" — raramente dizem que sim.",
      "\"Quantos consultores terceirizados você usa por mês?\" — a resposta revela o custo oculto real.",
      "\"Sua equipe consegue fazer customizações sem contratar consultoria?\" — a resposta é sempre não.",
    ],
  },
  {
    id: "sankhya",
    name: "Sankhya",
    subtitle: "O Mid-Market Ambicioso",
    founded: 1989,
    focus: "Mid-market",
    priceEntry: "Sob consulta",
    priceReal: "R$2.000–5.000",
    setup: "3–6 meses",
    clients: "+35.000",
    mobile: "Web/Mobile",
    ai: "IA básica",
    api: "Parcial",
    pcp: true,
    zerocost: false,
    reclameResp: "4 dias",
    reclameColor: C.yellow,
    tagColor: C.purple,
    threat: "MÉDIA",
    threatColor: C.purple,
    weaknesses: [
      { emoji: "🔴", title: "Implantação Caótica (Reclame Aqui)", text: "Relato público: 10 meses de implantação, 15+ implantadores diferentes com rodízio constante, necessidade de recontar a história a cada novo implantador." },
      { emoji: "🔴", title: "Customização = Fonte de Receita", text: "Reviews B2B Stack: 'custo poderia ser mais acessível'. A Sankhya enxerga a implantação como fonte inesgotável de receita pós-venda." },
      { emoji: "🔴", title: "Tickets Sem Resposta", text: "'Tickets abertos e nunca tivemos retorno. Finalizaram os tickets sem nos dar nenhum retorno e sem resolver o problema.' (ago/2025–jan/2026)" },
      { emoji: "🟡", title: "Preço Mid-Market para PMI", text: "R$2.000–5.000/mês + R$30–100K de implantação. PMIs pagam por complexidade que não precisam e não conseguem utilizar." },
      { emoji: "🟡", title: "Pricing Opaco", text: "100% consultivo, sem preço publicado. Dificulta comparação e gera ansiedade de compra no decisor da PMI." },
    ],
    strengths: [
      "100% web e mobile — única incumbente com claim legítimo de plataforma realmente moderna",
      "IA mais avançada que concorrentes: copiloto de ERP, assistente de voz, BI com insights em tempo real",
      "Ecossistema M&A: CRM (Ploomes), sales engagement (Meetime), ponto digital (PontoTel) — suite integrada",
      "R$425M de funding do fundo soberano de Singapura (GIC, 2020) — capacidade de investimento massivo",
      "35.000 clientes em múltiplos segmentos: atacado, distribuição, agro, indústria, serviço, varejo",
    ],
    pitch: "A Sankhya é muito boa — pra quem tem orçamento de mid-market. Se sua fábrica fatura R$50M+, vale conversar com eles. Abaixo disso, você vai pagar por complexidade que não precisa. E a implantação? Prepare-se pra 6 meses e 15 consultores diferentes.",
    openings: [
      "\"Já fez o processo de cotação com a Sankhya?\" — se ainda não, mostre o SYSLED antes que eles façam.",
      "\"Quanto foi o custo total no primeiro ano?\" — inclui implantação, licença, customização.",
      "\"Seu time interno consegue abrir chamados e ter retorno em menos de 5 dias?\" — esse é o ponto fraco deles.",
    ],
  },
];

// ─── Matriz comparativa ───────────────────────────────────────────────────────
const MATRIX_ROWS = [
  { dim: "Preço entrada",    sysled: "R$199/mês",    nomus: "R$490/mês",    bling: "R$55/mês",   totvs: "R$1.800+",    sankhya: "Sob consulta" },
  { dim: "Preço PMI real",   sysled: "R$599–1.499",  nomus: "R$800–2K",     bling: "R$250–650",  totvs: "R$3–8K",      sankhya: "R$2–5K"       },
  { dim: "Usuários simult.", sysled: "Ilimitados",   nomus: "3 (+ extra)",  bling: "Por plano",  totvs: "Por licença", sankhya: "Por licença"  },
  { dim: "Implantação",      sysled: "Dias (self)",  nomus: "Semanas–meses",bling: "Self-service",totvs: "3–12 meses", sankhya: "3–6 meses"    },
  { dim: "Custo implant.",   sysled: "R$0",          nomus: "R$5–15K",      bling: "R$0",        totvs: "R$50–200K",  sankhya: "R$30–100K"    },
  { dim: "Mobile nativo",    sysled: true,           nomus: false,          bling: "Parcial",    totvs: "Parcial",    sankhya: "Web/mobile"   },
  { dim: "IA nos fluxos",    sysled: true,           nomus: false,          bling: false,        totvs: "Carol ❓",   sankhya: "Parcial"      },
  { dim: "API aberta",       sysled: true,           nomus: false,          bling: true,         totvs: "AdvPL ❌",   sankhya: "Parcial"      },
  { dim: "PCP/MRP",          sysled: true,           nomus: true,           bling: false,        totvs: true,         sankhya: true           },
  { dim: "Bloco K/SPED",     sysled: true,           nomus: "Parcial",      bling: false,        totvs: true,         sankhya: true           },
  { dim: "Portab. dados",    sysled: "Gratuita",     nomus: "Lock-in",      bling: "Lock-in",    totvs: "Complexo",   sankhya: "Depende"      },
  { dim: "Zero setup",       sysled: true,           nomus: false,          bling: true,         totvs: false,        sankhya: false          },
];

// ─── 5 argumentos matadores ───────────────────────────────────────────────────
const KILLER_ARGS = [
  { num: "01", q: "Quantos operadores usam o sistema ao mesmo tempo?", insight: "Se a resposta for '3' ou 'precisamos pagar mais', você encontrou uma dor real. SYSLED: ilimitados." },
  { num: "02", q: "Seu operador de chão faz apontamento pelo celular?", insight: "A resposta é sempre NÃO (Nomus, TOTVS, Sankhya). Esse é o dado que fica preso na cabeça do supervisor." },
  { num: "03", q: "Vocês têm API aberta?", insight: "Nomus: não. TOTVS: AdvPL proprietária. Qualquer gestor de TI entende o que isso significa em termos de futuro e integrações." },
  { num: "04", q: "Quanto tempo levou a implantação?", insight: "Nomus: semanas a meses. TOTVS/Sankhya: 3–12 meses. SYSLED: dias. A diferença fala sozinha." },
  { num: "05", q: "Se você quiser sair, seus dados saem com você?", insight: "Bling: lock-in por armazenamento. TOTVS: dependência de consultoria. SYSLED: CSV/JSON/XML gratuito a qualquer momento." },
];

// ─── Objeções ─────────────────────────────────────────────────────────────────
const OBJECTIONS = [
  { q: "Já uso Nomus, funciona bem.", a: "Ótimo. Você consegue acessar de 4 pessoas no chão de fábrica ao mesmo tempo sem pagar a mais? Tem API pra integrar? Quanto tempo levou pra implantar? Cada pergunta é uma ferida aberta." },
  { q: "O Bling é mais barato.", a: "Sim. E quando crescer, ou precisar de PCP real, ou quiser que o gerente aprove uma ordem do celular... o Bling não vai estar lá. E seu histórico de dados vai ficar preso no plano deles." },
  { q: "TOTVS é mais segura, líder de mercado.", a: "Exato — líder pra quem tem R$2.000+/mês e 6 meses de paciência. Se esse é você, eles são excelentes. Mas se quer entrar amanhã, sem consultoria obrigatória..." },
  { q: "Nunca ouvi falar de SYSLED.", a: "Normal — nascemos em 2026. Mas o sistema foi construído por quem viveu o chão de fábrica, não por quem olha de cima. Faça um trial de 14 dias e compare." },
  { q: "Vocês são novos, vão durar?", a: "Pergunta justa. Temos [X] clientes ativos, stack moderno, unit economics saudável. E seus dados são seus — se a gente sumir, você exporta tudo em 5 minutos." },
];

// ─── Sinais estratégicos ──────────────────────────────────────────────────────
const STRATEGIC_SIGNALS = [
  { icon: "🔴", title: "Nomus em Modo Defensivo", desc: "\"Maior investimento da história\" = produto defasado. Roadmap 2026 com integrações básicas (CRM, TMS) confirma atraso estrutural.", color: C.red },
  { icon: "🟡", title: "Bling Reajustou em Abril/2025", desc: "Clientes frustrados com aumento de preço + lock-in de dados = janela aberta para migração imediata.", color: C.yellow },
  { icon: "🔵", title: "Reforma Tributária 2026", desc: "Clientes TOTVS e Sankhya enfrentam complexidade adicional, gerando insatisfação e custos extras não previstos.", color: C.blueLight },
];

// ─── Componente: Célula da matriz ─────────────────────────────────────────────
function MatrixCell({ value, highlight }) {
  if (value === true) return (
    <td style={{ padding: "11px 14px", textAlign: "center", background: highlight ? "rgba(34,197,94,0.07)" : "transparent" }}>
      <span style={{ color: C.green, fontSize: 16 }}>✅</span>
    </td>
  );
  if (value === false) return (
    <td style={{ padding: "11px 14px", textAlign: "center" }}>
      <span style={{ color: C.red, fontSize: 16 }}>❌</span>
    </td>
  );
  return (
    <td style={{
      padding: "11px 14px", textAlign: "center",
      fontFamily: "'Syne', sans-serif", fontSize: 13,
      color: highlight ? C.orangeLight : C.mutedLight,
      fontWeight: highlight ? 700 : 400,
      background: highlight ? "rgba(232,113,43,0.04)" : "transparent",
    }}>
      {value}
    </td>
  );
}

// ─── Componente: Header ───────────────────────────────────────────────────────
function Header() {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${C.navyLight}, ${C.navyMid})`,
      borderBottom: `1px solid ${C.border}`,
      padding: "32px 40px",
      display: "flex", justifyContent: "space-between", alignItems: "flex-start",
      flexWrap: "wrap", gap: 20,
    }}>
      <div>
        <a href="/" style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6, textDecoration: "none", cursor: "pointer" }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 900, color: C.white, letterSpacing: "-0.02em" }}>SYSLED</span>
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 600, color: C.blueLight, letterSpacing: "0.12em", textTransform: "uppercase" }}>Industrial OS</span>
        </a>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: C.white, letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 6px" }}>
          Análise Competitiva Detalhada
        </h1>
        <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, color: C.muted, margin: 0 }}>
          Nomus · Bling · TOTVS Protheus · Sankhya · Dados: Fevereiro 2026 · Confidencial
        </p>
      </div>
      <div style={{
        padding: "14px 20px", borderRadius: 12,
        background: "rgba(232,113,43,0.1)", border: `1px solid ${C.orange}44`,
        maxWidth: 340,
      }}>
        <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, color: C.orange, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
          ⚠️ Nota Metodológica
        </p>
        <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, color: C.muted, lineHeight: 1.6, margin: 0 }}>
          Dados reais de precificação, funcionalidades e reclamações públicas. Fontes: sites oficiais, Reclame Aqui, Capterra, B2B Stack, GetApp. Preços variam por negociação individual.
        </p>
      </div>
    </div>
  );
}

// ─── Componente: Tabela Resumo Executivo ──────────────────────────────────────
function ExecutiveSummary({ activeComp, setActiveComp }) {
  return (
    <div style={{
      background: C.navyLight, borderRadius: 18, overflow: "hidden",
      border: `1px solid ${C.border}`,
    }}>
      <div style={{ padding: "22px 28px", borderBottom: `1px solid ${C.border}` }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>
          Mapa do Campo de Batalha — Selecione um player para análise detalhada
        </h2>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Syne', sans-serif" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.03)" }}>
              {["Player", "Foco", "Preço Entrada", "PMI Real", "Implantação", "Ameaça SYSLED", "Base de Clientes"].map(h => (
                <th key={h} style={{
                  padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 700,
                  color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase",
                  borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap",
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPETITORS.map((comp, i) => (
              <tr
                key={comp.id}
                onClick={() => setActiveComp(comp.id)}
                style={{
                  background: activeComp === comp.id ? `${comp.tagColor}0E` : i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent",
                  borderLeft: activeComp === comp.id ? `3px solid ${comp.tagColor}` : "3px solid transparent",
                  cursor: "pointer", transition: "all 0.2s",
                }}
                onMouseEnter={e => { if (activeComp !== comp.id) e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                onMouseLeave={e => { if (activeComp !== comp.id) e.currentTarget.style.background = i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent"; }}
              >
                <td style={{ padding: "13px 16px" }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 800, color: activeComp === comp.id ? comp.tagColor : C.white }}>
                    {comp.name}
                  </span>
                </td>
                <td style={{ padding: "13px 16px" }}>
                  <span style={{ fontSize: 13, color: C.mutedLight }}>{comp.focus}</span>
                </td>
                <td style={{ padding: "13px 16px" }}>
                  <span style={{ fontSize: 13, color: C.white, fontWeight: 600 }}>{comp.priceEntry}</span>
                </td>
                <td style={{ padding: "13px 16px" }}>
                  <span style={{ fontSize: 13, color: C.mutedLight }}>{comp.priceReal}</span>
                </td>
                <td style={{ padding: "13px 16px" }}>
                  <span style={{ fontSize: 13, color: C.mutedLight }}>{comp.setup}</span>
                </td>
                <td style={{ padding: "13px 16px" }}>
                  <Badge label={comp.threat} color={comp.threatColor} />
                </td>
                <td style={{ padding: "13px 16px" }}>
                  <span style={{ fontSize: 12, color: C.muted }}>{comp.clients}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Componente: Detalhe do Competidor ───────────────────────────────────────
function CompetitorDetail({ comp }) {
  const [tab, setTab] = useState("weaknesses");

  const TabBtn = ({ id, label, icon }) => (
    <button
      onClick={() => setTab(id)}
      style={{
        padding: "10px 22px", borderRadius: 8, border: "none", cursor: "pointer",
        fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700,
        background: tab === id ? comp.tagColor : "rgba(255,255,255,0.05)",
        color: tab === id ? C.white : C.muted,
        transition: "all 0.2s",
        boxShadow: tab === id ? `0 0 16px ${comp.tagColor}44` : "none",
      }}
    >{icon} {label}</button>
  );

  return (
    <AnimateIn direction="none">
      <div style={{
        background: C.navyLight, borderRadius: 18, overflow: "hidden",
        border: `1px solid ${comp.tagColor}33`,
        boxShadow: `0 0 40px ${comp.tagColor}08`,
      }}>
        {/* Header do competidor */}
        <div style={{
          padding: "28px 32px",
          background: `linear-gradient(135deg, ${comp.tagColor}10, transparent)`,
          borderBottom: `1px solid ${C.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16,
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 900, color: C.white, margin: 0, letterSpacing: "-0.02em" }}>
                {comp.name}
              </h2>
              <Badge label={comp.threat} color={comp.threatColor} />
            </div>
            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, color: C.muted, margin: "0 0 8px" }}>{comp.subtitle}</p>
            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, color: C.muted, margin: 0 }}>
              Fundado em {comp.founded} ({2026 - comp.founded} anos) · {comp.clients}
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: 10 }}>
            {[
              { label: "Mobile",  value: comp.mobile,  color: comp.mobile === true ? C.green : comp.mobile === false ? C.red : C.yellow },
              { label: "IA",      value: comp.ai,      color: comp.ai === true ? C.green : comp.ai === false ? C.red : C.yellow },
              { label: "API",     value: comp.api,     color: comp.api === true ? C.green : comp.api === false ? C.red : C.yellow },
            ].map(f => (
              <div key={f.label} style={{
                padding: "12px 18px", borderRadius: 10, textAlign: "center",
                background: "rgba(255,255,255,0.04)", border: `1px solid ${f.color}33`, minWidth: 80,
              }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{f.label}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: f.value === true || f.value === false ? 18 : 11, fontWeight: 800, color: f.color }}>
                  {f.value === true ? "✅" : f.value === false ? "❌" : f.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preços resumo */}
        <div style={{ padding: "16px 32px", display: "flex", gap: 32, flexWrap: "wrap", borderBottom: `1px solid ${C.border}`, background: "rgba(255,255,255,0.01)" }}>
          {[
            { label: "Preço Entrada", value: comp.priceEntry },
            { label: "Preço PMI Real", value: comp.priceReal },
            { label: "Implantação", value: comp.setup },
            { label: "Reclame Aqui", value: comp.reclameResp, color: comp.reclameColor },
          ].map(p => (
            <div key={p.label}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{p.label}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: p.color || C.white }}>{p.value}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ padding: "20px 32px 0", display: "flex", gap: 8, flexWrap: "wrap" }}>
          <TabBtn id="weaknesses" label="Pontos Fracos" icon="🔴" />
          <TabBtn id="strengths"  label="Pontos Fortes" icon="✅" />
          <TabBtn id="pitch"      label="Como Vencer"   icon="⚡" />
        </div>

        <div style={{ padding: "24px 32px 32px" }}>
          {tab === "weaknesses" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {comp.weaknesses.map((w, i) => (
                <AnimateIn key={i} delay={0.07 * i}>
                  <div style={{
                    display: "flex", gap: 16, padding: "16px 20px", borderRadius: 12,
                    background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.12)",
                  }}>
                    <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{w.emoji}</span>
                    <div>
                      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 800, color: C.redLight, marginBottom: 5 }}>{w.title}</div>
                      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, color: C.mutedLight, lineHeight: 1.65 }}>{w.text}</div>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          )}

          {tab === "strengths" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{
                padding: "12px 16px", borderRadius: 8, marginBottom: 4,
                background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.15)",
              }}>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, color: C.green, margin: 0, fontWeight: 600 }}>
                  ⚠️ Respeite o concorrente. Conhecer os pontos fortes deles é essencial para uma venda honesta e eficaz.
                </p>
              </div>
              {comp.strengths.map((s, i) => (
                <AnimateIn key={i} delay={0.07 * i}>
                  <div style={{
                    display: "flex", gap: 12, padding: "13px 18px", borderRadius: 10,
                    background: "rgba(34,197,94,0.04)", border: "1px solid rgba(34,197,94,0.1)",
                  }}>
                    <span style={{ color: C.green, fontSize: 14, flexShrink: 0, marginTop: 2 }}>●</span>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, color: C.mutedLight, lineHeight: 1.65 }}>{s}</span>
                  </div>
                </AnimateIn>
              ))}
            </div>
          )}

          {tab === "pitch" && (
            <div>
              <div style={{
                padding: "24px 28px", borderRadius: 14, marginBottom: 20,
                background: `${comp.tagColor}0E`,
                border: `1px solid ${comp.tagColor}33`,
                borderLeft: `4px solid ${comp.tagColor}`,
              }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, color: comp.tagColor, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
                  🎯 Argumento-Chave
                </div>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, color: C.white, lineHeight: 1.75, margin: 0, fontStyle: "italic" }}>
                  "{comp.pitch}"
                </p>
              </div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, color: C.muted, marginBottom: 16, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Perguntas para abrir a conversa:
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {comp.openings.map((o, i) => (
                  <AnimateIn key={i} delay={0.1 * i}>
                    <div style={{
                      padding: "13px 18px", borderRadius: 10,
                      background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`,
                      fontFamily: "'Syne', sans-serif", fontSize: 13, color: C.mutedLight, lineHeight: 1.6,
                    }}>
                      → {o}
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AnimateIn>
  );
}

// ─── Componente: Matriz Comparativa ──────────────────────────────────────────
function ComparisonMatrix() {
  return (
    <AnimateIn>
      <div style={{
        background: C.navyLight, borderRadius: 18, overflow: "hidden",
        border: `1px solid ${C.border}`,
      }}>
        <div style={{ padding: "22px 28px", borderBottom: `1px solid ${C.border}` }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>
            Matriz Comparativa Completa — SYSLED vs. Todos
          </h2>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Syne', sans-serif" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.025)" }}>
                {[
                  { label: "Dimensão",  highlight: false },
                  { label: "SYSLED",    highlight: true  },
                  { label: "Nomus",     highlight: false },
                  { label: "Bling",     highlight: false },
                  { label: "TOTVS",     highlight: false },
                  { label: "Sankhya",   highlight: false },
                ].map(h => (
                  <th key={h.label} style={{
                    padding: "12px 14px",
                    textAlign: h.label === "Dimensão" ? "left" : "center",
                    fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                    color: h.highlight ? C.orange : C.muted,
                    borderBottom: `2px solid ${h.highlight ? C.orange : C.border}`,
                    background: h.highlight ? "rgba(232,113,43,0.06)" : "transparent",
                  }}>{h.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MATRIX_ROWS.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                  <td style={{ padding: "11px 14px", fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 600, color: C.blueLight }}>{row.dim}</td>
                  <MatrixCell value={row.sysled} highlight />
                  <MatrixCell value={row.nomus} />
                  <MatrixCell value={row.bling} />
                  <MatrixCell value={row.totvs} />
                  <MatrixCell value={row.sankhya} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AnimateIn>
  );
}

// ─── Componente: 5 Argumentos ─────────────────────────────────────────────────
function KillerArgs() {
  return (
    <AnimateIn>
      <div style={{
        background: C.navyLight, borderRadius: 18, padding: "28px",
        border: `1px solid ${C.border}`,
      }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 24 }}>
          Os 5 Argumentos Matadores na Feira
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
          {KILLER_ARGS.map((arg, i) => (
            <AnimateIn key={i} delay={0.1 * i}>
              <div
                style={{
                  padding: "22px 22px", borderRadius: 14,
                  background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`,
                  transition: "all 0.3s", cursor: "default",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.orange + "66"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 12px 30px ${C.orange}10`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 30, fontWeight: 900, color: `${C.orange}25`, lineHeight: 1, marginBottom: 10 }}>{arg.num}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 800, color: C.orange, marginBottom: 10, lineHeight: 1.45 }}>
                  "{arg.q}"
                </div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, color: C.mutedLight, lineHeight: 1.65 }}>{arg.insight}</div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </AnimateIn>
  );
}

// ─── Componente: Objeções ─────────────────────────────────────────────────────
function Objections() {
  const [open, setOpen] = useState(null);
  return (
    <AnimateIn>
      <div style={{
        background: C.navyLight, borderRadius: 18, padding: "28px",
        border: `1px solid ${C.border}`,
      }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
          Objeções e Respostas — Script de Campo
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {OBJECTIONS.map((obj, i) => (
            <div
              key={i}
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                borderRadius: 12, overflow: "hidden",
                border: `1px solid ${open === i ? C.blueLight + "55" : C.border}`,
                transition: "all 0.25s", cursor: "pointer",
              }}
            >
              <div style={{
                padding: "15px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
                background: open === i ? "rgba(74,159,229,0.06)" : "rgba(255,255,255,0.02)",
              }}>
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: C.white, lineHeight: 1.4 }}>
                  💬 "{obj.q}"
                </span>
                <span style={{
                  color: C.muted, fontSize: 20, fontWeight: 300, flexShrink: 0,
                  transition: "transform 0.25s", transform: open === i ? "rotate(45deg)" : "none", display: "block",
                }}>+</span>
              </div>
              {open === i && (
                <div style={{
                  padding: "16px 20px 18px",
                  background: "rgba(74,159,229,0.04)", borderTop: `1px solid ${C.blueLight}22`,
                }}>
                  <div style={{
                    fontFamily: "'Syne', sans-serif", fontSize: 13, color: C.mutedLight, lineHeight: 1.7,
                    borderLeft: `3px solid ${C.blueLight}`, paddingLeft: 14,
                  }}>
                    ↳ {obj.a}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AnimateIn>
  );
}

// ─── Componente: Janela Estratégica ──────────────────────────────────────────
function StrategicWindow() {
  return (
    <AnimateIn>
      <div style={{
        borderRadius: 18, overflow: "hidden",
        background: `linear-gradient(135deg, rgba(232,113,43,0.09), rgba(46,117,182,0.06))`,
        border: `1px solid ${C.orange}33`,
        padding: "28px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <span style={{ fontSize: 22 }}>🎯</span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: C.orange, letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>
            A Janela Está Aberta — 3 Sinais Convergentes
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14, marginBottom: 20 }}>
          {STRATEGIC_SIGNALS.map((s, i) => (
            <AnimateIn key={i} delay={0.12 * i}>
              <div style={{
                padding: "20px", borderRadius: 12,
                background: `${s.color}0A`, border: `1px solid ${s.color}33`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 18 }}>{s.icon}</span>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 800, color: s.color }}>{s.title}</span>
                </div>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, color: C.mutedLight, lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
        <div style={{ padding: "14px 18px", borderRadius: 10, background: "rgba(232,113,43,0.08)", border: `1px solid ${C.orange}33` }}>
          <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, color: C.orange, margin: 0, fontWeight: 600 }}>
            ⏱️ Janela estimada: 18–24 meses antes da resposta competitiva organizada. O timing é agora.
          </p>
        </div>
      </div>
    </AnimateIn>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function SYSLEDCompetitiveAnalysis() {
  const [activeComp, setActiveComp] = useState("nomus");
  const currentComp = COMPETITORS.find(c => c.id === activeComp);

  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.white, fontFamily: "'Syne', sans-serif" }}>
      <Header />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "36px 40px", display: "flex", flexDirection: "column", gap: 28 }}>

        {/* 1. Mapa do campo */}
        <AnimateIn>
          <ExecutiveSummary activeComp={activeComp} setActiveComp={setActiveComp} />
        </AnimateIn>

        {/* 2. Seleção de competidor + detalhe */}
        <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            {COMPETITORS.map(comp => (
              <button
                key={comp.id}
                onClick={() => setActiveComp(comp.id)}
                style={{
                  padding: "10px 24px", borderRadius: 10, border: "none", cursor: "pointer",
                  fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700,
                  background: activeComp === comp.id ? comp.tagColor : "rgba(255,255,255,0.05)",
                  color: activeComp === comp.id ? C.white : C.muted,
                  transition: "all 0.2s",
                  boxShadow: activeComp === comp.id ? `0 0 20px ${comp.tagColor}44` : "none",
                }}
              >
                {comp.name}
              </button>
            ))}
          </div>
          <CompetitorDetail key={activeComp} comp={currentComp} />
        </div>

        {/* 3. Janela estratégica */}
        <StrategicWindow />

        {/* 4. Matriz comparativa */}
        <ComparisonMatrix />

        {/* 5. Argumentos matadores */}
        <KillerArgs />

        {/* 6. Objeções */}
        <Objections />

        {/* Footer */}
        <AnimateIn>
          <div style={{ textAlign: "center", padding: "20px", borderTop: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 18, color: C.white }}>SYSLED</span>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, color: C.blueLight, fontWeight: 600, letterSpacing: "0.1em" }}>Industrial OS</span>
            </div>
            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, color: C.muted, margin: 0 }}>
              Análise Competitiva v2.0 · Fev/2026 · Confidencial — Uso interno
            </p>
          </div>
        </AnimateIn>

      </div>
    </div>
  );
}
