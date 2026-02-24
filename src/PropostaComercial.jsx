import { useState, useRef } from "react";

const C = {
  navy:      "#0A1628",
  navyMid:   "#0F2040",
  navyLight: "#162840",
  orange:    "#E8712B",
  orangeL:   "#FF8C42",
  blue:      "#2E75B6",
  blueL:     "#4A9FE5",
  green:     "#10B981",
  white:     "#FFFFFF",
  offWhite:  "#F0F4F8",
  muted:     "#64748B",
  dark:      "#1E293B",
  light:     "#F8FAFC",
};

const PLANOS = {
  starter: {
    nome: "Starter",
    faixa: "R$ 199 – 399",
    desc: "Pequena indústria saindo da planilha",
    modulos: ["Financeiro", "Estoque & Compras", "Produção básica", "NF-e integrado", "Suporte via IA"],
    setup: "Zero",
    suporte: "Chat IA 24/7",
  },
  industria: {
    nome: "Indústria",
    faixa: "R$ 599 – 1.499",
    desc: "PMI em crescimento — Sweet Spot",
    modulos: ["Tudo do Starter", "Produção avançada + PCP", "Controle de Qualidade", "BI básico", "Suporte humano + IA", "Customização sob demanda"],
    setup: "Zero ou R$ 3–8K",
    suporte: "Chat IA + Humano dedicado",
  },
  enterprise: {
    nome: "Enterprise",
    faixa: "R$ 3.000+",
    desc: "Média/grande empresa — módulos sob medida",
    modulos: ["Tudo do Indústria", "Módulos sob medida", "Integrações SAP/TOTVS", "Dashboards personalizados", "Account manager dedicado", "Desenvolvimento custom"],
    setup: "Incluso",
    suporte: "Dedicado",
  },
};

const PROBLEMAS_SUGERIDOS = [
  "Produção gerenciada em planilhas — dados imprecisos e retrabalho frequente",
  "ERP atual sem módulo de PCP funcional",
  "Interface desatualizada — operadores evitam usar o sistema",
  "Customização orçada em R$ 30K+ e 3 meses de prazo",
  "Dados presos no fornecedor — sem portabilidade real",
  "Sistema sem versão mobile — gestor não acessa do chão de fábrica",
  "Suporte com tempo médio de resposta superior a 30 dias",
  "Múltiplos usuários simultâneos cobrados separadamente",
  "Sem API aberta — impossível integrar com outros sistemas",
];

const DIFERENCIAIS_DEMO = [
  "Criação de conta em 2 minutos — sem instalação",
  "Ordem de produção aprovada pelo celular ao vivo",
  "Customização com IA entregue em dias, não meses",
  "Dashboard em tempo real com dados do chão de fábrica",
  "Exportação de dados a qualquer momento (portabilidade real)",
];

function Input({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%", padding: "10px 14px", borderRadius: 8, border: `1.5px solid #E2E8F0`,
          fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: C.dark,
          outline: "none", background: C.white, boxSizing: "border-box",
          transition: "border-color 0.2s",
        }}
        onFocus={e => e.target.style.borderColor = C.orange}
        onBlur={e => e.target.style.borderColor = "#E2E8F0"}
      />
    </div>
  );
}

function Textarea({ label, value, onChange, placeholder, rows = 3 }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
        {label}
      </label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        style={{
          width: "100%", padding: "10px 14px", borderRadius: 8, border: `1.5px solid #E2E8F0`,
          fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: C.dark,
          outline: "none", background: C.white, boxSizing: "border-box", resize: "vertical",
          transition: "border-color 0.2s",
        }}
        onFocus={e => e.target.style.borderColor = C.orange}
        onBlur={e => e.target.style.borderColor = "#E2E8F0"}
      />
    </div>
  );
}

function CheckPill({ label, checked, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "6px 14px", borderRadius: 20, border: `1.5px solid ${checked ? C.orange : "#CBD5E1"}`,
      background: checked ? `${C.orange}15` : C.white, cursor: "pointer",
      fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: checked ? 700 : 400,
      color: checked ? C.orange : C.muted, margin: "0 6px 8px 0", transition: "all 0.2s",
    }}>
      {checked ? "✓ " : ""}{label}
    </button>
  );
}

// ── Preview da Proposta (renderizado como "PDF") ──────────────────────────────
function PropostaPreview({ data }) {
  const hoje = new Date();
  const validade = new Date(hoje);
  validade.setDate(validade.getDate() + 7);
  const fmt = d => d.toLocaleDateString("pt-BR");

  const plano = PLANOS[data.plano];
  const ticketNum = parseFloat(data.ticketValor.replace(/\D/g, "")) || 0;
  const setupNum = parseFloat(data.setupValor.replace(/\D/g, "")) || 0;

  return (
    <div id="proposta-preview" style={{ background: C.white, fontFamily: "'Space Grotesk', sans-serif", maxWidth: 800, margin: "0 auto" }}>

      {/* HEADER */}
      <div style={{ background: C.navy, padding: "40px 48px 32px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: `${C.orange}15` }} />
        <div style={{ position: "absolute", bottom: -40, left: 200, width: 120, height: 120, borderRadius: "50%", background: `${C.blueL}10` }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", zIndex: 1 }}>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: C.white, letterSpacing: "-0.02em" }}>SYSLED</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: C.blueL, letterSpacing: "0.12em", textTransform: "uppercase" }}>Industrial OS</span>
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>sysled.com.br · Fortaleza, CE</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Proposta Comercial</div>
            <div style={{ fontSize: 13, color: C.orange, fontWeight: 700 }}>Nº {data.numeroPropost || "2026-001"}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>Emitida em {fmt(hoje)}</div>
          </div>
        </div>
        <div style={{ marginTop: 28, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.1)", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Proposta preparada para</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: C.white }}>{data.nomeCliente || "Nome do Cliente"}</div>
          <div style={{ fontSize: 15, color: C.orangeL, fontWeight: 600 }}>{data.empresa || "Empresa"}</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>
            {data.cargo && `${data.cargo} · `}{data.segmento && `${data.segmento}`}
          </div>
        </div>
      </div>

      {/* VALIDADE BANNER */}
      <div style={{ background: `${C.orange}`, padding: "10px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.white }}>⚡ Condição especial Smart Factory</span>
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.9)" }}>Válida até <strong>{fmt(validade)}</strong></span>
      </div>

      <div style={{ padding: "40px 48px" }}>

        {/* CONTEXTO */}
        <section style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 4, height: 28, borderRadius: 2, background: C.orange }} />
            <h2 style={{ fontSize: 18, fontWeight: 800, color: C.navy, margin: 0, letterSpacing: "-0.01em" }}>O que entendemos da sua situação</h2>
          </div>
          <div style={{ background: C.light, borderRadius: 12, padding: "20px 24px", borderLeft: `4px solid ${C.blueL}` }}>
            <p style={{ fontSize: 14, color: C.dark, margin: "0 0 12px", lineHeight: 1.7 }}>
              {data.contexto || "Durante nossa conversa na Smart Factory, ficou claro que a [Empresa] enfrenta desafios significativos com o sistema de gestão atual."}
            </p>
            {data.funcionarios && (
              <div style={{ display: "flex", gap: 24, marginTop: 12, flexWrap: "wrap" }}>
                {data.funcionarios && <div><span style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Funcionários</span><div style={{ fontSize: 16, fontWeight: 700, color: C.navy }}>{data.funcionarios}</div></div>}
                {data.faturamento && <div><span style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Faturamento aprox.</span><div style={{ fontSize: 16, fontWeight: 700, color: C.navy }}>{data.faturamento}</div></div>}
                {data.sistemaAtual && <div><span style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Sistema atual</span><div style={{ fontSize: 16, fontWeight: 700, color: C.navy }}>{data.sistemaAtual}</div></div>}
              </div>
            )}
          </div>
        </section>

        {/* PROBLEMAS IDENTIFICADOS */}
        {data.problemas.length > 0 && (
          <section style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 4, height: 28, borderRadius: 2, background: "#EF4444" }} />
              <h2 style={{ fontSize: 18, fontWeight: 800, color: C.navy, margin: 0, letterSpacing: "-0.01em" }}>Problemas identificados</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {data.problemas.map((p, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 18px", background: "rgba(239,68,68,0.04)", borderRadius: 10, border: "1px solid rgba(239,68,68,0.12)" }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(239,68,68,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <span style={{ fontSize: 13, color: "#EF4444", fontWeight: 800 }}>{i + 1}</span>
                  </div>
                  <span style={{ fontSize: 14, color: C.dark, lineHeight: 1.6 }}>{p}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* O QUE MOSTRAMOS NA DEMO */}
        {data.diferenciais.length > 0 && (
          <section style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 4, height: 28, borderRadius: 2, background: C.green }} />
              <h2 style={{ fontSize: 18, fontWeight: 800, color: C.navy, margin: 0, letterSpacing: "-0.01em" }}>O que você viu na demonstração</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {data.diferenciais.map((d, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 16px", background: "rgba(16,185,129,0.04)", borderRadius: 10, border: "1px solid rgba(16,185,129,0.15)" }}>
                  <span style={{ fontSize: 16, color: C.green, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 13, color: C.dark, lineHeight: 1.5 }}>{d}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PLANO RECOMENDADO */}
        <section style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 4, height: 28, borderRadius: 2, background: C.orange }} />
            <h2 style={{ fontSize: 18, fontWeight: 800, color: C.navy, margin: 0, letterSpacing: "-0.01em" }}>Plano recomendado para {data.empresa || "a sua empresa"}</h2>
          </div>
          <div style={{ background: C.navy, borderRadius: 16, padding: "28px 32px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: `${C.orange}12` }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: 20, background: `${C.orange}25`, marginBottom: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.orangeL, letterSpacing: "0.1em", textTransform: "uppercase" }}>Plano Recomendado</span>
                </div>
                <div style={{ fontSize: 28, fontWeight: 900, color: C.white }}>{plano.nome}</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>{plano.desc}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Mensalidade</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: C.orangeL }}>{data.ticketValor || plano.faixa}<span style={{ fontSize: 16, fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>/mês</span></div>
                {data.setupValor && (
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>Setup: {data.setupValor}</div>
                )}
              </div>
            </div>
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Módulos incluídos</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {plano.modulos.map((m, i) => (
                  <div key={i} style={{ padding: "5px 14px", borderRadius: 20, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>✓ {m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Customização específica */}
          {data.customizacao && (
            <div style={{ marginTop: 16, padding: "18px 22px", borderRadius: 12, background: `${C.blueL}0D`, border: `1px solid ${C.blueL}33` }}>
              <div style={{ fontSize: 12, color: C.blue, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Customização identificada para sua operação</div>
              <p style={{ fontSize: 14, color: C.dark, margin: 0, lineHeight: 1.6 }}>{data.customizacao}</p>
            </div>
          )}
        </section>

        {/* DESAFIO 15 DIAS */}
        <section style={{ marginBottom: 40 }}>
          <div style={{
            borderRadius: 16, overflow: "hidden",
            border: `1.5px solid ${C.orange}`,
          }}>
            <div style={{ background: C.orange, padding: "14px 28px", display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 22 }}>🏆</span>
              <span style={{ fontSize: 16, fontWeight: 800, color: C.white, letterSpacing: "-0.01em" }}>Desafio SYSLED — Nossa Garantia</span>
            </div>
            <div style={{ padding: "24px 28px", background: `${C.orange}06` }}>
              <p style={{ fontSize: 18, fontWeight: 700, color: C.navy, margin: "0 0 8px", lineHeight: 1.4 }}>
                Se não implantarmos em <span style={{ color: C.orange }}>15 dias</span>, o primeiro mês é por nossa conta.
              </p>
              <p style={{ fontSize: 14, color: C.muted, margin: 0, lineHeight: 1.6 }}>
                Enquanto outros ERPs estão te mandando proposta com 6 meses de prazo, você já está usando o SYSLED.
                A implantação inclui configuração de conta, migração de dados básicos, treinamento da equipe e go-live no chão de fábrica.
              </p>
              <div style={{ display: "flex", gap: 20, marginTop: 16, flexWrap: "wrap" }}>
                {["Implantação em 15 dias", "Primeiro mês grátis se atrasar", "Suporte durante toda a implantação", "Treinamento incluído"].map((g, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 20, height: 20, borderRadius: "50%", background: `${C.green}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: C.green, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 13, color: C.dark, fontWeight: 500 }}>{g}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONDIÇÃO SMART FACTORY */}
        <section style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 4, height: 28, borderRadius: 2, background: "#7C3AED" }} />
            <h2 style={{ fontSize: 18, fontWeight: 800, color: C.navy, margin: 0, letterSpacing: "-0.01em" }}>Condição especial — Smart Factory 2026</h2>
          </div>
          <div style={{ background: "rgba(124,58,237,0.04)", borderRadius: 12, padding: "24px 28px", border: "1px solid rgba(124,58,237,0.15)" }}>
            <p style={{ fontSize: 14, color: C.dark, margin: "0 0 16px", lineHeight: 1.6 }}>
              Por ter visitado a Feira Smart Factory e conversado conosco diretamente, esta proposta inclui as seguintes condições exclusivas:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                data.desconto ? `Desconto de ${data.desconto} na mensalidade (válido por ${data.periodoDesconto || "3 meses"})` : null,
                data.setupGratis ? "Setup sem custo adicional (normalmente R$ 3.000–8.000)" : null,
                "Primeiro mês com suporte prioritário direto com Demétrio Freitas",
                "Acesso antecipado a novas funcionalidades do roadmap 2026",
                data.condicaoExtra || null,
              ].filter(Boolean).map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 14px", background: C.white, borderRadius: 8 }}>
                  <span style={{ fontSize: 16, color: "#7C3AED", flexShrink: 0 }}>⭐</span>
                  <span style={{ fontSize: 14, color: C.dark, lineHeight: 1.5 }}>{c}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: "12px 16px", background: "rgba(124,58,237,0.08)", borderRadius: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#7C3AED" }}>⏰ Esta condição é válida até {fmt(validade)}</span>
            </div>
          </div>
        </section>

        {/* PRÓXIMOS PASSOS */}
        <section style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 4, height: 28, borderRadius: 2, background: C.blueL }} />
            <h2 style={{ fontSize: 18, fontWeight: 800, color: C.navy, margin: 0, letterSpacing: "-0.01em" }}>Próximos passos</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { n: "01", titulo: "Aceite da proposta", desc: `Responda este e-mail com confirmação ou entre em contato via WhatsApp até ${fmt(validade)}.` },
              { n: "02", titulo: "Reunião de kick-off", desc: "Alinhamos dados de acesso, módulos prioritários e cronograma de implantação (30 min)." },
              { n: "03", titulo: "Implantação — Dias 1 a 15", desc: "Configuração, migração de dados básicos, treinamento da equipe e go-live no chão de fábrica." },
              { n: "04", titulo: "Go-live", desc: "Sua fábrica operando com o SYSLED. Suporte prioritário ativo nas primeiras 4 semanas." },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 16, padding: "16px 0", borderBottom: i < 3 ? "1px solid #EEF2F7" : "none" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: C.navy, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: C.orange }}>{s.n}</span>
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.navy, marginBottom: 4 }}>{s.titulo}</div>
                  <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ASSINATURA */}
        <section>
          <div style={{ background: C.navy, borderRadius: 16, padding: "28px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: C.white, marginBottom: 4 }}>Demétrio Freitas</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Fundador · SYSLED Industrial OS</div>
              <div style={{ fontSize: 13, color: C.orange, marginTop: 8, fontWeight: 600 }}>demetrio@sysled.com.br</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>sysled.com.br</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Pronto para começar?</div>
              <div style={{ padding: "12px 28px", background: C.orange, borderRadius: 10, display: "inline-block" }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: C.white }}>ACEITAR PROPOSTA</span>
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 8 }}>Responda este e-mail ou via WhatsApp</div>
            </div>
          </div>
          <div style={{ marginTop: 20, padding: "14px 0", borderTop: "1px solid #EEF2F7", textAlign: "center" }}>
            <p style={{ fontSize: 11, color: C.muted, margin: 0, lineHeight: 1.8 }}>
              Esta proposta é confidencial e destinada exclusivamente a {data.nomeCliente || "o destinatário"}.<br />
              Os valores e condições aqui apresentados são válidos até {fmt(validade)}.<br />
              SYSLED Tecnologia LTDA · Fortaleza, CE · CNPJ [XX.XXX.XXX/0001-XX]
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
export default function PropostaComercial() {
  const [tab, setTab] = useState("form");
  const [data, setData] = useState({
    // Cliente
    nomeCliente: "",
    empresa: "",
    cargo: "",
    segmento: "",
    funcionarios: "",
    faturamento: "",
    sistemaAtual: "",
    // Proposta
    numeroPropost: `2026-${String(Math.floor(Math.random()*900)+100)}`,
    plano: "industria",
    ticketValor: "",
    setupValor: "",
    desconto: "",
    periodoDesconto: "3 meses",
    setupGratis: false,
    condicaoExtra: "",
    // Conteúdo
    contexto: "",
    problemas: [],
    diferenciais: [],
    customizacao: "",
  });

  const set = k => v => setData(d => ({ ...d, [k]: v }));

  const toggleList = (key, item) => {
    setData(d => ({
      ...d,
      [key]: d[key].includes(item) ? d[key].filter(x => x !== item) : [...d[key], item],
    }));
  };

  const TabBtn = ({ id, label }) => (
    <button onClick={() => setTab(id)} style={{
      padding: "10px 24px", borderRadius: 8, border: "none", cursor: "pointer",
      fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700,
      background: tab === id ? C.orange : "rgba(255,255,255,0.06)",
      color: tab === id ? C.white : C.muted,
      transition: "all 0.2s",
    }}>{label}</button>
  );

  return (
    <div style={{ minHeight: "100vh", background: C.navy, fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#060E1A", padding: "20px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <a href="/" style={{ display: "flex", alignItems: "baseline", gap: 8, textDecoration: "none", cursor: "pointer" }}>
            <span style={{ fontSize: 20, fontWeight: 900, color: C.white }}>SYSLED</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: C.blueL, letterSpacing: "0.12em", textTransform: "uppercase" }}>Industrial OS</span>
          </a>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>Gerador de Proposta Comercial — Pós-Demo</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <TabBtn id="form" label="📝 Formulário" />
          <TabBtn id="preview" label="👁 Preview" />
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
        {tab === "form" ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>

            {/* Coluna 1 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Dados do cliente */}
              <div style={{ background: C.navyLight, borderRadius: 16, padding: "24px", border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>Dados do Cliente</h3>
                <Input label="Nome completo" value={data.nomeCliente} onChange={set("nomeCliente")} placeholder="Carlos Mendes" />
                <Input label="Empresa" value={data.empresa} onChange={set("empresa")} placeholder="MetalForte Indústria LTDA" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Input label="Cargo" value={data.cargo} onChange={set("cargo")} placeholder="Diretor Industrial" />
                  <Input label="Segmento" value={data.segmento} onChange={set("segmento")} placeholder="Metal mecânica" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Input label="Nº de funcionários" value={data.funcionarios} onChange={set("funcionarios")} placeholder="80 funcionários" />
                  <Input label="Faturamento aprox." value={data.faturamento} onChange={set("faturamento")} placeholder="R$ 8M/ano" />
                </div>
                <Input label="Sistema atual" value={data.sistemaAtual} onChange={set("sistemaAtual")} placeholder="Nomus / planilha / sem sistema" />
              </div>

              {/* Contexto */}
              <div style={{ background: C.navyLight, borderRadius: 16, padding: "24px", border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>Contexto da Conversa</h3>
                <Textarea
                  label="Resumo da conversa na demo"
                  value={data.contexto}
                  onChange={set("contexto")}
                  placeholder="Ex: Carlos visitou o stand na Smart Factory e ficou impressionado com a velocidade de setup. A MetalForte tem 80 funcionários e produz peças para o setor automotivo. Hoje opera com Nomus mas enfrenta limitação de usuários simultâneos e interface que operadores evitam usar..."
                  rows={4}
                />
                <Textarea
                  label="Customização identificada para a operação"
                  value={data.customizacao}
                  onChange={set("customizacao")}
                  placeholder="Ex: Módulo de controle de qualidade integrado ao PCP com alertas automáticos para o supervisor quando há desvio de tolerância. Entrega estimada: 10 dias via IA."
                  rows={3}
                />
              </div>
            </div>

            {/* Coluna 2 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Plano e valores */}
              <div style={{ background: C.navyLight, borderRadius: 16, padding: "24px", border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>Proposta Comercial</h3>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Plano Recomendado</label>
                  <div style={{ display: "flex", gap: 10 }}>
                    {Object.entries(PLANOS).map(([key, p]) => (
                      <button key={key} onClick={() => set("plano")(key)} style={{
                        flex: 1, padding: "10px 8px", borderRadius: 10, border: `2px solid ${data.plano === key ? C.orange : "rgba(255,255,255,0.1)"}`,
                        background: data.plano === key ? `${C.orange}18` : "rgba(255,255,255,0.03)",
                        cursor: "pointer", transition: "all 0.2s",
                      }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: data.plano === key ? C.orangeL : C.muted }}>{p.nome}</div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 3 }}>{p.faixa}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Input label="Valor mensal (R$)" value={data.ticketValor} onChange={set("ticketValor")} placeholder="R$ 1.299" />
                  <Input label="Valor do setup" value={data.setupValor} onChange={set("setupValor")} placeholder="R$ 5.000 ou Grátis" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Input label="Desconto especial" value={data.desconto} onChange={set("desconto")} placeholder="Ex: 20%" />
                  <Input label="Período do desconto" value={data.periodoDesconto} onChange={set("periodoDesconto")} placeholder="3 meses" />
                </div>
                <div style={{ marginTop: 4 }}>
                  <button onClick={() => set("setupGratis")(!data.setupGratis)} style={{
                    padding: "8px 18px", borderRadius: 8, border: `1.5px solid ${data.setupGratis ? C.green : "rgba(255,255,255,0.15)"}`,
                    background: data.setupGratis ? `${C.green}18` : "rgba(255,255,255,0.03)", cursor: "pointer",
                    fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700,
                    color: data.setupGratis ? C.green : C.muted, transition: "all 0.2s",
                  }}>
                    {data.setupGratis ? "✓ " : ""}Setup gratuito (condição especial)
                  </button>
                </div>
                <Textarea label="Condição extra (opcional)" value={data.condicaoExtra} onChange={set("condicaoExtra")} placeholder="Ex: 2 meses de suporte premium gratuito" rows={2} />
              </div>

              {/* Problemas */}
              <div style={{ background: C.navyLight, borderRadius: 16, padding: "24px", border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Problemas Identificados</h3>
                <div style={{ marginBottom: 12 }}>
                  {PROBLEMAS_SUGERIDOS.map((p, i) => (
                    <CheckPill key={i} label={p} checked={data.problemas.includes(p)} onClick={() => toggleList("problemas", p)} />
                  ))}
                </div>
                <Textarea label="Problema adicional (opcional)" value={data._problemExtra || ""} onChange={v => setData(d => ({ ...d, _problemExtra: v }))} placeholder="Descreva um problema específico..." rows={2} />
                {data._problemExtra && (
                  <button onClick={() => {
                    if (data._problemExtra.trim()) {
                      setData(d => ({ ...d, problemas: [...d.problemas, d._problemExtra.trim()], _problemExtra: "" }));
                    }
                  }} style={{ padding: "8px 18px", borderRadius: 8, border: "none", background: C.orange, color: C.white, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer", marginTop: 8 }}>
                    + Adicionar
                  </button>
                )}
              </div>

              {/* Diferenciais da demo */}
              <div style={{ background: C.navyLight, borderRadius: 16, padding: "24px", border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>O Que Você Mostrou na Demo</h3>
                {DIFERENCIAIS_DEMO.map((d, i) => (
                  <CheckPill key={i} label={d} checked={data.diferenciais.includes(d)} onClick={() => toggleList("diferenciais", d)} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: C.white, marginBottom: 4 }}>Preview da Proposta</h2>
                <p style={{ fontSize: 13, color: C.muted }}>Esta é a visualização da proposta gerada. Use Ctrl+P para imprimir como PDF.</p>
              </div>
              <button
                onClick={() => window.print()}
                style={{
                  padding: "12px 28px", borderRadius: 10, border: "none", cursor: "pointer",
                  background: `linear-gradient(135deg, ${C.orange}, ${C.orangeL})`,
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 800, color: C.white,
                  boxShadow: `0 4px 20px ${C.orange}44`,
                }}
              >
                🖨 Exportar PDF
              </button>
            </div>
            <div style={{ background: C.white, borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
              <PropostaPreview data={data} />
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
